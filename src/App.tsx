import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import contentData from './data/content.json';
import { useLanguage } from './context/LanguageContext';
import { Analytics } from '@vercel/analytics/react';
import type { ContentData } from './types';

const typedContent = contentData as unknown as ContentData;

function App() {
  const { language } = useLanguage();

  useEffect(() => {
    const content = typedContent[language];
    document.title = content.meta.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', content.meta.description);
    }
  }, [language]);

  return (
    <div
      className="bg-background dark:bg-slate-950 text-on-background dark:text-slate-50 font-body-md text-body-md antialiased selection:bg-secondary-container selection:text-on-secondary-container"
      id="top"
    >
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Education />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
