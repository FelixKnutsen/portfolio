import { HTML_LANG, LOCALES, OG_LOCALE, SITE_URL, type L, type Locale } from '../i18n/locale.ts';

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
    no: 'Portrett av Felix Fabricius Knutsen ved siden av navnet, teksten «Informasjonssystemer, digitalisering og ledelse» og et prosesskart.',
    en: 'Portrait of Felix Fabricius Knutsen beside his name, the text “Information systems, digitalisation and leadership” and a process map.',
  },
} satisfies Record<string, L>;

export function pageUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}/`;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Only facts that are verifiable from the public profile and this site. */
export function personJsonLd(locale: Locale): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Felix Fabricius Knutsen',
    url: pageUrl(locale),
    image: `${SITE_URL}/images/felix-880.jpg`,
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitetet i Agder', url: 'https://www.uia.no/' },
    address: { '@type': 'PostalAddress', addressLocality: 'Kristiansand', addressCountry: 'NO' },
    sameAs: ['https://www.linkedin.com/in/felix-knutsen/', 'https://github.com/FelixKnutsen'],
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
