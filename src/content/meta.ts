import { HTML_LANG, LOCALES, OG_LOCALE, SITE_URL, type L, type Locale } from '../i18n/locale.ts';
import { contactDetails, copy } from './copy.ts';

// Used both at runtime (to update the document head when the language
// changes) and at build time (to write a static page per language).

export const meta = {
  title: {
    no: 'Felix Fabricius Knutsen – informasjonssystemer, digitalisering og ledelse',
    en: 'Felix Fabricius Knutsen – information systems, digitalisation and leadership',
  },
  description: {
    no: 'Masterstudent i informasjonssystemer ved UiA, ferdig i juni 2027. Praksis fra Kristiansand kommune og Phonero, verv i STA og NITO Studentene. Ser etter fulltidsstilling innen informasjonssystemer og digital transformasjon.',
    en: 'Master’s student in Information Systems at UiA, finishing in June 2027. Internships at Kristiansand kommune and Phonero, elected roles at STA and NITO Studentene. Looking for a full-time role in information systems and digital transformation.',
  },
  ogImage: { no: '/images/og-no.jpg', en: '/images/og-en.jpg' },
  ogImageAlt: {
    no: 'Portrett av Felix Fabricius Knutsen ved siden av teksten «Fra hvordan folk jobber til systemer som virker» på ultramarin bakgrunn.',
    en: 'Portrait of Felix Fabricius Knutsen beside the line “From how people work to systems that work” on an ultramarine background.',
  },
} satisfies Record<string, L>;

export function pageUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}/`;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * ProfilePage + Person graph. Only facts stated on the page itself: the
 * degree, the two current elected roles, the stated interests and public links.
 */
export function personJsonLd(locale: Locale): string {
  const url = pageUrl(locale);
  const personId = `${SITE_URL}/#person`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${url}#page`,
        url,
        name: meta.title[locale],
        description: meta.description[locale],
        inLanguage: HTML_LANG[locale],
        mainEntity: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Felix Fabricius Knutsen',
        url,
        image: `${SITE_URL}/images/felix-880.jpg`,
        description: copy.hero.role[locale],
        email: `mailto:${contactDetails.email}`,
        knowsAbout:
          locale === 'no'
            ? ['Informasjonssystemer', 'Digital transformasjon', 'Brukerorientert design']
            : ['Information systems', 'Digital transformation', 'User-centred design'],
        alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitetet i Agder', url: 'https://www.uia.no/' },
        memberOf: [
          { '@type': 'Organization', name: 'Studentorganisasjonen i Agder' },
          { '@type': 'Organization', name: 'NITO Studentene' },
        ],
        address: { '@type': 'PostalAddress', addressLocality: 'Kristiansand', addressRegion: 'Agder', addressCountry: 'NO' },
        sameAs: [contactDetails.linkedin, contactDetails.github],
      },
    ],
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** The SEO block of `<head>` for one language version. */
export function renderHead(locale: Locale): string {
  const url = pageUrl(locale);
  const title = escapeHtml(meta.title[locale]);
  const description = escapeHtml(meta.description[locale]);
  const image = `${SITE_URL}${meta.ogImage[locale]}`;
  const alternates = LOCALES.map(
    (alt) => `<link rel="alternate" hreflang="${HTML_LANG[alt]}" href="${pageUrl(alt)}" />`,
  );

  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('no')}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="Felix Fabricius Knutsen" />`,
    `<meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    ...LOCALES.filter((alt) => alt !== locale).map(
      (alt) => `<meta property="og:locale:alternate" content="${OG_LOCALE[alt]}" />`,
    ),
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(meta.ogImageAlt[locale])}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${personJsonLd(locale)}</script>`,
  ].join('\n    ');
}
