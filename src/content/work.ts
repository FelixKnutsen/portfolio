import type { L } from '../i18n/locale';
import type { CaseStudy, MapNode, Principle, Skill } from './types';

// Sources: the IS-304 report «Phoneros Nye Utstyrsliste: Fra Legacy Til Native» (2025), the
// mid-term presentation from Kristiansand kommune (spring 2026), the stastudent and stastudentphp
// repositories and their READMEs (checked 26 October 2026), and Felix's own answers.
// Nothing here goes beyond what those say.

export const caseStudies: CaseStudy[] = [
  {
    id: 'work-phonero',
    org: 'Phonero',
    context: { no: 'Bacheloroppgave, gruppe på tre', en: 'Bachelor’s thesis, team of three' },
    period: { start: '2025-01', end: '2025-06' },
    title: {
      no: 'En utstyrsliste organisert etter personen, ikke enheten',
      en: 'An equipment list organised by person, not by device',
    },
    problem: {
      no: 'Bedriftskundene hadde lenge klaget over den gamle utstyrslisten: den var tungvint, full av feilregistreringer og krevde manuelt arbeid.',
      en: 'Business customers had long complained about the old equipment list: it was cumbersome, full of incorrect records and needed manual work.',
    },
    lede: {
      no: 'Vi bygget en ny liste i selvbetjeningsportalen Din Bedrift, der enheter legges til automatisk via SIM-kortet og oversikten er organisert etter personen som har utstyret.',
      en: 'We built a new list in the Din Bedrift self-service portal, where devices are added automatically through the SIM card and the overview is organised by the person who holds the equipment.',
    },
    illustration: 'equipment',
    team: true,
    role: {
      no: 'Gruppeleder og kontaktperson mot Phonero. Jeg ledet utviklingsfasen og skrev det meste av koden, både frontend og backend.',
      en: 'Group leader and the team’s contact with Phonero. I led the development phase and wrote most of the code, front end and back end.',
    },
    steps: [
      {
        title: { no: 'Intervjuer og prioritering', en: 'Interviews and priorities' },
        text: {
          no: 'Intervjuer med kundesenteret og en MoSCoW-prioritering før design og koding startet.',
          en: 'Interviews with the customer service team and a MoSCoW prioritisation before any design or code.',
        },
      },
      {
        title: { no: 'Design i Figma', en: 'Design in Figma' },
        text: {
          no: 'Skisser med komponenter fra Phoneros eget UX-bibliotek.',
          en: 'Designs built from Phonero’s own UX component library.',
        },
      },
      {
        title: { no: 'Utvikling i sprinter', en: 'Development in sprints' },
        text: {
          no: 'React, TypeScript og GraphQL, i Phoneros egen teknologistack.',
          en: 'React, TypeScript and GraphQL, in Phonero’s own technology stack.',
        },
      },
    ],
    stack: ['React', 'TypeScript', 'GraphQL', 'Figma'],
    note: {
      no: 'Koden og grensesnittet tilhører Phonero og er ikke offentlige. Illustrasjonen viser ideen med oppdiktede data.',
      en: 'The code and interface belong to Phonero and are not public. The illustration shows the idea with made-up data.',
    },
  },
  {
    id: 'work-sta',
    // Felix's own initiative; sole author per GitHub (commits from 12 October 2026). In progress.
    // stastudent.no still ran the old Hestia theme on 26 October 2026, so the outcome stays "pending approval".
    org: 'Studentorganisasjonen i Agder',
    context: { no: 'Eget initiativ, under arbeid', en: 'Own initiative, in progress' },
    period: { start: '2026-10', end: null },
    title: {
      no: 'En studentnettside som styret kan oppdatere selv',
      en: 'A student website the board can keep up to date themselves',
    },
    problem: {
      no: 'Den gamle nettsiden til Studentorganisasjonen i Agder var vanskelig å oppdatere og bruke, og det var vanskelig å finne informasjon på den.',
      en: 'The old Studentorganisasjonen i Agder website was hard to update and use, and information on it was hard to find.',
    },
    lede: {
      no: 'Derfor bygger jeg en ny versjon med vekt på at den skal være enkel å bruke, enkel å vedlikeholde og vare lenge.',
      en: 'So I am building a new version designed to be easy to use, easy to maintain and to last.',
    },
    illustration: 'website',
    steps: [
      {
        title: { no: 'Prototype i Next.js', en: 'Prototype in Next.js' },
        text: {
          no: 'Sider for verv, dokumenter, Studentparlamentet, nyheter og søk, i React og TypeScript, med tester i Vitest og Playwright.',
          en: 'Pages for elected positions, documents, the Student Parliament, news and search, in React and TypeScript, with tests in Vitest and Playwright.',
        },
      },
      {
        title: { no: 'Overført til WordPress', en: 'Ported to WordPress' },
        text: {
          no: 'Et eget tema og en plugin med innholdstyper for linjeforeninger og studentaktiviteter, slik at styret kan redigere alt uten å programmere.',
          en: 'A custom theme and a plugin with content types for student associations and activities, so the board can edit everything without writing code.',
        },
      },
      {
        title: { no: 'Språk og tilgjengelighet', en: 'Languages and accessibility' },
        text: {
          no: 'Bokmål, nynorsk og engelsk, og farger som er justert for å oppfylle kontrastkravene i WCAG 2.2 AA.',
          en: 'Bokmål, Nynorsk and English, and colours adjusted to meet the WCAG 2.2 AA contrast requirements.',
        },
      },
      {
        title: { no: 'Dokumentert for neste styre', en: 'Documented for the next board' },
        text: {
          no: 'En brukerveiledning for folk som aldri har brukt WordPress, og et årshjul over alt som må oppdateres hvert år.',
          en: 'A user guide for people who have never used WordPress, and a yearly checklist of everything that needs updating each year.',
        },
      },
    ],
    outcome: {
      no: 'En fungerende prototype. Den skal testes og godkjennes av STA-styret, og planen er at den deretter erstatter dagens nettside.',
      en: 'A working prototype. It will be tested and approved by the STA board, and the plan is for it to replace the current website after that.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'WordPress', 'PHP', 'Elementor'],
    evidence: {
      src: '/images/sta-prototype-documents',
      width: 1060,
      height: 700,
      alt: {
        no: 'Skjermbilde av dokumentsiden i prototypen, med kort for vedtekter, handlingsplan, stillingsbeskrivelser og politiske dokumenter',
        en: 'Screenshot of the documents page in the prototype, with cards for statutes, action plan, job descriptions and policy documents',
      },
      caption: {
        no: 'Dokumentsiden i prototypen, slik den ser ut på stastudent.vercel.app.',
        en: 'The documents page in the prototype, as it appears on stastudent.vercel.app.',
      },
    },
    links: [
      { label: { no: 'Se prototypen', en: 'View the prototype' }, href: 'https://stastudent.vercel.app' },
      {
        label: { no: 'Kildekode og brukerveiledning, WordPress', en: 'Source and user guide, WordPress' },
        href: 'https://github.com/FelixKnutsen/stastudentphp',
      },
      {
        label: { no: 'Kildekode, Next.js', en: 'Source code, Next.js' },
        href: 'https://github.com/FelixKnutsen/stastudent',
      },
    ],
  },
  {
    id: 'work-kommune',
    org: 'Kristiansand kommune',
    context: {
      no: 'Praksis i masterstudiet, teknologiteamet i Plan og bygg',
      en: 'Master’s internship, technology team in planning and building services',
    },
    period: { start: '2026-01', end: '2026-05' },
    title: {
      no: 'På jakt etter digitaliseringsmuligheter i plan og bygg',
      en: 'Scouting for digitalisation opportunities in planning and building',
    },
    problem: {
      no: 'Avdelingen ville vite hvor digitalisering faktisk kunne gjøre arbeidet enklere, før noen valgte teknologi.',
      en: 'The department wanted to know where digitalisation could actually make the work easier, before anyone picked a technology.',
    },
    lede: {
      no: 'Et halvår som innovasjonsjeger sammen med en medstudent. Vi skulle forstå hvordan avdelingen jobber, kartlegge teknologi og løsninger, og hente gode ideer fra andre kommuner, med særlig fokus på digitale tvillinger.',
      en: 'Six months as an innovation scout with a fellow student. Our job was to understand how the department works, map technology and solutions, and bring in good ideas from other municipalities, with a particular focus on digital twins.',
    },
    illustration: 'twin',
    team: true,
    steps: [
      {
        title: { no: 'Observere og forstå', en: 'Observe and understand' },
        text: {
          no: 'Observerte arbeidsprosesser og deltok i møter med andre avdelinger og eksterne samarbeidspartnere.',
          en: 'Observed work processes and took part in meetings with other departments and external partners.',
        },
      },
      {
        title: { no: 'Kartlegge løsninger', en: 'Map solutions' },
        text: {
          no: 'Undersøkte fagsystemer for plan og bygg, og løsninger og innovasjonsprosjekter i andre kommuner.',
          en: 'Researched professional systems for planning and building, and solutions and innovation projects in other municipalities.',
        },
      },
      {
        title: { no: 'Digitale tvillinger', en: 'Digital twins' },
        text: {
          no: 'Undersøkte digitale tvillinger og hvordan de kan brukes i avdelingens arbeid.',
          en: 'Researched digital twins and how they could be used in the department’s work.',
        },
      },
    ],
    learning: {
      no: 'Innovasjon i offentlig sektor må tilpasses regelverk, politiske rammer og organisasjonen. Ofte handler den om mindre forbedringer som gjør hverdagen enklere for de ansatte og tjenestene bedre for innbyggerne, ikke om store teknologiskifter.',
      en: 'Innovation in the public sector has to fit regulations, political frameworks and the organisation. It is often about smaller improvements that make everyday work easier for staff and services better for residents, rather than big technology shifts.',
    },
  },
];

/**
 * The problems the work above started from, in the words of the case studies.
 * In the hero they are the loose notes that drift away as the work gets sorted.
 */
export const problems: L[] = [
  { no: 'Tungvint', en: 'Cumbersome' },
  { no: 'Feilregistreringer', en: 'Incorrect records' },
  { no: 'Manuelt arbeid', en: 'Manual work' },
  { no: 'Vanskelig å oppdatere', en: 'Hard to update' },
  { no: 'Vanskelig å finne informasjon', en: 'Hard to find information' },
];

/** The hero board: real fragments from the work above, sorted by lens and in the order they happened. */
export const mapNodes: MapNode[] = [
  {
    lens: 'people',
    label: { no: 'Brukerintervjuer', en: 'User interviews' },
    source: { no: 'Phonero, 2025', en: 'Phonero, 2025' },
    href: '#work-phonero',
  },
  {
    lens: 'people',
    label: { no: 'Styreleder', en: 'Board chair' },
    source: { no: 'NITO Studentene, 2025–2026', en: 'NITO Studentene, 2025–2026' },
    href: '#leadership',
    minor: true,
  },
  {
    lens: 'people',
    label: { no: 'Møter på tvers', en: 'Cross-team meetings' },
    source: { no: 'Kristiansand kommune, 2026', en: 'Kristiansand kommune, 2026' },
    href: '#work-kommune',
  },
  {
    lens: 'people',
    label: { no: 'KI-retningslinjer', en: 'AI guidelines' },
    source: { no: 'STA, 2026', en: 'STA, 2026' },
    href: '#leadership',
  },
  {
    lens: 'people',
    label: { no: 'Brukerveiledning', en: 'User guide' },
    source: { no: 'STA-nettsiden, 2026', en: 'STA website, 2026' },
    href: '#work-sta',
    minor: true,
  },
  {
    lens: 'process',
    label: { no: 'MoSCoW', en: 'MoSCoW' },
    source: { no: 'Phonero, 2025', en: 'Phonero, 2025' },
    href: '#work-phonero',
  },
  {
    lens: 'process',
    label: { no: 'Kravkartlegging', en: 'Requirements' },
    source: { no: 'Phonero, 2025', en: 'Phonero, 2025' },
    href: '#work-phonero',
  },
  {
    lens: 'process',
    label: { no: 'Sprinter', en: 'Sprints' },
    source: { no: 'Phonero, 2025', en: 'Phonero, 2025' },
    href: '#work-phonero',
    minor: true,
  },
  {
    lens: 'process',
    label: { no: 'Prosesskartlegging', en: 'Process mapping' },
    source: { no: 'Kristiansand kommune, 2026', en: 'Kristiansand kommune, 2026' },
    href: '#work-kommune',
  },
  {
    lens: 'process',
    label: { no: 'Migrering', en: 'Migration' },
    source: { no: 'STA-nettsiden, 2026', en: 'STA website, 2026' },
    href: '#work-sta',
    minor: true,
  },
  {
    lens: 'technology',
    label: { no: 'Figma', en: 'Figma' },
    source: { no: 'Phonero, 2025', en: 'Phonero, 2025' },
    href: '#work-phonero',
    minor: true,
  },
  {
    lens: 'technology',
    label: { no: 'React og TypeScript', en: 'React and TypeScript' },
    source: { no: 'Phonero, 2024–2025', en: 'Phonero, 2024–2025' },
    href: '#work-phonero',
  },
  {
    lens: 'technology',
    label: { no: 'GraphQL', en: 'GraphQL' },
    source: { no: 'Phonero, 2024–2025', en: 'Phonero, 2024–2025' },
    href: '#work-phonero',
  },
  {
    lens: 'technology',
    label: { no: 'Digitale tvillinger', en: 'Digital twins' },
    source: { no: 'Kristiansand kommune, 2026', en: 'Kristiansand kommune, 2026' },
    href: '#work-kommune',
  },
  {
    lens: 'technology',
    label: { no: 'Next.js', en: 'Next.js' },
    source: { no: 'STA-nettsiden, 2026', en: 'STA website, 2026' },
    href: '#work-sta',
    minor: true,
  },
  {
    lens: 'technology',
    label: { no: 'WordPress og PHP', en: 'WordPress and PHP' },
    source: { no: 'STA-nettsiden, 2026', en: 'STA website, 2026' },
    href: '#work-sta',
  },
];

/** How Felix works. Each principle points to the project that shows it. */
export const principles: Principle[] = [
  {
    title: { no: 'Start med hvordan arbeidet faktisk gjøres', en: 'Start with how the work is actually done' },
    text: {
      no: 'Før vi så på teknologi i kommunen, observerte vi arbeidsprosessene og satt i møtene.',
      en: 'Before we looked at any technology at the municipality, we observed the work and sat in on the meetings.',
    },
    evidence: { label: { no: 'Kristiansand kommune', en: 'Kristiansand kommune' }, href: '#work-kommune' },
  },
  {
    title: { no: 'Prioriter sammen med dem som skal bruke det', en: 'Prioritise with the people who will use it' },
    text: {
      no: 'Hos Phonero kom intervjuene med kundesenteret og MoSCoW-prioriteringen før første skisse.',
      en: 'At Phonero, the interviews with customer service and the MoSCoW prioritisation came before the first sketch.',
    },
    evidence: { label: { no: 'Phonero', en: 'Phonero' }, href: '#work-phonero' },
  },
  {
    title: { no: 'Bygg det så andre kan vedlikeholde det', en: 'Build it so others can maintain it' },
    text: {
      no: 'STA-nettsiden startet i Next.js, men ble flyttet til WordPress, fordi styret skal kunne endre den uten å kode.',
      en: 'The STA website started in Next.js but moved to WordPress, because the board has to be able to change it without code.',
    },
    evidence: { label: { no: 'STA-nettsiden', en: 'STA website' }, href: '#work-sta' },
  },
  {
    title: { no: 'Skriv ned hvordan det brukes', en: 'Write down how it is used' },
    text: {
      no: 'En nettside er bare så god som den neste som skal oppdatere den. Derfor fikk den en brukerveiledning og et årshjul.',
      en: 'A website is only as good as the next person who has to update it. So it came with a user guide and a yearly checklist.',
    },
    evidence: { label: { no: 'STA-nettsiden', en: 'STA website' }, href: '#work-sta' },
  },
  {
    title: { no: 'Små forbedringer som tas i bruk', en: 'Small improvements that get adopted' },
    text: {
      no: 'Det viktigste jeg tok med fra kommunen: forbedringer som gjør hverdagen enklere slår store teknologiskifter.',
      en: 'The main thing I took from the municipality: improvements that make everyday work easier beat big technology shifts.',
    },
    evidence: { label: { no: 'Kristiansand kommune', en: 'Kristiansand kommune' }, href: '#work-kommune' },
  },
];

/** Methods and tools, each with where it was actually used. Coursework-only skills are listed separately. */
export const skills: Skill[] = [
  {
    name: { no: 'Brukerintervjuer og kravkartlegging', en: 'User interviews and requirements' },
    where: { no: 'Bacheloroppgave, Phonero', en: 'Bachelor’s thesis, Phonero' },
    href: '#work-phonero',
  },
  {
    name: { no: 'Prosesskartlegging', en: 'Process mapping' },
    where: { no: 'Praksis, Kristiansand kommune', en: 'Internship, Kristiansand kommune' },
    href: '#work-kommune',
  },
  {
    name: { no: 'React, TypeScript og GraphQL', en: 'React, TypeScript and GraphQL' },
    where: { no: 'Praksis og bacheloroppgave, Phonero', en: 'Internship and thesis, Phonero' },
    href: '#work-phonero',
  },
  {
    name: { no: 'Next.js, WordPress og PHP', en: 'Next.js, WordPress and PHP' },
    where: { no: 'STA-nettsiden', en: 'STA website' },
    href: '#work-sta',
  },
  {
    name: { no: 'Design i Figma', en: 'Design in Figma' },
    where: { no: 'Bacheloroppgave, Phonero', en: 'Bachelor’s thesis, Phonero' },
    href: '#work-phonero',
  },
  {
    name: { no: 'Dokumentasjon for ikke-utviklere', en: 'Documentation for non-developers' },
    where: { no: 'STA-nettsiden', en: 'STA website' },
    href: '#work-sta',
  },
  {
    name: { no: 'Ledelse og styrearbeid', en: 'Leadership and board work' },
    where: { no: 'NITO Studentene og STA', en: 'NITO Studentene and STA' },
    href: '#leadership',
  },
];
