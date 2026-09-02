const ids=["name","role","email","phone","location","linkedin","github","summary","skills","languages","hobbies","template"];
const $=id=>document.getElementById(id);
const esc=s=>String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
let data={education:[],internships:[],experience:[],projects:[],certifications:[],achievements:[]};

const defaultSectionOrder=[
  "personal","summary","skills","experience","projects","education",
  "certifications","internships","achievements","languages","hobbies"
];
let sectionOrder=[...defaultSectionOrder];

function addItem(type,item={}){
  const box=document.createElement("div"); box.className="repeat"; box.draggable=true;
  const fields={
    education:[["school","Institution"],["degree","Degree / Course"],["year","Year / Duration"]],
    internships:[["company","Company / Organization"],["role","Role / Position"],["period","Period"]],
    experience:[["company","Company"],["position","Position"],["period","Period"]],
    projects:[["title","Project Title"],["tech","Technologies"],["link","Project Link / URL"]],
    certifications:[["name","Certification Name"],["issuer","Issuing Organization"],["year","Year"]],
    achievements:[["title","Award / Achievement Title"],["year","Year"]]
  }[type];

  box.innerHTML=`<div class="drag-bar"><span class="drag-handle">☷ Drag to move</span><span class="move-buttons"><button type="button" class="up">↑</button><button type="button" class="down">↓</button></span></div>`+
    fields.map(([k,p])=>`<input data-k="${k}" placeholder="${p}" value="${esc(item[k])}">`).join("")+
    `<textarea data-k="description" placeholder="Description / achievements">${esc(item.description)}</textarea><button type="button" class="remove">Remove</button>`;

  box.querySelector(".remove").onclick=()=>{box.remove();render();save();};
  box.querySelector(".up").onclick=(e)=>{e.stopPropagation();const prev=box.previousElementSibling;if(prev)box.parentElement.insertBefore(box,prev);render();save();};
  box.querySelector(".down").onclick=(e)=>{e.stopPropagation();const next=box.nextElementSibling;if(next)box.parentElement.insertBefore(next,box);render();save();};

  box.addEventListener("dragstart",()=>box.classList.add("dragging"));
  box.addEventListener("dragend",()=>{box.classList.remove("dragging");document.querySelectorAll(".repeat").forEach(x=>x.classList.remove("over"));render();save();});
  box.addEventListener("dragover",e=>{
    e.preventDefault();
    const dragging=document.querySelector(".repeat.dragging");
    if(!dragging||dragging===box)return;
    box.classList.add("over");
    const rect=box.getBoundingClientRect();
    box.parentElement.insertBefore(dragging,e.clientY>rect.top+rect.height/2?box.nextSibling:box);
  });
  box.addEventListener("dragleave",()=>box.classList.remove("over"));
  $(type).appendChild(box);
  box.querySelectorAll("input,textarea").forEach(x=>x.oninput=()=>{render();save();});
}

function collect(type){
  return [...$(type).children].map(box=>Object.fromEntries(
    [...box.querySelectorAll("[data-k]")].map(x=>[x.dataset.k,x.value])
  ));
}

function sectionData(){
  return {
    personal: {name:$("name").value,role:$("role").value,email:$("email").value,phone:$("phone").value,location:$("location").value,linkedin:$("linkedin").value,github:$("github").value},
    summary: $("summary").value,
    skills: $("skills").value,
    experience: collect("experience"),
    projects: collect("projects"),
    education: collect("education"),
    internships: collect("internships"),
    certifications: collect("certifications"),
    achievements: collect("achievements"),
    languages: $("languages").value,
    hobbies: $("hobbies").value
  };
}

function render(){
  const skills=$("skills").value.split(",").map(x=>x.trim()).filter(Boolean);
  const hobbies=$("hobbies").value.split(",").map(x=>x.trim()).filter(Boolean);
  const languages=$("languages").value.split(",").map(x=>x.trim()).filter(Boolean);
  const edu=collect("education"), int=collect("internships"), exp=collect("experience"),
        pro=collect("projects"), cert=collect("certifications"), ach=collect("achievements");

  const contact=[$("email").value,$("phone").value,$("location").value,$("linkedin").value,$("github").value]
    .filter(Boolean).map(esc).join(" • ");

  let html=`<h1>${esc($("name").value)||"Your Name"}</h1>
    <div class="role">${esc($("role").value)||"Target Role"}</div>
    <div class="contact">${contact||"email@example.com • +91 XXXXX XXXXX • City"}</div>`;

  const blocks={
    summary: ()=> $("summary").value ? `<h2>Profile</h2><p>${esc($("summary").value).replace(/\n/g,"<br>")}</p>` : "",
    skills: ()=> skills.length ? `<h2>Skills</h2><p>${skills.map(esc).join(" • ")}</p>` : "",
    experience: ()=> exp.length ? `<h2>Experience</h2>`+exp.map(x=>`<div class="item"><div class="item-title">${esc(x.position)} — ${esc(x.company)}</div><div class="meta">${esc(x.period)}</div>${x.description?`<p>${esc(x.description).replace(/\n/g,"<br>")}</p>`:""}</div>`).join("") : "",
    projects: ()=> pro.length ? `<h2>Projects</h2>`+pro.map(x=>`<div class="item"><div class="item-title">${esc(x.title)}</div><div class="meta">${esc(x.tech)}${x.tech&&x.link?" • ":""}${x.link?`<a href="${esc(x.link)}" target="_blank" style="color:#2563eb;text-decoration:none;">${esc(x.link)}</a>`:""}</div>${x.description?`<p>${esc(x.description).replace(/\n/g,"<br>")}</p>`:""}</div>`).join("") : "",
    education: ()=> edu.length ? `<h2>Education</h2>`+edu.map(x=>`<div class="item"><div class="item-title">${esc(x.degree)}</div><div>${esc(x.school)}</div><div class="meta">${esc(x.year)}</div>${x.description?`<p>${esc(x.description)}</p>`:""}</div>`).join("") : "",
    internships: ()=> int.length ? `<h2>Internship / Training</h2>`+int.map(x=>`<div class="item"><div class="item-title">${esc(x.role)} — ${esc(x.company)}</div><div class="meta">${esc(x.period)}</div>${x.description?`<p>${esc(x.description).replace(/\n/g,"<br>")}</p>`:""}</div>`).join("") : "",
    certifications: ()=> cert.length ? `<h2>Certifications</h2>`+cert.map(x=>`<div class="item"><div class="item-title">${esc(x.name)}</div><div>${esc(x.issuer)}</div><div class="meta">${esc(x.year)}</div>${x.description?`<p>${esc(x.description)}</p>`:""}</div>`).join("") : "",
    achievements: ()=> ach.length ? `<h2>Achievements / Awards</h2>`+ach.map(x=>`<div class="item"><div class="item-title">${esc(x.title)}</div><div class="meta">${esc(x.year)}</div>${x.description?`<p>${esc(x.description)}</p>`:""}</div>`).join("") : "",
    languages: ()=> languages.length ? `<h2>Languages</h2><p>${languages.map(esc).join(" • ")}</p>` : "",
    hobbies: ()=> hobbies.length ? `<h2>Hobbies / Interests</h2><p>${hobbies.map(esc).join(" • ")}</p>` : ""
  };

  sectionOrder.filter(x=>x!=="personal").forEach(type=>{ if(blocks[type]) html+=blocks[type](); });
  $("resume").innerHTML=html;
  $("resume").className="resume "+$("template").value;
  calculateATS();
}

function calculateATS(){
  let score = 0;

  // 1. Contact Info (15 pts)
  if($("name").value.trim().length > 2) score += 3;
  if(/.+@.+\..+/.test($("email").value)) score += 4;
  if($("phone").value.replace(/\D/g, "").length >= 10) score += 4;
  if(/linkedin\.com/i.test($("linkedin").value)) score += 4;

  // 2. Summary (10 pts)
  const summaryLen = $("summary").value.trim().length;
  if(summaryLen > 50) score += 5;
  if(summaryLen > 200) score += 5;

  // 3. Skills (15 pts)
  const skills = $("skills").value.split(",").filter(x => x.trim().length > 0);
  if(skills.length >= 10) score += 15;
  else if(skills.length >= 5) score += 10;
  else if(skills.length > 0) score += 5;

  // 4. Work Experience & Internships (30 pts)
  const exp = collect("experience");
  const int = collect("internships");
  const workCount = exp.length + int.length;
  
  if(workCount >= 2) score += 15;
  else if(workCount === 1) score += 10;

  let hasGoodDesc = false;
  let hasMetrics = false;
  let hasActionVerbs = false;
  const actionVerbs = /(managed|led|developed|designed|created|improved|increased|resolved|built|implemented|achieved|coordinated)/i;

  [...exp, ...int].forEach(x => {
    if(x.description && x.description.length > 100) hasGoodDesc = true;
    if(x.description && (/\d/.test(x.description) || /%|\$/.test(x.description))) hasMetrics = true;
    if(x.description && actionVerbs.test(x.description)) hasActionVerbs = true;
  });

  if(hasGoodDesc) score += 5;
  if(hasMetrics) score += 5;
  if(hasActionVerbs) score += 5;

  // 5. Education (10 pts)
  if(collect("education").length > 0) score += 10;

  // 6. Projects (10 pts)
  const pro = collect("projects");
  if(pro.length > 0) {
    score += 5;
    if(pro.some(x => x.description && x.description.length > 50)) {
      score += 5;
    }
  }

  // 7. Bonus Sections (10 pts)
  if(collect("certifications").length > 0) score += 4;
  if(collect("achievements").length > 0) score += 4;
  if($("languages").value.trim().length > 0) score += 2;

  // Cap at 100
  score = Math.min(100, score);
  
  const scoreElem = $("ats-score");
  if(scoreElem){
    scoreElem.innerText = score;
    scoreElem.style.color = score >= 80 ? "#16a34a" : (score >= 50 ? "#d97706" : "#dc2626");
  }
}

function save(){
  data={
    education:collect("education"),internships:collect("internships"),experience:collect("experience"),
    projects:collect("projects"),certifications:collect("certifications"),achievements:collect("achievements")
  };
  const values=Object.fromEntries(ids.map(id=>[id,$(id).value]));
  localStorage.setItem('resume', JSON.stringify({...values,...data,sectionOrder}));
}

function refreshSectionButtons(){
  const sections=[...document.querySelectorAll(".editor-section")];
  sections.forEach((s,i)=>{
    s.querySelector(".section-up").disabled=i===0;
    s.querySelector(".section-down").disabled=i===sections.length-1;
  });
}

function syncSectionOrder(){
  sectionOrder=[...document.querySelectorAll(".editor-section")].map(s=>s.dataset.section);
  refreshSectionButtons();
}

function setupSectionDrag(){
  document.querySelectorAll(".editor-section").forEach(section=>{
    section.addEventListener("dragstart",e=>{
      if(e.target.closest("input,textarea,button")){e.preventDefault();return;}
      section.classList.add("dragging");
    });
    section.addEventListener("dragend",()=>{
      section.classList.remove("dragging");
      document.querySelectorAll(".editor-section").forEach(x=>x.classList.remove("over"));
      syncSectionOrder();render();save();
    });
    section.addEventListener("dragover",e=>{
      e.preventDefault();
      const dragging=document.querySelector(".editor-section.dragging");
      if(!dragging||dragging===section)return;
      section.classList.add("over");
      const rect=section.getBoundingClientRect();
      document.getElementById("section-editor").insertBefore(
        dragging,
        e.clientY>rect.top+rect.height/2?section.nextSibling:section
      );
    });
    section.addEventListener("dragleave",()=>section.classList.remove("over"));
    section.querySelector(".section-up").onclick=e=>{
      e.stopPropagation();
      const prev=section.previousElementSibling;
      if(prev){section.parentElement.insertBefore(section,prev);syncSectionOrder();render();save();}
    };
    section.querySelector(".section-down").onclick=e=>{
      e.stopPropagation();
      const next=section.nextElementSibling;
      if(next){section.parentElement.insertBefore(next,section);syncSectionOrder();render();save();}
    };
  });
  refreshSectionButtons();
}

function load(){
  const rStr = localStorage.getItem("resume");
  const r = rStr ? JSON.parse(rStr) : null;
  if(!r){setupSectionDrag();render();return;}
  ids.forEach(id=>{if(r[id]!=null)$(id).value=r[id]});
  ["education","internships","experience","projects","certifications","achievements"]
    .forEach(t=>(r[t]||[]).forEach(x=>addItem(t,x)));

  if(Array.isArray(r.sectionOrder)){
    const valid=new Set(defaultSectionOrder);
    sectionOrder=[...r.sectionOrder.filter(x=>valid.has(x)),...defaultSectionOrder.filter(x=>!r.sectionOrder.includes(x))];
    const editor=document.getElementById("section-editor");
    sectionOrder.forEach(type=>{
      const node=editor.querySelector(`[data-section="${type}"]`);
      if(node)editor.appendChild(node);
    });
  }
  setupSectionDrag();
  render();
}

ids.forEach(id=>$(id).oninput=()=>{render();save()});
document.querySelectorAll(".add").forEach(b=>b.onclick=()=>{addItem(b.dataset.type);render();save()});
$("template").onchange=()=>{render();save()};
$("print").onclick=()=>window.print();
$("reset").onclick=()=>{
  if(confirm("Are you sure you want to reset your resume data? This action cannot be undone.")){
    localStorage.removeItem("resume");
    ids.forEach(id=>{
      if($(id)) {
        if(id==="template") $(id).value="modern";
        else $(id).value="";
      }
    });
    ["education","internships","experience","projects","certifications","achievements"].forEach(t=>{
      const el=$(t); if(el)el.innerHTML="";
    });
    data={education:[],internships:[],experience:[],projects:[],certifications:[],achievements:[]};
    render();
    save();
  }
};
load();
