import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  IconButton, 
  InputAdornment, 
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onNavigateHome, onContinueAsGuest }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (isSignUp) {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);
    const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
    const payload = isSignUp ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('resumeforge_token', data.token);
        localStorage.setItem('resumeforge_user', JSON.stringify(data.user));
        setSuccessMsg(isSignUp ? 'Account created successfully! Redirecting...' : 'Welcome back! Logging you in...');
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 800);
      } else {
        setError(data.error || 'Authentication failed. Please try again.');
      }
    } catch (err) {
      setError(`Server connection error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Quick Demo Login (Auto-fills demo account)
  const handleDemoLogin = async () => {
    setEmail('demo@resumeforge.pro');
    setPassword('DemoPass123!');
    setLoading(true);
    setError(null);

    try {
      let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'demo@resumeforge.pro', password: 'DemoPass123!' }),
      });

      if (res.status === 401) {
        res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Demo User', email: 'demo@resumeforge.pro', password: 'DemoPass123!' }),
        });
      }

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('resumeforge_token', data.token);
        localStorage.setItem('resumeforge_user', JSON.stringify(data.user));
        setSuccessMsg('Logged in as Demo User! Redirecting...');
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 700);
      } else {
        setError(data.error || 'Failed to login with demo account.');
      }
    } catch (err) {
      setError(`Demo login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    fullWidth: true,
    size: 'small',
    sx: {
      '& .MuiOutlinedInput-root': {
        color: '#0f172a',
        backgroundColor: '#ffffff',
        fontSize: '0.85rem',
        borderRadius: '8px',
        '& fieldset': { borderColor: '#cbd5e1' },
        '&:hover fieldset': { borderColor: '#94a3b8' },
        '&.Mui-focused fieldset': { borderColor: '#2563eb' }
      },
      '& .MuiInputLabel-root': { color: '#64748b', fontSize: '0.82rem' },
      '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-blue-600/20 selection:text-blue-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-blue-100 via-indigo-50 to-purple-50 blur-[100px] pointer-events-none rounded-full"></div>

      {/* Top back navigation */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition group focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        <button
          onClick={onContinueAsGuest}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
        >
          Continue as Guest →
        </button>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 z-10 relative">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/25 mb-3">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {isSignUp ? 'Create your Account' : 'Welcome to ResumeForge'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isSignUp
              ? 'Save multiple resumes & sync with PostgreSQL cloud'
              : 'Sign in to access your cloud resumes & ATS score history'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${!isSignUp ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setError(null); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${isSignUp ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Create Account
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 2.5, backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', fontSize: '0.78rem' }}>
            {error}
          </Alert>
        )}

        {successMsg && (
          <Alert severity="success" sx={{ mb: 2.5, backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', fontSize: '0.78rem' }}>
            {successMsg}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <TextField
              label="Full Name"
              placeholder="e.g. Ajay Singh"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              {...inputStyle}
            />
          )}

          <TextField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            {...inputStyle}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#64748b' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...inputStyle}
          />

          {isSignUp && (
            <TextField
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              {...inputStyle}
            />
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              py: 1.2,
              borderRadius: '8px',
              boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
              '&:hover': {
                backgroundColor: '#1d4ed8'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: '#ffffff' }} />
            ) : isSignUp ? (
              'Create Free Account'
            ) : (
              'Sign In to Dashboard'
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            Or Quick Test
          </span>
        </div>

        {/* 1-Click Demo Login */}
        <Button
          fullWidth
          variant="outlined"
          onClick={handleDemoLogin}
          disabled={loading}
          startIcon={<Zap className="w-4 h-4 text-amber-500" />}
          sx={{
            borderColor: '#cbd5e1',
            color: '#334155',
            textTransform: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            borderRadius: '8px',
            py: 1,
            '&:hover': {
              borderColor: '#94a3b8',
              backgroundColor: '#f8fafc'
            }
          }}
        >
          ⚡ 1-Click Instant Demo Login
        </Button>

        {/* Features footnote */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-Bit Encrypted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Free Forever
          </span>
        </div>
      </div>
    </div>
  );
}
