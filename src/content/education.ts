import type { Certificate, Degree } from './types';

// UiA no longer publishes the spring 2023 course pages (BE-107, IS-105, IS-110, ORG110 return 404),
// so those courses are listed without a link rather than pointing at a different semester.
const uia = (path: string) => `https://www.uia.no/${path}`;

export const degrees: Degree[] = [
  {
    id: 'master',
    title: { no: 'Master i informasjonssystemer', en: 'Master’s degree in Information Systems' },
    timeline: { title: { no: 'Master, informasjonssystemer', en: 'Master’s, Information Systems' }, org: 'UiA' },
    institution: 'Universitetet i Agder (UiA)',
    period: { start: '2025-08', end: null },
    description: {
      no: 'Ferdig i juni 2027. Emner så langt inkluderer digital transformasjon og prosessledelse, digitale teknologier og forretningssystemer, endringsledelse og menneskesentrert kunstig intelligens.',
      en: 'Finishing in June 2027. Courses so far include digital transformation and process management, digital technologies and business systems, change management and human-centred artificial intelligence.',
    },
    courses: [
      {
        code: 'IS-403',
        name: 'Digital transformasjon og prosessledelse',
        term: 'autumn',
        year: 2025,
        href: uia('studier/emner/2025/host/is-403.html'),
      },
      {
        code: 'IS-406',
        name: 'Digitale teknologier og forretningssystemer',
        term: 'autumn',
        year: 2025,
        href: uia('studier/emner/2025/host/is-406.html'),
      },
      {
        code: 'IS-427',
        name: 'Data Science Applications II',
        term: 'autumn',
        year: 2025,
        href: uia('english/studies/courses/2025/autumn/is-427.html'),
      },
      {
        code: 'IS-407',
        name: 'Management of IS Projects',
        term: 'spring',
        year: 2026,
        href: uia('english/studies/courses/2026/spring/is-407.html'),
      },
      {
        code: 'IS-508',
        name: 'Human-Centered Artificial Intelligence',
        term: 'spring',
        year: 2026,
        href: uia('english/studies/courses/2026/spring/is-508.html'),
      },
      {
        code: 'ORG411',
        name: 'Organizational Changes and Change Management',
        term: 'spring',
        year: 2026,
        href: uia('english/studies/courses/2026/spring/org411.html'),
      },
      { code: 'IS-408', name: 'Praksis i Kristiansand kommune', term: 'spring', year: 2026 },
    ],
  },
  {
    id: 'bachelor',
    title: { no: 'Bachelor i IT og informasjonssystemer', en: 'Bachelor’s degree in IT and Information Systems' },
    timeline: {
      title: { no: 'Bachelor, IT og informasjonssystemer', en: 'Bachelor’s, IT and Information Systems' },
      org: 'UiA',
    },
    institution: 'Universitetet i Agder (UiA)',
    period: { start: '2022-08', end: '2025-06' },
    description: {
      no: 'Systemutvikling, databaser, informasjonssikkerhet, tjenestedesign og organisasjonsteori, avsluttet med bacheloroppgave i samarbeid med Phonero.',
      en: 'Systems development, databases, information security, service design and organisational theory, finishing with a thesis in collaboration with Phonero.',
    },
    courses: [
      {
        code: 'IS-100',
        name: 'Role of Digitalization in Future Societies',
        term: 'autumn',
        year: 2022,
        href: uia('studier/emner/2022/host/is-100.html'),
      },
      {
        code: 'IS-104',
        name: 'Digital Interaction Design',
        term: 'autumn',
        year: 2022,
        href: uia('studier/emner/2022/host/is-104.html'),
      },
      {
        code: 'IS-114',
        name: 'Samskaping – kommunikasjon og prosjektarbeid',
        term: 'autumn',
        year: 2022,
        href: uia('studier/emner/2022/host/is-114.html'),
      },
      {
        code: 'BE-107',
        name: 'Bedriftsøkonomi for IT-studenter',
        term: 'spring',
        year: 2023,
      },
      {
        code: 'IS-105',
        name: 'Datakommunikasjon og operativsystem',
        term: 'spring',
        year: 2023,
      },
      {
        code: 'IS-110',
        name: 'Objektorientert programmering',
        term: 'spring',
        year: 2023,
      },
      {
        code: 'ORG110',
        name: 'Organizational Theory for IT Students',
        term: 'spring',
        year: 2023,
      },
      {
        code: 'IS-200',
        name: 'Systemanalyse og systemutvikling',
        term: 'autumn',
        year: 2023,
        href: uia('studier/emner/2023/host/is-200.html'),
      },
      {
        code: 'IS-201',
        name: 'Datamodellering og databasesystemer',
        term: 'autumn',
        year: 2023,
        href: uia('studier/emner/2023/host/is-201.html'),
      },
      {
        code: 'IS-202',
        name: 'Programmeringsprosjekt',
        term: 'autumn',
        year: 2023,
        href: uia('studier/emner/2023/host/is-202.html'),
      },
      {
        code: 'IS-112',
        name: 'Tjenestedesign og forretningsmodeller',
        term: 'spring',
        year: 2024,
        href: uia('studier/emner/2024/var/is-112.html'),
      },
      {
        code: 'IS-211',
        name: 'Algorithms and Data Structures',
        term: 'spring',
        year: 2024,
        href: uia('studier/emner/2024/var/is-211.html'),
      },
      {
        code: 'IS-214',
        name: 'Information Systems Security',
        term: 'spring',
        year: 2024,
        href: uia('studier/emner/2024/var/is-214.html'),
      },
      {
        code: 'IS-309',
        name: 'Videregående databasesystemer',
        term: 'spring',
        year: 2024,
        href: uia('studier/emner/2024/var/is-309.html'),
      },
      {
        code: 'IS-216',
        name: 'Data Science Applications',
        term: 'autumn',
        year: 2024,
        href: uia('english/studies/courses/2024/autumn/is-216.html'),
      },
      {
        code: 'IS-115',
        name: 'Webprogrammering i PHP',
        term: 'autumn',
        year: 2024,
        href: uia('studier/emner/2024/host/is-115.html'),
      },
      {
        code: 'IS-302',
        name: 'Praksisprosjekt',
        term: 'autumn',
        year: 2024,
        href: uia('studier/emner/2024/host/is-302.html'),
      },
      {
        code: 'IS-310',
        name: 'Prosjektgjennomføring',
        term: 'autumn',
        year: 2024,
        href: uia('studier/emner/2024/host/is-310.html'),
      },
      {
        code: 'IS-304',
        name: 'Bacheloroppgave i informasjonssystemer',
        term: 'spring',
        year: 2025,
        href: uia('studier/emner/2025/var/is-304.html'),
      },
      {
        code: 'IS-305',
        name: 'Aktuelle IT-relaterte tema, bærekraft og digitalisering',
        term: 'spring',
        year: 2025,
        href: uia('studier/emner/2025/var/is-305.html'),
      },
    ],
  },
  {
    id: 'foundation',
    title: { no: 'Forkurs for ingeniørutdanning', en: 'Foundation year for engineering studies' },
    timeline: { title: { no: 'Forkurs', en: 'Foundation year' }, org: 'UiA' },
    institution: 'Universitetet i Agder (UiA)',
    period: { start: '2021-08', end: '2022-06' },
    description: {
      no: 'Matematikk, fysikk, kommunikasjon og faget teknologi og samfunn.',
      en: 'Mathematics, physics, communication, and a course on technology and society.',
    },
    courses: [],
  },
  {
    id: 'vgs',
    title: { no: 'Medier og kommunikasjon', en: 'Media and Communication (Medier og kommunikasjon)' },
    timeline: {
      title: { no: 'Medier og kommunikasjon', en: 'Media and Communication' },
      org: 'Sam Eyde VGS',
    },
    institution: 'Sam Eyde videregående skole',
    // 2018–2021 confirmed by Felix; the 2019–2020 exchange year is from the CV.
    period: { start: '2018', end: '2021' },
    highlight: { start: '2019', end: '2020' },
    description: {
      no: 'Her startet interessen for koding, IT og informasjonssystemer. Jeg la vekt på det tekniske og valgte tilleggsfag i programmering og UI/UX-design.',
      en: 'This is where my interest in coding, IT and information systems began. I leaned towards the technical side and took extra subjects in programming and UI/UX design.',
    },
    journey: {
      no: [
        'Medier og kommunikasjon ved Sam Eyde VGS',
        'Utvekslingsår ved Reynella East College i Australia, 2019–2020',
        'Tilbake på Sam Eyde VGS for å fullføre',
      ],
      en: [
        'Media and Communication at Sam Eyde VGS',
        'Exchange year at Reynella East College in Australia, 2019–2020',
        'Back at Sam Eyde VGS to finish',
      ],
    },
    courses: [],
  },
];

export const certificates: Certificate[] = [
  {
    title: {
      no: 'Innføring i prosjektledelse for studenttillitsvalgte',
      en: 'Introduction to project management for student representatives',
    },
    issuer: 'NITO',
    href: '/certificates/intro-prosjektledelse.pdf',
  },
  {
    title: { no: 'Lederutvikling for lokallagsledere', en: 'Leadership development for local chapter leaders' },
    issuer: 'NITO',
    href: '/certificates/lederutvikling-lokallagsledere.pdf',
  },
  {
    title: { no: 'GDPR for leder', en: 'GDPR for managers' },
    issuer: 'KIWI minipris',
  },
];
