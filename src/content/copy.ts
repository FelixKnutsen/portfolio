import type { L } from '../i18n/locale';
import type { Lens, Track } from './types';

// Every piece of interface text lives here so both languages stay in step.

export const SECTION_IDS = ['work', 'leadership', 'experience', 'education', 'contact'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export const contactDetails = {
  email: 'felix.knutsen@gmail.com',
  linkedin: 'https://www.linkedin.com/in/felix-knutsen/',
  github: 'https://github.com/FelixKnutsen',
  repo: 'https://github.com/FelixKnutsen/portfolio',
};

export const copy = {
  skipLink: { no: 'Hopp til innholdet', en: 'Skip to content' },
  homeLabel: { no: 'Felix Fabricius Knutsen, til toppen', en: 'Felix Fabricius Knutsen, back to top' },
  nav: {
    label: { no: 'Hovedmeny', en: 'Main menu' },
    open: { no: 'Meny', en: 'Menu' },
    close: { no: 'Lukk', en: 'Close' },
    sections: {
      work: { no: 'Arbeid', en: 'Work' },
      leadership: { no: 'Ledelse', en: 'Leadership' },
      experience: { no: 'Erfaring', en: 'Experience' },
      education: { no: 'Utdanning', en: 'Education' },
      contact: { no: 'Kontakt', en: 'Contact' },
    } satisfies Record<SectionId, L>,
  },
  language: {
    label: { no: 'Språk', en: 'Language' },
    names: { no: 'Norsk', en: 'English' } satisfies L,
    short: { no: 'NO', en: 'EN' } satisfies L,
  },

  hero: {
    role: {
      no: 'Masterstudent i informasjonssystemer ved Universitetet i Agder, ferdig i juni 2027',
      en: 'Master’s student in Information Systems at the University of Agder, finishing in June 2027',
    },
    statement: {
      no: 'Jeg studerer informasjonssystemer og er opptatt av hvordan teknologi, digitalisering og brukerorientert design kan møte reelle behov i organisasjoner.',
      en: 'I study information systems and care about how technology, digital transformation and user-centred design can meet real needs in organisations.',
    },
    now: {
      no: 'Nå: læringsmiljøpolitisk ansvarlig i Studentorganisasjonen i Agder (50 %) ved siden av masteren, og styremedlem i NITO Studentene.',
      en: 'Now: Officer of the learning environment at Studentorganisasjonen i Agder (50%) alongside my master’s, and board member of NITO Studentene.',
    },
    seeking: {
      no: 'Ser etter en fulltidsstilling der organisasjon, informasjonssystemer og digital transformasjon møtes. Fleksibel oppstart. Agder, men åpen for å flytte.',
      en: 'Looking for a full-time role where organisations, information systems and digital transformation meet. Flexible start date. Based in Agder, open to relocating.',
    },
    primaryCta: { no: 'Se utvalgt arbeid', en: 'See selected work' },
    secondaryCta: { no: 'Ta kontakt', en: 'Get in touch' },
    portraitAlt: {
      no: 'Portrett av Felix Fabricius Knutsen, smilende, i tweedjakke og hvit skjorte',
      en: 'Portrait of Felix Fabricius Knutsen smiling, in a tweed jacket and white shirt',
    },
    portraitCredit: { no: 'Foto: Bjarne Krogstad / NITO', en: 'Photo: Bjarne Krogstad / NITO' },
    mapTitle: { no: 'Erfaringen min som prosesskart', en: 'My experience as a process map' },
    mapCaption: {
      no: 'Seks steg fra praksis, bacheloroppgave og verv, plassert etter om de handlet om mennesker, prosess eller teknologi. Velg et steg for å lese mer.',
      en: 'Six steps from internships, my thesis and elected roles, placed by whether they were about people, process or technology. Choose a step to read more.',
    },
  },

  lenses: {
    people: { no: 'Mennesker', en: 'People' },
    process: { no: 'Prosess', en: 'Process' },
    technology: { no: 'Teknologi', en: 'Technology' },
  } satisfies Record<Lens, L>,

  about: {
    heading: { no: 'Mellom systemet og menneskene', en: 'Between the system and the people' },
    body: {
      no: [
        'Jeg har en bachelor i IT og informasjonssystemer og tar nå master i informasjonssystemer ved UiA. Interessen startet med koding og UI/UX-design på videregående.',
        'Praksis hos Phonero og i Kristiansand kommune har gitt meg erfaring med brukerintervjuer, produksjonskode og kartlegging av arbeidsprosesser. Det har gjort meg mer interessert i det som skjer rundt teknologien: hvordan arbeidet faktisk gjøres, hva brukerne trenger, og hva som skal til for at en ny løsning blir tatt i bruk. Det er det jeg vil jobbe videre med.',
      ],
      en: [
        'I hold a bachelor’s degree in IT and Information Systems and am now studying for a master’s in Information Systems at UiA. The interest started with coding and UI/UX design at upper secondary school.',
        'Internships at Phonero and Kristiansand kommune have given me experience with user interviews, production code and mapping work processes. They have made me more interested in what happens around the technology: how the work is really done, what users need, and what it takes for a new solution to be adopted. That is what I want to keep working on.',
      ],
    } satisfies L<string[]>,
    lenses: {
      people: {
        no: 'Brukerintervjuer i bacheloroppgaven, og tillitsverv der jeg representerer studenter.',
        en: 'User interviews in my bachelor’s thesis, and elected roles representing students.',
      },
      process: {
        no: 'Kravkartlegging i bacheloroppgaven og kartlegging av arbeidsprosesser i praksisen i Kristiansand kommune.',
        en: 'Requirements work in my bachelor’s thesis, and mapping work processes during my internship at Kristiansand kommune.',
      },
      technology: {
        no: 'React, TypeScript og GraphQL hos Phonero, i praksis og bacheloroppgave. React og TypeScript også i egne prosjekter, som STA-prototypen og denne nettsiden. C# og .NET fra studier og prosjektarbeid, SQL og PostgreSQL fra databaseemnene.',
        en: 'React, TypeScript and GraphQL at Phonero, in my internship and thesis. React and TypeScript also in my own projects, such as the STA prototype and this website. C# and .NET from my studies and project work, SQL and PostgreSQL from the database courses.',
      },
    } satisfies Record<Lens, L>,
    interestsLabel: { no: 'Faglige interesser', en: 'Professional interests' },
    interests: {
      no: 'Digital transformasjon, informasjonssystemer, brukerorientert design, prosessforbedring, innovasjon og kunstig intelligens.',
      en: 'Digital transformation, information systems, user-centred design, process improvement, innovation and artificial intelligence.',
    },
  },

  work: {
    heading: { no: 'Utvalgt arbeid', en: 'Selected work' },
    intro: {
      no: 'Tre prosjekter: hva oppgaven var, hvordan vi jobbet, og hva jeg selv gjorde.',
      en: 'Three projects: what the task was, how we worked, and what I did myself.',
    },
    stepsLabel: { no: 'Hva jeg gjorde, steg for steg', en: 'What I did, step by step' },
    groupStepsLabel: { no: 'Hva vi gjorde, steg for steg', en: 'What we did, step by step' },
    roleLabel: { no: 'Min rolle', en: 'My role' },
    decisionLabel: { no: 'Et valg vi tok', en: 'A decision we made' },
    outcomeLabel: { no: 'Resultat', en: 'Outcome' },
    learningLabel: { no: 'Hva jeg tok med meg', en: 'What I took away' },
    stackLabel: { no: 'Teknologi', en: 'Technology' },
  },

  leadership: {
    heading: { no: 'Ledelse og tillitsverv', en: 'Leadership and elected roles' },
    intro: {
      no: 'Ved siden av studiene har jeg hatt verv der jeg representerer andre studenter og har ansvar for planlegging og gjennomføring.',
      en: 'Alongside my studies I have held elected roles representing other students, with responsibility for planning and delivery.',
    },
    current: { no: 'Nåværende verv', en: 'Current role' },
    staText: {
      no: 'Et frikjøpt styreverv i 50 % stilling ved siden av masterstudiet. STA representerer studentene ved UiA, og hovedansvaret mitt er læringsmiljøpolitikk, oppfølging av studenttillitsvalgte, og bærekraft og miljø.',
      en: 'A paid, elected board position at 50%, alongside my master’s studies. STA represents the students at UiA, and my main responsibilities are learning environment policy, being the contact for student representatives, and sustainability and the environment.',
    },
    staSource: { no: 'Styret på stastudent.no', en: 'The board on stastudent.no' },
    staFocusLabel: { no: 'Arbeider også med', en: 'Also working on' },
    staFocus: {
      no: [
        'Digital suverenitet, datasikkerhet og ansvarlig digitalisering',
        'Arbeidet med retningslinjer for kunstig intelligens i utdanning og arbeidsliv',
        'Digitalt campus',
      ],
      en: [
        'Digital sovereignty, data security and responsible digitalisation',
        'Work on guidelines for artificial intelligence in education and working life',
        'The digital campus',
      ],
    } satisfies L<string[]>,
    nitoStory: {
      no: 'Som styreleder i NITO Studentene Kristiansand satte vi tidlig mål om at medlemskapet skulle være nyttig, lærerikt og gøy. I februar 2026 ble styret kåret til Årets Lokallag, som det beste av 25 lokallagsstyrer, blant annet for helhetlig drift, kreative arrangementer og god gjennomføring.',
      en: 'As chair of NITO Studentene Kristiansand, our board set out early to make membership useful, educational and fun. In February 2026 it was named Local Chapter of the Year, the best of 25 local boards, recognised among other things for how it was run, for creative events and for following through.',
    },
    awardLabel: { no: 'Årets Lokallag', en: 'Local Chapter of the Year' },
    awardDiploma: { no: 'Se diplomet (PDF)', en: 'View the diploma (PDF)' },
    parliamentLabel: { no: 'Tidligere', en: 'Earlier' },
  },

  experience: {
    heading: { no: 'Erfaring', en: 'Experience' },
    intro: {
      no: 'Arbeid, verv og utdanning har gått parallelt. Tidslinjen gir oversikten. Arbeid og prosjekter står under, vervene under Ledelse og utdanningen i neste del.',
      en: 'Work, elected roles and education have run in parallel. The timeline gives the overview. Work and projects follow below, elected roles are under Leadership, and education comes next.',
    },
    chartLabel: {
      no: 'Tidslinje over arbeid, verv og utdanning fra 2018 til i dag',
      en: 'Timeline of work, elected roles and education from 2018 to today',
    },
    chartListNote: {
      no: 'Den samme informasjonen står i listen under, under Ledelse og under Utdanning',
      en: 'The same information is in the list below, under Leadership and under Education',
    },
    chartHint: { no: 'Velg en linje for å gå til detaljene.', en: 'Choose a bar to jump to its details.' },
    scrollHint: { no: 'Sveip sideveis for tidligere år.', en: 'Swipe sideways for earlier years.' },
    legend: {
      employment: { no: 'Arbeid', en: 'Work' },
      project: { no: 'Prosjekt', en: 'Project' },
      role: { no: 'Verv', en: 'Elected role' },
      education: { no: 'Utdanning', en: 'Education' },
      highlight: { no: 'Utvekslingsår', en: 'Exchange year' },
    },
    today: { no: 'I dag', en: 'Today' },
    showDetails: { no: 'Vis detaljer', en: 'Show details' },
    hideDetails: { no: 'Skjul detaljer', en: 'Hide details' },
    readCase: { no: 'Se prosjektet', en: 'See the project' },
    ongoing: { no: 'Pågår', en: 'Ongoing' },
    tracks: {
      work: { no: 'Arbeid og prosjekter', en: 'Work and projects' },
      leadership: { no: 'Verv', en: 'Elected roles' },
      education: { no: 'Utdanning', en: 'Education' },
    } satisfies Record<Track, L>,
  },

  education: {
    heading: { no: 'Utdanning', en: 'Education' },
    intro: {
      no: 'Fra medier og koding på videregående til master i informasjonssystemer.',
      en: 'From media and coding at upper secondary school to a master’s in information systems.',
    },
    journeyLabel: { no: 'Veien gjennom videregående', en: 'Through upper secondary school' },
    showCourses: { no: 'Vis emner', en: 'Show courses' },
    hideCourses: { no: 'Skjul emner', en: 'Hide courses' },
    courseCount: { no: 'emner', en: 'courses' },
    terms: {
      spring: { no: 'Vår', en: 'Spring' },
      autumn: { no: 'Høst', en: 'Autumn' },
    },
    certificatesHeading: { no: 'Kurs', en: 'Courses' },
    openCertificate: { no: 'Åpne kursbevis (PDF)', en: 'Open certificate (PDF)' },
    opensInNewTab: { no: 'åpnes i ny fane', en: 'opens in a new tab' },
  },

  contact: {
    heading: { no: 'Ta kontakt', en: 'Get in touch' },
    body: {
      no: 'Jeg ser etter en fulltidsstilling der organisasjon, informasjonssystemer og digital transformasjon møtes. Masteren er ferdig i juni 2027, oppstart er fleksibel, og jeg bor i Agder, men er åpen for å flytte.',
      en: 'I am looking for a full-time role where organisations, information systems and digital transformation meet. My master’s finishes in June 2027, my start date is flexible, and I live in Agder but am open to relocating.',
    },
    emailLabel: { no: 'E-post', en: 'Email' },
    copyEmail: { no: 'Kopier e-postadressen', en: 'Copy email address' },
    copied: { no: 'Kopiert', en: 'Copied' },
    formHeading: { no: 'Eller send en melding her', en: 'Or send a message here' },
    form: {
      name: { no: 'Navn', en: 'Name' },
      email: { no: 'E-post', en: 'Email' },
      subject: { no: 'Emne', en: 'Subject' },
      optional: { no: 'valgfritt', en: 'optional' },
      message: { no: 'Melding', en: 'Message' },
      submit: { no: 'Send melding', en: 'Send message' },
      sending: { no: 'Sender …', en: 'Sending…' },
      sent: {
        no: 'Meldingen er sendt. Jeg svarer så snart jeg kan.',
        en: 'Your message has been sent. I will reply as soon as I can.',
      },
      failed: {
        no: 'Meldingen ble ikke sendt. Prøv igjen, eller send en e-post direkte.',
        en: 'The message was not sent. Try again, or send an email directly.',
      },
      errors: {
        name: { no: 'Skriv navnet ditt.', en: 'Enter your name.' },
        emailMissing: { no: 'Skriv e-postadressen din.', en: 'Enter your email address.' },
        emailInvalid: {
          no: 'Skriv en gyldig e-postadresse, for eksempel navn@firma.no.',
          en: 'Enter a valid email address, such as name@company.com.',
        },
        message: { no: 'Skriv en melding.', en: 'Enter a message.' },
        summary: { no: 'Rett opp feltene som er markert.', en: 'Correct the highlighted fields.' },
      },
      privacy: {
        no: 'Skjemaet sendes via Web3Forms og brukes bare til å svare deg.',
        en: 'The form is delivered through Web3Forms and only used to reply to you.',
      },
    },
  },

  cv: {
    heading: { no: 'CV', en: 'CV' },
    view: { no: 'Se CV', en: 'View CV' },
    download: { no: 'Last ned CV', en: 'Download CV' },
    format: { no: 'PDF, 2 sider', en: 'PDF in Norwegian, 2 pages' },
    viewLabel: { no: 'Se CV som PDF, åpnes i ny fane', en: 'View CV as PDF (in Norwegian), opens in a new tab' },
    downloadLabel: { no: 'Last ned CV som PDF', en: 'Download CV as PDF (in Norwegian)' },
  },

  footer: {
    builtWith: { no: 'Bygget med React og TypeScript.', en: 'Built with React and TypeScript.' },
    source: { no: 'Kildekoden ligger på GitHub', en: 'Source code on GitHub' },
  },

  external: { no: 'åpnes i ny fane', en: 'opens in a new tab' },
};
