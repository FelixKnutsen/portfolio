/*
  The remake: B2's idea with far fewer words and more to look at. The page
  is six stops. It opens on the statement and the model with every thread
  lit, then gives each project a visual, one sentence and its own thread,
  then photos, the award, a timeline and contact. Everything else sits
  behind an explicit "read more".
*/
import './style.css';
import { esc } from '../shared/content';
import { mountEquipment } from '../shared/equipment';
import { mountSwitcher } from '../shared/switcher';
import {
  award,
  AXIS,
  captions,
  equipmentLabels,
  lanes,
  layers,
  LENSES,
  locale,
  moments,
  person,
  stops,
  t,
  text,
  today,
  twinLabels,
  ui,
  type Project,
  type ProjectKey,
} from './content';
import { ANGLE_MAX, ANGLE_MIN, ANGLE_START, drawModel } from './model';
import { mountTwin } from './twin';

document.documentElement.lang = locale === 'no' ? 'nb' : 'en';
const other = locale === 'no' ? 'en' : 'no';
const external = 'target="_blank" rel="noopener noreferrer"';
type Stop = (typeof stops)[number];

const visual = (project: Stop) => {
  const caption = `<figcaption>${esc(captions[project.id])}</figcaption>`;
  if (project.id === 'phonero') return `<figure class="visual"><div id="equipment"></div>${caption}</figure>`;
  if (project.id === 'sta') {
    return `<figure class="visual">
      <div class="shots">
        <img class="shot-laptop" src="/prototypes/assets/sta-verv.webp" width="1280" height="800" alt="${esc(t(ui.shotAlt))}" loading="lazy" />
        <img class="shot-phone" src="/prototypes/assets/sta-verv-phone.webp" width="780" height="1688" alt="${esc(t(ui.shotPhoneAlt))}" loading="lazy" />
      </div>
      <figcaption><a href="https://stastudent.vercel.app" ${external}>${esc(captions.sta)}</a></figcaption>
    </figure>`;
  }
  return `<figure class="visual"><div class="twin"><canvas aria-hidden="true"></canvas><output class="twin-readout">${esc(t(ui.twinIdle))}</output></div>${caption}</figure>`;
};

const longCaption = (project: Project) => (project.id === 'sta' ? t(ui.shot) : project.id === 'kommune' ? twinLabels.caption : '');

const details = (project: Stop) => `
  <details class="more">
    <summary>${esc(t(text.more))}</summary>
    <div class="more-body">
      <p>${esc(project.problem ?? project.summary)}${project.problem && project.intro !== project.sentence ? ` ${esc(project.intro)}` : ''}</p>
      <dl class="facts">${project.facts
        .filter((fact) => !project.sentence.includes(fact.text))
        .map((fact) => `<div><dt>${esc(fact.label)}</dt><dd>${esc(fact.text)}</dd></div>`)
        .join('')}</dl>
      <ol class="steps">${project.steps.map((step) => `<li><strong>${esc(step.title)}.</strong> ${esc(step.text)}</li>`).join('')}</ol>
      ${project.stack.length ? `<p><strong>${esc(t(ui.stack))}:</strong> ${project.stack.map(esc).join(', ')}</p>` : ''}
      ${project.links.length ? `<p class="links">${project.links.map((link) => `<a href="${esc(link.href)}" ${external}>${esc(link.label)}</a>`).join('')}</p>` : ''}
      ${[project.note, longCaption(project)]
        .filter(Boolean)
        .map((note) => `<p class="note">${esc(note!)}</p>`)
        .join('')}
    </div>
  </details>`;

const span = AXIS.end - AXIS.start;
const pct = (year: number) => `${(((year - AXIS.start) / span) * 100).toFixed(2)}%`;
// The last year is the right edge of the chart, so it gets no label of its own.
const years = Array.from({ length: span }, (_, i) => AXIS.start + i);

const app = document.getElementById('app')!;
app.innerHTML = `
<a class="skip" href="#work">${locale === 'no' ? 'Hopp til prosjektene' : 'Skip to the projects'}</a>
<header class="bar">
  <a href="#top" class="bar-name">${esc(person.name)}</a>
  <nav aria-label="${locale === 'no' ? 'Hovedmeny' : 'Main'}">
    <a href="#work">${esc(t(ui.work))}</a>
    <a href="#contact">${esc(t(ui.contact))}</a>
    <a href="${person.cv}" target="_blank" rel="noopener">CV</a>
    <a href="?lang=${other}" hreflang="${other === 'no' ? 'nb' : 'en'}" lang="${other === 'no' ? 'nb' : 'en'}" class="lang">${esc(t(ui.language))}</a>
  </nav>
</header>

<main id="top">
  <section class="opening" aria-labelledby="opening-title">
    <p class="eyebrow">${esc(t(text.role))}</p>
    <h1 id="opening-title">${esc(person.statement)}</h1>
    <figure class="model-fig">
      <div class="model" data-model="all" role="slider" tabindex="0" aria-label="${esc(t(ui.drag))}" aria-valuemin="${Math.round((ANGLE_MIN * 180) / Math.PI)}" aria-valuemax="${Math.round((ANGLE_MAX * 180) / Math.PI)}">
        <svg aria-hidden="true"></svg>
        <ul class="layer-labels">${LENSES.map((lens) => `<li data-lens="${lens}">${esc(layers[lens].name)}</li>`).join('')}</ul>
      </div>
      <figcaption class="sr-only">${esc(t(ui.modelLabel))} ${stops.map((p) => esc(p.orgShort)).join(', ')}.</figcaption>
    </figure>
    <p class="actions"><a class="go" href="#work">${esc(t(ui.work))} <span aria-hidden="true">↓</span></a></p>
  </section>

  <div id="work">
    ${stops
      .map(
        (p, index) => `
    <article class="stop${index % 2 ? ' stop--flip' : ''}" id="${p.id}" aria-labelledby="${p.id}-title">
      ${visual(p)}
      <div class="stop-text">
        <p class="meta">${esc(p.orgShort)} <span>${esc(p.year)}</span></p>
        <h2 id="${p.id}-title">${esc(p.title)}</h2>
        <p class="sentence">${esc(p.sentence)}</p>
        <figure class="thread">
          <svg data-thread="${p.id}" aria-hidden="true"></svg>
          <figcaption class="sr-only">${LENSES.map((lens) => `${esc(layers[lens].name)}: ${esc(p.thread[lens])}`).join('. ')}.</figcaption>
        </figure>
        ${details(p)}
      </div>
    </article>`,
      )
      .join('')}
  </div>

  <section class="seen" aria-labelledby="seen-title">
    <h2 id="seen-title" class="label">${esc(t(text.seen))}</h2>
    <ul class="moments">
      ${moments
        .map(
          (m) => `
      <li>
        <div class="photo" role="img" aria-label="${esc(t(text.photoPending))}"><span>${esc(t(text.photoPending))}</span></div>
        <p>${esc(m.title)}<small>${esc(m.org)}, ${esc(m.year)}</small></p>
      </li>`,
        )
        .join('')}
    </ul>
  </section>

  <section class="award" aria-labelledby="award-title">
    <div class="dots" role="img" aria-label="${esc(award.figureLabel)}">${Array.from({ length: 25 }, (_, i) => `<i${i === 12 ? ' class="won"' : ''}></i>`).join('')}</div>
    <div>
      <h2 id="award-title">${esc(award.title)}</h2>
      <p class="sentence">${esc(award.figure)}</p>
      <p class="links"><a href="${award.diploma}" target="_blank" rel="noopener">${esc(award.diplomaLabel)}</a></p>
    </div>
  </section>

  <section class="timeline" aria-labelledby="timeline-title">
    <h2 id="timeline-title" class="label">${esc(t(text.timeline))}</h2>
    <div class="chart">
      <div class="axis" aria-hidden="true">${years.map((year) => `<span style="left:${pct(year)}">${year}</span>`).join('')}</div>
      ${lanes
        .map(
          (lane) => `
      <h3>${esc(lane.name)}</h3>
      <ul>
        ${lane.bars
          .map(
            (b) => `
        <li>
          <p>${esc(b.title)} <small>${esc(b.org)}</small></p>
          <div class="track"><i class="${b.ongoing ? 'ongoing' : ''}" style="left:${pct(b.from)};width:${(((b.to - b.from) / span) * 100).toFixed(2)}%"></i></div>
          <span class="sr-only">${Math.floor(b.from)} – ${b.ongoing ? esc(t(text.today)) : Math.floor(b.to - 0.01)}</span>
        </li>`,
          )
          .join('')}
      </ul>`,
        )
        .join('')}
      <div class="today" style="--at:${((today - AXIS.start) / span).toFixed(4)}" aria-hidden="true"><span>${esc(t(text.today))}</span></div>
    </div>
  </section>

  <section id="contact" class="contact" aria-labelledby="contact-title">
    <div>
      <h2 id="contact-title" class="label">${esc(t(text.getInTouch))}</h2>
      <a class="email" href="mailto:${person.email}">${esc(person.email)}</a>
      <p class="links">
        <a href="${person.cv}" target="_blank" rel="noopener">CV</a>
        <a href="${person.linkedin}" ${external}>LinkedIn</a>
        <a href="${person.github}" ${external}>GitHub</a>
      </p>
    </div>
    <form class="form">
      <label>${esc(t(text.name))}<input name="name" autocomplete="name" required /></label>
      <label>${esc(t(text.message))}<textarea name="message" rows="3" required></textarea></label>
      <button type="submit">${esc(t(text.send))}</button>
      <p class="note sr-only">${esc(t(text.formNote))}</p>
    </form>
  </section>
</main>`;

/* ── Models ────────────────────────────────────────── */

const tags = Object.fromEntries(stops.map((p) => [p.id, esc(p.orgShort)])) as Record<ProjectKey, string>;
const model = document.querySelector<HTMLElement>('.model')!;
const svg = model.querySelector('svg')!;
const layerLabels = Array.from(model.querySelectorAll<HTMLElement>('.layer-labels li'));
let angle = ANGLE_START;

const drawOpening = () => {
  const inset = model.clientWidth >= 520 ? 110 : 88;
  for (const anchor of drawModel(svg, { angle, active: null, tags }, inset)) {
    layerLabels.find((item) => item.dataset.lens === anchor.lens)!.style.top = `${anchor.y}px`;
  }
  model.setAttribute('aria-valuenow', String(Math.round((angle * 180) / Math.PI)));
};

const turn = (to: number) => {
  angle = Math.min(ANGLE_MAX, Math.max(ANGLE_MIN, to));
  drawOpening();
};

let dragging = false;
let lastX = 0;
svg.addEventListener('pointerdown', (event) => {
  dragging = true;
  lastX = event.clientX;
  svg.setPointerCapture(event.pointerId);
});
svg.addEventListener('pointermove', (event) => {
  if (!dragging) return;
  turn(angle + (event.clientX - lastX) * 0.006);
  lastX = event.clientX;
});
const release = () => (dragging = false);
svg.addEventListener('pointerup', release);
svg.addEventListener('pointercancel', release);
model.addEventListener('keydown', (event) => {
  const step = { ArrowLeft: -0.08, ArrowDown: -0.08, ArrowRight: 0.08, ArrowUp: 0.08 }[event.key];
  if (event.key === 'Home') turn(ANGLE_START);
  else if (step) turn(angle + step);
  else return;
  event.preventDefault();
});
new ResizeObserver(drawOpening).observe(model);

// Each project draws the same model small, with only its own thread lit and labelled.
document.querySelectorAll<SVGSVGElement>('[data-thread]').forEach((small) => {
  const project = stops.find((p) => p.id === small.dataset.thread)!;
  const labels = Object.fromEntries(LENSES.map((lens) => [lens, esc(project.thread[lens])])) as Project['thread'];
  const draw = () => drawModel(small, { angle: ANGLE_START, active: project.id, labels }, 0);
  new ResizeObserver(draw).observe(small);
});

/* ── Project visuals and the form ──────────────────── */

mountEquipment(document.getElementById('equipment')!, { autoSwitch: false, labels: equipmentLabels });
mountTwin(document.querySelector<HTMLElement>('.twin')!);

// The production site sends through its own form service. Here the form only opens an email draft.
document.querySelector<HTMLFormElement>('.form')!.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget as HTMLFormElement);
  window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(String(data.get('name')))}&body=${encodeURIComponent(String(data.get('message')))}`;
});

mountSwitcher('remake');
