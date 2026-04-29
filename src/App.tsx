import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ProjectCaseStudy from './pages/ProjectCaseStudy';
import contentData from './data/content.json';
import { useLanguage } from './context/LanguageContext';
import { Analytics } from '@vercel/analytics/react';
import type { ContentData } from './types';

const typedContent = contentData as unknown as ContentData;

/** Resets scroll position on route change. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
        </Routes>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
