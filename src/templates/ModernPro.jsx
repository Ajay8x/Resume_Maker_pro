import React from 'react';

export default function ModernPro({ resumeData, theme }) {
  const { personalInfo = {}, experience = [], education = [], projects = [], certifications = [], internships = [], achievements = [] } = resumeData;
  const accent = theme.accentColor || '#2563eb';

  return (
    <div className={`p-8 font-sans ${theme.fontFamily} text-slate-800 leading-relaxed`}>
      {/* Header */}
      <header className="border-b-2 pb-5 mb-6" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900" style={{ color: accent }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-lg font-semibold text-slate-700 mt-1">{personalInfo.jobTitle}</p>
        )}
        
        {/* Contact info row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-3">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              🔗 LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              💻 GitHub
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              🌐 Portfolio
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: accent }}></span>
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-normal">{personalInfo.summary}</p>
        </section>
      )}

      {/* Technical Skills */}
      {resumeData.skills && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: accent }}></span>
            Technical Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {resumeData.skills.split(/[,|\n]/).map((skill, idx) => {
              const s = skill.trim();
              if (!s) return null;
              return (
                <span key={idx} className="bg-slate-100 text-slate-800 text-[11px] font-medium px-2.5 py-0.5 rounded border border-slate-200">
                  {s}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: accent }}></span>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((item, idx) => (
              <div key={idx} className="border-l-2 pl-3" style={{ borderColor: `${accent}40` }}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">{item.position || item.title}</h3>
                  <span className="text-[11px] font-medium text-slate-500">{item.period || item.year}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-600 font-semibold mb-1">
                  <span>{item.company}</span>
                  {item.location && <span>{item.location}</span>}
                </div>
                {item.description && (
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: accent }}></span>
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-100">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] font-medium text-blue-600 hover:underline">
                      Live Project ↗
                    </a>
                  )}
                </div>
                {proj.tech && (
                  <p className="text-[11px] font-semibold text-slate-600 mb-1">Tech Stack: {proj.tech}</p>
                )}
                {proj.description && (
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accent }}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: accent }}></span>
            Education
          </h2>
          <div className="space-y-2.5">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-[11px] text-slate-600 font-medium">{edu.school}</p>
                  {edu.description && <p className="text-[11px] text-slate-500 mt-0.5">{edu.description}</p>}
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-medium text-slate-500">{edu.year}</span>
                  {edu.location && <p className="text-[11px] text-slate-400">{edu.location}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements in two columns */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <div className="grid grid-cols-2 gap-4">
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
                Certifications
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {certifications.map((c, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-semibold">{c.name}</span>
                    <span className="text-[10px] text-slate-500">{c.issuer} {c.year ? `• ${c.year}` : ''}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {achievements.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
                Key Achievements
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {achievements.map((a, i) => (
                  <li key={i} className="flex flex-col">
                    <span className="font-semibold">{a.title}</span>
                    {a.description && <span className="text-[11px] text-slate-600">{a.description}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
