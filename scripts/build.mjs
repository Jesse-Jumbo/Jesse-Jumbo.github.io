import { mkdir, writeFile } from 'node:fs/promises';
import { content, profile, projects } from '../src/content.mjs';

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tags = values => `<ul class="tags">${values.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`;
const external = (url, label, cls='text-link') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`;

function visual(project, lang, prefix) {
  const p = project[lang];
  if (project.image) return `<div class="project-visual image-visual"><img src="${prefix}assets/${project.image}" alt="${esc(p.imageAlt)}" width="${project.id === 'tankman' ? 3441 : 1112}" height="${project.id === 'tankman' ? 2169 : 712}" loading="lazy" decoding="async"></div>`;
  if (project.type === 'service') return `<div class="project-visual service-visual" aria-hidden="true"><span class="visual-caption">FOVY / BACKEND SERVICES</span><div class="service-heading">Built to<br><em>connect.</em></div><div class="service-modules"><span>Auth</span><span>Documents</span></div><div class="service-bottom"><span>gRPC</span><span>RabbitMQ</span><span>Docker</span></div></div>`;
  if (project.type === 'retrieval') return `<div class="project-visual retrieval-visual" aria-hidden="true"><span class="visual-caption">RETRIEVAL / GENERATION</span><div class="retrieval-stack"><div><span>01</span>${lang==='zh'?'資料來源':'Source documents'}<b>source_id</b></div><div><span>02</span>${lang==='zh'?'語意檢索':'Semantic retrieval'}<b>similarity</b></div><div><span>03</span>${lang==='zh'?'回答與出處':'Answer & sources'}<b>context</b></div></div><span class="visual-footnote">${lang==='zh'?'從資料查詢，走向有脈絡的回答。':'Connecting source material with contextual answers.'}</span></div>`;
  if (project.type === 'template') return `<div class="project-visual template-visual" aria-hidden="true"><span class="visual-caption">MLGAME / REUSABLE TEMPLATES</span><div class="template-title">Start small.<br><em>Make it yours.</em></div><div class="template-row"><span>SingleMode</span><span>BattleMode</span><span>Tools</span></div></div>`;
  return `<div class="project-visual education-visual" aria-hidden="true"><span class="visual-caption">PTWA / SPECIAL EDUCATION</span><div class="education-count"><span>≈</span><strong>27</strong><span>${lang==='zh'?'款遊戲':'games'}</span></div><div class="education-copy">${lang==='zh'?'共用模板，<br>一起把教案做出來。':'Shared templates.<br>Built together.'}</div></div>`;
}

function projectLinks(project, lang) {
  const c=content[lang], p=project[lang];
  return `<div class="project-links">${project.website?external(project.website,p.websiteLabel||c.website,'repo-link'):''}${project.url?external(project.url,c.repo,'repo-link'):''}${project.privateCode?`<span class="source-note">${esc(c.privateCode)}</span>`:''}</div>`;
}

function sharingCard(item) {
  return `<article><span class="sharing-number">${item.number}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p>${item.note?`<p class="sharing-note">${esc(item.note)}</p>`:''}<div class="sharing-links">${item.links.map(link=>external(link.url,link.label)).join('')}${item.contactLabel?`<a class="text-link community-contact" href="#contact">${esc(item.contactLabel)}</a>`:''}</div></article>`;
}

function card(project, index, lang, prefix) {
  const c = content[lang], p = project[lang];
  return `<article class="project-card" id="${project.id}" data-category="${project.category}">
    ${visual(project, lang, prefix)}
    <div class="project-body"><div class="project-meta"><span>${String(index+1).padStart(2,'0')} / ${esc(p.role)}</span><span>${project.year}</span></div>
    <h3>${esc(p.name)}</h3><p class="project-subtitle">${esc(p.subtitle)}</p><p class="project-description">${esc(p.description)}</p>
    ${tags(lang==='en' && project.stackEn ? project.stackEn : project.stack)}
    <details class="project-details"><summary><span>${esc(c.details)}</span><span class="plus" aria-hidden="true"></span></summary>
      <div class="detail-content"><h4>${esc(c.challenge)}</h4><p>${esc(p.challenge)}</p><h4>${esc(c.approach)}</h4><ul>${p.approach.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><h4>${esc(c.learning)}</h4><p>${esc(p.learning)}</p></div>
    </details>${projectLinks(project,lang)}</div>
  </article>`;
}

function render(lang) {
  const c = content[lang], prefix = lang==='zh' ? './' : '../';
  const alt = lang==='zh' ? './en/' : '../';
  const canonical = `${profile.origin}/${lang==='en'?'en/':''}`;
  const sections = ['work','experience','about','contact'];
  const person = {'@context':'https://schema.org','@type':'Person',name:profile.englishName,alternateName:['Jesse Chiang',profile.name],url:profile.origin,sameAs:[profile.github,profile.linkedin],knowsAbout:['Backend development','Python','Applied AI','Educational games']};
  const favicon = 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#c2ef67"/><text x="32" y="43" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="34" fill="#101210">J.</text></svg>');
  return `<!doctype html>
<html lang="${c.lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#101210">
<title>${esc(c.title)}</title><meta name="description" content="${esc(c.description)}"><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="zh-Hant" href="${profile.origin}/"><link rel="alternate" hreflang="en" href="${profile.origin}/en/"><link rel="alternate" hreflang="x-default" href="${profile.origin}/">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(c.title)}"><meta property="og:description" content="${esc(c.description)}"><meta property="og:url" content="${canonical}"><meta property="og:locale" content="${lang==='zh'?'zh_TW':'en_US'}"><meta name="twitter:card" content="summary">
<link rel="icon" type="image/svg+xml" href="${esc(favicon)}"><link rel="stylesheet" href="${prefix}assets/styles.css"><script src="${prefix}assets/site.js" defer></script><script type="application/ld+json">${JSON.stringify(person).replace(/</g,'\\u003c')}</script></head>
<body id="top" data-copy-success="${esc(c.copied)}" data-copy-failed="${esc(c.copyFailed)}" data-count-label="${esc(c.shown)}">
<a class="skip-link" href="#main">${esc(c.skip)}</a>
<header class="site-header"><div class="container header-inner"><a href="#top" class="brand" aria-label="Jesse Chiang"><span class="brand-mark">J.</span><span>JESSE CHIANG<span class="brand-sub">江婕瀅</span></span></a>
<nav class="navigation" aria-label="${lang==='zh'?'主要導覽':'Main navigation'}">${sections.map((id,i)=>`<a href="#${id}">${c.nav[i]}</a>`).join('')}</nav><a class="language-link" href="${alt}" lang="${lang==='zh'?'en':'zh-Hant'}" aria-label="${esc(c.languageLabel)}">${c.language}</a></div></header>
<main id="main">
<section class="hero container" aria-labelledby="hero-title"><div class="hero-topline"><span class="eyebrow">${c.heroEyebrow}</span><span class="location">${c.location}</span></div>
<div class="nameplate" aria-hidden="true"><span>JESSE</span><span class="nameplate-outline">CHIANG<span class="name-period">.</span></span></div>
<div class="hero-grid"><div class="hero-copy"><h1 id="hero-title">${c.heroTitle}</h1><p>${c.intro}</p><div class="hero-actions"><a href="#work" class="button button-primary">${c.viewWork}</a><a href="#contact" class="button button-secondary">${c.contactMe}</a></div></div>
<aside class="focus-panel" aria-labelledby="focus-title"><span class="eyebrow">${c.focusLabel}</span><h2 id="focus-title">${c.focus}</h2><p>${c.focusDescription}</p><div class="focus-tags">${c.focusTags.map((t,i)=>`<span><b>0${i+1}</b>${t}</span>`).join('')}</div><div class="focus-footer"><span>NCKU / CCEP</span><span>2026</span></div></aside></div>
<dl class="fact-strip">${c.facts.map(f=>`<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl></section>
<section id="work" class="work section container" aria-labelledby="work-title"><div class="section-top"><div><p class="eyebrow"><span class="section-number">01</span>${c.workLabel}</p><h2 id="work-title">${c.workTitle}</h2></div>${external(profile.github+'?tab=repositories',c.allRepos)}</div><p class="section-intro">${c.workIntro}</p>
<div class="work-controls" hidden><div class="filters" role="group" aria-label="${lang==='zh'?'依領域篩選作品':'Filter projects by area'}">${c.filters.map((f,i)=>`<button type="button" data-filter="${f[0]}" aria-pressed="${i===0}">${f[1]}</button>`).join('')}</div><p class="project-count" aria-live="polite">${projects.length} ${c.shown}</p></div>
<div class="project-grid">${projects.map((p,i)=>card(p,i,lang,prefix)).join('')}</div></section>
<section id="experience" class="experience section" aria-labelledby="experience-title"><div class="container experience-grid"><div class="experience-heading"><p class="eyebrow"><span class="section-number">02</span>${c.experienceLabel}</p><h2 id="experience-title">${c.experienceTitle}</h2><div class="recognition"><span class="eyebrow">${c.recognitionLabel}</span>${c.recognitions.map(r=>`<p>${esc(r)}</p>`).join('')}<span class="recognition-team">FOVY</span></div></div>
<ol class="timeline">${c.experiences.map(e=>`<li><span class="time">${e.time}</span><h3>${e.url?external(e.url,e.org,'org-link'):esc(e.org)}</h3><p class="role">${e.role}</p><p>${e.text}</p>${tags(e.tags)}</li>`).join('')}</ol></div></section>
<section id="about" class="about section container" aria-labelledby="about-title"><div class="about-grid"><div><p class="eyebrow"><span class="section-number">03</span>${c.aboutLabel}</p><h2 id="about-title">${c.aboutTitle}</h2><div class="about-prose">${c.aboutParagraphs.map(p=>`<p>${p}</p>`).join('')}</div><aside class="lab-note"><span class="lab-note-symbol" aria-hidden="true">+</span><div><h3>${c.labNoteTitle}</h3><p>${c.labNote}</p></div></aside></div>
<div class="education-panel"><div class="education-heading"><span class="eyebrow">${c.educationPeriod}</span><h3>${c.education}</h3><p>${c.degree}</p></div><div class="coursework"><h4>${c.courseworkTitle}</h4><ul>${c.courses.map(s=>`<li>${s}</li>`).join('')}</ul><p class="current-courses">${c.currentCourses}</p></div><div class="skills"><h4>${c.skillsTitle}</h4><dl>${c.skills.map(s=>`<div><dt>${s[0]}</dt><dd>${s[1]}</dd></div>`).join('')}</dl></div></div></div></section>
<section id="sharing" class="sharing section container" aria-labelledby="sharing-title"><p class="eyebrow"><span class="section-number">04</span>${c.sharingLabel}</p><h2 id="sharing-title">${c.sharingTitle}</h2><div class="sharing-grid">${c.sharing.map(sharingCard).join('')}</div></section>
<section id="contact" class="contact section" aria-labelledby="contact-title"><div class="container contact-grid"><div><p class="eyebrow">${c.contactLabel}</p><h2 id="contact-title">${c.contactTitle}</h2><p class="contact-description">${c.contactText}</p></div><div class="contact-actions"><a class="email-link" href="mailto:${profile.email}">${profile.email}</a><div class="contact-buttons"><a class="button button-dark" href="mailto:${profile.email}">${c.emailLabel}</a><button type="button" class="copy-email" data-email="${profile.email}" hidden>${c.copy}</button></div><p class="copy-status" role="status" aria-live="polite"></p><div class="social-links">${external(profile.github,'GitHub')}${external(profile.linkedin,'LinkedIn')}</div></div></div></section>
</main><footer class="container site-footer"><span>© 2026 Jesse Chiang</span><span>${c.footer}</span><a href="#top">${c.backTop}</a></footer>
</body></html>`;
}

await mkdir('en', {recursive:true});
await writeFile('index.html', render('zh'));
await writeFile('en/index.html', render('en'));
await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${profile.origin}/</loc><lastmod>${profile.updated}</lastmod></url><url><loc>${profile.origin}/en/</loc><lastmod>${profile.updated}</lastmod></url></urlset>\n`);
await writeFile('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${profile.origin}/sitemap.xml\n`);
await writeFile('404.html', `<!doctype html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>找不到頁面｜Jesse Chiang</title><meta name="robots" content="noindex"><style>body{margin:0;background:#101210;color:#f5f6f2;font:18px/1.7 system-ui,sans-serif;min-height:100vh;display:grid;place-items:center}main{padding:2rem;max-width:42rem}h1{font-size:clamp(2rem,8vw,4rem)}a{color:#c2ef67}p{color:#b8bdb4}</style></head><body><main><p>JESSE CHIANG / 404</p><h1>這一頁不在這裡。</h1><p>This page could not be found.</p><a href="${profile.origin}/">返回首頁 / Back to home</a></main></body></html>`);
console.log('Built Chinese and English pages, sitemap, robots.txt, and 404 page.');
