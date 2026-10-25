import type { CaseStudy, MapNode } from './types';

// Sources: the IS-304 report «Phoneros Nye Utstyrsliste: Fra Legacy Til Native» (2025), the
// mid-term presentation from Kristiansand kommune (spring 2026), the stastudent repositories,
// and Felix's own answers. Nothing here goes beyond what those say.

export const caseStudies: CaseStudy[] = [
  {
    id: 'work-phonero',
    org: 'Phonero',
    context: { no: 'Bacheloroppgave, gruppe på tre', en: 'Bachelor’s thesis, team of three' },
    period: { start: '2025-01', end: '2025-06' },
    title: {
      no: 'Phoneros nye utstyrsliste: fra legacy til native',
      en: 'Phonero’s new equipment list: from legacy to native',
    },
    lede: {
      no: 'Bedriftskundene hadde lenge klaget over den gamle utstyrslisten: den var tungvint, full av feilregistreringer og krevde manuelt arbeid. Vi bygget en ny liste i selvbetjeningsportalen Din Bedrift, der enheter legges til automatisk via SIM-kortet og oversikten er organisert etter personen som har utstyret.',
      en: 'Business customers had long complained about the old equipment list: it was cumbersome, full of incorrect records and needed manual work. We built a new list in the Din Bedrift self-service portal, where devices are added automatically through the SIM card and the overview is organised by the person who holds the equipment.',
    },
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
  },
  {
    id: 'work-sta',
    // Felix's own initiative; sole author per GitHub (commits from 12 October 2026). In progress.
    org: 'stastudent.no',
    context: { no: 'Eget initiativ, under arbeid', en: 'Own initiative, in progress' },
    period: { start: '2026-10', end: null },
    title: {
      no: 'En studentnettside som er lett å bruke og lett å oppdatere',
      en: 'A student website that is easy to use and easy to update',
    },
    lede: {
      no: 'Jeg hørte hvor vanskelig den gamle nettsiden til Studentorganisasjonen i Agder var å oppdatere og bruke, og hvor vanskelig det var å finne informasjon på den. Derfor bygger jeg en ny versjon med vekt på at den skal være enkel å bruke, enkel å vedlikeholde og vare lenge.',
      en: 'I heard how hard the old Studentorganisasjonen i Agder website was to update and use, and how hard it was to find information on it. So I am building a new version designed to be easy to use, easy to maintain and to last.',
    },
    steps: [
      {
        title: { no: 'Bygge i Next.js', en: 'Build in Next.js' },
        text: {
          no: 'Sider for verv, dokumenter, Studentparlamentet, nyheter og søk, i React og TypeScript.',
          en: 'Pages for elected positions, documents, the Student Parliament, news and search, in React and TypeScript.',
        },
      },
      {
        title: { no: 'Overføre til WordPress', en: 'Port to WordPress' },
        text: {
          no: 'Et tema og en plugin med egne innholdstyper, slik at styret kan redigere innhold uten å programmere.',
          en: 'A theme and plugin with custom content types, so the board can edit content without writing code.',
        },
      },
      {
        title: { no: 'Migrere og dokumentere', en: 'Migrate and document' },
        text: {
          no: 'Forberedte migrering av nyhetssaker og sider, og skrev dokumentasjon for arkitektur, drift og redigering.',
          en: 'Prepared the migration of news articles and pages, and documented architecture, deployment and editing.',
        },
      },
    ],
    outcome: {
      no: 'En fungerende prototype. Den skal testes og godkjennes av STA-styret, og planen er at den deretter erstatter dagens nettside.',
      en: 'A working prototype. It will be tested and approved by the STA board, and the plan is for it to replace the current website after that.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'WordPress', 'PHP'],
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
        label: { no: 'Kildekode, Next.js', en: 'Source code, Next.js' },
        href: 'https://github.com/FelixKnutsen/stastudent',
      },
      {
        label: { no: 'Kildekode, WordPress', en: 'Source code, WordPress' },
        href: 'https://github.com/FelixKnutsen/stastudentphp',
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
    lede: {
      no: 'Et halvår som innovasjonsjeger sammen med en medstudent. Vi skulle forstå hvordan avdelingen jobber, kartlegge teknologi og løsninger, og hente gode ideer fra andre kommuner, med særlig fokus på digitale tvillinger.',
      en: 'Six months as an innovation scout with a fellow student. Our job was to understand how the department works, map technology and solutions, and bring in good ideas from other municipalities, with a particular focus on digital twins.',
    },
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

/** The hero process map: real steps from the work above, in the order they happened. */
export const mapNodes: MapNode[] = [
  {
    lens: 'people',
    label: { no: 'Brukerintervjuer', en: 'User interviews' },
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
    lens: 'technology',
    label: { no: 'Prototype og utvikling', en: 'Prototype and build' },
    source: { no: 'Phonero, 2025', en: 'Phonero, 2025' },
    href: '#work-phonero',
  },
  {
    lens: 'process',
    label: { no: 'Prosesskartlegging', en: 'Process mapping' },
    source: { no: 'Kristiansand kommune, 2026', en: 'Kristiansand kommune, 2026' },
    href: '#work-kommune',
  },
  {
    lens: 'technology',
    label: { no: 'Digitale tvillinger', en: 'Digital twins' },
    source: { no: 'Kristiansand kommune, 2026', en: 'Kristiansand kommune, 2026' },
    href: '#work-kommune',
  },
  {
    lens: 'people',
    label: { no: 'Arbeid med KI-retningslinjer', en: 'Work on AI guidelines' },
    source: { no: 'STA, 2026', en: 'STA, 2026' },
    href: '#leadership',
  },
];
