import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import ExperienceTimelineItem from './ExperienceTimelineItem';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function Experience() {
  const { language } = useLanguage();
  const content = typedContent[language];
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="max-w-[1120px] mx-auto px-5 md:px-8 py-section-padding relative"
      id="experience"
      aria-label={content.experience.heading}
    >
      <div ref={headerRef} className="mb-12 md:mb-16 text-left animate-on-scroll">
        <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">
          {content.experience.heading}
        </h2>
        <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">
          {content.experience.subtitle}
        </p>
      </div>

      <div className="relative pl-0">
        {/* Vertical Timeline Line - Hidden on Mobile */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant dark:bg-slate-800 -translate-x-1/2"
          aria-hidden="true"
        />

        {/* Timeline Items */}
        <div className="space-y-24 md:space-y-12">
          {content.experience.items.map((item, index) => (
            <ExperienceTimelineItem
              key={`${item.role}-${item.period}`}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
