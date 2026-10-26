/*
  Prototype C, "Plan": the portfolio as an architect's monograph.
  Concrete, black and one deep pine; Host Grotesk at modest sizes; strong
  proportions and a lot of empty space. The work is an index: pointing at a
  project changes the large frame beside it, opening a row unfolds the
  project sheet. Every project is drawn as a plan.
*/
import './style.css';
import { approach, esc, leadership, message, person, projects, type Project } from '../shared/content';
import { mountSwitcher } from '../shared/switcher';
import { degrees } from '../../src/content/education';
import { roles } from '../../src/content/roles';
import { formatPeriod, toYearFraction } from '../../src/lib/dates';
import { buildBlocks } from '../../src/lib/twin';

/* ── Plans: each project drawn the way an architect would ── */

/** Figure-ground plan of a street grid: blocks in black, streets left open, taller blocks darker. */
function cityPlan(): string {
  const blocks = buildBlocks(9, 6, 21);
  const cell = 60;
  const street = 14;
  const rects = blocks
    .map((block) => {
      if (!block.storeys) return '';
      const shade = 0.45 + Math.min(block.storeys, 8) * 0.07;
      return `<rect x="${block.gx * cell + street / 2}" y="${block.gy * cell + street / 2}" width="${cell - street}" height="${cell - street}" fill="rgb(21 21 21 / ${shade.toFixed(2)})" />`;
    })
    .join('');
  return `<svg viewBox="-20 -20 ${9 * cell + 40} ${6 * cell + 40}" role="img" aria-label="Figure-ground plan of a regular street grid, blocks in black">${rects}<line x1="-20" y1="${6 * cell + 12}" x2="${9 * cell + 20}" y2="${6 * cell + 12}" class="plan-rule"/></svg>`;
}

/** The equipment list as two plans: devices in a row on the left, the same devices grouped by person on the right. */
function listPlan(): string {
  const devices = 6;
  const rowH = 30;
  const left = Array.from({ length: devices }, (_, i) => `<rect x="20" y="${30 + i * (rowH + 8)}" width="170" height="${rowH}" class="${i === 3 || i === 4 ? 'flag' : 'row'}" />`).join('');
  const groups = [
    [0, 2],
    [1, 4],
    [3, 5],
  ];
  let y = 22;
  const right = groups
    .map((group) => {
      const head = `<rect x="330" y="${y}" width="190" height="20" class="head" />`;
      y += 26;
      const items = group.map(() => {
        const rect = `<rect x="348" y="${y}" width="172" height="${rowH - 6}" class="row" />`;
        y += rowH;
        return rect;
      });
      y += 12;
      return head + items.join('');
    })
    .join('');
  const lines = [
    [0, 0],
    [2, 0],
    [1, 1],
    [4, 1],
    [3, 2],
    [5, 2],
  ]
    .map(([device, group]) => `<line x1="190" y1="${30 + device * (rowH + 8) + rowH / 2}" x2="330" y2="${32 + group * 98}" />`)
    .join('');
  return `<svg viewBox="0 0 540 330" role="img" aria-label="Diagram: six devices in a flat list on the left, regrouped under three people on the right">${lines}${left}${right}<text x="20" y="18">By device</text><text x="330" y="14">By person</text></svg>`;
}

const frames: Record<string, string> = {
  phonero: `<div class="plan plan--list">${listPlan()}</div>`,
  sta: `<img src="/prototypes/assets/sta-dokumenter.webp" width="1280" height="800" alt="The documents page of the STA prototype" />`,
  kommune: `<div class="plan plan--city">${cityPlan()}</div>`,
};

const sheet = (project: Project) => `
  <div class="sheet" id="sheet-${project.id}" role="region" aria-labelledby="row-${project.id}">
    <div class="sheet-inner">
      <div class="sheet-frame">${frames[project.id]}</div>
      <p class="sheet-summary">${esc(project.summary)}</p>
      <dl class="sheet-facts">
        <div><dt>Role</dt><dd>${esc(project.role)}</dd></div>
        <div><dt>Period</dt><dd>${esc(project.period)}</dd></div>
        <div><dt>Methods</dt><dd>${project.methods.map(esc).join(', ')}</dd></div>
        ${project.built.length ? `<div><dt>Built with</dt><dd>${project.built.map(esc).join(', ')}</dd></div>` : ''}
      </dl>
      <div class="sheet-process">
        <h3>Process</h3>
        <ol>
          <li><b>Problem</b>${esc(project.problem)}</li>
          ${project.steps.map((step) => `<li><b>${esc(step.title)}</b>${esc(step.text)}</li>`).join('')}
        </ol>
      </div>
      ${project.result ? `<div class="sheet-result"><h3>${esc(project.result.label)}</h3><p>${esc(project.result.text)}</p></div>` : ''}
      ${project.note ? `<p class="sheet-note">${esc(project.note)}</p>` : ''}
      ${project.links.length ? `<p class="sheet-links">${project.links.map((link) => `<a href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`).join('')}</p>` : ''}
    </div>
  </div>`;

/* ── Timeline: every role and degree to scale ──────── */

const FROM = 2018;
const TO = 2027.6;
const NOW = toYearFraction(new Date().toISOString().slice(0, 10), 'start');
const pct = (year: number) => ((year - FROM) / (TO - FROM)) * 100;
const lanes = [
  {
    name: 'Education',
    items: degrees.map((degree) => ({ title: degree.title.en, org: degree.institution, period: degree.period })),
  },
  {
    name: 'Work',
    items: roles.filter((role) => role.track === 'work').map((role) => ({ title: role.title.en, org: role.org, period: role.period })),
  },
  {
    name: 'Elected',
    items: roles.filter((role) => role.track === 'leadership').map((role) => ({ title: role.title.en, org: role.org, period: role.period })),
  },
];

const timeline = `
  <div class="timeline" role="list" aria-label="Education, work and elected roles from 2018 to 2027">
    <div class="axis" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<span style="left:${pct(FROM + i)}%">${FROM + i}</span>`).join('')}<i style="left:${pct(NOW)}%"></i></div>
    ${lanes
      .map(
        (lane) => `
      <div class="lane" role="listitem">
        <span class="lane-name">${lane.name}</span>
        <div class="lane-track">
          ${lane.items
            .map((item, index) => {
              const start = toYearFraction(item.period.start, 'start');
              const end = item.period.end === null ? NOW : toYearFraction(item.period.end, 'end');
              const label = `${item.title}, ${item.org}, ${formatPeriod(item.period, 'en')}`;
              return `<button type="button" class="bar" style="left:${pct(start)}%;width:${Math.max(0.8, pct(end) - pct(start))}%;top:${(index % 3) * 14}px" aria-label="${esc(label)}" data-label="${esc(label)}"></button>`;
            })
            .join('')}
        </div>
      </div>`,
      )
      .join('')}
    <p class="timeline-caption" aria-live="polite">Point at a line to read it.</p>
  </div>`;

const app = document.getElementById('app')!;
app.innerHTML = `
<header class="top">
  <a href="#top">${esc(person.name)}</a>
  <nav aria-label="Main"><a href="#work">Work</a><a href="#profile">Profile</a><a href="#record">Record</a><a href="#contact">Contact</a><a href="${person.cv}" target="_blank" rel="noopener">CV</a></nav>
</header>

<main id="top">
  <section class="hero" aria-labelledby="hero-title">
    <figure class="hero-image">
      <picture>
        <source type="image/webp" srcset="${person.portrait.webp}" />
        <img src="${person.portrait.jpg}" width="880" height="1100" alt="${esc(person.portrait.alt)}" />
      </picture>
      <figcaption>${esc(person.portrait.credit)}</figcaption>
    </figure>
    <div class="hero-text">
      <p class="hero-id">${esc(person.role)}<br />${esc(person.school)}, ${esc(person.finishing)}</p>
      <h1 id="hero-title">${esc(message.full)}</h1>
      <dl class="hero-facts">
        <div><dt>Looking for</dt><dd>${esc(message.seeking)}</dd></div>
        <div><dt>Based in</dt><dd>${esc(message.place)}</dd></div>
      </dl>
    </div>
  </section>

  <section id="work" class="work" aria-labelledby="work-title">
    <div class="work-head">
      <h2 id="work-title">Work</h2>
      <p>Three projects, 2025–2026</p>
    </div>
    <div class="index">
      <div class="frame" aria-hidden="true">
        ${projects.map((project, i) => `<div class="frame-item${i === 0 ? ' is-on' : ''}" data-frame="${project.id}">${frames[project.id]}</div>`).join('')}
      </div>
      <ol class="rows">
        ${projects
          .map(
            (project) => `
        <li class="row" data-row="${project.id}">
          <button type="button" class="row-head" id="row-${project.id}" aria-expanded="false" aria-controls="sheet-${project.id}">
            <span class="row-year">${esc(project.year)}</span>
            <span class="row-org">${esc(project.org)}</span>
            <span class="row-title">${esc(project.title)}</span>
            <span class="row-mark" aria-hidden="true"></span>
          </button>
          ${sheet(project)}
        </li>`,
          )
          .join('')}
      </ol>
    </div>
  </section>

  <section id="profile" class="profile" aria-labelledby="profile-title">
    <h2 id="profile-title">Profile</h2>
    <p class="profile-lead">${esc(message.about)}</p>
    <p class="profile-now"><span>Now</span>${esc(message.now)}</p>
    <ul class="profile-approach">${approach.map((item) => `<li><b>${esc(item.title)}</b>${esc(item.text)}</li>`).join('')}</ul>
  </section>

  <section id="record" class="record" aria-labelledby="record-title">
    <div class="record-head">
      <h2 id="record-title">Record</h2>
      <p>${esc(leadership.award.title)}. ${esc(leadership.award.text)} <a href="${leadership.award.diploma}" target="_blank" rel="noopener">Diploma</a></p>
    </div>
    ${timeline}
  </section>

  <section id="contact" class="contact" aria-labelledby="contact-title">
    <h2 id="contact-title">Contact</h2>
    <a class="email" href="mailto:${person.email}">${esc(person.email)}</a>
    <p class="contact-links"><a href="${person.cv}" target="_blank" rel="noopener">CV</a><a href="${person.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="${person.github}" target="_blank" rel="noopener noreferrer">GitHub</a></p>
  </section>
</main>
<footer class="foot">Set in Host Grotesk. Prototype C of three, October 2026.</footer>`;

/* ── Index: pointing changes the frame, opening unfolds the sheet ── */

const show = (id: string) =>
  document.querySelectorAll<HTMLElement>('[data-frame]').forEach((frame) => frame.classList.toggle('is-on', frame.dataset.frame === id));

document.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
  const id = row.dataset.row!;
  const head = row.querySelector<HTMLButtonElement>('.row-head')!;
  row.addEventListener('pointerenter', () => show(id));
  head.addEventListener('focus', () => show(id));
  head.addEventListener('click', () => {
    const open = head.getAttribute('aria-expanded') !== 'true';
    head.setAttribute('aria-expanded', String(open));
    row.classList.toggle('is-open', open);
    show(id);
  });
});

/* ── Timeline: the caption reads the line you point at ── */

const caption = document.querySelector<HTMLElement>('.timeline-caption')!;
document.querySelectorAll<HTMLButtonElement>('.bar').forEach((bar) => {
  const read = () => {
    caption.textContent = bar.dataset.label!;
    document.querySelectorAll('.bar').forEach((other) => other.classList.toggle('is-on', other === bar));
  };
  bar.addEventListener('pointerenter', read);
  bar.addEventListener('focus', read);
  bar.addEventListener('click', read);
});

mountSwitcher('c');
