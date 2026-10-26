/*
  Shared content for the three art-direction prototypes.

  Every fact comes from the site's own content model (src/content), so the
  prototypes differ only in how they present the same material. What is new
  here is the hierarchy: one primary message, a one-sentence summary per
  project, and the detail moved one level down.
*/
import { contactDetails, copy } from '../../src/content/copy';
import { CV_PUBLIC_PATH } from '../../src/content/cvFile';
import { certificates, degrees } from '../../src/content/education';
import { roles } from '../../src/content/roles';
import { caseStudies, principles } from '../../src/content/work';
import { formatPeriod } from '../../src/lib/dates';

const en = 'en' as const;

const study = (id: string) => {
  const found = caseStudies.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown case study ${id}`);
  return found;
};

const role = (id: string) => {
  const found = roles.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown role ${id}`);
  return found;
};

export const person = {
  name: 'Felix Fabricius Knutsen',
  first: 'Felix',
  role: 'Master’s student in Information Systems',
  school: 'University of Agder',
  finishing: 'June 2027',
  place: 'Kristiansand, Norway',
  email: contactDetails.email,
  linkedin: contactDetails.linkedin,
  github: contactDetails.github,
  cv: CV_PUBLIC_PATH,
  portrait: {
    jpg: '/images/felix-880.jpg',
    webp: '/images/felix-880.webp',
    alt: copy.intro.portraitAlt[en],
    credit: copy.intro.portraitCredit[en],
  },
};

/** The one primary message. Everything else on the page supports it. */
export const message = {
  full: copy.intro.statement[en],
  short: ['Between the people', 'and the code.'],
  standfirst:
    'Information systems master’s student at the University of Agder, finishing in June 2027. I have interviewed users, mapped how a municipality works and written production React and TypeScript.',
  seeking: copy.intro.facts.seeking[en],
  now: copy.intro.facts.now[en],
  place: copy.intro.facts.place[en],
  about: copy.intro.body[en][1],
};

export interface Project {
  id: string;
  org: string;
  context: string;
  period: string;
  year: string;
  title: string;
  summary: string;
  role: string;
  /** The role in a few words, for fact lists. */
  roleShort: string;
  methods: string[];
  built: string[];
  problem: string;
  steps: { title: string; text: string }[];
  result?: { label: string; text: string };
  quote?: string;
  note?: string;
  links: { label: string; href: string }[];
}

const phonero = study('work-phonero');
const sta = study('work-sta');
const kommune = study('work-kommune');

export const projects: Project[] = [
  {
    id: 'phonero',
    org: 'Phonero',
    context: 'Bachelor’s thesis, team of three',
    period: formatPeriod(phonero.period, en),
    year: '2025',
    title: 'An equipment list organised by person',
    summary:
      'A new equipment list in Phonero’s Din Bedrift portal, where devices are added automatically through the SIM card and grouped under the person who holds them.',
    role: phonero.role![en],
    roleShort: 'Group leader and the team’s contact with Phonero',
    methods: ['User interviews', 'MoSCoW', 'Figma'],
    built: ['React', 'TypeScript', 'GraphQL'],
    problem: phonero.problem[en],
    steps: phonero.steps.map((step) => ({ title: step.title[en], text: step.text[en] })),
    quote: 'I led the development phase and wrote most of the code, front end and back end.',
    note: phonero.note![en],
    links: [],
  },
  {
    id: 'sta',
    org: 'Studentorganisasjonen i Agder',
    context: 'Own initiative, in progress',
    period: formatPeriod(sta.period, en),
    year: '2026',
    title: 'A website the board can keep up to date',
    summary:
      'A new website for the student organisation at UiA, built in Next.js and then ported to WordPress so the board can edit it without code.',
    role: 'Own initiative: I built it, ported it to WordPress and documented it.',
    roleShort: 'Own initiative',
    methods: ['Accessibility (WCAG 2.2 AA)', 'Documentation'],
    built: ['Next.js', 'React', 'TypeScript', 'WordPress', 'PHP'],
    problem: sta.problem[en],
    steps: sta.steps.map((step) => ({ title: step.title[en], text: step.text[en] })),
    result: { label: 'Status', text: sta.outcome![en] },
    quote: 'So the board can edit everything without writing code.',
    links: sta.links!.map((link) => ({ label: link.label[en], href: link.href })),
  },
  {
    id: 'kommune',
    org: 'Kristiansand kommune',
    context: 'Master’s internship, with a fellow student',
    period: formatPeriod(kommune.period, en),
    year: '2026',
    title: 'Looking for digitalisation in planning and building',
    summary:
      'Six months as an innovation scout in the municipality’s planning and building services: how the work is done, which systems exist, and where digital twins could help.',
    role: 'Innovation scout, together with a fellow student.',
    roleShort: 'Innovation scout, with a fellow student',
    methods: ['Observation', 'Process mapping', 'Technology scouting'],
    built: [],
    problem: kommune.problem[en],
    steps: kommune.steps.map((step) => ({ title: step.title[en], text: step.text[en] })),
    result: { label: 'What I took away', text: kommune.learning![en] },
    quote: kommune.learning![en],
    links: [],
  },
];

export const approach = principles.slice(0, 3).map((item) => ({ title: item.title[en], text: item.text[en] }));

const nitoChair = role('nito-chair');
export const leadership = {
  award: {
    title: 'Local Chapter of the Year 2026',
    text: 'As chair of NITO Studentene Kristiansand, our board was named the best of 25 local boards, for how it was run, for creative events and for following through.',
    diploma: '/certificates/nito-arets-lokallag-2026.pdf',
    period: formatPeriod(nitoChair.period, en),
  },
  roles: ['sta', 'nito-central', 'nito-chair', 'parliament', 'nito-board'].map((id) => {
    const item = role(id);
    return { title: item.title[en], org: item.org, period: formatPeriod(item.period, en), current: item.period.end === null };
  }),
  staFocus: copy.leadership.staFocus[en],
};

export const background = {
  education: degrees.map((degree) => ({
    title: degree.title[en],
    org: degree.institution,
    period: formatPeriod(degree.period, en),
    note: degree.id === 'vgs' ? 'Including an exchange year at Reynella East College, Australia' : undefined,
  })),
  work: ['phonero-intern', 'kiwi'].map((id) => {
    const item = role(id);
    return { title: item.title[en], org: item.org, period: formatPeriod(item.period, en), text: item.summary[en] };
  }),
  certificates: certificates.map((certificate) => ({ title: certificate.title[en], issuer: certificate.issuer })),
};

/** Made-up people and devices for the equipment-list illustration (the real data is Phonero's). */
export const equipment = {
  people: [
    { id: 'kari', name: 'Kari', team: 'Sales' },
    { id: 'jonas', name: 'Jonas', team: 'Warehouse' },
    { id: 'amina', name: 'Amina', team: 'Finance' },
  ],
  devices: [
    { id: 'd1', name: 'iPhone 15', sim: '4821', holder: 'kari' },
    { id: 'd2', name: 'Galaxy S24', sim: '7730', holder: 'jonas' },
    { id: 'd3', name: 'iPad Air', sim: '1194', holder: 'kari' },
    { id: 'd4', name: '4G router', sim: '5502', holder: 'amina', unregistered: true },
    { id: 'd5', name: 'iPhone 13', sim: '3307', holder: 'jonas', unregistered: true },
    { id: 'd6', name: 'Mobile broadband', sim: '9045', holder: 'amina' },
  ],
};

/** Escapes text for the template strings the prototypes render with. */
export function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
