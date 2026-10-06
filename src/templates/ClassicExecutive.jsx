import React from 'react';

export default function ClassicExecutive({ resumeData, theme }) {
  const { personalInfo = {}, experience = [], education = [], projects = [], certifications = [], achievements = [] } = resumeData;
  const accent = theme.accentColor || '#1e3a8a';

  return (
    <div className={`p-10 font-serif ${theme.fontFamily || 'font-merriweather'} text-slate-900 leading-relaxed`}>
      {/* Centered Classic Header */}
      <header className="text-center pb-4 mb-6 border-b-2" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-bold tracking-wide uppercase text-slate-900">
          {personalInfo.fullName || 'Your Full Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm font-semibold tracking-widest uppercase text-slate-600 mt-1 italic">
            {personalInfo.jobTitle}
          </p>
        )}
        
        {/* Centered contact info */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-slate-600 mt-3 font-sans">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.linkedin && (
            <span>• <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-blue-700">LinkedIn</a></span>
          )}
          {personalInfo.github && (
            <span>• <a href={personalInfo.github} target="_blank" rel="noreferrer" className="underline hover:text-blue-700">GitHub</a></span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 font-sans border-b pb-0.5" style={{ color: accent, borderColor: `${accent}30` }}>
            Executive Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {resumeData.skills && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 font-sans border-b pb-0.5" style={{ color: accent, borderColor: `${accent}30` }}>
            Core Competencies & Expertise
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed font-sans">{resumeData.skills}</p>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2.5 font-sans border-b pb-0.5" style={{ color: accent, borderColor: `${accent}30` }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline font-sans">
                  <span className="text-xs font-bold text-slate-900">{item.company}</span>
                  <span className="text-[11px] text-slate-600 italic">{item.period || item.year}</span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-semibold italic text-slate-700">{item.position || item.title}</span>
                  {item.location && <span className="text-[11px] text-slate-500 font-sans">{item.location}</span>}
                </div>
                {item.description && (
                  <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans text-justify">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 font-sans border-b pb-0.5" style={{ color: accent, borderColor: `${accent}30` }}>
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start font-sans">
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-[11px] text-slate-700 italic">{edu.school}</p>
                </div>
                <span className="text-[11px] text-slate-600 font-sans">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2 font-sans border-b pb-0.5" style={{ color: accent, borderColor: `${accent}30` }}>
            Key Projects & Initiatives
          </h2>
          <div className="space-y-2.5">
            {projects.map((p, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-sans">
                  <span className="text-xs font-bold text-slate-900">{p.title}</span>
                  {p.tech && <span className="text-[10px] text-slate-500 italic">{p.tech}</span>}
                </div>
                {p.description && <p className="text-xs text-slate-800 font-sans mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
