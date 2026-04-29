import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import contentData from '../data/content.json';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function ProjectCaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const content = typedContent[language];

  const project = content.projects.items.find((p) => p.slug === slug);

  const heroRef = useScrollReveal<HTMLDivElement>();
  const problemRef = useScrollReveal<HTMLDivElement>();
  const solutionRef = useScrollReveal<HTMLDivElement>();
  const impactRef = useScrollReveal<HTMLDivElement>();

  if (!project) {
    return (
      <section className="max-w-[1120px] mx-auto px-5 md:px-8 py-section-padding text-center">
        <h1 className="font-headline-xl text-headline-xl text-slate-900 dark:text-slate-50 mb-4">
          404
        </h1>
        <p className="font-body-lg text-body-lg text-slate-600 dark:text-slate-400 mb-8">
          {language === 'en' ? 'Project not found.' : 'Prosjektet ble ikke funnet.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-secondary hover:underline font-button text-button"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_back
          </span>
          {language === 'en' ? 'Back to Home' : 'Tilbake til forsiden'}
        </Link>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${project.title} | ${content.meta.title}`}</title>
        <meta name="description" content={project.summary} />
      </Helmet>

      <article className="max-w-[900px] mx-auto px-5 md:px-8 py-section-padding">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-secondary transition-colors font-button text-button mb-10 no-underline"
        >
          <span className="material-symbols-outlined text-sm" aria-hidden="true">
            arrow_back
          </span>
          {language === 'en' ? 'All Projects' : 'Alle prosjekter'}
        </Link>

        {/* Hero header */}
        <div ref={heroRef} className="mb-16 animate-on-scroll">
          <span className="inline-block px-3 py-1 mb-4 bg-secondary-fixed-dim/10 text-secondary font-label-caps text-label-caps rounded-full border border-secondary-fixed-dim/20">
            {project.role}
          </span>
          <h1 className="font-headline-xl text-3xl md:text-headline-xl text-slate-900 dark:text-slate-50 mb-4">
            {project.title}
          </h1>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-semibold font-label-caps bg-surface-variant dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* External links */}
          <div className="flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors font-button text-button"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  code
                </span>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-secondary transition-colors font-button text-button"
                aria-label={`Live site for ${project.title}`}
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">
                  open_in_new
                </span>
                {language === 'en' ? 'Live Site' : 'Besøk siden'}
              </a>
            )}
          </div>
        </div>

        {/* Problem */}
        <div ref={problemRef} className="mb-14 animate-on-scroll" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary" aria-hidden="true">
              help_outline
            </span>
            {language === 'en' ? 'The Problem' : 'Problemet'}
          </h2>
          <p className="font-body-lg text-body-lg text-slate-600 dark:text-slate-400 pl-10">
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div ref={solutionRef} className="mb-14 animate-on-scroll" style={{ animationDelay: '0.15s' }}>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary" aria-hidden="true">
              lightbulb
            </span>
            {language === 'en' ? 'The Solution' : 'Løsningen'}
          </h2>
          <p className="font-body-lg text-body-lg text-slate-600 dark:text-slate-400 pl-10">
            {project.solution}
          </p>
        </div>

        {/* Impact / Results */}
        <div ref={impactRef} className="mb-14 animate-on-scroll" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50 mb-6 flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary" aria-hidden="true">
              trending_up
            </span>
            {language === 'en' ? 'Results & Impact' : 'Resultater og innvirkning'}
          </h2>
          <ul className="space-y-4 pl-10">
            {project.impact.map((result, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-body-lg text-body-lg text-slate-600 dark:text-slate-400"
              >
                <span className="material-symbols-outlined text-green-600 dark:text-green-400 mt-0.5 shrink-0" aria-hidden="true">
                  check_circle
                </span>
                {result}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </>
  );
}
