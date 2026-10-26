# felixknutsen.com

Personal portfolio for Felix Fabricius Knutsen, built with React, TypeScript and Vite.

## Concept

From how people work to systems that work. The site shows the job it describes: turning the loose, human side of an organisation into a structured system. See `docs/design-direction.md` for the full rationale.

- Hero: real fragments of work (interviews, MoSCoW, process mapping, GraphQL, WordPress…) start scattered on an ultramarine field next to the problems they answered. As the visitor scrolls they sort themselves into three columns, people, process and technology, and every fragment links to the project that proves it. Pinned where the hero fits the viewport; on phones it sorts as the board scrolls into view. Without JavaScript or with reduced motion, the board is simply shown sorted.
- Projects: each case has an interactive illustration of its idea. The Phonero equipment list re-sorts from device to person (FLIP animation, made-up data), the STA website shows its two audiences (the site and the editor's guide), and the Kristiansand kommune case has an isometric digital-twin grid drawn on a 2D canvas.
- Colour: ultramarine `#2a36e6` for the system, cool paper `#f1f2f4` for reading, ink `#10142b` for the Approach section, and note yellow `#ffd54f` only for human things (problems, notes, what is current).
- Type: one family, Archivo (variable weight and width), self-hosted in `public/fonts`. Display type is set wide and heavy; the width axis is what separates the loose notes from the sorted system.
- Motion: one orchestrated, scroll-linked moment (the sort). Everything else answers an action: toggles, tabs, the menu and a cross-fade on language switch. Everything respects `prefers-reduced-motion`.

## Structure

```
src/
  content/      all copy and facts, typed so every string exists in Norwegian and English
  i18n/         locale helpers, routing (/no/, /en/) and the LocaleProvider
  components/   one component and one CSS module per section
  hooks/        the hero sort, scroll-spy, the surface under the header, in-view
  lib/          pure logic: dates, the hero scatter, the digital-twin geometry, contact form
  styles/       design tokens and global styles
```

Content is edited in `src/content/*.ts`. Dates are written as `YYYY-MM` (or `YYYY`) and formatted per language, and `end: null` marks a current role.

## Languages

- Norwegian lives at `/no/` and English at `/en/`. Visiting `/` redirects on Vercel to the stored choice (a `locale` cookie), then English if the browser asks for it first, then Norwegian. Without the redirect (the dev server), the app makes the same choice in the browser.
- Switching language keeps the reader on the same section and is remembered in `localStorage` and the `locale` cookie.
- The prerendered `/no/` and `/en/` pages are hydrated, not rendered again, so anything that depends on the browser (the URL hash, today's date, scroll position) is applied in an effect after hydration.
- At build time, `vite.config.ts` writes `dist/no/index.html` and `dist/en/index.html` with the right `lang`, title, description, canonical, `hreflang` and Open Graph tags.

## Scripts

```bash
npm run dev        # local development
npm run build      # typecheck and production build
npm run typecheck  # TypeScript only
npm run lint       # ESLint
npm test           # Vitest: content parity across languages, links, routing, dates, hero scatter, twin geometry, form validation
npm run preview    # serve the production build
```

## Deployment

GitHub Actions (`.github/workflows/ci.yml`) runs lint, tests and the full build on every push and pull request.


The site is deployed on Vercel. `vercel.json` sets security headers, long-lived caching for hashed assets and fonts, a week's caching for images, the language redirect for `/`, and trailing slashes so `/no` resolves to `/no/`.
