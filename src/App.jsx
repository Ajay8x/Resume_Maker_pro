import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from './components/Header';
import EditorSidebar from './components/EditorSidebar';
import ResumePreview from './components/ResumePreview';
import DatabaseModal from './components/DatabaseModal';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import { sampleProfiles } from './data/sampleProfiles';

export default function App() {
  // Navigation View: 'home' | 'editor' | 'login'
  const [currentView, setCurrentView] = useState('home');

  // Logged In User State
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('resumeforge_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {}
    }
    return null;
  });

  // Resume Content State (initialized with Ajay's sample profile or localStorage)
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeforge_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local storage resume:', e);
      }
    }
    const defaultProfile = sampleProfiles.ajay;
    return {
      personalInfo: {
        fullName: defaultProfile.name,
        jobTitle: defaultProfile.role,
        email: defaultProfile.email,
        phone: defaultProfile.phone,
        location: defaultProfile.location,
        linkedin: defaultProfile.linkedin,
        github: defaultProfile.github,
        portfolio: defaultProfile.website,
        summary: defaultProfile.summary,
      },
      skills: defaultProfile.skills,
      languages: defaultProfile.languages,
      hobbies: defaultProfile.hobbies,
      experience: defaultProfile.experience || [],
      projects: defaultProfile.projects || [],
      education: defaultProfile.education || [],
      certifications: defaultProfile.certifications || [],
      internships: defaultProfile.internships || [],
      achievements: defaultProfile.achievements || [],
    };
  });

  // App & Theme Customizer State
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('resumeforge_theme');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      template: 'modern',
      accentColor: '#2563eb',
      fontFamily: 'font-sans',
    };
  });

  const [zoom, setZoom] = useState(0.85);
  const [dbModalOpen, setDbModalOpen] = useState(false);
  const appRef = useRef(null);

  // Auto-save to LocalStorage
  useEffect(() => {
    localStorage.setItem('resumeforge_data', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('resumeforge_theme', JSON.stringify(state));
  }, [state]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    localStorage.removeItem('resumeforge_token');
    localStorage.removeItem('resumeforge_user');
    setUser(null);
  };

  // Handle template selection from Home Page
  const handleSelectTemplate = (templateId) => {
    setState(prev => ({ ...prev, template: templateId }));
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle sample profile selection from Home Page
  const handleSelectProfile = (profileKey) => {
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
    setCurrentView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div ref={appRef} className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600/20 selection:text-blue-900">
      {currentView === 'home' && (
        <HomePage
          user={user}
          onOpenLogin={() => {
            setCurrentView('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onLogout={handleLogout}
          onStartBuilding={() => {
            setCurrentView('editor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectTemplate={handleSelectTemplate}
          onSelectProfile={handleSelectProfile}
        />
      )}

      {currentView === 'login' && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onContinueAsGuest={() => {
            setCurrentView('editor');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {currentView === 'editor' && (
        <>
          {/* Top Header Controls */}
          <Header
            state={state}
            setState={setState}
            resumeData={resumeData}
            setResumeData={setResumeData}
            onOpenDBModal={() => setDbModalOpen(true)}
            onPrint={handlePrint}
            user={user}
            onOpenLogin={() => {
              setCurrentView('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLogout={handleLogout}
            onNavigateHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Main Workspace: Sidebar Editor (Left) + Live Resume Canvas (Right) */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <EditorSidebar
              resumeData={resumeData}
              setResumeData={setResumeData}
            />
            <ResumePreview
              resumeData={resumeData}
              theme={state}
              zoom={zoom}
              setZoom={setZoom}
            />
          </div>

          {/* PostgreSQL Cloud Modal */}
          <DatabaseModal
            open={dbModalOpen}
            onClose={() => setDbModalOpen(false)}
            resumeData={resumeData}
            setResumeData={setResumeData}
          />
        </>
      )}
    </div>
  );
}
