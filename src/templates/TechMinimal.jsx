import React from 'react';

export default function TechMinimal({ resumeData, theme }) {
  const { personalInfo = {}, experience = [], education = [], projects = [], certifications = [] } = resumeData;
  const accent = theme.accentColor || '#059669';

  return (
    <div className={`p-8 font-mono ${theme.fontFamily || 'font-mono'} text-slate-900 leading-normal`}>
      {/* Code style header */}
      <header className="border-b pb-4 mb-5 border-slate-300">
        <div className="flex justify-between items-baseline">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {`<${personalInfo.fullName || 'Developer'} />`}
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded text-white" style={{ background: accent }}>
            {personalInfo.jobTitle || 'Software Engineer'}
          </span>
        </div>
        
        {/* Contact info bar */}
        <div className="flex flex-wrap gap-3 text-[11px] text-slate-600 mt-2 font-mono">
          {personalInfo.email && <span>email: {personalInfo.email}</span>}
          {personalInfo.phone && <span>tel: {personalInfo.phone}</span>}
          {personalInfo.location && <span>loc: {personalInfo.location}</span>}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
              gh: {personalInfo.github.replace('https://github.com/', '')}
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
              in: {personalInfo.linkedin.replace('https://linkedin.com/in/', '')}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            // About & Core Philosophy
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Stack & Skills */}
      {resumeData.skills && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            // Tech Stack & Tooling
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {resumeData.skills.split(/[,|\n]/).map((skill, idx) => {
              const s = skill.trim();
              if (!s) return null;
              return (
                <span key={idx} className="bg-slate-100 text-slate-800 text-[11px] px-2 py-0.5 rounded border border-slate-300 font-mono">
                  {s}
                </span>
              );
            })}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            // Work History
          </h2>
          <div className="space-y-3">
            {experience.map((item, idx) => (
              <div key={idx} className="border-l-2 pl-3 border-emerald-500/50">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">{item.position} @ {item.company}</h3>
                  <span className="text-[10px] text-slate-500">{item.period}</span>
                </div>
                {item.description && (
                  <p className="text-xs text-slate-700 whitespace-pre-line mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            // Projects & Code
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 rounded border border-slate-200">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900">{proj.title}</span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-600 hover:underline">
                      view repo ↗
                    </a>
                  )}
                </div>
                {proj.tech && <p className="text-[10px] text-slate-500">stack: {proj.tech}</p>}
                {proj.description && <p className="text-xs text-slate-700 mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        {education.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase text-slate-500 mb-1">// Education</h3>
            {education.map((edu, idx) => (
              <div key={idx} className="text-xs text-slate-800">
                <p className="font-bold">{edu.degree}</p>
                <p className="text-[11px] text-slate-600">{edu.school} ({edu.year})</p>
              </div>
            ))}
          </div>
        )}
        {certifications.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold uppercase text-slate-500 mb-1">// Certs</h3>
            {certifications.map((c, idx) => (
              <div key={idx} className="text-xs text-slate-800">
                <p className="font-semibold">{c.name}</p>
                <p className="text-[10px] text-slate-500">{c.issuer} {c.year ? `(${c.year})` : ''}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
