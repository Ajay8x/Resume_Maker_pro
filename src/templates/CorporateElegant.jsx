import React from 'react';

export default function CorporateElegant({ resumeData, theme }) {
  const { personalInfo = {}, experience = [], education = [], projects = [], certifications = [], achievements = [] } = resumeData;
  const accent = theme.accentColor || '#334155';

  return (
    <div className={`p-8 font-sans ${theme.fontFamily || 'font-jakarta'} text-slate-800 leading-normal`}>
      {/* Banner Style Header */}
      <header className="p-6 rounded-lg mb-6 text-white shadow-sm flex justify-between items-center" style={{ background: `linear-gradient(135deg, ${accent}, #0f172a)` }}>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {personalInfo.fullName || 'Executive Candidate'}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-sm font-medium text-slate-200 mt-0.5 tracking-wide">{personalInfo.jobTitle}</p>
          )}
        </div>
        <div className="text-right text-[11px] space-y-1 text-slate-200">
          {personalInfo.email && <p>📧 {personalInfo.email}</p>}
          {personalInfo.phone && <p>📱 {personalInfo.phone}</p>}
          {personalInfo.location && <p>📍 {personalInfo.location}</p>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5 bg-slate-50 p-4 rounded-md border-l-4" style={{ borderColor: accent }}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Professional Overview
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1 mb-3 flex items-center gap-2" style={{ borderColor: accent }}>
            <span>💼</span> Career Trajectory
          </h2>
          <div className="space-y-3.5">
            {experience.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900">{item.position} — <span className="font-semibold text-slate-700">{item.company}</span></span>
                  <span className="text-[11px] text-slate-500 font-medium">{item.period}</span>
                </div>
                {item.description && (
                  <p className="text-xs text-slate-700 whitespace-pre-line mt-1 leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Competencies */}
      {resumeData.skills && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1 mb-2 flex items-center gap-2" style={{ borderColor: accent }}>
            <span>🛠️</span> Key Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {resumeData.skills.split(/[,|\n]/).map((skill, idx) => {
              const s = skill.trim();
              if (!s) return null;
              return (
                <span key={idx} className="bg-slate-100 text-slate-800 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-slate-200">
                  {s}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1 mb-2.5 flex items-center gap-2" style={{ borderColor: accent }}>
            <span>🚀</span> Key Projects & Deliverables
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={idx} className="border border-slate-200 p-2.5 rounded">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                  {proj.tech && <span className="text-[10px] font-medium text-slate-500">{proj.tech}</span>}
                </div>
                {proj.description && <p className="text-xs text-slate-700 mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b-2 pb-1 mb-2 flex items-center gap-2" style={{ borderColor: accent }}>
            <span>🎓</span> Education & Qualifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {education.map((edu, idx) => (
              <div key={idx} className="text-xs text-slate-800">
                <p className="font-bold text-slate-900">{edu.degree}</p>
                <p className="text-[11px] text-slate-600">{edu.school} • {edu.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
