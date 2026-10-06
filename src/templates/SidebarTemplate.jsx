import React from 'react';

export default function SidebarTemplate({ resumeData, theme }) {
  const { personalInfo = {}, experience = [], education = [], projects = [], certifications = [], achievements = [] } = resumeData;
  const accent = theme.accentColor || '#2563eb';

  return (
    <div className={`flex min-h-[297mm] font-sans ${theme.fontFamily} text-slate-800`}>
      {/* Left Sidebar */}
      <aside className="w-[32%] p-6 text-white flex flex-col justify-between" style={{ backgroundColor: accent }}>
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-black tracking-tight leading-tight mb-1">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs font-medium uppercase tracking-wider text-white/80">{personalInfo.jobTitle}</p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs mb-8 text-white/90">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/70 border-b border-white/20 pb-1 mb-2">
              Contact
            </h2>
            {personalInfo.email && <div className="break-all">📧 {personalInfo.email}</div>}
            {personalInfo.phone && <div>📱 {personalInfo.phone}</div>}
            {personalInfo.location && <div>📍 {personalInfo.location}</div>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="block underline text-white/90 truncate">
                🔗 LinkedIn Profile
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="block underline text-white/90 truncate">
                💻 GitHub Profile
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="block underline text-white/90 truncate">
                🌐 Portfolio Website
              </a>
            )}
          </div>

          {/* Skills in Sidebar */}
          {resumeData.skills && (
            <div className="mb-8">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/70 border-b border-white/20 pb-1 mb-2">
                Core Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {resumeData.skills.split(/[,|\n]/).map((skill, idx) => {
                  const s = skill.trim();
                  if (!s) return null;
                  return (
                    <span key={idx} className="bg-white/15 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Languages */}
          {resumeData.languages && (
            <div className="mb-6">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/70 border-b border-white/20 pb-1 mb-2">
                Languages
              </h2>
              <p className="text-xs text-white/90 leading-relaxed">{resumeData.languages}</p>
            </div>
          )}
        </div>

        {/* Education in Sidebar */}
        {education.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-2">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2 text-xs text-white/90">
                <p className="font-bold">{edu.degree}</p>
                <p className="text-[11px] text-white/80">{edu.school}</p>
                <p className="text-[10px] text-white/60">{edu.year}</p>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="w-[68%] p-8 bg-white flex flex-col justify-between">
        <div>
          {/* Summary */}
          {personalInfo.summary && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Executive Profile
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{item.position || item.title}</h3>
                      <span className="text-[11px] text-slate-500">{item.period || item.year}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-600 mb-1">{item.company} {item.location ? `• ${item.location}` : ''}</p>
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
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">
                Selected Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-[11px] font-medium text-blue-600 hover:underline">
                          Link ↗
                        </a>
                      )}
                    </div>
                    {proj.tech && <p className="text-[11px] font-semibold text-slate-600 mb-0.5">Stack: {proj.tech}</p>}
                    {proj.description && (
                      <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">{proj.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Certifications & Achievements */}
        {(certifications.length > 0 || achievements.length > 0) && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
            {certifications.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Certifications</h3>
                <ul className="space-y-1 text-xs text-slate-700">
                  {certifications.map((c, i) => (
                    <li key={i}><span className="font-semibold">{c.name}</span> <span className="text-[10px] text-slate-500">({c.issuer})</span></li>
                  ))}
                </ul>
              </div>
            )}
            {achievements.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Honors & Awards</h3>
                <ul className="space-y-1 text-xs text-slate-700">
                  {achievements.map((a, i) => (
                    <li key={i}><span className="font-semibold">{a.title}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
