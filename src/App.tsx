import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useEffect } from 'react';
import Approach from './components/Approach';
import Background from './components/Background';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Leadership from './components/Leadership';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import Work from './components/Work';

export default function App() {
  // The browser tries to jump to the URL's #section before React has rendered it, so do it once the page exists.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, []);

  return (
    <>
      <div id="top" />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Intro />
        <Work />
        <Approach />
        <Leadership />
        <Background />
        <Contact />
      </main>
      <SiteFooter />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
