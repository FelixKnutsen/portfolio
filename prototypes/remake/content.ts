/*
  Content for the remake. It reuses B2's reading of the bilingual content
  model and adds what this page needs: one visible sentence per project,
  the roles and education as a timeline, and the photo strip. The strip
  shows real moments from Felix's LinkedIn posts (src/content/moments.ts,
  docs/linkedin-inventory.md). A photo of other people stays a labelled
  frame until Felix approves it.
*/
import { copy } from '../../src/content/copy';
import { degrees } from '../../src/content/education';
import { awardMoment, moments as allMoments } from '../../src/content/moments';
import { roles } from '../../src/content/roles';
import { caseStudies } from '../../src/content/work';
import { formatDate, toYearFraction, type Period } from '../../src/lib/dates';
import type { L } from '../../src/i18n/locale';
import { locale, projects as full, t, type Project } from '../b2/content';

export * from '../b2/content';

export const text = {
  /** The verified role line without its end date, which the timeline shows. */
  role: {
    no: 'Masterstudent i informasjonssystemer, Universitetet i Agder',
    en: 'Master’s student in Information Systems, University of Agder',
  },
  more: { no: 'Rolle, prosess og teknologi', en: 'Role, process and technology' },
  seen: { no: 'Utenfor prosjektene', en: 'Beyond the projects' },
  photoPending: { no: 'Bilde venter på godkjenning', en: 'Photo awaiting approval' },
  photoBy: { no: 'Foto', en: 'Photo' },
  source: { no: 'Innlegget på LinkedIn', en: 'The post on LinkedIn' },
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

/** The line under the Phonero and STA visuals. Kristiansand kommune's illustration has none. */
export const captions: Record<string, string> = {
  phonero: t(copy.equipment.caption),
  sta: 'stastudent.vercel.app',
};

export const stops: (Project & { sentence: string; year: string; intro: string })[] = full.map((project) => ({
  ...project,
  sentence: sentences[project.id],
  year: study(project.id).period.start.slice(0, 4),
  intro: t(study(project.id).lede),
}));

/** Real moments from LinkedIn. Unapproved photos are left out, so the page never loads them. */
export const moments = allMoments.map((m) => ({
  caption: t(m.caption),
  org: m.org,
  date: formatDate(m.date, locale),
  post: m.post,
  photo: m.photo.approved ? { src: m.photo.src, alt: t(m.photo.alt), credit: m.photo.credit } : null,
}));

export const award = {
  title: t(copy.leadership.awardLabel),
  caption: t(awardMoment.caption),
  photo: { src: awardMoment.photo.src, alt: t(awardMoment.photo.alt), credit: awardMoment.photo.credit },
  post: awardMoment.post,
  postLabel: t(copy.leadership.awardPost),
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
