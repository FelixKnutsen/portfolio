import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { HTML_LANG, LOCALES, DEFAULT_LOCALE, type Locale } from './src/i18n/locale.ts';
import { renderHead } from './src/content/meta.ts';
import { CV_PUBLIC_PATH } from './src/content/cvFile.ts';

const SEO_START = '<!--seo:start-->';
const SEO_END = '<!--seo:end-->';

function withLocale(html: string, locale: Locale): string {
  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${HTML_LANG[locale]}">`)
    .replace(new RegExp(`${SEO_START}[\\s\\S]*?${SEO_END}`), `${SEO_START}\n    ${renderHead(locale)}\n    ${SEO_END}`);
}

/**
 * Writes `/no/index.html` and `/en/index.html` with language-specific titles,
 * descriptions, canonical URLs and hreflang links, so crawlers and link
 * previews see the right language without running JavaScript.
 */
function localizedPages(): Plugin {
  let outDir = 'dist';
  return {
    name: 'localized-pages',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    transformIndexHtml(html) {
      return withLocale(html.replace('<!--seo-->', `${SEO_START}${SEO_END}`), DEFAULT_LOCALE);
    },
    writeBundle() {
      const built = readFileSync(resolve(outDir, 'index.html'), 'utf-8');
      for (const locale of LOCALES) {
        mkdirSync(resolve(outDir, locale), { recursive: true });
        writeFileSync(resolve(outDir, locale, 'index.html'), withLocale(built, locale));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), localizedPages()],
  define: {
    __CV_AVAILABLE__: JSON.stringify(existsSync(resolve(import.meta.dirname, 'public', CV_PUBLIC_PATH.slice(1)))),
  },
});
