// Fills the built pages with prerendered HTML and writes llms.txt and sitemap.xml.
// Runs after `vite build` and `vite build --ssr` (see the build script in package.json).
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');
const EMPTY_ROOT = '<div id="root"></div>';

const { render, renderLlmsTxt, SITE_URL } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

// `/` shows the Norwegian page (its canonical is /no/) until the app picks the visitor's language.
const pages = [
  ['index.html', 'no'],
  ['no/index.html', 'no'],
  ['en/index.html', 'en'],
];

for (const [file, locale] of pages) {
  const path = resolve(dist, file);
  const html = readFileSync(path, 'utf-8');
  if (!html.includes(EMPTY_ROOT)) throw new Error(`${file}: no empty root element to fill`);
  writeFileSync(path, html.replace(EMPTY_ROOT, `<div id="root">${render(locale)}</div>`));
  console.log(`prerendered ${file} (${locale})`);
}

writeFileSync(resolve(dist, 'llms.txt'), renderLlmsTxt());
console.log('wrote llms.txt');

const today = new Date().toISOString().slice(0, 10);
const alternates = [
  ['nb', '/no/'],
  ['en', '/en/'],
  ['x-default', '/no/'],
]
  .map(([lang, path]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${path}" />`)
  .join('\n');
const url = (path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`;
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${url('/no/')}\n${url('/en/')}\n</urlset>\n`,
);
console.log('wrote sitemap.xml');

if (existsSync(ssrDir)) rmSync(ssrDir, { recursive: true, force: true });
