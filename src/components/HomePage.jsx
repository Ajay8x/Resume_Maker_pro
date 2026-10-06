import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Download, 
  Layers, 
  Palette, 
  Database, 
  Eye, 
  Star, 
  FileText, 
  Award, 
  Briefcase,
  ChevronRight,
  Code2,
  TrendingUp,
  Cpu,
  Check,
  Flame,
  MousePointerClick,
  Sliders,
  Terminal,
  Activity,
  UserCheck
} from 'lucide-react';
import { Button, Accordion, AccordionSummary, AccordionDetails, Slider } from '@mui/material';
import { sampleProfiles } from '../data/sampleProfiles';

export default function HomePage({ onStartBuilding, onSelectTemplate, onSelectProfile, user, onOpenLogin, onLogout }) {
  const heroRef = useRef(null);
  const cardContainerRef = useRef(null);
  const scoreCounterRef = useRef(null);
  const roleTextRef = useRef(null);
  
  const [activePreviewTab, setActivePreviewTab] = useState('modern');
  const [simulatedAtsScore, setSimulatedAtsScore] = useState(96);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [recentActivity, setRecentActivity] = useState({
    name: 'Ananya S.',
    role: 'Full-Stack Developer',
    template: 'Modern Pro',
    score: '98%'
  });

  const roles = [
    'Software Engineers',
    'Full-Stack Developers',
    'Data Scientists & AI Experts',
    'Product Managers',
    'Cloud & DevOps Architects'
  ];

  // Dynamic Rotating Roles with GSAP
  useEffect(() => {
    const interval = setInterval(() => {
      if (roleTextRef.current) {
        gsap.to(roleTextRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            setActiveRoleIndex((prev) => (prev + 1) % roles.length);
            gsap.fromTo(
              roleTextRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' }
            );
          }
        });
      }
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Dynamic Recent Activity Ticker
  useEffect(() => {
    const activities = [
      { name: 'Ananya S.', role: 'Full-Stack Dev', template: 'Modern Pro', score: '98%' },
      { name: 'Vikram M.', role: 'Senior Cloud Architect', template: 'Tech Minimal', score: '96%' },
      { name: 'Dr. Priya S.', role: 'Lead Data Scientist', template: 'Two-Column Sidebar', score: '99%' },
      { name: 'Kavita R.', role: 'Product Manager', template: 'Classic Executive', score: '95%' },
      { name: 'Rohit K.', role: 'Backend Engineer', template: 'Corporate Elegant', score: '97%' }
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % activities.length;
      setRecentActivity(activities[idx]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Main GSAP Hero Entrance & Floating Physics
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Stagger
      const tl = gsap.timeline();
      tl.from('.hero-badge', { y: -30, opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out(2)' })
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .from('.hero-desc', { y: 25, opacity: 0, duration: 0.7, ease: 'power2.out' }, '-=0.6')
        .from('.hero-cta-btn', { scale: 0.85, opacity: 0, stagger: 0.15, duration: 0.6, ease: 'back.out(2)' }, '-=0.4')
        .from('.hero-preview-box', { y: 50, opacity: 0, scale: 0.95, duration: 0.9, ease: 'power3.out' }, '-=0.5')
        .from('.floating-badge', { scale: 0, opacity: 0, stagger: 0.18, duration: 0.65, ease: 'elastic.out(1, 0.7)' }, '-=0.4')
        .from('.feature-pill', { scale: 0.8, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3');

      // 2. Animated ATS Initial Counter
      if (scoreCounterRef.current) {
        const scoreObj = { val: 0 };
        gsap.to(scoreObj, {
          val: 96,
          duration: 2,
          delay: 0.6,
          ease: 'power2.out',
          onUpdate: () => {
            if (scoreCounterRef.current) {
              scoreCounterRef.current.textContent = `${Math.round(scoreObj.val)}%`;
            }
          },
        });
      }

      // 3. Multi-Axis Floating Bobbing Loops
      gsap.to('.float-elem-1', { y: -14, x: 5, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.float-elem-2', { y: 14, x: -6, duration: 4.0, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.4 });
      gsap.to('.float-elem-3', { y: -10, x: -8, duration: 3.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });
      gsap.to('.float-elem-4', { y: 12, x: 7, duration: 4.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
      gsap.to('.pulse-radar-elem', { scale: 1.05, duration: 1.8, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // 3D Interactive Mouse Move Parallax on Hero Card
  const handleMouseMove = (e) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;

    gsap.to(cardContainerRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: 'power1.out',
      transformPerspective: 1000,
      transformOrigin: 'center center'
    });
  };

  const handleMouseLeave = () => {
    if (!cardContainerRef.current) return;
    gsap.to(cardContainerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    });
  };

  // Confetti trigger helper
  const triggerConfetti = (spread = 70, particleCount = 80) => {
    confetti({
      particleCount: particleCount,
      spread: spread,
      origin: { y: 0.6 }
    });
  };

  const handleLaunch = () => {
    triggerConfetti(90, 100);
    setTimeout(() => {
      onStartBuilding();
    }, 300);
  };

  // Simulated ATS Slider change
  const handleAtsSliderChange = (e, val) => {
    setSimulatedAtsScore(val);
    if (scoreCounterRef.current) {
      scoreCounterRef.current.textContent = `${val}%`;
    }
    if (val >= 95) {
      triggerConfetti(60, 40);
    }
  };

  // Template switch preview transition
  const handleTabChange = (tplId) => {
    setActivePreviewTab(tplId);
    gsap.fromTo(
      '.preview-canvas-inner',
      { opacity: 0.4, scale: 0.97, y: 8 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  };

  const techBadges = [
    '⚛️ React 19',
    '⚡ Vite Build',
    '🎨 Tailwind CSS',
    '✨ GSAP Animations',
    '🐘 PostgreSQL Database',
    '🚀 Node.js Express',
    '📊 Live ATS Parser',
    '🐳 Docker Ready',
    '💎 Material UI',
    '📄 A4 PDF Export',
    '🔒 JWT Auth & Bcrypt'
  ];

  const templatesList = [
    {
      id: 'modern',
      name: 'Modern Pro',
      tag: '🔥 Most Popular',
      desc: 'Clean headers, color accent dividers, and high keyword density tailored for tech & modern roles.',
      color: 'from-blue-600 to-indigo-600',
      tagBg: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'sidebar',
      name: 'Two-Column Sidebar',
      tag: '⭐ Visual Impact',
      desc: 'Prominent accent sidebar highlighting skills, contact details, and certifications alongside experience.',
      color: 'from-purple-600 to-indigo-600',
      tagBg: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'classic',
      name: 'Classic Executive',
      tag: '💼 Leadership',
      desc: 'Elegant serif typography with centered header, formal structure, and executive polish.',
      color: 'from-slate-700 to-slate-900',
      tagBg: 'bg-slate-100 text-slate-700 border-slate-300'
    },
    {
      id: 'minimal',
      name: 'Tech Minimal',
      tag: '💻 Devs & Hackers',
      desc: 'Code-styled monospace aesthetic with clean syntax accents, GitHub handles, and repo links.',
      color: 'from-emerald-600 to-teal-700',
      tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      id: 'corporate',
      name: 'Corporate Elegant',
      tag: '🏢 Enterprise',
      desc: 'Gradient banner heading with structured sections for high-level management and consulting.',
      color: 'from-cyan-700 to-blue-900',
      tagBg: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Real-Time ATS Optimizer',
      desc: 'Live scoring (0–100%) with actionable tips for metrics, action verbs, and keyword density.'
    },
    {
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      title: '5 Designer Templates',
      desc: 'Switch templates with a single click without losing any input data or custom layout configurations.'
    },
    {
      icon: <Database className="w-6 h-6 text-emerald-500" />,
      title: 'PostgreSQL Cloud Storage',
      desc: 'Auto-saves in real-time to your browser and syncs to a PostgreSQL database with REST API backup.'
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-500" />,
      title: 'Custom Themes & Fonts',
      desc: 'Choose from 6 curated color schemes or custom hex palettes paired with Google Fonts.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: '1-Click Profile Presets',
      desc: 'Instant full-stack dev, data scientist, marketing director, and fresher profiles to jumpstart your resume.'
    },
    {
      icon: <Download className="w-6 h-6 text-cyan-600" />,
      title: 'Pixel-Perfect A4 PDF Export',
      desc: 'Clean, browser print-ready A4 formatting ensuring zero page clipping or layout deformation.'
    }
  ];

  return (
    <div ref={heroRef} className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600/20 selection:text-blue-900 overflow-x-hidden relative">
      
      {/* Top Floating Glass Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-3.5 flex items-center justify-between shadow-sm transition-all">
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer" 
            onClick={handleLaunch}
          >
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-slate-900 tracking-tight">ResumeForge</span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span> PRO
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">Hi, {user.name.split(' ')[0]}</span>
              <Button
                size="small"
                onClick={onLogout}
                sx={{ color: '#64748b', textTransform: 'none', fontSize: '0.75rem', minWidth: 'auto', p: '2px 6px', '&:hover': { color: '#e11d48' } }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="text"
              onClick={onOpenLogin}
              sx={{
                color: '#475569',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                '&:hover': {
                  color: '#0f172a',
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              Sign In
            </Button>
          )}

          <Button
            variant="contained"
            onClick={handleLaunch}
            endIcon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            className="group"
            sx={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.85rem',
              padding: '7px 20px',
              borderRadius: '8px',
              boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.35)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                backgroundColor: '#1d4ed8',
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: '0 8px 20px 0 rgba(37, 99, 235, 0.45)'
              }
            }}
          >
            Open Resume Editor
          </Button>
        </div>
      </header>

      {/* Hero Section with Animated Grid & Parallax Particles */}
      <section 
        className="relative pt-16 pb-24 px-6 overflow-hidden flex flex-col items-center text-center bg-grid-pattern"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated Background Glowing Orbs & Morphing Blobs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[380px] bg-gradient-to-tr from-blue-300/30 via-indigo-200/20 to-purple-200/20 blur-[100px] pointer-events-none -z-10 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] bg-gradient-to-tr from-purple-200/30 via-pink-100/25 to-cyan-100/35 blur-[90px] pointer-events-none -z-10 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-blue-100/40 blur-[120px] pointer-events-none -z-10 rounded-full"></div>

        {/* Ambient Floating Particle Badges */}
        <div className="hidden lg:flex float-elem-1 absolute top-20 left-12 z-0 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-200 text-xs font-bold text-blue-600 shadow-sm pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" /> 100% ATS Guaranteed
        </div>
        <div className="hidden lg:flex float-elem-2 absolute top-40 right-12 z-0 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200 text-xs font-bold text-purple-600 shadow-sm pointer-events-none">
          <Zap className="w-3.5 h-3.5 text-purple-500" /> 0.1s Fast Parser
        </div>
        <div className="hidden xl:flex float-elem-3 absolute bottom-36 left-16 z-0 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200 text-xs font-bold text-emerald-600 shadow-sm pointer-events-none">
          <Database className="w-3.5 h-3.5 text-emerald-500" /> PostgreSQL JSONB Sync
        </div>
        <div className="hidden xl:flex float-elem-4 absolute bottom-44 right-16 z-0 items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-amber-200 text-xs font-bold text-amber-600 shadow-sm pointer-events-none">
          <Star className="w-3.5 h-3.5 text-amber-500" /> Recruiter Approved
        </div>

        {/* Hero Top Pill Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-200 text-xs font-bold text-slate-700 shadow-sm mb-6 hover:shadow-md transition-shadow cursor-default group">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <Sparkles className="w-4 h-4 text-blue-600 group-hover:rotate-45 transition-transform" />
          <span>Next-Gen ATS Resume Builder with Live GSAP Scoring</span>
          <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full">v2.0 PRO</span>
        </div>

        {/* Hero Title with Rotating Animated Roles */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 max-w-5xl leading-[1.12] mb-6">
          Build ATS-Proof Resumes For{' '}
          <span className="inline-block relative">
            <span 
              ref={roleTextRef} 
              className="inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient-text"
            >
              {roles[activeRoleIndex]}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-desc text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
          Craft recruiter-approved resumes with 5 ATS-compliant templates, real-time keyword scoring, PostgreSQL cloud database sync, and instant pixel-perfect PDF downloads.
        </p>

        {/* Action Buttons */}
        <div className="hero-cta-btn flex flex-wrap items-center justify-center gap-4 mb-16 z-10">
          <Button
            variant="contained"
            size="large"
            onClick={handleLaunch}
            endIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />}
            className="group"
            sx={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1.05rem',
              padding: '13px 34px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -3px rgba(37, 99, 235, 0.45)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                backgroundColor: '#1d4ed8',
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 18px 32px -3px rgba(37, 99, 235, 0.55)',
              }
            }}
          >
            Create Your Resume Free
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              const el = document.getElementById('interactive-simulator');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            startIcon={<Sliders className="w-4 h-4 text-blue-600" />}
            sx={{
              borderColor: '#cbd5e1',
              color: '#334155',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '12px 26px',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: '#94a3b8',
                backgroundColor: '#f8fafc',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Live ATS Simulator
          </Button>
        </div>

        {/* Hero Interactive 3D Showcase Mockup */}
        <div ref={cardContainerRef} className="hero-preview-box relative w-full max-w-4xl mx-auto z-10 transition-transform duration-200">
          
          {/* Floating Badges (GSAP Physics Animated) */}
          <div className="floating-badge float-elem-1 hidden md:flex absolute -top-6 -left-6 z-30 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-2xl shadow-xl items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-inner">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live ATS Match</p>
              <p ref={scoreCounterRef} className="text-base font-black text-emerald-600">{simulatedAtsScore}%</p>
            </div>
          </div>

          <div className="floating-badge float-elem-2 hidden md:flex absolute -bottom-6 -right-6 z-30 bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-2.5 rounded-2xl shadow-xl items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-inner">
              <Download className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Print Engine</p>
              <p className="text-xs font-black text-slate-800">Pixel-Perfect A4</p>
            </div>
          </div>

          <div className="floating-badge float-elem-3 hidden lg:flex absolute top-1/2 -right-8 z-30 bg-white/95 backdrop-blur-md border border-slate-200 px-3.5 py-2 rounded-xl shadow-lg items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold text-slate-700">PostgreSQL Auto-Sync</span>
          </div>

          {/* Main Card Container with Interactive Tab Switcher */}
          <div className="glow-border-card rounded-2xl p-2 bg-gradient-to-b from-blue-100 via-indigo-100 to-slate-200 border border-slate-200 shadow-2xl">
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200 p-5 sm:p-7 text-left shadow-sm shimmer-card">
              
              {/* Mock Browser Header with Template Tabs */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400 hover:scale-125 transition-transform cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400 hover:scale-125 transition-transform cursor-pointer"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 hover:scale-125 transition-transform cursor-pointer"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold font-mono hidden sm:inline">ResumeForge Canvas v2</span>
                </div>

                {/* Interactive Template Switcher Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {templatesList.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => handleTabChange(tpl.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all ${
                        activePreviewTab === tpl.id
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tpl.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Match: {simulatedAtsScore}%
                  </span>
                </div>
              </div>

              {/* Dynamic Animated Preview Canvas Mock */}
              <div className="preview-canvas-inner bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                {/* Mock Resume Sheet Header */}
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      {activePreviewTab === 'modern' && 'Ajay Singh'}
                      {activePreviewTab === 'sidebar' && 'Alex Morgan'}
                      {activePreviewTab === 'classic' && 'Jonathan Vance, MBA'}
                      {activePreviewTab === 'minimal' && 'david_chen.rs'}
                      {activePreviewTab === 'corporate' && 'Sarah Jenkins'}
                    </h4>
                    <p className="text-xs font-bold text-blue-600">
                      {activePreviewTab === 'modern' && 'Full-Stack Software Engineer • React, Node.js, PostgreSQL'}
                      {activePreviewTab === 'sidebar' && 'Senior Distributed Systems Architect'}
                      {activePreviewTab === 'classic' && 'Chief Operations Officer & VP Strategy'}
                      {activePreviewTab === 'minimal' && 'Systems & Cloud Infrastructure Engineer'}
                      {activePreviewTab === 'corporate' && 'Managing Director — Enterprise Solutions'}
                    </p>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {activePreviewTab.toUpperCase()}
                  </span>
                </div>

                {/* 3 Real-Time Interactive Mini-Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1 text-blue-600"><Zap className="w-3.5 h-3.5" /> Action Verbs</span>
                      <span className="text-emerald-600 font-extrabold">98%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full w-[98%] animate-pulse"></div>
                    </div>
                    <p className="text-[10px] text-slate-500">Engineered, Spearheaded, Accelerated</p>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 hover:border-purple-300 transition-colors">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1 text-purple-600"><TrendingUp className="w-3.5 h-3.5" /> Metrics & Impact</span>
                      <span className="text-emerald-600 font-extrabold">94%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-emerald-500 h-full w-[94%] animate-pulse"></div>
                    </div>
                    <p className="text-[10px] text-slate-500">+42% throughput, $1.2M cost reduction</p>
                  </div>

                  <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2 hover:border-emerald-300 transition-colors">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1 text-emerald-600"><Database className="w-3.5 h-3.5" /> PostgreSQL Sync</span>
                      <span className="text-emerald-600 font-extrabold">LIVE</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full"></div>
                    </div>
                    <p className="text-[10px] text-slate-500">Auto-saved JSONB state & revision history</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Dual Animated Infinite Scrolling Marquee Banners */}
      <section className="border-y border-slate-200 bg-slate-50 py-3.5 overflow-hidden space-y-2">
        <div className="animate-marquee flex items-center gap-6 text-xs font-bold text-slate-700">
          {techBadges.concat(techBadges).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm whitespace-nowrap hover:scale-105 transition-transform">
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="animate-marquee-reverse flex items-center gap-6 text-xs font-bold text-slate-600">
          {[
            '⭐ 98% ATS Screener Pass Rate',
            '⚡ 0.1s Instant Live PDF Render',
            '💼 Trusted by Fortune 500 Applicants',
            '🎯 5 ATS-Standard Formats',
            '🔒 100% Client-Side Privacy'
          ].concat([
            '⭐ 98% ATS Screener Pass Rate',
            '⚡ 0.1s Instant Live PDF Render',
            '💼 Trusted by Fortune 500 Applicants',
            '🎯 5 ATS-Standard Formats',
            '🔒 100% Client-Side Privacy'
          ]).map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-blue-50/80 text-blue-800 px-3.5 py-1.5 rounded-full border border-blue-200/80 shadow-sm whitespace-nowrap">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive ATS Simulator Lab Section */}
      <section id="interactive-simulator" className="py-20 px-6 max-w-5xl mx-auto w-full">
        <div className="bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[100px] pointer-events-none rounded-full"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Interactive ATS Score Tester
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
                See How Your Resume Scores in Real-Time
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Adjust the keyword density and quantifiable metric slider below to watch the live ATS score analyzer dynamically compute recruiter pass likelihood.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span>Keyword & Metric Density</span>
                  <span className="text-blue-400 font-mono text-sm font-black">{simulatedAtsScore}%</span>
                </div>
                <Slider
                  value={simulatedAtsScore}
                  onChange={handleAtsSliderChange}
                  min={40}
                  max={100}
                  sx={{
                    color: simulatedAtsScore >= 90 ? '#10b981' : simulatedAtsScore >= 75 ? '#3b82f6' : '#f59e0b',
                    height: 8,
                    '& .MuiSlider-thumb': {
                      width: 20,
                      height: 20,
                      backgroundColor: '#ffffff',
                      boxShadow: '0 0 12px rgba(59, 130, 246, 0.8)',
                      '&:hover, &.Mui-focusVisible': {
                        boxShadow: '0 0 0 8px rgba(59, 130, 246, 0.2)'
                      }
                    }
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Action Verbs', 'Measurable Metrics', 'Contact Info', 'Certifications', 'Clean Layout'].map((tag, i) => (
                  <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-slate-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Circular Meter Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-full border-4 border-dashed animate-spin ${simulatedAtsScore >= 90 ? 'border-emerald-400/40' : 'border-blue-400/40'}`} style={{ animationDuration: '20s' }}></div>
                <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center bg-slate-900 border-2 ${simulatedAtsScore >= 90 ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-blue-500 shadow-lg shadow-blue-500/20'}`}>
                  <span className={`text-4xl font-black ${simulatedAtsScore >= 90 ? 'text-emerald-400' : simulatedAtsScore >= 75 ? 'text-blue-400' : 'text-amber-400'}`}>
                    {simulatedAtsScore}%
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                    {simulatedAtsScore >= 90 ? 'EXCELLENT' : simulatedAtsScore >= 75 ? 'GOOD' : 'NEEDS WORK'}
                  </span>
                </div>
              </div>

              <Button
                variant="contained"
                onClick={handleLaunch}
                endIcon={<ArrowRight className="w-4 h-4" />}
                sx={{
                  mt: 3,
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  borderRadius: '10px',
                  padding: '8px 24px',
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Build {simulatedAtsScore}% Resume Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Templates Showcase Section with Hover Cards */}
      <section id="templates-section" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> 5 ATS-Compliant Layouts
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Engineered for Recruiter Screeners & ATS Bots
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Every template is formatted with clean typography, clear section delimiters, and optimal line heights to ensure 100% parsing accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templatesList.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group shimmer-card"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tpl.tagBg}`}>
                    {tpl.tag}
                  </span>
                  <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${tpl.color} shadow-sm group-hover:scale-125 group-hover:rotate-45 transition-all`}></div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{tpl.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tpl.desc}</p>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> ATS Verified
                </span>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    triggerConfetti();
                    onSelectTemplate(tpl.id);
                  }}
                  endIcon={<ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />}
                  sx={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    textTransform: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    '&:hover': {
                      backgroundColor: '#1d4ed8'
                    }
                  }}
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Profiles Quick-Start with Sparkle Animations */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-50 to-blue-50/30 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Start With Pre-Loaded Sample Profiles</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Don't start from scratch! Click any profile below to immediately load real-world data into the editor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                triggerConfetti();
                onSelectProfile('ajay');
              }}
              className="bg-white p-5 rounded-2xl border border-slate-200 text-left hover:border-blue-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-blue-600">Full-Stack Developer</span>
                <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-90 group-hover:scale-125 transition-transform" />
              </div>
              <p className="text-base font-black text-slate-900 group-hover:text-blue-600">Ajay Singh</p>
              <p className="text-[11px] text-slate-500 mt-1">React.js, Node.js, Express, MongoDB, SQL, REST APIs</p>
            </button>

            <button
              onClick={() => {
                triggerConfetti();
                onSelectProfile('dev');
              }}
              className="bg-white p-5 rounded-2xl border border-slate-200 text-left hover:border-purple-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-purple-600">Senior Software Engineer</span>
                <Code2 className="w-4 h-4 text-purple-500 group-hover:rotate-45 group-hover:scale-125 transition-transform" />
              </div>
              <p className="text-base font-black text-slate-900 group-hover:text-purple-600">Alex Morgan</p>
              <p className="text-[11px] text-slate-500 mt-1">Distributed Systems, Cloud Architecture, Next.js, Go</p>
            </button>

            <button
              onClick={() => {
                triggerConfetti();
                onSelectProfile('data');
              }}
              className="bg-white p-5 rounded-2xl border border-slate-200 text-left hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-emerald-600">Lead AI & Data Scientist</span>
                <TrendingUp className="w-4 h-4 text-emerald-500 group-hover:scale-125 group-hover:-translate-y-1 transition-transform" />
              </div>
              <p className="text-base font-black text-slate-900 group-hover:text-emerald-600">Dr. Priya Sharma</p>
              <p className="text-[11px] text-slate-500 mt-1">PyTorch, LLMs, Predictive ML, MLOps, AWS SageMaker</p>
            </button>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Packed with Powerful Builder Tools
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Everything you need to write, score, style, and download your resume in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-sm hover:shadow-xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-inner group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                {f.icon}
              </div>
              <h3 className="text-base font-black text-slate-900">{f.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          <Accordion sx={{ backgroundColor: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px !important', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <AccordionSummary expandIcon={<ChevronRight className="w-4 h-4 text-slate-500" />}>
              <span className="text-sm font-bold">How does the ATS Score Analyzer work?</span>
            </AccordionSummary>
            <AccordionDetails className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              The ATS analyzer reviews your resume across 5 critical dimensions: contact completion, summary quality, measurable metrics in work experience, strong action verbs, and keyword density. It provides real-time tips to maximize your interview conversion rate.
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px !important', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <AccordionSummary expandIcon={<ChevronRight className="w-4 h-4 text-slate-500" />}>
              <span className="text-sm font-bold">Can I save multiple resumes to the PostgreSQL cloud database?</span>
            </AccordionSummary>
            <AccordionDetails className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              Yes! Click the <strong>PostgreSQL Cloud</strong> button in the top toolbar to save, load, and delete resumes. Resumes are stored securely in PostgreSQL using JSONB columns with timestamp indexing.
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ backgroundColor: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px !important', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <AccordionSummary expandIcon={<ChevronRight className="w-4 h-4 text-slate-500" />}>
              <span className="text-sm font-bold">How do I download my resume as a PDF?</span>
            </AccordionSummary>
            <AccordionDetails className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              Simply click the <strong>Export PDF</strong> button in the top navigation bar. It triggers the browser print dialog with pre-configured A4 print rules that hide sidebars and toolbars, generating a clean PDF.
            </AccordionDetails>
          </Accordion>
        </div>
      </section>

      {/* Bottom High Impact Animated CTA Banner */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-blue-50/70 via-indigo-50/40 to-white border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-300/20 blur-[100px] pointer-events-none rounded-full"></div>
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Ready to Build Your Winning Resume?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of candidates who bypassed ATS screening filters and landed job interviews.
          </p>
          <Button
            variant="contained"
            size="large"
            onClick={handleLaunch}
            endIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />}
            className="group"
            sx={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1.1rem',
              padding: '14px 36px',
              borderRadius: '12px',
              boxShadow: '0 12px 28px -3px rgba(37, 99, 235, 0.45)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              '&:hover': {
                backgroundColor: '#1d4ed8',
                transform: 'translateY(-3px) scale(1.03)',
                boxShadow: '0 18px 36px -3px rgba(37, 99, 235, 0.55)',
              }
            }}
          >
            Launch Resume Editor Now
          </Button>
        </div>
      </section>

      {/* Live Recent Activity Toast (Floating Animated Bottom-Left Notification) */}
      <div className="fixed bottom-5 left-5 z-40 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200/80 p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-inner">
          <Activity className="w-4 h-4 animate-pulse" />
        </div>
        <div className="text-left text-xs pr-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-800">{recentActivity.name}</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700">{recentActivity.score} ATS</span>
          </div>
          <p className="text-[11px] text-slate-500">{recentActivity.role} • {recentActivity.template}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 ResumeForge PRO • Built with React, Tailwind CSS, Material UI, GSAP, Node.js & PostgreSQL.</p>
      </footer>
    </div>
  );
}
