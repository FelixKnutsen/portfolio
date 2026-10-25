// Locale primitives shared by the app, the content model and the build-time
// SEO plugin. Keep this file free of React and browser-only APIs.

export const LOCALES = ['no', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'no';

/** A value that must exist in every supported language. */
export type L<T = string> = Record<Locale, T>;

/** BCP 47 tags used for `<html lang>`, `hreflang` and `Intl` formatting. */
export const LOCALE_TAG: Record<Locale, string> = { no: 'nb-NO', en: 'en-GB' };
export const HTML_LANG: Record<Locale, string> = { no: 'nb', en: 'en' };
export const OG_LOCALE: Record<Locale, string> = { no: 'nb_NO', en: 'en_GB' };

export const SITE_URL = 'https://felixknutsen.com';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Reads the locale from the first path segment, e.g. `/en/` → `en`. */
export function localeFromPath(pathname: string): Locale | null {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLocale(first) ? first : null;
}

export function localePath(locale: Locale, hash = ''): string {
  const cleanHash = hash.replace(/^#/, '');
  return `/${locale}/${cleanHash ? `#${cleanHash}` : ''}`;
}

/** Picks a locale for a visitor who arrives at `/` without one in the URL. */
export function detectLocale(stored: string | null, browserLanguages: readonly string[]): Locale {
  if (isLocale(stored)) return stored;
  for (const lang of browserLanguages) {
    const base = lang.toLowerCase().split('-')[0];
    if (base === 'nb' || base === 'nn' || base === 'no') return 'no';
    if (base === 'en') return 'en';
  }
  return DEFAULT_LOCALE;
}
