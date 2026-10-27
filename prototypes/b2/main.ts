/*
  Prototype B2, "Instrument, refined". The same idea as B, the work as one
  thread per project through People, Process and Technology, set calmer:
  the opening is complete on load, the model is still until the visitor
  turns it, and each fact has one place on the page.
*/
import './style.css';
import { esc } from '../shared/content';
import { mountEquipment } from '../shared/equipment';
import { mountSwitcher } from '../shared/switcher';
import { blockAt, buildBlocks, fitView, prism, project as projectPoint, type View } from '../../src/lib/twin';
import {
  equipmentLabels,
  layers,
  leadership,
  LENSES,
  locale,
  person,
  projects,
  record,
  t,
  twinLabels,
  ui,
  type Project,
  type ProjectKey,
} from './content';
import { ANGLE_MAX, ANGLE_MIN, ANGLE_START, drawModel } from './model';

document.documentElement.lang = locale === 'no' ? 'nb' : 'en';
const other = locale === 'no' ? 'en' : 'no';
const external = 'target="_blank" rel="noopener noreferrer"';

const visual = (project: Project) => {
  if (project.id === 'phonero') {
    return `<figure class="visual"><div id="equipment"></div><figcaption>${esc(equipmentLabels.caption)}</figcaption></figure>`;
  }
  if (project.id === 'sta') {
    return `<figure class="visual visual--shots">
      <div class="shots">
        <img class="shot-laptop" src="/prototypes/assets/sta-verv.webp" width="1280" height="800" alt="${esc(t(ui.shotAlt))}" loading="lazy" />
        <img class="shot-phone" src="/prototypes/assets/sta-verv-phone.webp" width="780" height="1688" alt="${esc(t(ui.shotPhoneAlt))}" loading="lazy" />
      </div>
      <figcaption>${esc(t(ui.shot))}</figcaption>
    </figure>`;
  }
  return `<figure class="visual"><div class="twin"><canvas aria-hidden="true"></canvas><output class="twin-readout">${esc(t(ui.twinIdle))}</output></div><figcaption>${esc(twinLabels.caption)}</figcaption></figure>`;
};

const thread = (project: Project) => `
  <dl class="thread-strip" aria-label="${esc(t(ui.thread))}">
    ${LENSES.map((lens) => `<div><dt>${esc(layers[lens].name)}</dt><dd>${esc(project.thread[lens])}</dd></div>`)
      .join('')}
  </dl>`;

const details = (project: Project) => `
  <details class="more">
    <summary>${esc(t(project.team ? ui.how : ui.howSolo))}</summary>
    <div class="more-body">
      ${project.problem ? `<p><strong>${esc(t(ui.problem))}.</strong> ${esc(project.problem)}</p>` : ''}
      <ol class="steps">${project.steps.map((step) => `<li><strong>${esc(step.title)}.</strong> ${esc(step.text)}</li>`).join('')}</ol>
      ${project.stack.length ? `<p class="stack"><strong>${esc(t(ui.stack))}:</strong> ${project.stack.map(esc).join(', ')}</p>` : ''}
      ${project.note ? `<p class="note">${esc(project.note)}</p>` : ''}
    </div>
  </details>`;

const app = document.getElementById('app')!;
app.innerHTML = `
<a class="skip" href="#work">${locale === 'no' ? 'Hopp til prosjektene' : 'Skip to the projects'}</a>
<header class="bar">
  <a href="#top" class="bar-name">${esc(person.name)}</a>
  <nav aria-label="${locale === 'no' ? 'Hovedmeny' : 'Main'}">
    <a href="#work">${esc(t(ui.work))}</a>
    <a href="#about">${esc(t(ui.about))}</a>
    <a href="#contact">${esc(t(ui.contact))}</a>
    <a href="${person.cv}" target="_blank" rel="noopener">CV</a>
    <a href="?lang=${other}" hreflang="${other === 'no' ? 'nb' : 'en'}" lang="${other === 'no' ? 'nb' : 'en'}" class="lang">${esc(t(ui.language))}</a>
  </nav>
</header>

<main id="top">
  <section class="intro" aria-labelledby="intro-title">
    <p class="eyebrow">${esc(person.role)}</p>
    <h1 id="intro-title">${esc(person.statement)}</h1>

    <figure class="model-fig">
      <div class="model" role="slider" tabindex="0" aria-label="${esc(t(ui.drag))}" aria-valuemin="${Math.round((ANGLE_MIN * 180) / Math.PI)}" aria-valuemax="${Math.round((ANGLE_MAX * 180) / Math.PI)}">
        <svg aria-hidden="true"></svg>
        <ul class="layer-labels">
          ${LENSES.map((lens) => `<li data-lens="${lens}"><strong>${esc(layers[lens].name)}</strong><span>${esc(layers[lens].principle)}</span></li>`).join('')}
        </ul>
      </div>
      <figcaption>
        <p class="model-caption">${esc(t(ui.modelLabel))}</p>
        <div class="picker" role="group" aria-label="${esc(t(ui.choose))}">
          ${projects.map((p) => `<button type="button" data-pick="${p.id}" aria-pressed="false"><span>${esc(p.orgShort)}</span> ${esc(p.short)}</button>`).join('')}
        </div>
        <div class="trace" aria-live="polite"></div>
      </figcaption>
    </figure>

    <p class="support">${esc(person.support)}</p>
    <p class="actions">
      <a class="go" href="#work">${esc(t(ui.seeWork))} <span aria-hidden="true">↓</span></a>
      <a href="${person.cv}" target="_blank" rel="noopener">${esc(t(ui.cv))}</a>
    </p>
  </section>

  <section id="work" class="work" aria-labelledby="work-title">
    <h2 id="work-title" class="section-title">${esc(t(ui.work))}</h2>
    ${projects
      .map(
        (p) => `
    <article class="project" id="${p.id}" aria-labelledby="${p.id}-title">
      <div class="project-text">
        <p class="meta">${esc(p.org)} <span>· ${esc(p.context)} · ${esc(p.period)}</span></p>
        <h3 id="${p.id}-title">${esc(p.title)}</h3>
        <p class="summary">${esc(p.summary)}</p>
        <dl class="facts">${p.facts.map((fact) => `<div><dt>${esc(fact.label)}</dt><dd>${esc(fact.text)}</dd></div>`).join('')}</dl>
        ${thread(p)}
      </div>
      ${visual(p)}
      <div class="project-more">
        ${p.links.length ? `<p class="links">${p.links.map((link) => `<a href="${esc(link.href)}" ${external}>${esc(link.label)}</a>`).join('')}</p>` : ''}
        ${details(p)}
      </div>
    </article>`,
      )
      .join('')}
  </section>

  <section id="about" class="about" aria-labelledby="about-title">
    <h2 id="about-title" class="section-title">${esc(t(ui.about))}</h2>
    <div class="about-grid">
      <figure class="portrait">
        <img src="${person.portrait.src}" width="880" height="1100" alt="${esc(person.portrait.alt)}" loading="lazy" />
        <figcaption>${esc(person.portrait.credit)}</figcaption>
      </figure>
      <div>
        <p class="about-lead">${esc(person.about)}</p>
        <dl class="facts facts--about">${person.facts.map((fact) => `<div><dt>${esc(fact.label)}</dt><dd>${esc(fact.text)}</dd></div>`).join('')}</dl>
      </div>
    </div>
  </section>

  <section class="record" aria-labelledby="record-title">
    <h2 id="record-title" class="section-title">${esc(t(ui.record))}</h2>
    <div class="record-grid">
      <div>
        <h3>${esc(t(ui.elected))}</h3>
        <p class="award"><strong>${esc(leadership.award)}.</strong> ${esc(leadership.story)} <a href="${leadership.diploma}" target="_blank" rel="noopener">${esc(leadership.diplomaLabel)}</a></p>
        <ul class="rows">${leadership.roles.map((r) => `<li${r.current ? ' class="now"' : ''}><span>${esc(r.period)}</span><p>${esc(r.title)}<small>${esc(r.org)}</small></p></li>`).join('')}</ul>
      </div>
      <div>
        <h3>${esc(t(ui.education))}</h3>
        <ul class="rows">${record.map((r) => `<li><span>${esc(r.period)}</span><p>${esc(r.title)}<small>${esc(r.org)}</small></p></li>`).join('')}</ul>
      </div>
    </div>
  </section>

  <section id="contact" class="contact" aria-labelledby="contact-title">
    <h2 id="contact-title" class="section-title">${esc(t(ui.contact))}</h2>
    <a class="email" href="mailto:${person.email}">${esc(person.email)}</a>
    <p class="links">
      <a href="${person.cv}" target="_blank" rel="noopener">${esc(t(ui.cv))}</a><span class="hint">${esc(t(ui.cvNote))}</span>
      <a href="${person.linkedin}" ${external}>LinkedIn</a>
      <a href="${person.github}" ${external}>GitHub</a>
    </p>
  </section>
</main>
<footer class="foot">Prototype B2. ${locale === 'no' ? 'Satt i IBM Plex.' : 'Set in IBM Plex.'}</footer>`;

/* ── The model ─────────────────────────────────────── */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const model = document.querySelector<HTMLElement>('.model')!;
const svg = model.querySelector('svg')!;
const labels = Array.from(model.querySelectorAll<HTMLElement>('.layer-labels li'));
const trace = document.querySelector<HTMLElement>('.trace')!;
const pickers = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-pick]'));
let angle = ANGLE_START;
let active: ProjectKey = 'phonero';

const draw = () => {
  // On a narrow model the labels sit in a slim column with the layer name only.
  const wide = model.clientWidth >= 520;
  model.classList.toggle('is-narrow', !wide);
  const inset = wide ? 190 : 92;
  const current = projects.find((p) => p.id === active)!;
  const escaped = Object.fromEntries(LENSES.map((lens) => [lens, esc(current.thread[lens])])) as Project['thread'];
  const anchors = drawModel(svg, { angle, active, labels: escaped }, inset);
  for (const anchor of anchors) {
    const label = labels.find((item) => item.dataset.lens === anchor.lens)!;
    label.style.top = `${anchor.y}px`;
    label.style.width = `${inset - 14}px`;
  }
  model.setAttribute('aria-valuenow', String(Math.round((angle * 180) / Math.PI)));
  model.setAttribute('aria-valuetext', `${Math.round((angle * 180) / Math.PI)}°`);
};

const select = (key: ProjectKey) => {
  active = key;
  const current = projects.find((p) => p.id === key)!;
  pickers.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.pick === key)));
  trace.innerHTML = `
    <dl class="sr-only">${LENSES.map((lens) => `<div><dt>${esc(layers[lens].name)}</dt><dd>${esc(current.thread[lens])}</dd></div>`)
      .join('')}</dl>
    <a href="#${key}">${esc(t(ui.read))}: ${esc(current.short.toLowerCase())} <span aria-hidden="true">→</span></a>`;
  draw();
};

pickers.forEach((button) => button.addEventListener('click', () => select(button.dataset.pick as ProjectKey)));

const turn = (to: number) => {
  angle = Math.min(ANGLE_MAX, Math.max(ANGLE_MIN, to));
  draw();
};

let dragging = false;
let lastX = 0;
svg.addEventListener('pointerdown', (event) => {
  dragging = true;
  lastX = event.clientX;
  svg.setPointerCapture(event.pointerId);
  model.classList.add('is-dragging');
});
svg.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  turn(angle + (event.clientX - lastX) * 0.006);
  lastX = event.clientX;
});
const release = () => {
  dragging = false;
  model.classList.remove('is-dragging');
};
svg.addEventListener('pointerup', release);
svg.addEventListener('pointercancel', release);
model.addEventListener('keydown', (event) => {
  const step = {
    ArrowLeft: -0.08,
    ArrowDown: -0.08,
    ArrowRight: 0.08,
    ArrowUp: 0.08,
  }[event.key];
  if (event.key === 'Home') turn(ANGLE_START);
  else if (step) turn(angle + step);
  else return;
  event.preventDefault();
});

new ResizeObserver(draw).observe(model);
select('phonero');

/* ── Project visuals ───────────────────────────────── */

mountEquipment(document.getElementById('equipment')!, {
  autoSwitch: false,
  labels: equipmentLabels,
});

// The digital-twin grid, drawn once and redrawn only when a block is pointed at.
function mountTwin(root: HTMLElement) {
  const canvas = root.querySelector('canvas')!;
  const output = root.querySelector('output')!;
  const context = canvas.getContext('2d')!;
  const blocks = buildBlocks(8, 6);
  const max = Math.max(...blocks.map((block) => block.storeys));
  let view: View = { unit: 1, origin: { x: 0, y: 0 } };
  let hover = -1;
  let width = 0;
  let height = 0;

  const draw = () => {
    context.clearRect(0, 0, width, height);
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(232, 228, 214, 0.12)';
    for (let i = 0; i <= 8; i++) {
      const a = projectPoint(view, i, 0);
      const b = projectPoint(view, i, 6);
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
    for (let j = 0; j <= 6; j++) {
      const a = projectPoint(view, 0, j);
      const b = projectPoint(view, 8, j);
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
    blocks.forEach((block, index) => {
      if (!block.storeys) return;
      const faces = prism(view, block, block.storeys);
      for (const [face, alpha] of [
        [faces.right, 0.04],
        [faces.left, 0.08],
        [faces.top, index === hover ? 0.85 : 0.1],
      ] as const) {
        context.beginPath();
        face.forEach((p, i) => (i ? context.lineTo(p.x, p.y) : context.moveTo(p.x, p.y)));
        context.closePath();
        context.fillStyle = `rgba(240, 180, 69, ${alpha})`;
        context.fill();
        context.strokeStyle = 'rgba(232, 228, 214, 0.32)';
        context.stroke();
      }
    });
  };

  const resize = () => {
    const rect = root.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    view = fitView(width, height, 8, 6, max);
    draw();
  };

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const next = blockAt(view, blocks, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    if (next === hover) return;
    hover = next;
    const block = blocks[hover];
    output.textContent = block
      ? `${twinLabels.block} ${String.fromCharCode(65 + block.gx)}${block.gy + 1}, ${block.storeys} ${twinLabels.storeys}`
      : t(ui.twinIdle);
    draw();
  });
  canvas.addEventListener('pointerleave', () => {
    hover = -1;
    output.textContent = t(ui.twinIdle);
    draw();
  });

  new ResizeObserver(resize).observe(root);
}
mountTwin(document.querySelector<HTMLElement>('.twin')!);

if (reduce) document.documentElement.style.scrollBehavior = 'auto';
mountSwitcher('b2');
