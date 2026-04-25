import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Education from './components/Education';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import contentData from './data/content.json';
import { useLanguage } from './context/LanguageContext';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const { language } = useLanguage();

  useEffect(() => {
    document.title = contentData[language].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", contentData[language].meta.description);
  }, [language]);
  return (
    <ThemeProvider>
      <div className="bg-background dark:bg-slate-950 text-on-background dark:text-slate-50 font-body-md text-body-md antialiased selection:bg-secondary-container selection:text-on-secondary-container" id="top">
        <Navbar />
        <main>
          <Hero />
          <Education />
          <Experience />
          <Certificates />
          <Contact />
        </main>
        <Footer />
        <Analytics />
      </div>
    </ThemeProvider>
  );
}

export default App;
