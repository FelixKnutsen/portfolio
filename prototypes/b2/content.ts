/*
  Content for B2, read straight from the site's bilingual content model so
  the prototype can be shown in both languages. Each fact has one place:
  the opening says who and what connects the work, each project has one
  summary and one thread through the model, and the process sits in the
  project's own details.
*/
import { contactDetails, copy } from '../../src/content/copy';
import { CV_PUBLIC_PATH } from '../../src/content/cvFile';
import { degrees } from '../../src/content/education';
import { roles } from '../../src/content/roles';
import { caseStudies, mapNodes, principles } from '../../src/content/work';
import type { Lens } from '../../src/content/types';
import { formatPeriod } from '../../src/lib/dates';
import { isLocale, type L, type Locale } from '../../src/i18n/locale';

export type ProjectKey = 'phonero' | 'sta' | 'kommune';

const param = new URLSearchParams(window.location.search).get('lang');
export const locale: Locale = isLocale(param) ? param : 'en';
export const t = <T = string>(value: L<T>): T => value[locale];

const study = (id: string) => caseStudies.find((item) => item.id === id)!;
const role = (id: string) => roles.find((item) => item.id === id)!;
const node = (label: string): L => mapNodes.find((item) => item.label.en === label)!.label;

/** Interface words that are not facts. */
export const ui = {
  work: { no: 'Prosjekter', en: 'Projects' },
  about: { no: 'Om meg', en: 'About' },
  record: { no: 'Verv og bakgrunn', en: 'Roles and background' },
  contact: copy.nav.sections.contact,
  seeWork: { no: 'Se de tre prosjektene', en: 'See the three projects' },
  modelLabel: {
    no: 'Mennesker, prosess og teknologi som tre lag. Hvert prosjekt går gjennom alle tre.',
    en: 'People, process and technology as three layers. Each project runs through all three.',
  },
  choose: {
    no: 'Velg et prosjekt for å følge tråden',
    en: 'Choose a project to follow its thread',
  },
  drag: { no: 'Dra for å snu modellen', en: 'Drag to turn the model' },
  read: { no: 'Les mer', en: 'Read more' },
  role: copy.work.roleLabel,
  contribution: { no: 'Mitt bidrag', en: 'My part' },
  status: copy.work.outcomeLabel,
  learning: copy.work.learningLabel,
  thread: { no: 'Tråden gjennom modellen', en: 'Its thread through the model' },
  how: { no: 'Slik jobbet vi', en: 'How the work was done' },
  howSolo: { no: 'Slik jobbet jeg', en: 'How I did it' },
  problem: copy.work.problemLabel,
  stack: copy.work.stackLabel,
  elected: { no: 'Verv', en: 'Elected roles' },
  education: { no: 'Utdanning og arbeid', en: 'Education and work' },
  other: { no: 'Andre steder', en: 'Elsewhere' },
  cv: copy.cv.view,
  cvNote: copy.cv.format,
  language: { no: 'English', en: 'Norsk' },
  shot: {
    no: 'Prototypen på stastudent.vercel.app, på PC og mobil. Siden har bokmål, nynorsk og engelsk, og fargene er justert for WCAG 2.2 AA.',
    en: 'The prototype at stastudent.vercel.app, on a laptop and a phone. It has Bokmål, Nynorsk and English, and colours adjusted for WCAG 2.2 AA.',
  },
  shotAlt: {
    no: 'Prototypens side om råd, styrer og utvalg, på en PC-skjerm',
    en: 'The prototype’s page about councils, boards and committees, on a laptop-sized screen',
  },
  shotPhoneAlt: {
    no: 'Den samme siden på mobil',
    en: 'The same page on a phone',
  },
  twinIdle: { no: 'Pek på et kvartal', en: 'Point at a block' },
} satisfies Record<string, L>;

export const LENSES: Lens[] = ['people', 'process', 'technology'];

/** Each layer is described by the principle that belongs to it. */
export const layers: Record<Lens, { name: string; principle: string }> = {
  people: { name: t(copy.lenses.people), principle: t(principles[1].title) },
  process: { name: t(copy.lenses.process), principle: t(principles[0].title) },
  technology: {
    name: t(copy.lenses.technology),
    principle: t(principles[2].title),
  },
};

export const person = {
  name: 'Felix Fabricius Knutsen',
  role: t(copy.hero.role),
  statement: t(copy.intro.statement),
  support: t(copy.intro.body)[0],
  about: t(copy.intro.body)[1],
  facts: [
    {
      label: t(copy.intro.facts.seekingLabel),
      text: t(copy.intro.facts.seeking),
    },
    { label: t(copy.intro.facts.nowLabel), text: t(copy.intro.facts.now) },
    {
      label: t(copy.intro.facts.interestsLabel),
      text: t(copy.intro.facts.interests),
    },
    { label: t(copy.intro.facts.placeLabel), text: t(copy.intro.facts.place) },
  ],
  portrait: {
    src: '/images/felix-880.webp',
    alt: t(copy.intro.portraitAlt),
    credit: t(copy.intro.portraitCredit),
  },
  email: contactDetails.email,
  linkedin: contactDetails.linkedin,
  github: contactDetails.github,
  cv: CV_PUBLIC_PATH,
};

export interface Project {
  id: ProjectKey;
  org: string;
  /** The organisation in a few characters, for the model's project picker. */
  orgShort: string;
  short: string;
  context: string;
  period: string;
  title: string;
  summary: string;
  facts: { label: string; text: string }[];
  thread: Record<Lens, string>;
  team: boolean;
  problem?: string;
  steps: { title: string; text: string }[];
  stack: string[];
  note?: string;
  links: { label: string; href: string }[];
}

const build = (
  key: ProjectKey,
  id: string,
  orgShort: string,
  short: L,
  /** Left out when the project's context line already says it. */
  roleText: L | null,
  thread: Record<Lens, string>,
  extra: { label: L; text: L },
  summaryWithProblem = false,
): Project => {
  const item = study(id);
  return {
    id: key,
    org: item.org,
    orgShort,
    short: t(short),
    context: t(item.context),
    period: formatPeriod(item.period, locale),
    title: t(item.title),
    summary: summaryWithProblem ? `${t(item.problem)} ${t(item.lede)}` : t(item.lede),
    facts: [...(roleText ? [{ label: t(ui.role), text: t(roleText) }] : []), { label: t(extra.label), text: t(extra.text) }],
    thread: {
      people: t(node(thread.people)),
      process: t(node(thread.process)),
      technology: t(node(thread.technology)),
    },
    team: Boolean(item.team),
    problem: summaryWithProblem ? undefined : t(item.problem),
    steps: item.steps.map((step) => ({
      title: t(step.title),
      text: t(step.text),
    })),
    stack: item.stack ?? [],
    note: item.note ? t(item.note) : undefined,
    links: (item.links ?? []).map((link) => ({
      label: t(link.label),
      href: link.href,
    })),
  };
};

const phonero = study('work-phonero');
const sta = study('work-sta');
const kommune = study('work-kommune');

// The role sentences split the case study's own role text, so nothing is added to it.
const [roleNo, roleEn] = (['no', 'en'] as const).map((lang) => phonero.role![lang].split(/(?<=\.) /));

export const projects: Project[] = [
  build(
    'phonero',
    'work-phonero',
    'Phonero',
    { no: 'Utstyrsliste', en: 'Equipment list' },
    { no: roleNo[0], en: roleEn[0] },
    {
      people: 'User interviews',
      process: 'MoSCoW',
      technology: 'React and TypeScript',
    },
    { label: ui.contribution, text: { no: roleNo[1], en: roleEn[1] } },
  ),
  build(
    'sta',
    'work-sta',
    'STA',
    { no: 'Studentnettside', en: 'Student website' },
    null,
    {
      people: 'User guide',
      process: 'Migration',
      technology: 'WordPress and PHP',
    },
    { label: ui.status, text: sta.outcome! },
    true,
  ),
  build(
    'kommune',
    'work-kommune',
    'Kristiansand kommune',
    { no: 'Digitalisering i plan og bygg', en: 'Digitalisation scouting' },
    role('kommune').title,
    {
      people: 'Cross-team meetings',
      process: 'Process mapping',
      technology: 'Digital twins',
    },
    { label: ui.learning, text: kommune.learning! },
  ),
];

export const leadership = {
  award: t(copy.leadership.awardLabel),
  story: t(copy.leadership.nitoStory),
  diploma: '/certificates/nito-arets-lokallag-2026.pdf',
  diplomaLabel: t(copy.leadership.awardDiploma),
  roles: ['sta', 'nito-central', 'nito-chair', 'parliament', 'nito-board'].map((id) => {
    const item = role(id);
    return {
      title: t(item.title),
      org: item.org,
      period: formatPeriod(item.period, locale),
      current: item.period.end === null,
    };
  }),
};

export const record = [
  ...degrees.map((degree) => ({
    title: t(degree.title),
    org: degree.id === 'vgs' ? `${degree.institution}. ${t(copy.background.exchange)}` : degree.institution,
    period: formatPeriod(degree.period, locale),
  })),
  ...['phonero-intern', 'kiwi'].map((id) => {
    const item = role(id);
    return {
      title: t(item.title),
      org: item.org,
      period: formatPeriod(item.period, locale),
    };
  }),
];

export const equipmentLabels = {
  byDevice: t(copy.equipment.byDevice),
  byPerson: t(copy.equipment.byPerson),
  viewLabel: t(copy.equipment.viewLabel),
  before: t(copy.equipment.before),
  after: t(copy.equipment.after),
  unregistered: t(copy.equipment.unregistered),
  devices: t(copy.equipment.devices),
  caption: t(copy.equipment.caption),
};

export const twinLabels = {
  caption: t(copy.twin.caption),
  block: t(copy.twin.block),
  storeys: t(copy.twin.storeys),
};
