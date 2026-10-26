import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { meta, pageUrl } from '../content/meta';
import { LocaleContext } from './LocaleContext';
import { HTML_LANG, OG_LOCALE, detectLocale, localeFromPath, localePath, type L, type Locale } from './locale';

const STORAGE_KEY = 'locale';

function readStoredLocale(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). The URL still carries the language.
  }
  // The same choice as a cookie, so the redirect for `/` in vercel.json can respect it before any JavaScript runs.
  document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax; Secure`;
}

/** Resolves the initial locale and makes sure the URL always contains it. */
function initialLocale(): Locale {
  const fromPath = localeFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  const detected = detectLocale(readStoredLocale(), navigator.languages ?? [navigator.language]);
  window.history.replaceState(null, '', localePath(detected, window.location.hash));
  return detected;
}

function setMeta(selector: string, attribute: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attribute, value);
}

function syncHead(locale: Locale) {
  document.documentElement.lang = HTML_LANG[locale];
  document.title = meta.title[locale];
  setMeta('meta[name="description"]', 'content', meta.description[locale]);
  setMeta('link[rel="canonical"]', 'href', pageUrl(locale));
  setMeta('meta[property="og:url"]', 'content', pageUrl(locale));
  setMeta('meta[property="og:title"]', 'content', meta.title[locale]);
  setMeta('meta[property="og:description"]', 'content', meta.description[locale]);
  setMeta('meta[property="og:locale"]', 'content', OG_LOCALE[locale]);
}

interface ScrollAnchor {
  id: string;
  top: number;
}

/** The section currently nearest the top of the viewport, so a language switch keeps the reader in place. */
function captureAnchor(): ScrollAnchor | null {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-anchor]'));
  let best: ScrollAnchor | null = null;
  for (const section of sections) {
    const top = section.getBoundingClientRect().top;
    if (top <= window.innerHeight * 0.4) best = { id: section.id, top };
  }
  return best;
}

interface LocaleProviderProps {
  children: ReactNode;
  /** Set when prerendering at build time, where there is no URL or browser to read the language from. */
  locale?: Locale;
}

export function LocaleProvider({ children, locale: fixedLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => fixedLocale ?? initialLocale());
  const pendingAnchor = useRef<ScrollAnchor | null>(null);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      const anchor = captureAnchor();
      pendingAnchor.current = anchor;
      window.history.pushState(null, '', localePath(next, anchor?.id));
      // Cross-fade the whole page where the browser supports view transitions and motion is welcome.
      const fade = 'startViewTransition' in document && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (fade) document.startViewTransition(() => flushSync(() => setLocaleState(next)));
      else setLocaleState(next);
    },
    [locale],
  );

  useEffect(() => {
    const onPopState = () => {
      const fromPath = localeFromPath(window.location.pathname);
      if (fromPath) setLocaleState(fromPath);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useLayoutEffect(() => {
    const anchor = pendingAnchor.current;
    pendingAnchor.current = null;
    if (!anchor) return;
    const element = document.getElementById(anchor.id);
    if (element) window.scrollBy({ top: element.getBoundingClientRect().top - anchor.top, behavior: 'instant' });
  }, [locale]);

  useEffect(() => {
    syncHead(locale);
    storeLocale(locale);
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t: <T,>(text: L<T>): T => text[locale] }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
