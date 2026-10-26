import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { LocaleProvider } from './i18n/LocaleProvider';
import { localeFromPath } from './i18n/locale';
import './styles/global.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>
);

// /no/ and /en/ are prerendered in their own language, so React takes over that HTML.
// Anywhere else (the dev server, or `/` if the redirect in vercel.json is bypassed) the
// language is only known in the browser, so the page is rendered from scratch.
if (localeFromPath(window.location.pathname) && container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
