import { createContext, useContext } from 'react';
import type { L, Locale } from './locale';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Picks the current language from a bilingual value. */
  t: <T>(value: L<T>) => T;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside <LocaleProvider>');
  return context;
}
