const { Pool } = require('pg');
require('dotenv').config();

let isConnected = false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || undefined,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'resume_maker',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
});

// Capture unexpected errors on idle database connections
pool.on('error', (err) => {
  console.warn('⚠️ Idle PostgreSQL pool warning:', err.message);
  isConnected = false;
});

// Verify & Auto-initialize Database Schema on Startup
async function initDB() {
  try {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS resumes (
          id VARCHAR(64) PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
          data JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_resumes_updated_at ON resumes (updated_at DESC);
        CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
      `);
      isConnected = true;
      console.log('✅ PostgreSQL database connected & verified.');
    } finally {
      client.release();
    }
  } catch (err) {
    isConnected = false;
    console.log('ℹ️  PostgreSQL not connected locally. App running in offline/LocalStorage mode.');
  }
}

// Initial connection attempt
initDB();

// Safe query execution wrapper with error reporting
async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    isConnected = true;
    return res;
  } catch (err) {
    // If connection was lost, mark disconnected
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      isConnected = false;
    }
    throw err;
  }
}

module.exports = {
  query,
  pool,
  isAvailable: () => isConnected,
  reconnect: initDB,
};
