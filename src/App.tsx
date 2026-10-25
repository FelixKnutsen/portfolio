import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Leadership from './components/Leadership';
import SelectedWork from './components/SelectedWork';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';

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
        <About />
        <SelectedWork />
        <Leadership />
        <Experience />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
      <Analytics />
    </>
  );
}
