import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { LocaleProvider } from './i18n/LocaleProvider';
import type { Locale } from './i18n/locale';

export { renderLlmsTxt } from './content/llms';
export { SITE_URL } from './i18n/locale';

/**
 * Renders the page to HTML at build time (see scripts/prerender.mjs), so
 * search engines, link previews and AI crawlers that do not run JavaScript
 * still get the full content. The browser then renders the same page itself.
 */
export function render(locale: Locale): string {
  return renderToString(
    <StrictMode>
      <LocaleProvider locale={locale}>
        <App />
      </LocaleProvider>
    </StrictMode>,
  );
}
