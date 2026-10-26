import type { L } from '../i18n/locale';
import type { Lens, Track } from './types';

// Every piece of interface text lives here so both languages stay in step.

export const SECTION_IDS = ['work', 'approach', 'leadership', 'background', 'contact'] as const;
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
      approach: { no: 'Arbeidsmåte', en: 'Approach' },
      leadership: { no: 'Ledelse', en: 'Leadership' },
      background: { no: 'Bakgrunn', en: 'Background' },
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
    /** Set as four lines; each item is one line of the headline. */
    headline: {
      no: ['Fra hvordan', 'folk jobber', 'til systemer', 'som virker.'],
      en: ['From how', 'people work', 'to systems', 'that work.'],
    } satisfies L<string[]>,
    primaryCta: { no: 'Se arbeidet', en: 'See the work' },
    secondaryCta: { no: 'Ta kontakt', en: 'Get in touch' },
    boardHeading: { no: 'Arbeidet mitt, sortert', en: 'My work, sorted' },
    boardIntro: {
      no: 'Ting jeg har gjort, sortert etter om de handlet om mennesker, prosess eller teknologi. Hver lenke går til prosjektet.',
      en: 'Things I have done, sorted by whether they were about people, process or technology. Each link goes to the project.',
    },
    scrollHint: { no: 'Bla for å sortere', en: 'Scroll to sort' },
  },

  lenses: {
    people: { no: 'Mennesker', en: 'People' },
    process: { no: 'Prosess', en: 'Process' },
    technology: { no: 'Teknologi', en: 'Technology' },
  } satisfies Record<Lens, L>,

  intro: {
    heading: { no: 'Om meg', en: 'About me' },
    statement: {
      no: 'Jeg jobber mellom menneskene som gjør jobben og koden som støtter dem, og jeg kan gjøre begge deler.',
      en: 'I work between the people doing the job and the code that supports it, and I can do both halves.',
    },
    body: {
      no: [
        'Jeg har gjennomført brukerintervjuer og kravarbeid, kartlagt arbeidsprosesser i en kommune og skrevet React- og TypeScript-kode i produksjon.',
        'Praksis hos Phonero og i Kristiansand kommune har gjort meg mer interessert i det som skjer rundt teknologien: hvordan arbeidet faktisk gjøres, hva brukerne trenger, og hva som skal til for at en ny løsning blir tatt i bruk. Det er det jeg vil jobbe videre med.',
      ],
      en: [
        'I have run user interviews and requirements work, mapped work processes in a municipality, and written React and TypeScript in production code.',
        'Internships at Phonero and Kristiansand kommune have made me more interested in what happens around the technology: how the work is really done, what users need, and what it takes for a new solution to be adopted. That is what I want to keep working on.',
      ],
    } satisfies L<string[]>,
    facts: {
      seekingLabel: { no: 'Ser etter', en: 'Looking for' },
      seeking: {
        no: 'En fulltidsstilling der organisasjon, informasjonssystemer og digital transformasjon møtes. Fleksibel oppstart.',
        en: 'A full-time role where organisations, information systems and digital transformation meet. Flexible start date.',
      },
      nowLabel: { no: 'Nå', en: 'Now' },
      now: {
        no: 'Masterstudent, læringsmiljøpolitisk ansvarlig i Studentorganisasjonen i Agder (50 %) og styremedlem i NITO Studentene.',
        en: 'Master’s student, Officer of the learning environment at Studentorganisasjonen i Agder (50%) and board member of NITO Studentene.',
      },
      placeLabel: { no: 'Bor', en: 'Based in' },
      place: { no: 'Kristiansand, åpen for å flytte', en: 'Kristiansand, Norway, open to relocating' },
      interestsLabel: { no: 'Interesser', en: 'Interests' },
      interests: {
        no: 'Digital transformasjon, prosessforbedring, brukerorientert design, innovasjon og kunstig intelligens.',
        en: 'Digital transformation, process improvement, user-centred design, innovation and artificial intelligence.',
      },
    },
    portraitAlt: {
      no: 'Portrett av Felix Fabricius Knutsen, smilende, i tweedjakke og hvit skjorte',
      en: 'Portrait of Felix Fabricius Knutsen smiling, in a tweed jacket and white shirt',
    },
    portraitCredit: { no: 'Foto: Bjarne Krogstad / NITO', en: 'Photo: Bjarne Krogstad / NITO' },
  },

  work: {
    heading: { no: 'Utvalgt arbeid', en: 'Selected work' },
    intro: {
      no: 'Tre prosjekter: hva problemet var, hvordan vi jobbet, og hva jeg selv gjorde.',
      en: 'Three projects: what the problem was, how we worked, and what I did myself.',
    },
    indexLabel: { no: 'Prosjektene', en: 'The projects' },
    problemLabel: { no: 'Problemet', en: 'The problem' },
    stepsLabel: { no: 'Hva jeg gjorde, steg for steg', en: 'What I did, step by step' },
    groupStepsLabel: { no: 'Hva vi gjorde, steg for steg', en: 'What we did, step by step' },
    roleLabel: { no: 'Min rolle', en: 'My role' },
    outcomeLabel: { no: 'Status', en: 'Status' },
    learningLabel: { no: 'Hva jeg tok med meg', en: 'What I took away' },
    stackLabel: { no: 'Teknologi', en: 'Technology' },
    linksLabel: { no: 'Se selv', en: 'See for yourself' },
  },

  equipment: {
    title: { no: 'Utstyrslisten, sortert to måter', en: 'The equipment list, sorted two ways' },
    byDevice: { no: 'Etter enhet', en: 'By device' },
    byPerson: { no: 'Etter person', en: 'By person' },
    viewLabel: { no: 'Vis listen', en: 'Show the list' },
    device: { no: 'Enhet', en: 'Device' },
    sim: { no: 'SIM', en: 'SIM' },
    holder: { no: 'Bruker', en: 'Holder' },
    unregistered: { no: 'Ikke registrert', en: 'Not registered' },
    viaSim: { no: 'Lagt til via SIM', en: 'Added via SIM' },
    devices: { no: 'enheter', en: 'devices' },
    device1: { no: 'enhet', en: 'device' },
    before: {
      no: 'Før: en lang liste over enheter. Den som har utstyret må registreres for hånd, og feil blir liggende.',
      en: 'Before: a long list of devices. Whoever holds each one has to be registered by hand, and mistakes stay put.',
    },
    after: {
      no: 'Etter: utstyret samlet under personen som har det. En ny enhet havner riktig via SIM-kortet.',
      en: 'After: equipment grouped under the person who holds it. A new device lands in the right place through its SIM card.',
    },
    caption: {
      no: 'Illustrasjon med oppdiktede navn og enheter. Ikke Phoneros grensesnitt.',
      en: 'Illustration with made-up names and devices. Not Phonero’s interface.',
    },
  },

  website: {
    tabsLabel: { no: 'Visning', en: 'View' },
    siteTab: { no: 'Nettsiden', en: 'The website' },
    guideTab: { no: 'For redaktører', en: 'For editors' },
    guideTitle: { no: 'Brukerveiledning for stastudent.no', en: 'User guide for stastudent.no' },
    guideIntro: {
      no: 'Skrevet for deg som skal holde nettsiden oppdatert, også om du aldri har brukt WordPress før og ikke kan koding.',
      en: 'Written for whoever keeps the website up to date, even if they have never used WordPress and cannot code.',
    },
    wantTo: { no: 'Jeg vil …', en: 'I want to…' },
    goTo: { no: 'Gå hit', en: 'Go here' },
    guideRows: [
      { want: { no: 'Skrive en nyhet', en: 'Write a news story' }, go: { no: 'Nytt innlegg', en: 'New post' } },
      {
        want: { no: 'Endre tekst eller bilder på en side', en: 'Change text or images on a page' },
        go: { no: 'Rediger med Elementor', en: 'Edit with Elementor' },
      },
      {
        want: { no: 'Oversette til nynorsk', en: 'Translate into Nynorsk' },
        go: { no: 'Nynorsk-tekst', en: 'Nynorsk text' },
      },
      {
        want: { no: 'Gi en ny person tilgang', en: 'Give a new person access' },
        go: { no: 'Legg til bruker', en: 'Add user' },
      },
      { want: { no: 'Ta sikkerhetskopi', en: 'Make a backup' }, go: { no: 'Backup & Migration', en: 'Backup & Migration' } },
    ],
    guideCaption: {
      no: 'Utdrag fra brukerveiledningen i stastudentphp-repoet.',
      en: 'An excerpt from the user guide in the stastudentphp repository, translated from Norwegian.',
    },
    url: { no: 'stastudent.vercel.app/dokumenter', en: 'stastudent.vercel.app/dokumenter' },
  },

  twin: {
    caption: {
      no: 'Illustrasjon: kvartaler i et rutenett, som Kvadraturen i Kristiansand. En digital tvilling er en digital modell av slike omgivelser, som kan kobles til data om dem. Pek på et kvartal.',
      en: 'Illustration: city blocks on a grid, like Kvadraturen in Kristiansand. A digital twin is a digital model of surroundings like these, which can be linked to data about them. Point at a block.',
    },
    block: { no: 'Kvartal', en: 'Block' },
    storeys: { no: 'etasjer', en: 'storeys' },
  },

  approach: {
    heading: { no: 'Slik jobber jeg', en: 'How I work' },
    intro: {
      no: 'Fem ting jeg gjør, og hvor du kan se dem.',
      en: 'Five things I do, and where you can see them.',
    },
    seeIn: { no: 'Se', en: 'See' },
    skillsHeading: { no: 'Metoder og verktøy, og hvor jeg har brukt dem', en: 'Methods and tools, and where I used them' },
    skillColumn: { no: 'Metode eller verktøy', en: 'Method or tool' },
    whereColumn: { no: 'Brukt i', en: 'Used in' },
    coursework: {
      no: 'Fra studiene også: C#, .NET, SQL og PostgreSQL.',
      en: 'Also from my studies: C#, .NET, SQL and PostgreSQL.',
    },
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
    awardLabel: { no: 'Årets Lokallag 2026', en: 'Local Chapter of the Year 2026' },
    awardFigure: {
      no: '25 lokallagsstyrer i NITO Studentene. Ett ble kåret.',
      en: '25 local boards in NITO Studentene. One was chosen.',
    },
    awardFigureLabel: {
      no: '25 prikker for de 25 lokallagsstyrene. Én er markert: Kristiansand, Årets Lokallag 2026.',
      en: '25 dots for the 25 local boards. One is marked: Kristiansand, Local Chapter of the Year 2026.',
    },
    nitoHeading: { no: 'Styreleder, NITO Studentene Kristiansand', en: 'Chair, NITO Studentene Kristiansand' },
    nitoStory: {
      no: 'Som styreleder satte vi tidlig mål om at medlemskapet skulle være nyttig, lærerikt og gøy. I februar 2026 ble styret kåret til Årets Lokallag, som det beste av 25 lokallagsstyrer, blant annet for helhetlig drift, kreative arrangementer og god gjennomføring.',
      en: 'As chair, our board set out early to make membership useful, educational and fun. In February 2026 it was named Local Chapter of the Year, the best of 25 local boards, recognised among other things for how it was run, for creative events and for following through.',
    },
    awardDiploma: { no: 'Se diplomet (PDF)', en: 'View the diploma (PDF)' },
    nationalHeading: { no: 'Styremedlem, sentralstyret i NITO Studentene', en: 'Board member, NITO Studentene national board' },
    earlier: { no: 'Tidligere', en: 'Earlier' },
  },

  background: {
    heading: { no: 'Bakgrunn', en: 'Background' },
    intro: {
      no: 'Arbeid, verv og utdanning har gått parallelt. Hver linje viser når, og det meste kan åpnes for detaljer.',
      en: 'Work, elected roles and education have run side by side. Each line shows when, and most can be opened for details.',
    },
    axisLabel: { no: 'Tidsakse fra 2018 til 2027', en: 'Time axis from 2018 to 2027' },
    today: { no: 'I dag', en: 'Today' },
    showDetails: { no: 'Vis detaljer', en: 'Show details' },
    hideDetails: { no: 'Skjul detaljer', en: 'Hide details' },
    readCase: { no: 'Les om prosjektet', en: 'Read about the project' },
    readStory: { no: 'Les mer under Ledelse', en: 'Read more under Leadership' },
    ongoing: { no: 'Pågår', en: 'Ongoing' },
    exchange: { no: 'Utvekslingsår i Australia', en: 'Exchange year in Australia' },
    tracks: {
      work: { no: 'Arbeid og prosjekter', en: 'Work and projects' },
      leadership: { no: 'Verv', en: 'Elected roles' },
      education: { no: 'Utdanning', en: 'Education' },
    } satisfies Record<Track, L>,
    journeyLabel: { no: 'Veien gjennom videregående', en: 'Through upper secondary school' },
    showCourses: { no: 'Vis emner', en: 'Show courses' },
    hideCourses: { no: 'Skjul emner', en: 'Hide courses' },
    courseCount: { no: 'emner', en: 'courses' },
    terms: {
      spring: { no: 'Vår', en: 'Spring' },
      autumn: { no: 'Høst', en: 'Autumn' },
    },
    certificatesHeading: { no: 'Kurs', en: 'Courses' },
    openCertificate: { no: 'Kursbevis (PDF)', en: 'Certificate (PDF)' },
  },

  contact: {
    heading: { no: 'Ta kontakt', en: 'Get in touch' },
    body: {
      no: 'Jeg ser etter en fulltidsstilling der organisasjon, informasjonssystemer og digital transformasjon møtes. Masteren er ferdig i juni 2027, oppstart er fleksibel, og jeg bor i Agder, men er åpen for å flytte.',
      en: 'I am looking for a full-time role where organisations, information systems and digital transformation meet. My master’s finishes in June 2027, my start date is flexible, and I live in Agder but am open to relocating.',
    },
    emailLabel: { no: 'E-post', en: 'Email' },
    copyEmail: { no: 'Kopier adressen', en: 'Copy address' },
    copied: { no: 'Kopiert', en: 'Copied' },
    elsewhere: { no: 'Andre steder', en: 'Elsewhere' },
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
    short: { no: 'CV', en: 'CV' },
    view: { no: 'Se CV', en: 'View CV' },
    download: { no: 'Last ned CV', en: 'Download CV' },
    format: { no: 'PDF, 2 sider', en: 'PDF in Norwegian, 2 pages' },
    viewLabel: { no: 'Se CV som PDF, åpnes i ny fane', en: 'View CV as PDF (in Norwegian), opens in a new tab' },
    downloadLabel: { no: 'Last ned CV som PDF', en: 'Download CV as PDF (in Norwegian)' },
  },

  footer: {
    builtWith: {
      no: 'Bygget med React og TypeScript, satt i Archivo.',
      en: 'Built with React and TypeScript, set in Archivo.',
    },
    source: { no: 'Kildekoden ligger på GitHub', en: 'Source code on GitHub' },
    top: { no: 'Til toppen', en: 'Back to top' },
  },

  external: { no: 'åpnes i ny fane', en: 'opens in a new tab' },
};
