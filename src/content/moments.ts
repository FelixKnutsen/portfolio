import type { Moment } from './types';

// Source: Felix's own LinkedIn posts, read 15 November 2026 (docs/linkedin-inventory.md).
// Dates are the month of the event as the post describes it. Newest first.
// Captions, months and photo credits confirmed by Felix on 15 November 2026.

const post = (id: string) => `https://www.linkedin.com/feed/update/urn:li:activity:${id}/`;

export const moments: Moment[] = [
  {
    id: 'kommune-seminar',
    // Posted 28 May 2026 about "last week".
    date: '2026-05',
    caption: {
      no: 'Siste dag som innovasjonsjeger, markert med et seminar om KartAI i Bystyresalen',
      en: 'Last day as an innovation scout, marked with a seminar on KartAI in the city council chamber',
    },
    org: 'Kristiansand kommune',
    post: post('7465654407964016640'),
    photo: {
      src: '/images/linkedin/kommune-kartai-seminar-2026-bystyresalen.webp',
      alt: {
        no: 'Fullsatt Bystyresal i Kristiansand under seminaret, med foredrag på to lerreter',
        en: 'The full city council chamber in Kristiansand during the seminar, with a talk on two screens',
      },
      credit: null,
      // Shows the audience and speakers.
      approved: false,
    },
  },
  {
    id: 'nito-congress',
    date: '2026-04',
    caption: {
      no: 'Valgt inn i sentralstyret på landsmøtet i NITO Studentene',
      en: 'Elected to the national board at the NITO Studentene national congress',
    },
    org: 'NITO Studentene',
    post: post('7453068988718358529'),
    photo: {
      src: '/images/linkedin/nito-landsmote-2026-lectern.webp',
      alt: {
        no: 'Felix på talerstolen under landsmøtet i NITO Studentene',
        en: 'Felix at the lectern at the NITO Studentene national congress',
      },
      credit: 'Bjarne Krogstad',
      approved: true,
    },
  },
  {
    id: 'bachelor',
    date: '2025-06',
    caption: {
      no: 'Fullførte bachelorgraden i IT og informasjonssystemer, med bacheloroppgave for Phonero',
      en: 'Completed my bachelor’s in IT and Information Systems, with my thesis project for Phonero',
    },
    org: 'Universitetet i Agder (UiA)',
    post: post('7336424093572825091'),
    photo: {
      src: '/images/linkedin/uia-bachelor-2025-graduation.webp',
      alt: {
        no: 'Felix med vitnemål og en rose foran hovedinngangen til UiA',
        en: 'Felix with his diploma and a rose outside the main entrance of UiA',
      },
      credit: null,
      approved: true,
    },
  },
  {
    id: 'nito-leaders',
    // Posted 11 February 2025 about "this weekend".
    date: '2025-02',
    caption: {
      no: 'Representerte Kristiansand på lederkonferansen i NITO Studentene',
      en: 'Represented Kristiansand at the NITO Studentene leadership conference',
    },
    org: 'NITO Studentene',
    post: post('7295135793419808769'),
    photo: {
      src: '/images/linkedin/nito-lederkonferanse-2025-gavel.webp',
      alt: {
        no: 'Felix med en klubbe ved et bord på lederkonferansen i NITO Studentene',
        en: 'Felix holding a gavel at a table at the NITO Studentene leadership conference',
      },
      credit: 'Bjarne Krogstad',
      approved: true,
    },
  },
];
