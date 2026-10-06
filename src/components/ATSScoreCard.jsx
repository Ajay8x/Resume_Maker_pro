import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import { calculateATSScore } from '../utils/atsCalculator';

export default function ATSScoreCard({ resumeData }) {
  const analysis = calculateATSScore(resumeData);
  const scoreRef = useRef(null);
  const prevScoreRef = useRef(0);

  useEffect(() => {
    if (scoreRef.current) {
      const obj = { val: prevScoreRef.current };
      gsap.to(obj, {
        val: analysis.score,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate: () => {
          if (scoreRef.current) {
            scoreRef.current.textContent = Math.round(obj.val);
          }
        },
      });
      
      // Trigger confetti celebration on achieving 90+ score
      if (analysis.score >= 90 && prevScoreRef.current < 90) {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
      prevScoreRef.current = analysis.score;
    }
  }, [analysis.score]);

  const getScoreColor = (score) => {
    if (score >= 85) return { text: 'text-emerald-600', stroke: '#10b981', tag: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (score >= 65) return { text: 'text-amber-600', stroke: '#f59e0b', tag: 'bg-amber-50 text-amber-700 border-amber-200' };
    return { text: 'text-rose-600', stroke: '#f43f5e', tag: 'bg-rose-50 text-rose-700 border-rose-200' };
  };

  const themeColors = getScoreColor(analysis.score);
  const circumference = 2 * Math.PI * 34; // r=34
  const strokeDashoffset = circumference - (analysis.score / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            ATS Score Optimizer
          </h3>
        </div>
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${themeColors.tag}`}>
          {analysis.status}
        </span>
      </div>

      {/* Circular Progress & Score */}
      <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3">
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <svg className="w-20 h-20 -rotate-90 transform" viewBox="0 0 80 80">
            {/* Background track */}
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="#e2e8f0"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Animated stroke */}
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke={themeColors.stroke}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.8s ease-out, stroke 0.5s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span ref={scoreRef} className={`text-xl font-black ${themeColors.text}`}>
              {analysis.score}
            </span>
            <span className="text-[9px] text-slate-400 font-bold -mt-1">/100</span>
          </div>
        </div>

        <div className="flex-1 text-xs">
          <p className="font-semibold text-slate-800 mb-1">Live Recruiter Matching</p>
          <p className="text-[11px] text-slate-500 leading-snug">
            {analysis.score >= 85
              ? 'Great work! Your resume passes standard ATS parsers with high keyword coverage.'
              : 'Add metrics, keywords, and action verbs to maximize your interview chances.'}
          </p>
        </div>
      </div>

      {/* Actionable Feedback Highlights */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
        {/* Strengths */}
        {analysis.strengths.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-100">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-emerald-600" />
            <span className="text-[11px]">{item}</span>
          </div>
        ))}

        {/* Suggestions */}
        {analysis.suggestions.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-amber-700 bg-amber-50 p-2 rounded border border-amber-100">
            <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
            <span className="text-[11px]">{item}</span>
          </div>
        ))}

        {/* Issues */}
        {analysis.issues.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-rose-700 bg-rose-50 p-2 rounded border border-rose-100">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-rose-600" />
            <span className="text-[11px]">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
