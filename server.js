const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'resumeforge_super_secret_jwt_key_2026';

// --- Security & Body Parsing Middleware ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS headers for development flexibility
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Serve static build assets (Vite React dist or public)
const staticPath = fs.existsSync(path.join(__dirname, 'dist')) ? path.join(__dirname, 'dist') : path.join(__dirname, 'public');
app.use(express.static(staticPath));
app.use(express.static(path.join(__dirname, 'public')));

// --- Helper Functions & Validation ---
const isValidEmail = (email) => {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Optional / Required Authentication Middleware
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Authentication required. No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Invalid or expired session token.' });
    }
};

// --- System & Health API ---
app.get('/api/health', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({
            success: true,
            status: 'ok',
            database: 'connected',
            serverTime: result.rows[0].now,
        });
    } catch (err) {
        res.status(503).json({
            success: false,
            status: 'degraded',
            database: 'disconnected',
            message: 'Database is offline. The app is functioning in client LocalStorage mode.',
            error: err.message,
        });
    }
});

// --- AUTHENTICATION REST API ---

// 1. Register User
app.post('/api/auth/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || typeof name !== 'string' || !name.trim()) {
            return res.status(400).json({ success: false, error: 'Please provide a valid full name.' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
        }

        if (!password || typeof password !== 'string' || password.length < 6) {
            return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long.' });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists
        const existing = await db.query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into PostgreSQL
        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
            [name.trim(), normalizedEmail, hashedPassword]
        );

        const user = result.rows[0];
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    } catch (err) {
        next(err);
    }
});

// 2. Login User
app.post('/api/auth/login', async (req, res, next) => {
    try {
        const { email, password } = req.body || {};

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
        }

        if (!password || typeof password !== 'string') {
            return res.status(400).json({ success: false, error: 'Password is required.' });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const result = await db.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email },
            token,
        });
    } catch (err) {
        next(err);
    }
});

// 3. Get Current User Profile
app.get('/api/auth/me', requireAuth, async (req, res, next) => {
    try {
        const result = await db.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'User account not found.' });
        }
        res.json({ success: true, user: result.rows[0] });
    } catch (err) {
        next(err);
    }
});

// --- RESUMES CRUD REST API (PostgreSQL JSONB) ---

// 1. Get All Resumes (Metadata list)
app.get('/api/resumes', async (req, res, next) => {
    try {
        const result = await db.query(
            'SELECT id, title, created_at, updated_at FROM resumes ORDER BY updated_at DESC LIMIT 50'
        );
        res.json(result.rows);
    } catch (err) {
        // Return clear error if DB is unreachable
        res.status(503).json({
            success: false,
            error: 'PostgreSQL database is currently unavailable.',
            details: err.message,
        });
    }
});

// 2. Get Single Resume by ID
app.get('/api/resumes/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') {
            return res.status(400).json({ success: false, error: 'Invalid resume ID parameter.' });
        }

        const result = await db.query('SELECT * FROM resumes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Resume not found.' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

// 3. Save / Upsert Resume
app.post('/api/resumes', async (req, res, next) => {
    try {
        const { id, title, data } = req.body || {};

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ success: false, error: 'A valid resume ID string is required.' });
        }

        if (!data || typeof data !== 'object') {
            return res.status(400).json({ success: false, error: 'Valid resume data object is required.' });
        }

        const resumeTitle = (title && typeof title === 'string') 
            ? title.trim() 
            : data.personalInfo?.fullName || 'Untitled Resume';

        const query = `
            INSERT INTO resumes (id, title, data, updated_at)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
            ON CONFLICT (id) 
            DO UPDATE SET 
                title = EXCLUDED.title,
                data = EXCLUDED.data,
                updated_at = CURRENT_TIMESTAMP
            RETURNING id, title, created_at, updated_at;
        `;

        const result = await db.query(query, [id, resumeTitle, JSON.stringify(data)]);

        res.json({
            success: true,
            message: 'Resume saved successfully in PostgreSQL database.',
            resume: result.rows[0],
        });
    } catch (err) {
        next(err);
    }
});

// 4. Delete Resume
app.delete('/api/resumes/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM resumes WHERE id = $1 RETURNING id', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Resume not found or already deleted.' });
        }

        res.json({ success: true, message: 'Resume deleted successfully from database.', id });
    } catch (err) {
        next(err);
    }
});

// --- SPA Client Fallback Middleware ---
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ success: false, error: `API route ${req.method} ${req.path} not found.` });
    }
    const distIndex = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(distIndex)) {
        return res.sendFile(distIndex);
    }
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

// --- Global Express Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error('💥 Backend Error Encountered:', err.message);
    const status = err.status || (err.code === 'ECONNREFUSED' ? 503 : 500);
    res.status(status).json({
        success: false,
        error: err.message || 'An unexpected internal server error occurred.',
        code: err.code || 'INTERNAL_SERVER_ERROR',
    });
});

// --- Process-Level Exception Handlers (Prevents Server Crashes) ---
process.on('unhandledRejection', (reason, promise) => {
    console.warn('⚠️ Unhandled Promise Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('💥 Uncaught Process Exception:', err.message);
});

// --- Server Startup ---
const server = app.listen(port, () => {
    console.log(`🚀 ResumeForge Backend running on http://localhost:${port}`);
});

module.exports = server;
