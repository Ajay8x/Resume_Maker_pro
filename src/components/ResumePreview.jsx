import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import ModernPro from '../templates/ModernPro';
import SidebarTemplate from '../templates/SidebarTemplate';
import ClassicExecutive from '../templates/ClassicExecutive';
import TechMinimal from '../templates/TechMinimal';
import CorporateElegant from '../templates/CorporateElegant';

export default function ResumePreview({ resumeData, theme, zoom, setZoom }) {
  const previewRef = useRef(null);

  // Smooth transition on template switch using GSAP
  useEffect(() => {
    if (previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        { opacity: 0.7, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [theme.template, theme.accentColor]);

  const renderTemplate = () => {
    switch (theme.template) {
      case 'sidebar':
        return <SidebarTemplate resumeData={resumeData} theme={theme} />;
      case 'classic':
        return <ClassicExecutive resumeData={resumeData} theme={theme} />;
      case 'minimal':
        return <TechMinimal resumeData={resumeData} theme={theme} />;
      case 'corporate':
        return <CorporateElegant resumeData={resumeData} theme={theme} />;
      case 'modern':
      default:
        return <ModernPro resumeData={resumeData} theme={theme} />;
    }
  };

  const handleFitScreen = () => {
    setZoom(0.85);
  };

  return (
    <div className="preview-container relative flex-1 bg-slate-100/80 p-6 flex flex-col items-center overflow-auto min-h-[calc(100vh-65px)]">
      {/* Floating Toolbar */}
      <div className="no-print sticky top-3 z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-full px-4 py-1.5 flex items-center gap-3 shadow-md mb-6">
        <span className="text-xs font-semibold text-slate-700">
          Zoom: {Math.round(zoom * 100)}%
        </span>

        <div className="h-3.5 w-px bg-slate-200"></div>

        <button
          onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
          className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-100 transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={() => setZoom(1.0)}
          className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-100 transition"
          title="Reset to 100%"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
          className="text-slate-600 hover:text-slate-900 p-1 rounded hover:bg-slate-100 transition"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="h-3.5 w-px bg-slate-200"></div>

        <button
          onClick={handleFitScreen}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-0.5 rounded transition font-medium"
          title="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Fit Screen</span>
        </button>
      </div>

      {/* A4 Sheet Container */}
      <div
        ref={previewRef}
        className="resume-sheet rounded-sm transition-transform duration-200"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  );
}
