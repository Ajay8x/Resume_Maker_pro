// ATS Score Calculation & Content Analysis Utility

const ACTION_VERBS = [
  'built', 'developed', 'engineered', 'architected', 'spearheaded', 'designed',
  'implemented', 'optimized', 'led', 'scaled', 'orchestrated', 'authored',
  'deployed', 'collaborated', 'created', 'boosted', 'reduced', 'improved',
  'integrated', 'managed', 'streamlined', 'delivered', 'achieved', 'automated'
];

const RECOMMENDED_SECTIONS = [
  { key: 'summary', name: 'Professional Summary', weight: 15 },
  { key: 'experience', name: 'Work Experience', weight: 25 },
  { key: 'skills', name: 'Technical Skills', weight: 20 },
  { key: 'education', name: 'Education', weight: 15 },
  { key: 'projects', name: 'Key Projects', weight: 15 },
];

export function calculateATSScore(resumeData) {
  let score = 0;
  const issues = [];
  const strengths = [];
  const suggestions = [];

  // 1. Basic Info Check (10 pts)
  const p = resumeData.personalInfo || {};
  if (p.fullName && p.email && p.phone) {
    score += 10;
    strengths.push('Essential contact details are complete.');
  } else {
    issues.push('Missing essential contact details (Full Name, Email, or Phone).');
  }

  // 2. Summary Quality (15 pts)
  if (p.summary && p.summary.trim().length >= 80) {
    score += 15;
    strengths.push('Concise and professional summary provided.');
  } else if (p.summary && p.summary.trim().length > 0) {
    score += 8;
    suggestions.push('Expand your summary to 3–4 impactful sentences highlighting your core value.');
  } else {
    issues.push('Professional Summary is missing.');
  }

  // 3. Experience Impact & Metrics (25 pts)
  const exp = resumeData.experience || [];
  if (exp.length > 0) {
    score += 15;
    let hasMetrics = false;
    let actionVerbsFound = 0;

    exp.forEach(item => {
      const text = (item.description || '').toLowerCase();
      // check for numbers/percentages/dollars
      if (/\d+%|\$\d+|\d+\+|\b\d+\b/.test(text)) {
        hasMetrics = true;
      }
      ACTION_VERBS.forEach(verb => {
        if (text.includes(verb)) actionVerbsFound++;
      });
    });

    if (hasMetrics) {
      score += 5;
      strengths.push('Quantified achievements detected (metrics, percentages, numbers).');
    } else {
      suggestions.push('Add measurable outcomes in work experience (e.g., "improved speed by 35%").');
    }

    if (actionVerbsFound >= 2) {
      score += 5;
      strengths.push('Strong action verbs utilized in bullet points.');
    } else {
      suggestions.push('Use strong action verbs (Engineered, Architected, Spearheaded, Reduced).');
    }
  } else {
    issues.push('Work experience is empty. Add internships or prior roles.');
  }

  // 4. Skills & Keywords (20 pts)
  const skills = resumeData.skills || '';
  const skillCount = skills.split(/[,|\n]/).filter(s => s.trim().length > 0).length;
  if (skillCount >= 8) {
    score += 20;
    strengths.push(`Rich technical skills keyword density (${skillCount} skills detected).`);
  } else if (skillCount >= 4) {
    score += 12;
    suggestions.push('Add more industry-relevant tools and keywords in your skills section (aim for 8+).');
  } else {
    issues.push('Skills section needs more relevant keywords.');
  }

  // 5. Projects Section (15 pts)
  const projects = resumeData.projects || [];
  if (projects.length >= 2) {
    score += 15;
    strengths.push('Multiple high-impact projects demonstrated.');
  } else if (projects.length === 1) {
    score += 10;
    suggestions.push('Add at least 2 key projects to showcase technical versatility.');
  } else {
    issues.push('Add projects to demonstrate real-world application.');
  }

  // 6. Education Section (15 pts)
  const education = resumeData.education || [];
  if (education.length > 0 && education[0].degree && education[0].school) {
    score += 15;
    strengths.push('Formal education details completed.');
  } else {
    issues.push('Education credentials are incomplete.');
  }

  // Clamp score
  const finalScore = Math.min(100, Math.max(0, score));

  return {
    score: finalScore,
    strengths,
    issues,
    suggestions,
    status: finalScore >= 85 ? 'Excellent' : finalScore >= 65 ? 'Good' : 'Needs Optimization'
  };
}
