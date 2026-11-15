/*
  Content for the remake. It reuses B2's reading of the bilingual content
  model and adds what this page needs: one visible sentence per project,
  the roles and education as a timeline, and the photo strip. The strip's
  photos are placeholders until the LinkedIn inventory exists
  (docs/linkedin-inventory.md). Its captions are verified roles.
*/
import { copy } from '../../src/content/copy';
import { degrees } from '../../src/content/education';
import { roles } from '../../src/content/roles';
import { caseStudies } from '../../src/content/work';
import { toYearFraction, type Period } from '../../src/lib/dates';
import type { L } from '../../src/i18n/locale';
import { projects as full, t, type Project } from '../b2/content';

export * from '../b2/content';

export const text = {
  /** The verified role line without its end date, which the timeline shows. */
  role: {
    no: 'Masterstudent i informasjonssystemer, Universitetet i Agder',
    en: 'Master’s student in Information Systems, University of Agder',
  },
  more: { no: 'Rolle, prosess og teknologi', en: 'Role, process and technology' },
  seen: { no: 'Utenfor prosjektene', en: 'Beyond the projects' },
  photoPending: { no: 'Bilde kommer', en: 'Photo to come' },
  timeline: { no: 'Tidslinje', en: 'Timeline' },
  today: copy.background.today,
  send: copy.contact.form.submit,
  name: copy.contact.form.name,
  email: copy.contact.form.email,
  message: copy.contact.form.message,
  getInTouch: copy.contact.heading,
  formNote: {
    no: 'I prototypen åpner skjemaet e-postprogrammet ditt.',
    en: 'In this prototype the form opens your email app.',
  },
  tracks: copy.background.tracks,
} as const;

const firstSentence = (value: string) => value.split(/(?<=\.) /)[0];
const study = (id: string) => caseStudies.find((item) => item.id === `work-${id}`)!;

/**
 * The one sentence each project shows. Phonero: the case study's role text, since what Felix did
 * is the point. STA: its introduction without the leading "So". Kommune: the introduction's first sentence.
 */
const sentences: Record<string, string> = {
  phonero: t(study('phonero').role!),
  sta: t({
    no: 'Jeg bygger en ny versjon med vekt på at den skal være enkel å bruke, enkel å vedlikeholde og vare lenge.',
    en: 'I am building a new version designed to be easy to use, easy to maintain and to last.',
  }),
  kommune: firstSentence(t(study('kommune').lede)),
};

/** The line under each visual. The full captions sit in the project's details. */
export const captions: Record<string, string> = {
  phonero: t(copy.equipment.caption),
  sta: 'stastudent.vercel.app',
  kommune: firstSentence(t(copy.twin.caption)),
};

export const stops: (Project & { sentence: string; year: string; intro: string })[] = full.map((project) => ({
  ...project,
  sentence: sentences[project.id],
  year: study(project.id).period.start.slice(0, 4),
  intro: t(study(project.id).lede),
}));

const role = (id: string) => roles.find((item) => item.id === id)!;

/** Captions are verified roles. The photos come from LinkedIn once the inventory is filled in. */
export const moments = ['nito-chair', 'sta', 'nito-central', 'parliament'].map((id) => {
  const item = role(id);
  return { title: t(item.timeline.title), org: item.timeline.org, year: item.period.start.slice(0, 4) };
});

export const award = {
  title: t(copy.leadership.awardLabel),
  figure: t(copy.leadership.awardFigure),
  figureLabel: t(copy.leadership.awardFigureLabel),
  diploma: '/certificates/nito-arets-lokallag-2026.pdf',
  diplomaLabel: t(copy.leadership.awardDiploma),
};

export const AXIS = { start: 2018, end: 2027 };
/** Today on the axis, for open-ended bars. */
const NOW = 2026 + 10.5 / 12;

interface Bar {
  title: string;
  org: string;
  from: number;
  to: number;
  ongoing: boolean;
}

const bar = (title: L, org: string, period: Period): Bar => ({
  title: t(title),
  org,
  from: Math.max(AXIS.start, toYearFraction(period.start, 'start')),
  to: period.end === null ? NOW : toYearFraction(period.end, 'end'),
  ongoing: period.end === null,
});

export const lanes: { name: string; bars: Bar[] }[] = [
  { name: t(text.tracks.education), bars: degrees.map((d) => bar(d.timeline.title, d.timeline.org, d.period)) },
  {
    name: t(text.tracks.leadership),
    bars: roles.filter((r) => r.track === 'leadership').map((r) => bar(r.timeline.title, r.timeline.org, r.period)),
  },
  {
    name: t(text.tracks.work),
    bars: roles.filter((r) => r.track === 'work').map((r) => bar(r.timeline.title, r.timeline.org, r.period)),
  },
];

export const today = NOW;
