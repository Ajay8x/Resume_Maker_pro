import React from 'react';
import { 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Tooltip, 
  IconButton,
  Chip 
} from '@mui/material';
import { 
  Sparkles, 
  Palette, 
  Download, 
  Database, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  FileText 
} from 'lucide-react';
import { sampleProfiles } from '../data/sampleProfiles';

const PRESET_COLORS = [
  { label: 'Royal Blue', hex: '#2563eb' },
  { label: 'Deep Purple', hex: '#7c3aed' },
  { label: 'Emerald Green', hex: '#059669' },
  { label: 'Crimson Rose', hex: '#e11d48' },
  { label: 'Amber Orange', hex: '#d97706' },
  { label: 'Slate Executive', hex: '#334155' },
];

export default function Header({
  state,
  setState,
  resumeData,
  setResumeData,
  onOpenDBModal,
  onPrint,
  dbStatus,
  user,
  onOpenLogin,
  onLogout,
  onNavigateHome
}) {
  const handleProfileChange = (e) => {
    const profileKey = e.target.value;
    if (sampleProfiles[profileKey]) {
      const profile = sampleProfiles[profileKey];
      setResumeData({
        personalInfo: {
          fullName: profile.name,
          jobTitle: profile.role,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          linkedin: profile.linkedin,
          github: profile.github,
          portfolio: profile.website,
          summary: profile.summary,
        },
        skills: profile.skills,
        languages: profile.languages,
        hobbies: profile.hobbies,
        experience: profile.experience || [],
        projects: profile.projects || [],
        education: profile.education || [],
        certifications: profile.certifications || [],
        internships: profile.internships || [],
        achievements: profile.achievements || [],
      });
    }
  };

  return (
    <header className="no-print bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 shadow-sm">
      {/* Brand & Home button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group hover:opacity-90 transition focus:outline-none"
          title="Return to Home Page"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">ResumeForge</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium">← Back to Home</p>
          </div>
        </button>
      </div>

      {/* Central Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Sample Profile Loader */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Profile:</span>
          <select
            className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
            defaultValue="ajay"
            onChange={handleProfileChange}
          >
            <option value="ajay" className="bg-white text-slate-900">Ajay Singh (Full Stack)</option>
            <option value="dev" className="bg-white text-slate-900">Alex Morgan (Senior Dev)</option>
            <option value="data" className="bg-white text-slate-900">Dr. Priya (AI & Data)</option>
            <option value="marketing" className="bg-white text-slate-900">Marcus (Marketing Lead)</option>
            <option value="fresher" className="bg-white text-slate-900">Rohan (CS Graduate)</option>
          </select>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200">
          <Layers className="w-4 h-4 text-blue-500" />
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Template:</span>
          <select
            value={state.template}
            onChange={(e) => setState(prev => ({ ...prev, template: e.target.value }))}
            className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none cursor-pointer"
          >
            <option value="modern" className="bg-white text-slate-900">Modern Pro</option>
            <option value="sidebar" className="bg-white text-slate-900">Two-Column Sidebar</option>
            <option value="classic" className="bg-white text-slate-900">Classic Executive</option>
            <option value="minimal" className="bg-white text-slate-900">Tech Minimal</option>
            <option value="corporate" className="bg-white text-slate-900">Corporate Elegant</option>
          </select>
        </div>

        {/* Accent Color Palette */}
        <div className="flex items-center gap-1.5 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200">
          <Palette className="w-4 h-4 text-pink-500" />
          <div className="flex items-center gap-1">
            {PRESET_COLORS.map(c => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setState(prev => ({ ...prev, accentColor: c.hex }))}
                className={`w-4 h-4 rounded-full transition-transform ${state.accentColor === c.hex ? 'scale-125 ring-2 ring-blue-600 ring-offset-1 ring-offset-white' : 'opacity-80 hover:opacity-100 hover:scale-110'}`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Cloud / PostgreSQL Sync Button */}
        <Button
          variant="outlined"
          size="small"
          onClick={onOpenDBModal}
          startIcon={<Database className="w-4 h-4 text-emerald-600" />}
          sx={{
            borderColor: '#059669',
            color: '#059669',
            textTransform: 'none',
            fontSize: '0.75rem',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#047857',
              backgroundColor: 'rgba(5, 150, 105, 0.08)'
            }
          }}
        >
          PostgreSQL Cloud
        </Button>

        {/* User Auth Profile / Login Button */}
        {user ? (
          <div className="flex items-center gap-2 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            <span className="text-xs font-bold text-slate-800">Hi, {user.name.split(' ')[0]}</span>
            <Button
              size="small"
              onClick={onLogout}
              sx={{ color: '#64748b', textTransform: 'none', fontSize: '0.7rem', minWidth: 'auto', p: '2px 6px', '&:hover': { color: '#e11d48' } }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="outlined"
            size="small"
            onClick={onOpenLogin}
            sx={{
              borderColor: '#2563eb',
              color: '#2563eb',
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              '&:hover': {
                borderColor: '#1d4ed8',
                backgroundColor: 'rgba(37, 99, 235, 0.08)'
              }
            }}
          >
            Sign In
          </Button>
        )}

        {/* Print / PDF Export */}
        <Button
          variant="contained"
          size="small"
          onClick={onPrint}
          startIcon={<Download className="w-4 h-4" />}
          sx={{
            backgroundColor: '#2563eb',
            color: '#ffffff',
            textTransform: 'none',
            fontSize: '0.75rem',
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.3)',
            '&:hover': {
              backgroundColor: '#1d4ed8'
            }
          }}
        >
          Export PDF
        </Button>
      </div>
    </header>
  );
}
