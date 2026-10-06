import React, { useState } from 'react';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  TextField, 
  Button, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import { 
  User, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  Award, 
  Wrench, 
  Globe, 
  Plus, 
  Trash2, 
  ChevronDown,
  FileSpreadsheet
} from 'lucide-react';
import ATSScoreCard from './ATSScoreCard';

export default function EditorSidebar({ resumeData, setResumeData }) {
  const [expanded, setExpanded] = useState('personal');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePersonalChange = (field, val) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: val
      }
    }));
  };

  // Generic List item updater
  const updateListItem = (listName, index, field, value) => {
    setResumeData(prev => {
      const list = [...(prev[listName] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listName]: list };
    });
  };

  // Add Item
  const addItem = (listName, defaultObj) => {
    setResumeData(prev => ({
      ...prev,
      [listName]: [...(prev[listName] || []), defaultObj]
    }));
  };

  // Remove Item
  const removeItem = (listName, index) => {
    setResumeData(prev => {
      const list = [...(prev[listName] || [])];
      list.splice(index, 1);
      return { ...prev, [listName]: list };
    });
  };

  const { personalInfo = {}, experience = [], education = [], projects = [], certifications = [], achievements = [] } = resumeData;

  const accordionStyle = {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    borderRadius: '8px !important',
    marginBottom: '8px',
    '&:before': { display: 'none' },
    '&.Mui-expanded': { margin: '0 0 8px 0' }
  };

  const inputProps = {
    size: 'small',
    fullWidth: true,
    variant: 'outlined',
    sx: {
      '& .MuiOutlinedInput-root': {
        color: '#0f172a',
        backgroundColor: '#ffffff',
        fontSize: '0.82rem',
        borderRadius: '6px',
        '& fieldset': { borderColor: '#cbd5e1' },
        '&:hover fieldset': { borderColor: '#94a3b8' },
        '&.Mui-focused fieldset': { borderColor: '#2563eb' }
      },
      '& .MuiInputLabel-root': { color: '#64748b', fontSize: '0.8rem' },
      '& .MuiInputLabel-root.Mui-focused': { color: '#2563eb' }
    }
  };

  return (
    <aside className="no-print w-full lg:w-[460px] bg-slate-50/90 border-r border-slate-200 flex flex-col h-[calc(100vh-65px)] overflow-y-auto p-4 space-y-4">
      {/* Real-time ATS Scorecard at Top */}
      <ATSScoreCard resumeData={resumeData} />

      {/* Accordions */}
      <div>
        {/* 1. Personal Information */}
        <Accordion expanded={expanded === 'personal'} onChange={handleChange('personal')} sx={accordionStyle}>
          <AccordionSummary expandIcon={<ChevronDown className="w-4 h-4 text-slate-400" />}>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <User className="w-4 h-4 text-blue-400" />
              <span>Personal Information</span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="space-y-3 pt-0">
            <TextField
              label="Full Name"
              value={personalInfo.fullName || ''}
              onChange={(e) => handlePersonalChange('fullName', e.target.value)}
              {...inputProps}
            />
            <TextField
              label="Job / Target Role Title"
              value={personalInfo.jobTitle || ''}
              onChange={(e) => handlePersonalChange('jobTitle', e.target.value)}
              {...inputProps}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="Email Address"
                value={personalInfo.email || ''}
                onChange={(e) => handlePersonalChange('email', e.target.value)}
                {...inputProps}
              />
              <TextField
                label="Phone Number"
                value={personalInfo.phone || ''}
                onChange={(e) => handlePersonalChange('phone', e.target.value)}
                {...inputProps}
              />
            </div>
            <TextField
              label="Location (City, State / Country)"
              value={personalInfo.location || ''}
              onChange={(e) => handlePersonalChange('location', e.target.value)}
              {...inputProps}
            />
            <div className="grid grid-cols-2 gap-2">
              <TextField
                label="LinkedIn Profile"
                value={personalInfo.linkedin || ''}
                onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                {...inputProps}
              />
              <TextField
                label="GitHub Profile"
                value={personalInfo.github || ''}
                onChange={(e) => handlePersonalChange('github', e.target.value)}
                {...inputProps}
              />
            </div>
            <TextField
              label="Professional Summary"
              multiline
              rows={3}
              value={personalInfo.summary || ''}
              onChange={(e) => handlePersonalChange('summary', e.target.value)}
              placeholder="3-4 sentences highlighting your experience, expertise, and quantifiable value..."
              {...inputProps}
            />
          </AccordionDetails>
        </Accordion>

        {/* 2. Skills */}
        <Accordion expanded={expanded === 'skills'} onChange={handleChange('skills')} sx={accordionStyle}>
          <AccordionSummary expandIcon={<ChevronDown className="w-4 h-4 text-slate-400" />}>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>Skills & Technologies</span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="space-y-3 pt-0">
            <TextField
              label="Skills (Comma-separated)"
              multiline
              rows={3}
              value={resumeData.skills || ''}
              onChange={(e) => setResumeData(prev => ({ ...prev, skills: e.target.value }))}
              placeholder="React.js, Node.js, TypeScript, PostgreSQL, Docker, AWS, Git..."
              {...inputProps}
            />
          </AccordionDetails>
        </Accordion>

        {/* 3. Work Experience */}
        <Accordion expanded={expanded === 'experience'} onChange={handleChange('experience')} sx={accordionStyle}>
          <AccordionSummary expandIcon={<ChevronDown className="w-4 h-4 text-slate-400" />}>
            <div className="flex items-center justify-between w-full pr-2 text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Work Experience</span>
              </div>
              <span className="text-xs text-slate-400">({experience.length})</span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="space-y-4 pt-0">
            {experience.map((exp, idx) => (
              <div key={idx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Role #{idx + 1}</span>
                  <IconButton size="small" onClick={() => removeItem('experience', idx)} sx={{ color: '#f43f5e' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </IconButton>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    label="Position / Title"
                    value={exp.position || ''}
                    onChange={(e) => updateListItem('experience', idx, 'position', e.target.value)}
                    {...inputProps}
                  />
                  <TextField
                    label="Company Name"
                    value={exp.company || ''}
                    onChange={(e) => updateListItem('experience', idx, 'company', e.target.value)}
                    {...inputProps}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    label="Time Period"
                    value={exp.period || ''}
                    onChange={(e) => updateListItem('experience', idx, 'period', e.target.value)}
                    placeholder="e.g. 2022 - Present"
                    {...inputProps}
                  />
                  <TextField
                    label="Location"
                    value={exp.location || ''}
                    onChange={(e) => updateListItem('experience', idx, 'location', e.target.value)}
                    {...inputProps}
                  />
                </div>
                <TextField
                  label="Key Achievements & Responsibilities"
                  multiline
                  rows={3}
                  value={exp.description || ''}
                  onChange={(e) => updateListItem('experience', idx, 'description', e.target.value)}
                  placeholder="• Spearheaded development of...&#10;• Boosted system performance by 35%..."
                  {...inputProps}
                />
              </div>
            ))}
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => addItem('experience', { position: '', company: '', period: '', location: '', description: '' })}
              startIcon={<Plus className="w-4 h-4" />}
              sx={{ borderColor: '#334155', color: '#94a3b8', textTransform: 'none', '&:hover': { borderColor: '#64748b' } }}
            >
              Add Work Experience
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* 4. Projects */}
        <Accordion expanded={expanded === 'projects'} onChange={handleChange('projects')} sx={accordionStyle}>
          <AccordionSummary expandIcon={<ChevronDown className="w-4 h-4 text-slate-400" />}>
            <div className="flex items-center justify-between w-full pr-2 text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-400" />
                <span>Projects</span>
              </div>
              <span className="text-xs text-slate-400">({projects.length})</span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="space-y-4 pt-0">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Project #{idx + 1}</span>
                  <IconButton size="small" onClick={() => removeItem('projects', idx)} sx={{ color: '#f43f5e' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </IconButton>
                </div>
                <TextField
                  label="Project Title"
                  value={proj.title || ''}
                  onChange={(e) => updateListItem('projects', idx, 'title', e.target.value)}
                  {...inputProps}
                />
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    label="Technologies Used"
                    value={proj.tech || ''}
                    onChange={(e) => updateListItem('projects', idx, 'tech', e.target.value)}
                    placeholder="React, Node, MongoDB..."
                    {...inputProps}
                  />
                  <TextField
                    label="Project / GitHub Link"
                    value={proj.link || ''}
                    onChange={(e) => updateListItem('projects', idx, 'link', e.target.value)}
                    {...inputProps}
                  />
                </div>
                <TextField
                  label="Description & Highlights"
                  multiline
                  rows={2}
                  value={proj.description || ''}
                  onChange={(e) => updateListItem('projects', idx, 'description', e.target.value)}
                  {...inputProps}
                />
              </div>
            ))}
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => addItem('projects', { title: '', tech: '', link: '', description: '' })}
              startIcon={<Plus className="w-4 h-4" />}
              sx={{ borderColor: '#334155', color: '#94a3b8', textTransform: 'none', '&:hover': { borderColor: '#64748b' } }}
            >
              Add Project
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* 5. Education */}
        <Accordion expanded={expanded === 'education'} onChange={handleChange('education')} sx={accordionStyle}>
          <AccordionSummary expandIcon={<ChevronDown className="w-4 h-4 text-slate-400" />}>
            <div className="flex items-center justify-between w-full pr-2 text-sm font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-400" />
                <span>Education</span>
              </div>
              <span className="text-xs text-slate-400">({education.length})</span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="space-y-4 pt-0">
            {education.map((edu, idx) => (
              <div key={idx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Degree #{idx + 1}</span>
                  <IconButton size="small" onClick={() => removeItem('education', idx)} sx={{ color: '#f43f5e' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </IconButton>
                </div>
                <TextField
                  label="Degree & Major"
                  value={edu.degree || ''}
                  onChange={(e) => updateListItem('education', idx, 'degree', e.target.value)}
                  {...inputProps}
                />
                <TextField
                  label="Institution / University"
                  value={edu.school || ''}
                  onChange={(e) => updateListItem('education', idx, 'school', e.target.value)}
                  {...inputProps}
                />
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    label="Graduation Year / Period"
                    value={edu.year || ''}
                    onChange={(e) => updateListItem('education', idx, 'year', e.target.value)}
                    {...inputProps}
                  />
                  <TextField
                    label="Location"
                    value={edu.location || ''}
                    onChange={(e) => updateListItem('education', idx, 'location', e.target.value)}
                    {...inputProps}
                  />
                </div>
              </div>
            ))}
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => addItem('education', { degree: '', school: '', year: '', location: '' })}
              startIcon={<Plus className="w-4 h-4" />}
              sx={{ borderColor: '#334155', color: '#94a3b8', textTransform: 'none', '&:hover': { borderColor: '#64748b' } }}
            >
              Add Education
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* 6. Certifications */}
        <Accordion expanded={expanded === 'certifications'} onChange={handleChange('certifications')} sx={accordionStyle}>
          <AccordionSummary expandIcon={<ChevronDown className="w-4 h-4 text-slate-400" />}>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
              <Award className="w-4 h-4 text-pink-400" />
              <span>Certifications</span>
            </div>
          </AccordionSummary>
          <AccordionDetails className="space-y-3 pt-0">
            {certifications.map((c, idx) => (
              <div key={idx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Cert #{idx + 1}</span>
                  <IconButton size="small" onClick={() => removeItem('certifications', idx)} sx={{ color: '#f43f5e' }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </IconButton>
                </div>
                <TextField
                  label="Certification Name"
                  value={c.name || ''}
                  onChange={(e) => updateListItem('certifications', idx, 'name', e.target.value)}
                  {...inputProps}
                />
                <div className="grid grid-cols-2 gap-2">
                  <TextField
                    label="Issuer / Organization"
                    value={c.issuer || ''}
                    onChange={(e) => updateListItem('certifications', idx, 'issuer', e.target.value)}
                    {...inputProps}
                  />
                  <TextField
                    label="Year / Date"
                    value={c.year || ''}
                    onChange={(e) => updateListItem('certifications', idx, 'year', e.target.value)}
                    {...inputProps}
                  />
                </div>
              </div>
            ))}
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => addItem('certifications', { name: '', issuer: '', year: '' })}
              startIcon={<Plus className="w-4 h-4" />}
              sx={{ borderColor: '#334155', color: '#94a3b8', textTransform: 'none', '&:hover': { borderColor: '#64748b' } }}
            >
              Add Certification
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
    </aside>
  );
}
