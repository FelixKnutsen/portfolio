import type { Role } from './types';

// Sources: CV (2026), LinkedIn (public profile, Oct 2026) and the previous
// version of this site. Where they disagree, the newest source is used.

export const roles: Role[] = [
  // ── Work and projects ────────────────────────────────────────────
  {
    id: 'kommune',
    track: 'work',
    title: { no: 'Innovasjonsjeger (praksis)', en: 'Innovation scout (internship)' },
    timeline: { title: { no: 'Innovasjonsjeger', en: 'Innovation scout' }, org: 'Kristiansand kommune' },
    org: 'Kristiansand kommune',
    place: { no: 'Plan og bygg', en: 'Planning and building services' },
    period: { start: '2026-01', end: '2026-05' },
    summary: {
      no: 'Praksis i teknologiteamet i Plan og bygg, med særlig fokus på digitale tvillinger.',
      en: 'Internship in the technology team in planning and building services, with a particular focus on digital twins.',
    },
    storyHref: '#work-kommune',
  },
  {
    id: 'phonero-thesis',
    track: 'work',
    kind: 'project',
    title: { no: 'Bacheloroppgave, systemutvikling', en: 'Bachelor’s thesis, systems development' },
    timeline: { title: { no: 'Bacheloroppgave', en: 'Bachelor’s thesis' }, org: 'Phonero' },
    org: 'Phonero',
    period: { start: '2025-01', end: '2025-06' },
    summary: {
      no: 'Gruppeleder i et prosjekt på tre: en ny utstyrsliste for Phoneros bedriftskunder. Jeg skrev det meste av koden.',
      en: 'Group leader in a team of three: a new equipment list for Phonero’s business customers. I wrote most of the code.',
    },
    storyHref: '#work-phonero',
  },
  {
    id: 'phonero-intern',
    track: 'work',
    title: { no: 'Utviklerpraktikant', en: 'Developer intern' },
    timeline: { title: { no: 'Utviklerpraktikant', en: 'Developer intern' }, org: 'Phonero' },
    org: 'Phonero',
    period: { start: '2024-08', end: '2024-11' },
    summary: {
      no: 'Systemutvikling, feilretting og ny funksjonalitet i produksjonskode.',
      en: 'Development, bug fixing and new features in production code.',
    },
    details: {
      no: [
        'Arbeidet med systemutvikling, feilretting og implementering av ny funksjonalitet i produksjonskode, i React, TypeScript og GraphQL.',
        'Utforsket og testet nye teknologier og utviklingsverktøy.',
        'Fikk erfaring med smidig utvikling, kodegjennomganger og samarbeid i et profesjonelt utviklingsteam.',
      ],
      en: [
        'Worked on development, bug fixing and implementing new functionality in production code, in React, TypeScript and GraphQL.',
        'Explored and tested new technologies and development tools.',
        'Gained experience with agile development, code reviews and working in a professional development team.',
      ],
    },
  },
  {
    id: 'kiwi',
    track: 'work',
    title: { no: 'Lukke- og låseansvarlig', en: 'Closing supervisor' },
    timeline: { title: { no: 'Lukke- og låseansvarlig', en: 'Closing supervisor' }, org: 'KIWI minipris' },
    org: 'KIWI minipris',
    place: { no: 'KIWI Lund', en: 'KIWI Lund' },
    period: { start: '2022-03', end: '2026-07' },
    summary: {
      no: 'Ledet kveldsteamet og hadde ansvar for daglig drift når butikkledelsen ikke var til stede.',
      en: 'Led the evening team and ran daily operations when store management was not on site.',
    },
    details: {
      no: [
        'Ledet kveldsteamet og fordelte arbeidsoppgaver.',
        'Ansvar for daglig drift, varemottak og kundeservice.',
        'Opplæring og oppfølging av ansatte.',
        'Startet som butikkmedarbeider på KIWI Stoa Øst i 2022, og jobbet på KIWI Lund fra 2023.',
      ],
      en: [
        'Led the evening team and allocated tasks.',
        'Responsible for daily operations, deliveries and customer service.',
        'Trained and followed up staff.',
        'Started as a store assistant at KIWI Stoa Øst in 2022 and worked at KIWI Lund from 2023.',
      ],
    },
  },

  // ── Elected roles ───────────────────────────────────────────────
  {
    id: 'sta',
    track: 'leadership',
    // Official English title from stastudent.no/en/sta-styret. A 50% position alongside studies (confirmed by Felix).
    title: { no: 'Læringsmiljøpolitisk ansvarlig', en: 'Officer of the learning environment' },
    timeline: {
      title: { no: 'Læringsmiljøpolitisk ansvarlig', en: 'Officer of the learning environment' },
      org: 'STA',
    },
    org: 'Studentorganisasjonen i Agder (STA)',
    period: { start: '2026-07', end: null },
    summary: {
      no: 'Frikjøpt styreverv i 50 % ved siden av masteren, med ansvar for læringsmiljøpolitikk.',
      en: 'Paid, elected board position at 50% alongside my master’s, responsible for learning environment policy.',
    },
  },
  {
    id: 'nito-central',
    track: 'leadership',
    title: { no: 'Styremedlem, sentralstyret', en: 'Board member, national board' },
    timeline: { title: { no: 'Sentralstyret', en: 'National board' }, org: 'NITO Studentene' },
    org: 'NITO Studentene',
    period: { start: '2026-07', end: null },
    summary: {
      no: 'Valgt inn i sentralstyret på landsmøtet i 2026. Arbeider med nasjonal studentpolitikk og koblingen mellom utdanning og arbeidsliv.',
      en: 'Elected to the national board at the 2026 national congress. Works on national student policy and the link between education and working life.',
    },
  },
  {
    id: 'nito-chair',
    track: 'leadership',
    title: { no: 'Styreleder', en: 'Chair' },
    timeline: { title: { no: 'Styreleder', en: 'Chair' }, org: 'NITO Kristiansand' },
    org: 'NITO Studentene Kristiansand',
    // Until the end of June 2026 (confirmed by Felix; matches the CV and LinkedIn).
    // The attestation, dated 13.01.2026, covers the period up to the date it was written.
    period: { start: '2025-01-16', end: '2026-06' },
    summary: {
      no: 'Ledet lokallagsstyret, som ble kåret til Årets Lokallag blant 25 lokallagsstyrer.',
      en: 'Led the local board, which was named Local Chapter of the Year out of 25 local boards.',
    },
  },
  {
    id: 'parliament',
    track: 'leadership',
    title: { no: 'Tillitsvalgt i Studentparlamentet', en: 'Elected member of the Student Parliament' },
    timeline: { title: { no: 'Studentparlamentet', en: 'Student Parliament' }, org: 'STA' },
    org: 'Studentorganisasjonen i Agder (STA)',
    period: { start: '2025-08', end: '2026-05' },
    summary: {
      no: 'Representerte studentene ved Fakultet for samfunnsvitenskap.',
      en: 'Represented students at the Faculty of Social Sciences.',
    },
    details: {
      no: [
        'Arbeidet med studentrepresentasjon, tverrfaglig samarbeid og videreutvikling av studentmiljøet.',
        'Var delegat for STA på landsmøtet til Norsk studentorganisasjon (NSO) i 2026.',
      ],
      en: [
        'Worked on student representation, cross-disciplinary collaboration and developing the student community.',
        'Served as an STA delegate to the 2026 national congress of the Norwegian Student Organisation (NSO).',
      ],
    },
  },
  {
    id: 'nito-board',
    track: 'leadership',
    title: { no: 'Styremedlem', en: 'Board member' },
    timeline: { title: { no: 'Styremedlem', en: 'Board member' }, org: 'NITO Kristiansand' },
    org: 'NITO Studentene Kristiansand',
    // Ended the day Felix became chair (16 January 2025, per the NITO attestation).
    period: { start: '2024-08', end: '2025-01-16' },
    summary: {
      no: 'Planla faglige og sosiale arrangementer for medlemmene.',
      en: 'Planned professional and social events for members.',
    },
  },
];
