import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';
import Experience from '../components/Experience';
import Arc from '../components/Arc';
import Contact from '../components/Contact';
import contentData from '../data/content.json';
import { useLanguage } from '../context/LanguageContext';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function Home() {
  const { language } = useLanguage();
  const content = typedContent[language];

  return (
    <>
      <Helmet>
        <title>{content.meta.title}</title>
        <meta name="description" content={content.meta.description} />
      </Helmet>
      <Hero />
      <ProjectGrid />
      <Arc fillClassName="text-background dark:text-slate-950" />
      <Experience />
      <Arc fillClassName="text-background dark:text-slate-950" />
      <Contact />
    </>
  );
}
