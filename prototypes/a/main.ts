/*
  Prototype A, "Feature": the portfolio as a magazine profile.
  Newsprint, ink and oxblood; one serif (Newsreader) at every size; black and
  white photography; projects as spreads with a pull quote, and the detail
  kept visible but quiet in note columns, the way a feature carries footnotes.
*/
import './style.css';
import { approach, background, esc, leadership, message, person, projects, type Project } from '../shared/content';
import { mountEquipment } from '../shared/equipment';
import { mountSwitcher, revealOnScroll } from '../shared/switcher';

document.documentElement.classList.add('js');

const [phonero, sta, kommune] = projects;

const facts = (project: Project) => `
  <dl class="facts">
    <div><dt>Role</dt><dd>${esc(project.roleShort)}</dd></div>
    <div><dt>When</dt><dd>${esc(project.period)}</dd></div>
    <div><dt>Methods</dt><dd>${project.methods.map(esc).join(', ')}</dd></div>
    ${project.built.length ? `<div><dt>Built with</dt><dd>${project.built.map(esc).join(', ')}</dd></div>` : ''}
  </dl>`;

const notes = (project: Project, extra = '') => `
  <aside class="notes" aria-label="Notes on ${esc(project.org)}">
    <p class="notes-head">Notes</p>
    <ol>
      <li><strong>The problem.</strong> ${esc(project.problem)}</li>
      ${project.steps.map((step) => `<li><strong>${esc(step.title)}.</strong> ${esc(step.text)}</li>`).join('')}
      ${project.result && project.id !== 'kommune' ? `<li><strong>${esc(project.result.label)}.</strong> ${esc(project.result.text)}</li>` : ''}
    </ol>
    ${extra}
  </aside>`;

const links = (project: Project) =>
  project.links.length
    ? `<p class="links">${project.links
        .map((link) => `<a href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(link.label)}</a>`)
        .join('')}</p>`
    : '';

/** A plan of a street grid, like Kvadraturen, drawn as a quiet line figure. */
function planDrawing(): string {
  const cols = 9;
  const rows = 6;
  const cell = 40;
  const street = 9;
  const blocks: string[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const open = (x === 4 && y === 2) || (x === 7 && y === 4);
      blocks.push(
        `<rect x="${x * cell + street / 2}" y="${y * cell + street / 2}" width="${cell - street}" height="${cell - street}" class="${open ? 'open' : ''}" />`,
      );
    }
  }
  return `<svg class="plan" viewBox="-4 -4 ${cols * cell + 8} ${rows * cell + 8}" role="img" aria-label="Line drawing of a regular street grid">${blocks.join('')}</svg>`;
}

const app = document.getElementById('app')!;
app.innerHTML = `
<header class="masthead">
  <a class="mast-name" href="#top">Felix Fabricius Knutsen</a>
  <nav class="mast-nav" aria-label="Main">
    <a href="#work">Work</a><a href="#profile">Profile</a><a href="#contact">Contact</a><a href="${person.cv}" target="_blank" rel="noopener">CV</a>
  </nav>
</header>

<main id="top">
  <section class="cover" aria-labelledby="cover-title">
    <h1 id="cover-title" class="cover-title"><span>${esc(message.short[0])}</span> <em>${esc(message.short[1])}</em></h1>
    <figure class="cover-portrait" data-reveal>
      <picture>
        <source type="image/webp" srcset="${person.portrait.webp}" />
        <img src="${person.portrait.jpg}" width="880" height="1100" alt="${esc(person.portrait.alt)}" />
      </picture>
      <figcaption>${esc(person.name)}. ${esc(person.portrait.credit)}</figcaption>
    </figure>
    <p class="standfirst">${esc(message.standfirst)}</p>
    <ol class="contents" id="work" aria-label="Projects">
      ${projects
        .map(
          (project) =>
            `<li><a href="#${project.id}"><span class="contents-org">${esc(project.org)}</span><span class="contents-title">${esc(project.title)}</span></a></li>`,
        )
        .join('')}
    </ol>
  </section>

  <article id="phonero" class="spread" aria-labelledby="phonero-title">
    <header class="spread-head">
      <p class="kicker">${esc(phonero.org)}, ${esc(phonero.context.toLowerCase())}</p>
      <h2 id="phonero-title" class="spread-title">${esc(phonero.title)}</h2>
    </header>
    <div class="spread-body">
      <div class="spread-text">
        <p class="dek">${esc(phonero.summary)}</p>
        ${facts(phonero)}
      </div>
      <figure class="plate">
        <div id="equipment"></div>
        <figcaption>Drawn with made-up names and devices. The real interface is Phonero’s and not public.</figcaption>
      </figure>
    </div>
    <blockquote class="pull"><p>${esc(phonero.quote!)}</p></blockquote>
    ${notes(phonero)}
  </article>

  <article id="sta" class="spread" aria-labelledby="sta-title">
    <header class="spread-head">
      <p class="kicker">${esc(sta.org)}, ${esc(sta.context.toLowerCase())}</p>
      <h2 id="sta-title" class="spread-title">${esc(sta.title)}</h2>
    </header>
    <figure class="gallery">
      <img class="shot-desktop" data-reveal src="/prototypes/assets/sta-verv.webp" width="1280" height="800" alt="The prototype’s page about councils, boards and committees, on a laptop-sized screen" />
      <img class="shot-phone" data-reveal src="/prototypes/assets/sta-verv-phone.webp" width="780" height="1688" alt="The same page on a phone" />
      <figcaption>The prototype at stastudent.vercel.app, on a laptop and a phone.</figcaption>
    </figure>
    <div class="spread-body">
      <div class="spread-text">
        <p class="dek">${esc(sta.summary)}</p>
        ${links(sta)}
      </div>
      <div class="spread-side">${facts(sta)}</div>
    </div>
    <blockquote class="pull"><p>${esc(sta.quote!)}</p></blockquote>
    ${notes(sta)}
  </article>

  <article id="kommune" class="spread spread--quote" aria-labelledby="kommune-title">
    <header class="spread-head">
      <p class="kicker">${esc(kommune.org)}, ${esc(kommune.context.toLowerCase())}</p>
      <h2 id="kommune-title" class="spread-title">${esc(kommune.title)}</h2>
    </header>
    <blockquote class="big-quote"><p>${esc(kommune.quote!)}</p><footer>What I took away</footer></blockquote>
    <div class="spread-body">
      <div class="spread-text">
        <p class="dek">${esc(kommune.summary)}</p>
        ${facts(kommune)}
      </div>
      <figure class="plan-figure">
        ${planDrawing()}
        <figcaption>A street grid like Kvadraturen in Kristiansand. A digital twin is a model of surroundings like these, linked to data about them.</figcaption>
      </figure>
    </div>
    ${notes(kommune)}
  </article>

  <section id="profile" class="profile" aria-labelledby="profile-title">
    <h2 id="profile-title" class="section-title">Profile</h2>
    <p class="profile-lead">${esc(message.about)}</p>
    <dl class="facts facts--wide">
      <div><dt>Looking for</dt><dd>${esc(message.seeking)}</dd></div>
      <div><dt>Now</dt><dd>${esc(message.now)}</dd></div>
      <div><dt>Based in</dt><dd>${esc(message.place)}</dd></div>
    </dl>
    <div class="approach">
      <h3>How I work</h3>
      <ul>${approach.map((item) => `<li><strong>${esc(item.title)}.</strong> ${esc(item.text)}</li>`).join('')}</ul>
    </div>
  </section>

  <section class="elected" aria-labelledby="elected-title">
    <h2 id="elected-title" class="section-title">Elected roles</h2>
    <div class="award">
      <p class="kicker">NITO Studentene Kristiansand, February 2026</p>
      <h3>${esc(leadership.award.title)}</h3>
      <p>${esc(leadership.award.text)}</p>
      <a href="${leadership.award.diploma}" target="_blank" rel="noopener">The diploma (PDF)</a>
    </div>
    <ul class="listing">
      ${leadership.roles
        .map((item) => `<li><span class="listing-when">${esc(item.period)}</span><span class="listing-what">${esc(item.title)}<em>${esc(item.org)}</em></span></li>`)
        .join('')}
    </ul>
  </section>

  <section class="record" aria-labelledby="record-title">
    <h2 id="record-title" class="section-title">Record</h2>
    <div class="record-cols">
      <div>
        <h3>Education</h3>
        <ul class="listing">
          ${background.education
            .map((item) => `<li><span class="listing-when">${esc(item.period)}</span><span class="listing-what">${esc(item.title)}<em>${esc(item.org)}${item.note ? `. ${esc(item.note)}` : ''}</em></span></li>`)
            .join('')}
        </ul>
      </div>
      <div>
        <h3>Work</h3>
        <ul class="listing">
          ${background.work
            .map((item) => `<li><span class="listing-when">${esc(item.period)}</span><span class="listing-what">${esc(item.title)}<em>${esc(item.org)}</em></span></li>`)
            .join('')}
        </ul>
      </div>
    </div>
  </section>

  <section id="contact" class="contact" aria-labelledby="contact-title">
    <h2 id="contact-title" class="section-title">Write to me</h2>
    <a class="contact-email" href="mailto:${person.email}">${esc(person.email)}</a>
    <p class="contact-links">
      <a href="${person.cv}" target="_blank" rel="noopener">CV (PDF)</a>
      <a href="${person.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="${person.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
    </p>
  </section>
</main>

<footer class="colophon">
  <p>Set in Newsreader. Prototype A of three, October 2026.</p>
</footer>`;

mountEquipment(document.getElementById('equipment')!);
revealOnScroll();
mountSwitcher('a');
