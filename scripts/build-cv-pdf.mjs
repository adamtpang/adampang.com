// Builds public/adam-pang-resume.pdf (and public/cv.pdf) from src/app/cv/resume.json.
// Usage: node scripts/build-cv-pdf.mjs   (needs Google Chrome or Chromium on PATH, or CHROME=/path)
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cv = JSON.parse(readFileSync(path.join(root, 'src/app/cv/resume.json'), 'utf8'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// **bold** and [label](url) only.
const md = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
const host = (href) => href.replace(/^https?:\/\//, '').replace(/^mailto:/, '');

const entry = (title, role, meta, bullets, links = []) => `
  <div class="entry">
    <div class="head"><span><b>${title}</b>${role ? ` · ${esc(role)}` : ''}${
      links.length ? ` · ${links.map((l) => `<a href="${l.href}">${esc(host(l.href))}</a>`).join(' · ')}` : ''
    }</span><span class="meta">${esc(meta)}</span></div>
    <ul>${bullets.map((b) => `<li>${md(b)}</li>`).join('')}</ul>
  </div>`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Adam Pang, Resume</title>
<style>
@page { size: letter; margin: 0.45in 0.55in; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, "Liberation Sans", Helvetica, sans-serif; font-size: 10.2pt; line-height: 1.3; color: #000; }
a { color: #000; text-decoration: underline; text-underline-offset: 1.5pt; text-decoration-thickness: 0.5pt; }
h1 { margin: 0; font-size: 20pt; line-height: 1.1; text-align: center; }
.sub { margin: 3pt 0 0; text-align: center; font-size: 10pt; }
.contacts { margin: 4pt 0 2pt; text-align: center; font-size: 9.5pt; }
.summary { margin: 7pt 0 0; }
h2 { margin: 9pt 0 4pt; padding-bottom: 1.5pt; border-bottom: 0.75pt solid #000; font-size: 10.5pt; letter-spacing: 0.6pt; text-transform: uppercase; }
.entry { margin-top: 4.5pt; break-inside: avoid; }
.head { display: flex; justify-content: space-between; gap: 10pt; }
.meta { white-space: nowrap; }
ul { margin: 1.5pt 0 0; padding-left: 13pt; }
li { margin: 1pt 0 0; }
.plain { list-style: disc; }
.skills div { margin-top: 1.5pt; }
.updated { margin-top: 8pt; font-size: 8.5pt; text-align: right; }
</style></head><body>
<h1>${esc(cv.name)}</h1>
<p class="contacts">${cv.contacts.map((c) => (c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : esc(c.label))).join(' · ')}</p>
<h2>Experience</h2>
${cv.experience.map((j) => entry(j.href ? `<a href="${j.href}">${esc(j.org)}</a>` : esc(j.org), j.role, j.meta, j.bullets)).join('')}
<h2>Projects</h2>
${cv.projects.map((p) => entry(`<a href="${p.href}">${esc(p.name)}</a>`, '', p.meta, p.bullets, p.links.filter((l) => l.label === 'GitHub'))).join('')}
<h2>Achievements</h2>
<ul>${cv.achievements.map((a) => `<li>${md(a)}</li>`).join('')}</ul>
<h2>Education</h2>
${cv.education.map((e) => entry(`<a href="${e.href}">${esc(e.org)}</a>`, e.role, e.meta, e.bullets)).join('')}
<h2>Skills</h2>
<div class="skills">${cv.skills.map((s) => `<div><b>${esc(s.label)}:</b> ${md(s.text)}</div>`).join('')}</div>
<p class="updated">${esc(cv.updated)}</p>
</body></html>`;

const dir = mkdtempSync(path.join(tmpdir(), 'cv-'));
const htmlPath = path.join(dir, 'resume.html');
writeFileSync(htmlPath, html);
const out = path.join(root, 'public/adam-pang-resume.pdf');
const chrome = process.env.CHROME || 'google-chrome';
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--no-pdf-header-footer',
  `--print-to-pdf=${out}`, `file://${htmlPath}`,
], { stdio: 'inherit' });
copyFileSync(out, path.join(root, 'public/cv.pdf'));
console.log(`wrote ${out} and public/cv.pdf (html: ${htmlPath})`);
