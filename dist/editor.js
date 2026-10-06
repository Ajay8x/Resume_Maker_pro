/**
 * ResumeForge PRO - Core Application Logic
 */

// Basic Selectors & Helpers
const $ = id => document.getElementById(id);
const esc = s => String(s || "").replace(/[&<>"']/g, m => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[m]));

// Configuration & State
const textIds = ["name", "role", "email", "phone", "location", "linkedin", "github", "website", "summary", "skills", "languages", "hobbies"];
const repeaterTypes = ["experience", "projects", "education", "certifications", "internships", "achievements"];

const defaultSectionOrder = [
  "personal", "summary", "skills", "experience", "projects", "education",
  "certifications", "internships", "achievements", "languages", "hobbies"
];

let state = {
  template: "modern",
  accentColor: "#2563eb",
  fontFamily: "font-inter",
  sectionOrder: [...defaultSectionOrder],
  hiddenSections: [],
  zoom: 1.0
};

// Built-in Sample Profiles for Quick Demo
const sampleProfiles = {
  ajay: {
    name: "Ajay Singh",
    role: "Full Stack Web Developer",
    email: "ajaysingh8xx@gmail.com",
    phone: "(+91) 7991735503",
    location: "Mirzapur, Uttar Pradesh, India",
    linkedin: "https://linkedin.com/in/ajay8x",
    github: "https://github.com/Ajay8x",
    website: "",
    summary: "BCA student and aspiring Full Stack Web Developer with hands-on experience in React.js, Node.js, Express.js, MongoDB, SQL, and RESTful APIs. Skilled in developing responsive web applications, integrating modern frontend architectures with scalable backend services, and working with Git, GitHub, Agile methodologies, and software testing.",
    skills: "React.js, Node.js, Express.js, MongoDB, JavaScript (ES6+), HTML5, CSS3, SQL, RESTful APIs, Git, GitHub, Java, C++, C, Agile Methodologies, Software Testing, VS Code",
    languages: "English (Fluent), Hindi (Native)",
    hobbies: "Learning Emerging Web Tech, Competitive Problem Solving, Building Full-Stack Apps",
    experience: [
      {
        company: "Visiomatix Media Pvt. Ltd.",
        position: "Full Stack Developer Intern",
        period: "September 2026 - Present",
        location: "Remote / On-site",
        description: "• Engineered responsive, high-performance features across frontend and backend systems.\n• Developed and consumed secure RESTful APIs with Node.js, Express.js, and MongoDB.\n• Collaborated closely with cross-functional development team following Agile sprints and code reviews."
      }
    ],
    projects: [
      {
        title: "Wanderlust Travel – Full Stack Rental Web Platform",
        tech: "Node.js, Express.js, MongoDB, EJS, Bootstrap, Cloudinary",
        link: "https://github.com/Ajay8x/Wanderlust",
        description: "• Architected a comprehensive full-stack property rental web platform with user authentication and session management.\n• Implemented complete CRUD workflows for property listings, user reviews, ratings, and image hosting via Cloudinary.\n• Designed fully responsive UI optimized across desktop and mobile form factors."
      },
      {
        title: "Weather Web App using React & Material UI",
        tech: "React.js, Material UI, OpenWeatherMap API, JavaScript",
        link: "https://github.com/Ajay8x/Weather-App",
        description: "• Developed dynamic real-time weather tracking application leveraging OpenWeatherMap REST APIs.\n• Rendered live temperature, humidity, atmospheric pressure, and wind speed with Material UI cards and icons."
      },
      {
        title: "Full-Stack Library Management System",
        tech: "Node.js, Express.js, MongoDB, Cloudinary, REST APIs",
        link: "https://github.com/Ajay8x/Library-Management-System",
        description: "• Engineered complete library management application managing book catalogs, student issuance records, and fines.\n• Integrated secure cloud image uploads and dynamic search indexing."
      },
      {
        title: "Simon Says Interactive Game",
        tech: "JavaScript, HTML5, CSS3, Web Audio",
        link: "https://github.com/Ajay8x/Simon-Says-Game",
        description: "• Built an interactive memory puzzle game with real-time sequence generator, level tracking, and audio-visual feedback."
      }
    ],
    education: [
      {
        school: "Vindhya Gurukul College, MGKVP",
        degree: "Bachelor of Computer Applications (BCA)",
        year: "2023 - 2026",
        location: "Varanasi, UP",
        description: "Core Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Web Technologies."
      },
      {
        school: "Kisan Inter College",
        degree: "Class XII (Science - Physics, Chemistry, Math)",
        year: "2022 - 2023",
        location: "Rajgarh, Mirzapur"
      },
      {
        school: "Kisan Inter College",
        degree: "Class X (High School)",
        year: "2020 - 2021",
        location: "Rajgarh, Mirzapur"
      }
    ],
    certifications: [
      {
        name: "Full Stack Web Development (Delta)",
        issuer: "Apna College",
        year: "2023"
      },
      {
        name: "Cyber Security & Ethical Hacking (Web App Penetration Testing)",
        issuer: "DROP Organization",
        year: "March 2024"
      },
      {
        name: "CCC (Course on Computer Concepts)",
        issuer: "NIELIT",
        year: "April 2022"
      }
    ],
    internships: [],
    achievements: [
      {
        title: "Full Stack Web Developer Certification & Project Milestones",
        year: "2024",
        description: "Successfully built and deployed multiple production-ready full stack web applications."
      }
    ]
  },

  dev: {
    name: "Alex Morgan",
    role: "Senior Full-Stack Software Engineer",
    email: "alex.morgan@techforge.io",
    phone: "+1 (555) 432-8921",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexmorgan-dev",
    github: "github.com/alexmorgan",
    website: "alexmorgan.dev",
    summary: "High-impact Full-Stack Engineer with 6+ years of experience architecting distributed cloud systems, real-time web applications, and resilient microservices. Proven track record of improving application throughput by 45% and reducing infrastructure overhead.",
    skills: "TypeScript, JavaScript (ES6+), React, Next.js, Node.js, Python, PostgreSQL, Redis, Docker, Kubernetes, AWS (ECS, Lambda, S3), GraphQL, CI/CD, Microservices",
    languages: "English (Native), Spanish (Conversational)",
    hobbies: "Open Source Contributor, Tech Blogging, Marathon Runner",
    experience: [
      {
        company: "Apex Cloud Solutions",
        position: "Lead Full-Stack Engineer",
        period: "2022 - Present",
        description: "• Architected high-concurrency event processing pipeline processing 12M+ events/day using Node.js, Redis, and PostgreSQL.\n• Led a team of 7 engineers to deliver customer analytics dashboard, reducing latency by 40%.\n• Spearheaded automated CI/CD migration to GitHub Actions, slashing deployment cycle times from 45 mins to 8 mins."
      },
      {
        company: "NextGen Media Labs",
        position: "Software Engineer",
        period: "2019 - 2022",
        description: "• Built real-time collaborative workspace used by 150K+ active monthly users using React, WebSockets, and AWS Lambda.\n• Optimized frontend bundle sizes by 35% through tree-shaking and aggressive code splitting.\n• Integrated Stripe billing and automated tax calculation for multi-currency enterprise subscriptions."
      }
    ],
    projects: [
      {
        title: "DevPulse - Cloud Monitoring Dashboard",
        tech: "Next.js, Go, Prometheus, Docker",
        link: "https://github.com/alexmorgan/devpulse",
        description: "Open-source monitoring tool for Kubernetes clusters with real-time telemetry streaming and automated anomaly detection alerts."
      },
      {
        title: "FastCache - In-Memory Key-Value Store",
        tech: "Rust, Tokio, Redis Protocol",
        link: "https://github.com/alexmorgan/fastcache",
        description: "Lightweight sub-millisecond in-memory cache supporting Redis CLI compatibility and persistent write-ahead logging."
      }
    ],
    education: [
      {
        school: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        year: "2015 - 2019",
        description: "Graduated with Honors (GPA: 3.85/4.0). Head Teaching Assistant for Data Structures & Algorithms."
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect – Professional",
        issuer: "Amazon Web Services",
        year: "2023"
      },
      {
        name: "Certified Kubernetes Application Developer (CKAD)",
        issuer: "Cloud Native Computing Foundation (CNCF)",
        year: "2022"
      }
    ],
    internships: [],
    achievements: [
      {
        title: "1st Place Winner - SF TechCrunch Disrupt Hackathon",
        year: "2021",
        description: "Built an AI-assisted automated code review bot in 48 hours among 120+ competing teams."
      }
    ]
  },

  data: {
    name: "Dr. Priya Sharma",
    role: "Lead Data Scientist & AI Researcher",
    email: "priya.sharma@aimail.com",
    phone: "+1 (555) 789-2045",
    location: "New York, NY",
    linkedin: "linkedin.com/in/priya-sharma-ai",
    github: "github.com/priyasharma-data",
    website: "priyasharma.ai",
    summary: "Quantitative Data Scientist with PhD in Applied Statistics and 7+ years of expertise in Large Language Models (LLMs), predictive ML modeling, and enterprise data analytics. Published 6 peer-reviewed papers and delivered $4.2M in annual cost savings.",
    skills: "Python, PyTorch, TensorFlow, Scikit-learn, SQL, Spark, Pandas, NumPy, NLP, Transformers, LangChain, MLOps, Tableau, AWS SageMaker",
    languages: "English (Fluent), Hindi (Native), German (Intermediate)",
    hobbies: "Kaggle Grandmaster (Top 0.5%), Chess Enthusiast, Classical Flute",
    experience: [
      {
        company: "Vanguard Analytics",
        position: "Principal AI Scientist",
        period: "2021 - Present",
        description: "• Developed generative AI customer assistant with RAG pipeline, resolving 65% of support inquiries automatically with 94% customer satisfaction.\n• Fine-tuned specialized LLMs reducing inference compute costs by 32% while boosting precision by 18%."
      },
      {
        company: "FinTech Quantum Corp",
        position: "Senior Data Scientist",
        period: "2018 - 2021",
        description: "• Engineered fraud detection anomaly model processing $500M+ in daily transaction volume, reducing false positive rate by 28%."
      }
    ],
    projects: [
      {
        title: "BioMed-LLM Clinical Extraction Engine",
        tech: "PyTorch, Hugging Face, FastAPI, Docker",
        link: "https://github.com/priyasharma/biomed-llm",
        description: "Automated medical paper summarizer and entity extractor achieving state-of-the-art F1 score on PubMed benchmark."
      }
    ],
    education: [
      {
        school: "Columbia University",
        degree: "Ph.D. in Applied Statistics & Machine Learning",
        year: "2014 - 2018",
        description: "Doctoral dissertation on Sparse Gaussian Processes and High-Dimensional Feature Selection."
      }
    ],
    certifications: [
      {
        name: "Google Cloud Professional Data Engineer",
        issuer: "Google Cloud",
        year: "2022"
      }
    ],
    internships: [],
    achievements: [
      {
        title: "Kaggle Competitions Grandmaster",
        year: "2022",
        description: "Ranked among top 100 competitive data scientists globally with 5 Gold Medals."
      }
    ]
  },

  marketing: {
    name: "Marcus Vance",
    role: "Director of Product Marketing & Growth",
    email: "marcus.vance@growthhq.com",
    phone: "+1 (555) 902-1134",
    location: "Austin, TX",
    linkedin: "linkedin.com/in/marcusvance",
    github: "",
    website: "marcusvance.com",
    summary: "Dynamic Growth & Product Marketing leader with 8+ years driving revenue acceleration, GTM strategies, and product adoption for B2B SaaS. Scaled ARR from $4M to $28M across two venture-backed scale-ups.",
    skills: "GTM Strategy, Product Positioning, Customer Acquisition, HubSpot, Salesforce, Google Analytics 4, Mixpanel, SEO/SEM, Content Marketing, A/B Testing",
    languages: "English (Native), French (Conversational)",
    hobbies: "Podcasting, Angel Investing, Cycling",
    experience: [
      {
        company: "SaaSify Technologies",
        position: "Director of Product Marketing",
        period: "2021 - Present",
        description: "• Orchestrated enterprise GTM campaign generating $12.4M in pipeline within 6 months of product launch.\n• Revamped onboarding funnel, boosting trial-to-paid conversion rate from 3.2% to 6.8%."
      }
    ],
    projects: [
      {
        title: "Product Marketing Playbook 2024",
        tech: "Notion, Substack, Case Studies",
        link: "https://marcusvance.com/playbook",
        description: "Author of viral SaaS positioning framework downloaded by 25,000+ marketing and product leaders worldwide."
      }
    ],
    education: [
      {
        school: "University of Texas at Austin",
        degree: "B.B.A. in Marketing & Business Analytics",
        year: "2012 - 2016",
        description: "Dean's Honor List, President of American Marketing Association Chapter."
      }
    ],
    certifications: [
      {
        name: "Reforge Growth Series & Product Strategy",
        issuer: "Reforge",
        year: "2021"
      }
    ],
    internships: [],
    achievements: [
      {
        title: "Top 40 Under 40 Marketing Leader",
        year: "2023",
        description: "Recognized by SaaS Growth Institute for groundbreaking GTM strategies."
      }
    ]
  },

  fresher: {
    name: "Rohan Verma",
    role: "Junior Software Developer / Computer Science Graduate",
    email: "rohan.verma@alumni.edu",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    linkedin: "linkedin.com/in/rohanverma-tech",
    github: "github.com/rohanverma-dev",
    website: "",
    summary: "Motivated Computer Science graduate with strong foundational knowledge in data structures, algorithms, and full-stack web development. Eager to leverage technical skills in Java, Python, and React to build scalable user-centric software.",
    skills: "Java, Python, C++, JavaScript, React, HTML5/CSS3, Node.js, SQL, MongoDB, Git, Object-Oriented Programming, Data Structures",
    languages: "English (Fluent), Hindi (Native)",
    hobbies: "Competitive Programming (CodeChef 4-star), Tech Reading, Badminton",
    experience: [],
    projects: [
      {
        title: "CampusConnect - Student Resource Portal",
        tech: "React, Node.js, Express, MongoDB",
        link: "https://github.com/rohanverma-dev/campus-connect",
        description: "• Built full-stack collaborative platform for 2,000+ university students to share notes, previous exam solutions, and peer tutoring.\n• Implemented secure JWT user authentication and role-based access control."
      },
      {
        title: "Smart Expense Tracker App",
        tech: "Python, Flask, SQLite, Chart.js",
        link: "https://github.com/rohanverma-dev/expense-tracker",
        description: "• Developed interactive budgeting web application with category breakdown charts and automated monthly PDF report generation."
      }
    ],
    education: [
      {
        school: "National Institute of Technology (NIT)",
        degree: "B.Tech in Computer Science and Engineering",
        year: "2020 - 2024",
        description: "CGPA: 8.7/10.0. Core coursework: OS, DBMS, Computer Networks, Distributed Systems."
      }
    ],
    certifications: [
      {
        name: "Meta Front-End Developer Professional Certificate",
        issuer: "Coursera / Meta",
        year: "2023"
      }
    ],
    internships: [
      {
        company: "TechNova Solutions",
        role: "Software Development Intern",
        period: "Jan 2024 - Jun 2024",
        description: "• Collaborated with engineering team to develop responsive RESTful API endpoints in Node.js.\n• Wrote unit test suites achieving 88% code coverage using Jest."
      }
    ],
    achievements: [
      {
        title: "Finalist - Smart India Hackathon (SIH)",
        year: "2023",
        description: "Developed AI-powered disaster management alert system prototype for state government challenge."
      }
    ]
  }
};

// --------------------------------------------------------------------------
// Item Repeater Creation & Management
// --------------------------------------------------------------------------

function addItem(type, item = {}) {
  const box = document.createElement("div");
  box.className = "repeat";
  box.draggable = true;

  const fieldConfigs = {
    experience: [
      { k: "position", p: "Role / Position (e.g. Senior Software Engineer)", g: "2" },
      { k: "company", p: "Company / Organization", g: "2" },
      { k: "period", p: "Period (e.g. 2021 - Present)", g: "2" },
      { k: "location", p: "Location (optional, e.g. New York, NY)", g: "2" }
    ],
    projects: [
      { k: "title", p: "Project Title", g: "2" },
      { k: "tech", p: "Technologies / Stack (e.g. React, Node.js)", g: "2" },
      { k: "link", p: "Live / Repo Link URL", g: "1" }
    ],
    education: [
      { k: "degree", p: "Degree / Course (e.g. B.S. in Computer Science)", g: "2" },
      { k: "school", p: "Institution / University", g: "2" },
      { k: "year", p: "Year / Duration (e.g. 2018 - 2022)", g: "2" },
      { k: "location", p: "Location (optional)", g: "2" }
    ],
    certifications: [
      { k: "name", p: "Certification Name", g: "2" },
      { k: "issuer", p: "Issuing Organization", g: "2" },
      { k: "year", p: "Year / Credential ID", g: "1" }
    ],
    internships: [
      { k: "role", p: "Role / Position", g: "2" },
      { k: "company", p: "Company / Organization", g: "2" },
      { k: "period", p: "Period / Duration", g: "2" },
      { k: "location", p: "Location (optional)", g: "2" }
    ],
    achievements: [
      { k: "title", p: "Award / Achievement Title", g: "2" },
      { k: "year", p: "Year / Issuer", g: "2" }
    ]
  }[type] || [];

  let fieldsHtml = '<div class="input-grid-2">';
  fieldConfigs.forEach(f => {
    fieldsHtml += `<div class="form-field"><input data-k="${f.k}" placeholder="${f.p}" value="${esc(item[f.k])}"></div>`;
  });
  fieldsHtml += '</div>';

  box.innerHTML = `
    <div class="drag-bar">
      <span class="drag-handle"><i class="fa-solid fa-grip-lines"></i> Move</span>
      <div class="repeat-header-actions">
        <div class="move-buttons">
          <button type="button" class="up" title="Move Up"><i class="fa-solid fa-chevron-up"></i></button>
          <button type="button" class="down" title="Move Down"><i class="fa-solid fa-chevron-down"></i></button>
        </div>
        <button type="button" class="btn-remove-item"><i class="fa-solid fa-trash-can"></i> Remove</button>
      </div>
    </div>
    ${fieldsHtml}
    <div class="form-field">
      <textarea data-k="description" placeholder="Bullet points / key achievements (Use • or - for bullets)...">${esc(item.description)}</textarea>
      ${type === 'experience' || type === 'internships' ? `
        <div class="bullet-tips">
          <span style="font-size:10.5px;color:#64748b;margin-right:2px;"><i class="fa-solid fa-bolt"></i> Action Verbs:</span>
          <span class="bullet-chip" data-verb="Architected">Architected</span>
          <span class="bullet-chip" data-verb="Engineered">Engineered</span>
          <span class="bullet-chip" data-verb="Spearheaded">Spearheaded</span>
          <span class="bullet-chip" data-verb="Optimized">Optimized</span>
          <span class="bullet-chip" data-verb="Increased">Increased</span>
          <span class="bullet-chip" data-verb="Reduced">Reduced</span>
        </div>` : ''}
    </div>
  `;

  // Remove button
  box.querySelector(".btn-remove-item").onclick = () => {
    box.remove();
    render();
    save();
  };

  // Up/Down reorder
  box.querySelector(".up").onclick = (e) => {
    e.stopPropagation();
    const prev = box.previousElementSibling;
    if (prev) {
      box.parentElement.insertBefore(box, prev);
      render();
      save();
    }
  };

  box.querySelector(".down").onclick = (e) => {
    e.stopPropagation();
    const next = box.nextElementSibling;
    if (next) {
      box.parentElement.insertBefore(next, box);
      render();
      save();
    }
  };

  // Action verb chips insertion
  box.querySelectorAll(".bullet-chip").forEach(chip => {
    chip.onclick = () => {
      const textarea = box.querySelector('textarea[data-k="description"]');
      const verb = chip.dataset.verb;
      const cur = textarea.value.trim();
      if (cur) {
        textarea.value = cur + `\n• ${verb} `;
      } else {
        textarea.value = `• ${verb} `;
      }
      textarea.focus();
      render();
      save();
    };
  });

  // Drag and drop for item cards
  box.addEventListener("dragstart", () => box.classList.add("dragging"));
  box.addEventListener("dragend", () => {
    box.classList.remove("dragging");
    document.querySelectorAll(".repeat").forEach(x => x.classList.remove("over"));
    render();
    save();
  });

  box.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".repeat.dragging");
    if (!dragging || dragging === box) return;
    box.classList.add("over");
    const rect = box.getBoundingClientRect();
    box.parentElement.insertBefore(dragging, e.clientY > rect.top + rect.height / 2 ? box.nextSibling : box);
  });

  box.addEventListener("dragleave", () => box.classList.remove("over"));

  $(type).appendChild(box);
  box.querySelectorAll("input, textarea").forEach(x => x.oninput = () => {
    render();
    save();
  });
}

function collect(type) {
  const container = $(type);
  if (!container) return [];
  return [...container.children].map(box => Object.fromEntries(
    [...box.querySelectorAll("[data-k]")].map(x => [x.dataset.k, x.value])
  ));
}

// --------------------------------------------------------------------------
// HTML String Formatting Helpers
// --------------------------------------------------------------------------

function formatBullets(text) {
  if (!text) return "";
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return "";
  
  // If formatted with bullets
  const formattedItems = lines.map(line => {
    const clean = line.replace(/^[•\-\*]\s*/, "");
    return `<li>${esc(clean)}</li>`;
  });
  return `<ul class="item-bullets">${formattedItems.join("")}</ul>`;
}

// --------------------------------------------------------------------------
// Live Resume Rendering Engine
// --------------------------------------------------------------------------

function render() {
  const name = $("name").value || "Alex Morgan";
  const role = $("role").value || "Software Engineer";
  const email = $("email").value || "";
  const phone = $("phone").value || "";
  const location = $("location").value || "";
  const linkedin = $("linkedin").value || "";
  const github = $("github").value || "";
  const website = $("website") ? $("website").value : "";
  const summary = $("summary").value || "";

  const skillsRaw = $("skills").value.split(",").map(x => x.trim()).filter(Boolean);
  const languagesRaw = $("languages").value.split(",").map(x => x.trim()).filter(Boolean);
  const hobbiesRaw = $("hobbies").value.split(",").map(x => x.trim()).filter(Boolean);

  // Update Skills Tag Preview in Form
  const tagPreview = $("skills-tag-preview");
  if (tagPreview) {
    tagPreview.innerHTML = skillsRaw.map(s => `<span class="skill-tag">${esc(s)}</span>`).join("");
  }

  // Update Summary Char Count
  const charCount = $("summary-char-count");
  if (charCount) {
    charCount.innerText = `${summary.length} / 400 chars`;
  }

  const exp = collect("experience");
  const pro = collect("projects");
  const edu = collect("education");
  const cert = collect("certifications");
  const int = collect("internships");
  const ach = collect("achievements");

  const activeTemplate = state.template || "modern";
  const resumeEl = $("resume");
  resumeEl.className = `resume ${activeTemplate} ${state.fontFamily || "font-inter"}`;

  // Contact Info Links Generator
  const contactLinks = [];
  if (email) contactLinks.push(`<span><i class="fa-solid fa-envelope"></i> ${esc(email)}</span>`);
  if (phone) contactLinks.push(`<span><i class="fa-solid fa-phone"></i> ${esc(phone)}</span>`);
  if (location) contactLinks.push(`<span><i class="fa-solid fa-location-dot"></i> ${esc(location)}</span>`);
  if (linkedin) contactLinks.push(`<span><i class="fa-brands fa-linkedin"></i> <a href="${esc(linkedin.startsWith('http') ? linkedin : 'https://' + linkedin)}" target="_blank">${esc(linkedin.replace(/^https?:\/\/(www\.)?/, ''))}</a></span>`);
  if (github) contactLinks.push(`<span><i class="fa-brands fa-github"></i> <a href="${esc(github.startsWith('http') ? github : 'https://' + github)}" target="_blank">${esc(github.replace(/^https?:\/\/(www\.)?/, ''))}</a></span>`);
  if (website) contactLinks.push(`<span><i class="fa-solid fa-globe"></i> <a href="${esc(website.startsWith('http') ? website : 'https://' + website)}" target="_blank">${esc(website.replace(/^https?:\/\/(www\.)?/, ''))}</a></span>`);

  // Section Builders
  const sectionBuilders = {
    summary: () => summary ? `
      <div class="resume-section" data-section="summary">
        <div class="section-heading"><i class="fa-solid fa-align-left"></i> Professional Summary</div>
        <p class="item-desc">${esc(summary).replace(/\n/g, "<br>")}</p>
      </div>` : "",

    skills: () => skillsRaw.length ? `
      <div class="resume-section" data-section="skills">
        <div class="section-heading"><i class="fa-solid fa-bolt"></i> Skills & Proficiencies</div>
        <div class="skills-pills">
          ${skillsRaw.map(s => `<span class="skill-pill">${esc(s)}</span>`).join("")}
        </div>
      </div>` : "",

    experience: () => exp.length ? `
      <div class="resume-section" data-section="experience">
        <div class="section-heading"><i class="fa-solid fa-briefcase"></i> Work Experience</div>
        ${exp.map(x => `
          <div class="resume-item">
            <div class="item-head">
              <span class="item-title">${esc(x.position || "Role")}</span>
              <span class="item-date">${esc(x.period)}</span>
            </div>
            <div class="item-subtitle">${esc(x.company)}${x.location ? ' • ' + esc(x.location) : ''}</div>
            ${formatBullets(x.description)}
          </div>
        `).join("")}
      </div>` : "",

    projects: () => pro.length ? `
      <div class="resume-section" data-section="projects">
        <div class="section-heading"><i class="fa-solid fa-diagram-project"></i> Key Projects</div>
        ${pro.map(x => `
          <div class="resume-item">
            <div class="item-head">
              <span class="item-title">${esc(x.title)}</span>
              ${x.link ? `<a href="${esc(x.link.startsWith('http') ? x.link : 'https://' + x.link)}" target="_blank" style="color:var(--resume-accent);font-size:12px;text-decoration:none;"><i class="fa-solid fa-arrow-up-right-from-square"></i> Project Link</a>` : ''}
            </div>
            ${x.tech ? `<div class="item-subtitle"><strong>Tech:</strong> ${esc(x.tech)}</div>` : ''}
            ${formatBullets(x.description)}
          </div>
        `).join("")}
      </div>` : "",

    education: () => edu.length ? `
      <div class="resume-section" data-section="education">
        <div class="section-heading"><i class="fa-solid fa-graduation-cap"></i> Education</div>
        ${edu.map(x => `
          <div class="resume-item">
            <div class="item-head">
              <span class="item-title">${esc(x.degree)}</span>
              <span class="item-date">${esc(x.year)}</span>
            </div>
            <div class="item-subtitle">${esc(x.school)}${x.location ? ' • ' + esc(x.location) : ''}</div>
            ${x.description ? `<p class="item-desc">${esc(x.description)}</p>` : ''}
          </div>
        `).join("")}
      </div>` : "",

    certifications: () => cert.length ? `
      <div class="resume-section" data-section="certifications">
        <div class="section-heading"><i class="fa-solid fa-certificate"></i> Certifications</div>
        ${cert.map(x => `
          <div class="resume-item">
            <div class="item-head">
              <span class="item-title">${esc(x.name)}</span>
              <span class="item-date">${esc(x.year)}</span>
            </div>
            <div class="item-subtitle">${esc(x.issuer)}</div>
          </div>
        `).join("")}
      </div>` : "",

    internships: () => int.length ? `
      <div class="resume-section" data-section="internships">
        <div class="section-heading"><i class="fa-solid fa-chalkboard-user"></i> Internship / Training</div>
        ${int.map(x => `
          <div class="resume-item">
            <div class="item-head">
              <span class="item-title">${esc(x.role)}</span>
              <span class="item-date">${esc(x.period)}</span>
            </div>
            <div class="item-subtitle">${esc(x.company)}${x.location ? ' • ' + esc(x.location) : ''}</div>
            ${formatBullets(x.description)}
          </div>
        `).join("")}
      </div>` : "",

    achievements: () => ach.length ? `
      <div class="resume-section" data-section="achievements">
        <div class="section-heading"><i class="fa-solid fa-trophy"></i> Honors & Awards</div>
        ${ach.map(x => `
          <div class="resume-item">
            <div class="item-head">
              <span class="item-title">${esc(x.title)}</span>
              <span class="item-date">${esc(x.year)}</span>
            </div>
            ${x.description ? `<p class="item-desc">${esc(x.description)}</p>` : ''}
          </div>
        `).join("")}
      </div>` : "",

    languages: () => languagesRaw.length ? `
      <div class="resume-section" data-section="languages">
        <div class="section-heading"><i class="fa-solid fa-language"></i> Languages</div>
        <p class="item-desc">${languagesRaw.map(esc).join(" • ")}</p>
      </div>` : "",

    hobbies: () => hobbiesRaw.length ? `
      <div class="resume-section" data-section="hobbies">
        <div class="section-heading"><i class="fa-solid fa-heart"></i> Interests & Activities</div>
        <p class="item-desc">${hobbiesRaw.map(esc).join(" • ")}</p>
      </div>` : ""
  };

  // Build based on layout template
  let renderedHtml = "";

  if (activeTemplate === "sidebar") {
    // Two-column layout
    const sidebarSections = ["skills", "education", "languages", "certifications", "hobbies"];
    const mainSections = state.sectionOrder.filter(s => s !== "personal" && !sidebarSections.includes(s) && !state.hiddenSections.includes(s));
    const activeSidebar = state.sectionOrder.filter(s => sidebarSections.includes(s) && !state.hiddenSections.includes(s));

    renderedHtml = `
      <div class="sidebar-col">
        <div class="resume-name">${esc(name)}</div>
        <div class="resume-role">${esc(role)}</div>
        <div class="sidebar-heading"><i class="fa-solid fa-address-book"></i> Contact</div>
        ${contactLinks.map(c => `<div class="contact-item">${c}</div>`).join("")}
        ${activeSidebar.map(sec => {
          if (sec === "skills" && skillsRaw.length) {
            return `<div class="sidebar-heading"><i class="fa-solid fa-bolt"></i> Skills</div>${skillsRaw.map(s => `<span class="sidebar-pill">${esc(s)}</span>`).join("")}`;
          }
          if (sec === "languages" && languagesRaw.length) {
            return `<div class="sidebar-heading"><i class="fa-solid fa-language"></i> Languages</div><div style="font-size:11.5px;color:#cbd5e1;line-height:1.4;">${languagesRaw.map(esc).join(", ")}</div>`;
          }
          if (sec === "education" && edu.length) {
            return `<div class="sidebar-heading"><i class="fa-solid fa-graduation-cap"></i> Education</div>${edu.map(e => `<div style="margin-bottom:8px;font-size:11.5px;"><strong style="color:#fff;">${esc(e.degree)}</strong><div style="color:#94a3b8;">${esc(e.school)}</div><div style="color:#64748b;">${esc(e.year)}</div></div>`).join("")}`;
          }
          if (sec === "certifications" && cert.length) {
            return `<div class="sidebar-heading"><i class="fa-solid fa-certificate"></i> Certifications</div>${cert.map(c => `<div style="margin-bottom:6px;font-size:11.5px;"><strong style="color:#fff;">${esc(c.name)}</strong><div style="color:#94a3b8;">${esc(c.issuer)} (${esc(c.year)})</div></div>`).join("")}`;
          }
          if (sec === "hobbies" && hobbiesRaw.length) {
            return `<div class="sidebar-heading"><i class="fa-solid fa-heart"></i> Interests</div><div style="font-size:11.5px;color:#cbd5e1;">${hobbiesRaw.map(esc).join(", ")}</div>`;
          }
          return "";
        }).join("")}
      </div>
      <div class="main-col">
        ${mainSections.map(sec => sectionBuilders[sec] ? sectionBuilders[sec]() : "").join("")}
      </div>
    `;
  } else if (activeTemplate === "executive") {
    // Corporate Executive layout with colored banner
    const activeSecs = state.sectionOrder.filter(s => s !== "personal" && !state.hiddenSections.includes(s));
    renderedHtml = `
      <div class="exec-top-banner">
        <h1>${esc(name)}</h1>
        <div class="resume-role">${esc(role)}</div>
        <div class="resume-contacts">${contactLinks.join("")}</div>
      </div>
      <div class="exec-body">
        ${activeSecs.map(sec => sectionBuilders[sec] ? sectionBuilders[sec]() : "").join("")}
      </div>
    `;
  } else {
    // Modern Pro, Classic, Minimal standard single column layout
    const activeSecs = state.sectionOrder.filter(s => s !== "personal" && !state.hiddenSections.includes(s));
    renderedHtml = `
      <div class="resume-header">
        <h1>${esc(name)}</h1>
        <div class="resume-role">${esc(role)}</div>
        <div class="resume-contacts">${contactLinks.join(" ")}</div>
      </div>
      ${activeSecs.map(sec => sectionBuilders[sec] ? sectionBuilders[sec]() : "").join("")}
    `;
  }

  resumeEl.innerHTML = renderedHtml;
  calculateATS();
}

// --------------------------------------------------------------------------
// ATS Scoring Engine & Optimization Analyzer
// --------------------------------------------------------------------------

function calculateATS() {
  let score = 0;
  const breakdown = [];

  // 1. Contact Details (15 pts)
  const name = $("name").value.trim();
  const email = $("email").value.trim();
  const phone = $("phone").value.trim();
  const linkedin = $("linkedin").value.trim();

  let contactPassed = (name.length > 2 && /.+@.+\..+/.test(email) && phone.replace(/\D/g, "").length >= 10);
  if (name.length > 2) score += 3;
  if (/.+@.+\..+/.test(email)) score += 4;
  if (phone.replace(/\D/g, "").length >= 10) score += 4;
  if (/linkedin\.com/i.test(linkedin)) {
    score += 4;
  }

  breakdown.push({
    title: "Complete Contact Information & LinkedIn",
    desc: "Includes verified full name, professional email, phone number, and LinkedIn profile URL.",
    passed: contactPassed && /linkedin\.com/i.test(linkedin)
  });

  // 2. Professional Summary (15 pts)
  const summaryLen = $("summary").value.trim().length;
  let summaryPassed = false;
  if (summaryLen >= 120) {
    score += 15;
    summaryPassed = true;
  } else if (summaryLen >= 50) {
    score += 8;
  }

  breakdown.push({
    title: "Comprehensive Professional Summary (120+ chars)",
    desc: "A well-written elevator pitch showcasing your core value proposition and career highlights.",
    passed: summaryPassed
  });

  // 3. Technical & Core Skills Density (20 pts)
  const skills = $("skills").value.split(",").filter(x => x.trim().length > 0);
  let skillsPassed = false;
  if (skills.length >= 8) {
    score += 20;
    skillsPassed = true;
  } else if (skills.length >= 4) {
    score += 12;
  } else if (skills.length > 0) {
    score += 6;
  }

  breakdown.push({
    title: "Skills & Keywords Density (8+ relevant skills)",
    desc: "Recruiters and ATS match candidate resumes with job descriptions using key technical proficiencies.",
    passed: skillsPassed
  });

  // 4. Experience & Quantifiable Impact (25 pts)
  const exp = collect("experience");
  const int = collect("internships");
  const pro = collect("projects");
  const totalWork = exp.length + int.length;

  if (totalWork >= 2) score += 10;
  else if (totalWork === 1) score += 6;

  let hasMetrics = false;
  let hasActionVerbs = false;
  let hasGoodDesc = false;
  const actionVerbs = /(managed|led|developed|designed|created|improved|increased|reduced|slashed|architected|built|implemented|achieved|coordinated|spearheaded|engineered|optimized)/i;

  [...exp, ...int, ...pro].forEach(x => {
    if (x.description && x.description.length > 60) hasGoodDesc = true;
    if (x.description && (/\d+%|\$\d+|\d+\s*(m|k|users|events|ms|mins|hrs)/i.test(x.description) || /\d+/.test(x.description))) hasMetrics = true;
    if (x.description && actionVerbs.test(x.description)) hasActionVerbs = true;
  });

  if (hasGoodDesc) score += 5;
  if (hasMetrics) score += 5;
  if (hasActionVerbs) score += 5;

  breakdown.push({
    title: "Quantifiable Metrics & Percentages in Experience",
    desc: "Statements containing measurable numbers (e.g., 'improved latency by 40%', '$12M pipeline', '150K users').",
    passed: hasMetrics
  });

  breakdown.push({
    title: "Strong Action Verbs (Architected, Engineered, Led, Optimized)",
    desc: "Beginning bullet points with high-impact power action verbs rather than passive phrases.",
    passed: hasActionVerbs
  });

  // 5. Education & Projects / Credentials (15 pts)
  const edu = collect("education");
  let eduPassed = edu.length > 0;
  let proPassed = pro.length > 0;

  if (eduPassed) score += 8;
  if (proPassed) score += 7;

  breakdown.push({
    title: "Education & Degree Credentials Listed",
    desc: "Clear degree, institution name, and graduation year details.",
    passed: eduPassed
  });

  breakdown.push({
    title: "Key Projects with Technical Stack",
    desc: "Showcases real-world applications with tech stacks and live URLs.",
    passed: proPassed
  });

  // 6. Bonus Sections: Certifications, Languages, Awards (10 pts)
  const cert = collect("certifications");
  const ach = collect("achievements");
  const languages = $("languages").value.trim();

  let bonusScore = 0;
  if (cert.length > 0) bonusScore += 4;
  if (ach.length > 0) bonusScore += 4;
  if (languages.length > 0) bonusScore += 2;
  score += bonusScore;

  breakdown.push({
    title: "Bonus Sections (Certifications / Awards / Languages)",
    desc: "Industry-recognized credentials, competitive achievements, or multilingual skills.",
    passed: bonusScore >= 4
  });

  // Normalize final score
  score = Math.min(100, score);

  // Update Mini Badge in Header
  const miniScore = $("ats-score-mini");
  const gradeText = $("ats-grade-text");
  const ringFill = $("ats-ring-fill");

  if (miniScore) miniScore.innerText = `${score}%`;
  if (ringFill) {
    ringFill.setAttribute("stroke-dasharray", `${score}, 100`);
    if (score >= 80) ringFill.style.stroke = "#10b981";
    else if (score >= 50) ringFill.style.stroke = "#f59e0b";
    else ringFill.style.stroke = "#ef4444";
  }

  if (gradeText) {
    if (score >= 85) {
      gradeText.innerText = "Excellent";
      gradeText.style.color = "#10b981";
    } else if (score >= 70) {
      gradeText.innerText = "Good";
      gradeText.style.color = "#34d399";
    } else if (score >= 50) {
      gradeText.innerText = "Fair";
      gradeText.style.color = "#f59e0b";
    } else {
      gradeText.innerText = "Needs Work";
      gradeText.style.color = "#ef4444";
    }
  }

  // Update Modal Scorecard
  const modalScore = $("modal-ats-score");
  const modalStatus = $("modal-ats-status");
  const modalDesc = $("modal-ats-desc");
  const breakdownList = $("ats-breakdown-list");

  if (modalScore) modalScore.innerText = score;
  if (modalStatus) {
    if (score >= 80) modalStatus.innerText = "ATS Optimized (Excellent)";
    else if (score >= 50) modalStatus.innerText = "Fair ATS Compatibility";
    else modalStatus.innerText = "Needs Improvement for ATS";
  }

  if (breakdownList) {
    breakdownList.innerHTML = breakdown.map(item => `
      <div class="ats-check-item ${item.passed ? 'passed' : 'failed'}">
        <i class="fa-solid ${item.passed ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <div>
          <strong>${esc(item.title)}</strong>
          <p style="margin-top:2px;font-size:11.5px;">${esc(item.desc)}</p>
        </div>
      </div>
    `).join("");
  }
}

// --------------------------------------------------------------------------
// Storage, Load, and Sync Operations
// --------------------------------------------------------------------------

function save() {
  const values = Object.fromEntries(textIds.map(id => [id, $(id) ? $(id).value : ""]));
  const repeaterValues = Object.fromEntries(repeaterTypes.map(t => [t, collect(t)]));

  const payload = {
    ...values,
    ...repeaterValues,
    state: {
      template: state.template,
      accentColor: state.accentColor,
      fontFamily: state.fontFamily,
      sectionOrder: state.sectionOrder,
      hiddenSections: state.hiddenSections
    }
  };

  localStorage.setItem("resumeforge_pro_data", JSON.stringify(payload));
}

function loadState(savedData) {
  if (!savedData) return;

  // Restore Text Fields
  textIds.forEach(id => {
    if ($(id) && savedData[id] !== undefined) {
      $(id).value = savedData[id];
    }
  });

  // Clear & Restore Repeaters
  repeaterTypes.forEach(t => {
    const el = $(t);
    if (el) el.innerHTML = "";
    (savedData[t] || []).forEach(item => addItem(t, item));
  });

  // Restore App State
  if (savedData.state) {
    state.template = savedData.state.template || "modern";
    state.accentColor = savedData.state.accentColor || "#2563eb";
    state.fontFamily = savedData.state.fontFamily || "font-inter";
    state.hiddenSections = savedData.state.hiddenSections || [];

    if (Array.isArray(savedData.state.sectionOrder)) {
      const valid = new Set(defaultSectionOrder);
      state.sectionOrder = [
        ...savedData.state.sectionOrder.filter(x => valid.has(x)),
        ...defaultSectionOrder.filter(x => !savedData.state.sectionOrder.includes(x))
      ];
    }
  }

  // Update UI Inputs to Match State
  if ($("template")) $("template").value = state.template;
  if ($("resume-font")) $("resume-font").value = state.fontFamily;
  applyAccentColor(state.accentColor);

  // Sync section elements order in DOM
  const editor = $("section-editor");
  if (editor) {
    state.sectionOrder.forEach(secName => {
      const node = editor.querySelector(`[data-section="${secName}"]`);
      if (node) editor.appendChild(node);
    });
  }

  // Sync Eye Icons
  document.querySelectorAll(".editor-section").forEach(sec => {
    const sName = sec.dataset.section;
    const eyeBtn = sec.querySelector(".section-toggle-eye");
    if (state.hiddenSections.includes(sName)) {
      sec.classList.add("hidden-section");
      if (eyeBtn) eyeBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
    } else {
      sec.classList.remove("hidden-section");
      if (eyeBtn) eyeBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }
  });

  refreshSectionOrderButtons();
  render();
}

function applyAccentColor(color) {
  state.accentColor = color;
  document.documentElement.style.setProperty("--resume-accent", color);

  document.querySelectorAll(".color-dot").forEach(dot => {
    if (dot.dataset.color.toLowerCase() === color.toLowerCase()) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  const customInput = $("custom-color-input");
  if (customInput) customInput.value = color;
}

// --------------------------------------------------------------------------
// Section Reordering & Drag & Drop Handling
// --------------------------------------------------------------------------

function refreshSectionOrderButtons() {
  const sections = [...document.querySelectorAll(".editor-section")];
  sections.forEach((s, idx) => {
    const upBtn = s.querySelector(".section-up");
    const downBtn = s.querySelector(".section-down");
    if (upBtn) upBtn.disabled = idx === 0;
    if (downBtn) downBtn.disabled = idx === sections.length - 1;
  });
}

function syncSectionOrder() {
  state.sectionOrder = [...document.querySelectorAll(".editor-section")].map(s => s.dataset.section);
  refreshSectionOrderButtons();
}

function setupSectionInteractions() {
  document.querySelectorAll(".editor-section").forEach(section => {
    const secName = section.dataset.section;

    // Drag start
    section.addEventListener("dragstart", (e) => {
      if (e.target.closest("input, textarea, button, select")) {
        e.preventDefault();
        return;
      }
      section.classList.add("dragging");
    });

    // Drag end
    section.addEventListener("dragend", () => {
      section.classList.remove("dragging");
      document.querySelectorAll(".editor-section").forEach(x => x.classList.remove("over"));
      syncSectionOrder();
      render();
      save();
    });

    // Drag over
    section.addEventListener("dragover", (e) => {
      e.preventDefault();
      const dragging = document.querySelector(".editor-section.dragging");
      if (!dragging || dragging === section) return;
      section.classList.add("over");
      const rect = section.getBoundingClientRect();
      $("section-editor").insertBefore(
        dragging,
        e.clientY > rect.top + rect.height / 2 ? section.nextSibling : section
      );
    });

    section.addEventListener("dragleave", () => section.classList.remove("over"));

    // Move Up
    const upBtn = section.querySelector(".section-up");
    if (upBtn) {
      upBtn.onclick = (e) => {
        e.stopPropagation();
        const prev = section.previousElementSibling;
        if (prev) {
          section.parentElement.insertBefore(section, prev);
          syncSectionOrder();
          render();
          save();
        }
      };
    }

    // Move Down
    const downBtn = section.querySelector(".section-down");
    if (downBtn) {
      downBtn.onclick = (e) => {
        e.stopPropagation();
        const next = section.nextElementSibling;
        if (next) {
          section.parentElement.insertBefore(next, section);
          syncSectionOrder();
          render();
          save();
        }
      };
    }

    // Collapse / Expand
    const collapseBtn = section.querySelector(".section-collapse");
    if (collapseBtn) {
      collapseBtn.onclick = (e) => {
        e.stopPropagation();
        section.classList.toggle("collapsed");
      };
    }

    // Eye / Visibility Toggle
    const eyeBtn = section.querySelector(".section-toggle-eye");
    if (eyeBtn) {
      eyeBtn.onclick = (e) => {
        e.stopPropagation();
        if (state.hiddenSections.includes(secName)) {
          state.hiddenSections = state.hiddenSections.filter(x => x !== secName);
          section.classList.remove("hidden-section");
          eyeBtn.innerHTML = '<i class="fa-regular fa-eye"></i>';
        } else {
          state.hiddenSections.push(secName);
          section.classList.add("hidden-section");
          eyeBtn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        }
        render();
        save();
      };
    }
  });

  refreshSectionOrderButtons();
}

// --------------------------------------------------------------------------
// Zoom & Document Viewport Controls
// --------------------------------------------------------------------------

function setZoom(val) {
  state.zoom = Math.max(0.4, Math.min(1.8, val));
  const wrapper = $("resume-scale-wrapper");
  const zoomText = $("zoom-level");
  if (wrapper) wrapper.style.transform = `scale(${state.zoom})`;
  if (zoomText) zoomText.innerText = `${Math.round(state.zoom * 100)}%`;
}

function setupZoomControls() {
  const zoomIn = $("zoom-in");
  const zoomOut = $("zoom-out");
  const zoomReset = $("zoom-reset");
  const zoomFit = $("zoom-fit");

  if (zoomIn) zoomIn.onclick = () => setZoom(state.zoom + 0.1);
  if (zoomOut) zoomOut.onclick = () => setZoom(state.zoom - 0.1);
  if (zoomReset) zoomReset.onclick = () => setZoom(1.0);
  if (zoomFit) {
    zoomFit.onclick = () => {
      const viewport = $("preview-viewport");
      if (viewport) {
        const availableWidth = viewport.clientWidth - 40;
        const targetZoom = Math.min(1.1, Math.max(0.45, availableWidth / 820));
        setZoom(targetZoom);
      }
    };
  }
}

// --------------------------------------------------------------------------
// Initialize Application
// --------------------------------------------------------------------------

function init() {
  // Input listeners
  textIds.forEach(id => {
    const el = $(id);
    if (el) el.oninput = () => { render(); save(); };
  });

  // Add Item Buttons
  document.querySelectorAll(".btn-add-item").forEach(btn => {
    btn.onclick = () => {
      addItem(btn.dataset.type);
      render();
      save();
    };
  });

  // Template dropdown change
  const templateSelect = $("template");
  if (templateSelect) {
    templateSelect.onchange = () => {
      state.template = templateSelect.value;
      render();
      save();
    };
  }

  // Font family dropdown change
  const fontSelect = $("resume-font");
  if (fontSelect) {
    fontSelect.onchange = () => {
      state.fontFamily = fontSelect.value;
      render();
      save();
    };
  }

  // Accent Color Palette
  document.querySelectorAll(".color-dot").forEach(dot => {
    dot.onclick = () => {
      applyAccentColor(dot.dataset.color);
      render();
      save();
    };
  });

  const customColorInput = $("custom-color-input");
  if (customColorInput) {
    customColorInput.oninput = () => {
      applyAccentColor(customColorInput.value);
      render();
      save();
    };
  }

  // Sample Picker
  const samplePicker = $("sample-picker");
  if (samplePicker) {
    samplePicker.onchange = () => {
      const selected = samplePicker.value;
      if (selected && sampleProfiles[selected]) {
        if (confirm(`Load sample profile "${sampleProfiles[selected].role}"? Current unsaved changes will be replaced.`)) {
          loadState(sampleProfiles[selected]);
          save();
        }
      }
      samplePicker.value = "";
    };
  }

  // Print Button
  const printBtn = $("print");
  if (printBtn) printBtn.onclick = () => window.print();

  // Reset Button
  const resetBtn = $("reset");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm("Are you sure you want to reset all resume fields to a blank state?")) {
        localStorage.removeItem("resumeforge_pro_data");
        textIds.forEach(id => {
          if ($(id)) $(id).value = "";
        });
        repeaterTypes.forEach(t => {
          const el = $(t);
          if (el) el.innerHTML = "";
        });
        state.template = "modern";
        state.fontFamily = "font-inter";
        state.accentColor = "#2563eb";
        state.hiddenSections = [];
        state.sectionOrder = [...defaultSectionOrder];
        applyAccentColor("#2563eb");
        if ($("template")) $("template").value = "modern";
        if ($("resume-font")) $("resume-font").value = "font-inter";
        render();
        save();
      }
    };
  }

  // Toggle all sections
  const toggleAllBtn = $("toggle-all-sections");
  if (toggleAllBtn) {
    let allCollapsed = false;
    toggleAllBtn.onclick = () => {
      allCollapsed = !allCollapsed;
      document.querySelectorAll(".editor-section").forEach(s => {
        if (allCollapsed) s.classList.add("collapsed");
        else s.classList.remove("collapsed");
      });
    };
  }

  // ATS Modal Open & Close
  const atsModalBtn = $("ats-modal-btn");
  const atsModal = $("ats-modal");
  const atsModalClose = $("ats-modal-close");
  const atsModalOk = $("ats-modal-ok");

  if (atsModalBtn && atsModal) {
    atsModalBtn.onclick = () => atsModal.classList.add("open");
  }
  if (atsModalClose && atsModal) {
    atsModalClose.onclick = () => atsModal.classList.remove("open");
  }
  if (atsModalOk && atsModal) {
    atsModalOk.onclick = () => atsModal.classList.remove("open");
  }
  if (atsModal) {
    atsModal.onclick = (e) => {
      if (e.target === atsModal) atsModal.classList.remove("open");
    };
  }

  // Export JSON
  const exportBtn = $("export-json");
  if (exportBtn) {
    exportBtn.onclick = () => {
      const dataStr = localStorage.getItem("resumeforge_pro_data");
      const blob = new Blob([dataStr || "{}"], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_${($("name").value || "export").replace(/\s+/g, "_")}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };
  }

  // Import JSON
  const importInput = $("import-json");
  if (importInput) {
    importInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          loadState(parsed);
          save();
          alert("Resume data successfully imported!");
        } catch (err) {
          alert("Invalid JSON resume backup file.");
        }
      };
      reader.readAsText(file);
      importInput.value = "";
    };
  }

  setupSectionInteractions();
  setupZoomControls();

  // Initial Load from Storage or Sample Default
  const rawData = localStorage.getItem("resumeforge_pro_data");
  if (rawData) {
    try {
      loadState(JSON.parse(rawData));
    } catch (e) {
      loadState(sampleProfiles.ajay);
    }
  } else {
    loadState(sampleProfiles.ajay);
  }
}

// Start application on DOM ready
document.addEventListener("DOMContentLoaded", init);
