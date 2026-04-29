import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from './ProjectCard';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function ProjectGrid() {
  const { language } = useLanguage();
  const content = typedContent[language];
  const headerRef = useScrollReveal<HTMLDivElement>();

  const featuredProjects = content.projects.items.filter((p) => p.featured);

  return (
    <section
      className="max-w-[1120px] mx-auto px-5 md:px-8 py-section-padding"
      id="projects"
      aria-label={content.projects.heading}
    >
      <div ref={headerRef} className="mb-12 md:mb-16 text-left animate-on-scroll">
        <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">
          {content.projects.heading}
        </h2>
        <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">
          {content.projects.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            viewCaseStudyLabel={content.projects.viewCaseStudy}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
