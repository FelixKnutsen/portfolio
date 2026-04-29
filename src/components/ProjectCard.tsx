import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import type { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  viewCaseStudyLabel: string;
  index: number;
}

export default function ProjectCard({ project, viewCaseStudyLabel, index }: ProjectCardProps) {
  const cardRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className="group animate-on-scroll"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="block h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-surface-container-lowest dark:bg-slate-900/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-secondary-container/40 dark:hover:border-secondary-container/50 no-underline"
        aria-label={`${viewCaseStudyLabel}: ${project.title}`}
      >
        {/* Card content */}
        <div className="p-6 md:p-8 flex flex-col h-full">
          {/* Role badge */}
          <span className="inline-block self-start px-3 py-1 mb-4 bg-secondary-fixed-dim/10 text-secondary font-label-caps text-label-caps rounded-full border border-secondary-fixed-dim/20">
            {project.role}
          </span>

          {/* Title */}
          <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-50 mb-3 group-hover:text-secondary transition-colors">
            {project.title}
          </h3>

          {/* Summary */}
          <p className="font-body-md text-body-md text-slate-600 dark:text-slate-400 mb-6 flex-grow">
            {project.summary}
          </p>

          {/* Tech stack chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-semibold font-label-caps bg-surface-variant dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-secondary font-button text-button group-hover:gap-3 transition-all duration-200">
            {viewCaseStudyLabel}
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              arrow_forward
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
