# felixknutsen.com

Personal portfolio for Felix Fabricius Knutsen, built with React, TypeScript and Vite.

## Concept

The site is drawn as a process map. The hero is a swimlane diagram with three lanes (people, process and technology), and every node is a real step from the work further down the page. The same visual grammar returns in the case-study traces, the leadership path and the experience timeline.

- Colour: cool map paper `#e8eae3`, green-black ink `#15201b`, one ultramarine connector `#3b45f2` reserved for links, focus, flow lines and current activity, and a highlighter yellow `#f2d54b` used only to mark what is current.
- Type: Schibsted Grotesk for display and interface, and Source Serif 4 for reading text. Both are self-hosted in `public/fonts`.
- Motion: a single orchestrated moment (the connector draws when the map scrolls into view), plus feedback on user actions. Everything respects `prefers-reduced-motion`.

## Structure

```
src/
  content/      all copy and facts, typed so every string exists in Norwegian and English
  i18n/         locale helpers, routing (/no/, /en/) and the LocaleProvider
  components/   one component and one CSS module per section
  hooks/        scroll-spy and in-view helpers
  lib/          pure logic: dates, timeline packing, process-map routing, contact form
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
npm test           # Vitest: content parity across languages, routing, dates, timeline, form validation
npm run preview    # serve the production build
```

## Deployment

GitHub Actions (`.github/workflows/ci.yml`) runs lint, tests and the full build on every push and pull request.


The site is deployed on Vercel. `vercel.json` sets security headers, long-lived caching for hashed assets and fonts, a week's caching for images, the language redirect for `/`, and trailing slashes so `/no` resolves to `/no/`.
