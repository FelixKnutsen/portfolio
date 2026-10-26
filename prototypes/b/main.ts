/*
  Prototype B, "Instrument": the portfolio as a model you can turn over.
  Dark olive, chalk and one amber signal; IBM Plex Sans and Mono. The layer
  model (People, Process, Technology) stays beside the projects while you
  read, and each project lights its own thread through the three layers.
*/
import './style.css';
import { approach, background, esc, leadership, message, person, projects, type Project } from '../shared/content';
import { mountEquipment } from '../shared/equipment';
import { mountSwitcher } from '../shared/switcher';
import { blockAt, buildBlocks, fitView, prism, project as projectPoint, type View } from '../../src/lib/twin';
import { drawModel, type ModelState, type ProjectKey } from './model';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const readout = (project: Project) => `
  <dl class="readout">
    <div><dt>role</dt><dd>${esc(project.roleShort)}</dd></div>
    <div><dt>period</dt><dd>${esc(project.period)}</dd></div>
    <div><dt>methods</dt><dd>${project.methods.map(esc).join(', ')}</dd></div>
    ${project.built.length ? `<div><dt>built with</dt><dd>${project.built.map(esc).join(', ')}</dd></div>` : ''}
  </dl>`;

const log = (project: Project) => `
  <details class="log">
    <summary>Process log <span>${project.steps.length + 1} entries</span></summary>
    <ol>
      <li><span>problem</span>${esc(project.problem)}</li>
      ${project.steps.map((step) => `<li><span>${esc(step.title)}</span>${esc(step.text)}</li>`).join('')}
      ${project.result ? `<li><span>${esc(project.result.label)}</span>${esc(project.result.text)}</li>` : ''}
    </ol>
  </details>`;

const panel = (project: Project) => {
  if (project.id === 'phonero') {
    return `<figure class="panel"><div id="equipment"></div><figcaption>Made-up names and devices. The real interface is Phonero’s.</figcaption></figure>`;
  }
  if (project.id === 'sta') {
    return `<figure class="panel panel--shot">
      <div class="annotated">
        <img src="/prototypes/assets/sta-verv.webp" width="1280" height="800" alt="The prototype’s page about councils, boards and committees" />
        <span class="pin" style="left:94%;top:5%"><b>Bokmål, Nynorsk and English</b></span>
        <span class="pin" style="left:88.5%;top:5%" data-side="left"><b>Search</b></span>
        <span class="pin" style="left:50%;top:51%"><b>Colours adjusted for WCAG 2.2 AA</b></span>
      </div>
      <figcaption>stastudent.vercel.app, with three of the details that took the most care.</figcaption>
    </figure>`;
  }
  return `<figure class="panel panel--twin"><div class="twin"><canvas aria-hidden="true"></canvas><output class="twin-readout">point at a block</output></div><figcaption>A grid of city blocks, like Kvadraturen. A digital twin links a model like this to data about it.</figcaption></figure>`;
};

const app = document.getElementById('app')!;
app.innerHTML = `
<header class="bar">
  <a href="#top" class="bar-name">${esc(person.name)}</a>
  <nav aria-label="Main"><a href="#work">work</a><a href="#profile">profile</a><a href="#contact">contact</a><a href="${person.cv}" target="_blank" rel="noopener">cv</a></nav>
</header>

<main id="top">
  <div class="stage">
    <div class="flow">
      <section class="hero" aria-labelledby="hero-title">
        <p class="id">${esc(person.role)}<br />${esc(person.school)}, ${esc(person.finishing)}</p>
        <h1 id="hero-title">${esc(message.short[0])} <span>${esc(message.short[1])}</span></h1>
        <p class="standfirst">${esc(message.standfirst)}</p>
        <div class="legend" role="group" aria-label="Highlight a project in the model">
          ${projects.map((p) => `<button type="button" data-thread="${p.id}"><i></i>${esc(p.org)}</button>`).join('')}
        </div>
      </section>

      <div id="work">
        ${projects
          .map(
            (p) => `
        <article class="project" id="${p.id}" data-project="${p.id}" aria-labelledby="${p.id}-title">
          <p class="project-meta"><span>${esc(p.year)}</span><span>${esc(p.org)}</span><span>${esc(p.context)}</span></p>
          <h2 id="${p.id}-title">${esc(p.title)}</h2>
          <p class="summary">${esc(p.summary)}</p>
          ${readout(p)}
          ${panel(p)}
          ${p.links.length ? `<p class="links">${p.links.map((link) => `<a href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`).join('')}</p>` : ''}
          ${log(p)}
        </article>`,
          )
          .join('')}
      </div>
    </div>

    <div class="model-col" aria-hidden="true">
      <div class="model-wrap">
        <svg class="model"></svg>
        <p class="model-hint">drag to turn</p>
      </div>
    </div>
  </div>

  <section id="profile" class="profile" aria-labelledby="profile-title">
    <h2 id="profile-title">Profile</h2>
    <p class="lead">${esc(message.about)}</p>
    <dl class="readout readout--wide">
      <div><dt>looking for</dt><dd>${esc(message.seeking)}</dd></div>
      <div><dt>now</dt><dd>${esc(message.now)}</dd></div>
      <div><dt>based in</dt><dd>${esc(message.place)}</dd></div>
    </dl>
    <ul class="principles">${approach.map((item) => `<li><strong>${esc(item.title)}</strong>${esc(item.text)}</li>`).join('')}</ul>
  </section>

  <section class="tables" aria-label="Elected roles and record">
    <div>
      <h2>Elected roles</h2>
      <p class="award"><strong>${esc(leadership.award.title)}.</strong> ${esc(leadership.award.text)} <a href="${leadership.award.diploma}" target="_blank" rel="noopener">diploma</a></p>
      <table>
        <tbody>${leadership.roles.map((r) => `<tr${r.current ? ' class="now"' : ''}><td>${esc(r.period)}</td><td>${esc(r.title)}<span>${esc(r.org)}</span></td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div>
      <h2>Record</h2>
      <table>
        <tbody>
          ${background.education.map((e) => `<tr><td>${esc(e.period)}</td><td>${esc(e.title)}<span>${esc(e.org)}</span></td></tr>`).join('')}
          ${background.work.map((w) => `<tr><td>${esc(w.period)}</td><td>${esc(w.title)}<span>${esc(w.org)}</span></td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>

  <section id="contact" class="contact" aria-labelledby="contact-title">
    <h2 id="contact-title">Contact</h2>
    <a class="email" href="mailto:${person.email}">${esc(person.email)}</a>
    <p class="links"><a href="${person.cv}" target="_blank" rel="noopener">CV (PDF)</a><a href="${person.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="${person.github}" target="_blank" rel="noopener noreferrer">GitHub</a></p>
  </section>
</main>
<footer class="foot">Set in IBM Plex. Prototype B of three, October 2026.</footer>`;

/* ── The layer model ───────────────────────────────── */

const svg = document.querySelector<SVGSVGElement>('.model')!;
const state: ModelState = { angle: -0.35, spread: 0.8, active: null };
let hovered: ProjectKey | null = null;
let scrolled: ProjectKey | null = null;
let velocity = reduce ? 0 : 0.0016;
let dragging = false;
let lastX = 0;
let frame = 0;

const redraw = () => {
  state.active = hovered ?? scrolled;
  drawModel(svg, state);
};

const tick = () => {
  if (!dragging) {
    state.angle += velocity;
    // Let a flick slow down to the idle drift.
    velocity += ((reduce ? 0 : 0.0016) - velocity) * 0.04;
  }
  redraw();
  frame = requestAnimationFrame(tick);
};

svg.addEventListener('pointerdown', (event) => {
  dragging = true;
  lastX = event.clientX;
  svg.setPointerCapture(event.pointerId);
});
svg.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  const dx = event.clientX - lastX;
  lastX = event.clientX;
  state.angle += dx * 0.008;
  velocity = dx * 0.008;
});
const release = () => (dragging = false);
svg.addEventListener('pointerup', release);
svg.addEventListener('pointercancel', release);

document.querySelectorAll<HTMLButtonElement>('[data-thread]').forEach((button) => {
  const key = button.dataset.thread as ProjectKey;
  button.addEventListener('pointerenter', () => (hovered = key));
  button.addEventListener('pointerleave', () => (hovered = null));
  button.addEventListener('focus', () => (hovered = key));
  button.addEventListener('blur', () => (hovered = null));
  button.addEventListener('click', () => document.getElementById(key)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }));
});

// The project being read lights its thread; the plates open up as the reader goes deeper.
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) scrolled = (entry.target as HTMLElement).dataset.project as ProjectKey;
    }
  },
  { rootMargin: '-45% 0px -45% 0px' },
);
document.querySelectorAll('[data-project]').forEach((element) => observer.observe(element));
const work = document.getElementById('work')!;
const onScroll = () => {
  const rect = work.getBoundingClientRect();
  if (rect.top > window.innerHeight * 0.6) scrolled = null;
  const depth = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / window.innerHeight));
  state.spread = 0.8 + depth * 0.25;
  if (reduce) redraw();
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
if (reduce) {
  redraw();
  window.addEventListener('resize', redraw);
} else {
  frame = requestAnimationFrame(tick);
}
void frame;

/* ── Projects ───────────────────────────────────────── */

mountEquipment(document.getElementById('equipment')!);

// The digital-twin grid, drawn as amber linework, with a readout of the block under the pointer.
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

  const draw = (time = 0) => {
    context.clearRect(0, 0, width, height);
    const sweep = reduce ? -10 : ((time / 2800) % 1) * 18 - 2;
    blocks.forEach((block, index) => {
      if (!block.storeys) return;
      const faces = prism(view, block, block.storeys);
      const near = Math.max(0, 1 - Math.abs(block.gx + block.gy - sweep) / 1.4);
      for (const [face, alpha] of [
        [faces.right, 0.05],
        [faces.left, 0.09],
        [faces.top, index === hover ? 0.9 : 0.12 + near * 0.35],
      ] as const) {
        context.beginPath();
        face.forEach((p, i) => (i ? context.lineTo(p.x, p.y) : context.moveTo(p.x, p.y)));
        context.closePath();
        context.fillStyle = `rgba(240, 180, 69, ${alpha})`;
        context.fill();
        context.strokeStyle = `rgba(232, 228, 214, ${0.28 + near * 0.5})`;
        context.lineWidth = 1;
        context.stroke();
      }
    });
    // Ground grid.
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
    hover = blockAt(view, blocks, { x: event.clientX - rect.left, y: event.clientY - rect.top });
    const block = blocks[hover];
    output.textContent = block ? `block ${String.fromCharCode(65 + block.gx)}${block.gy + 1}  ·  ${block.storeys} storeys` : 'point at a block';
  });
  canvas.addEventListener('pointerleave', () => {
    hover = -1;
    output.textContent = 'point at a block';
  });

  new ResizeObserver(resize).observe(root);
  const loop = (time: number) => {
    draw(time);
    requestAnimationFrame(loop);
  };
  if (!reduce) requestAnimationFrame(loop);
}
mountTwin(document.querySelector<HTMLElement>('.twin')!);

mountSwitcher('b');
