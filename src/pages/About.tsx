import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Education from '../components/Education';
import contentData from '../data/content.json';
import { useLanguage } from '../context/LanguageContext';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function About() {
  const { language } = useLanguage();
  const content = typedContent[language];

  return (
    <>
      <Helmet>
        <title>{`${content.about.heading} | ${content.meta.title}`}</title>
        <meta name="description" content={content.about.intro} />
      </Helmet>

      <section className="max-w-[1120px] mx-auto px-5 md:px-8 py-section-padding">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-secondary transition-colors font-button text-button mb-8 no-underline"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_back
          </span>
          {content.about.backToHome}
        </Link>

        {/* About intro */}
        <h1 className="font-headline-xl text-3xl md:text-headline-xl text-slate-900 dark:text-slate-50 mb-6">
          {content.about.heading}
        </h1>
        <p className="font-body-lg text-body-lg text-slate-600 dark:text-slate-400 max-w-3xl mb-16">
          {content.about.intro}
        </p>
      </section>

      {/* Education section */}
      <Education />
    </>
  );
}
