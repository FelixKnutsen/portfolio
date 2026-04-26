import { useScrollReveal } from '../hooks/useScrollReveal';
import type { ExperienceItem as ExperienceItemType } from '../types';

interface ExperienceTimelineItemProps {
  item: ExperienceItemType;
  index: number;
}

export default function ExperienceTimelineItem({ item, index }: ExperienceTimelineItemProps) {
  const itemRef = useScrollReveal<HTMLDivElement>();
  const isEven = index % 2 === 0;

  const isHighlighted = item.markerColor.includes('secondary');

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} md:justify-between items-center w-full group animate-on-scroll`}
    >
      {/* Timeline dot - Hidden on Mobile */}
      <div
        className={`hidden md:block absolute left-1/2 w-4 h-4 rounded-full ${item.markerColor} border-4 border-background dark:border-slate-950 -translate-x-1/2 shadow-sm z-10`}
        aria-hidden="true"
      />

      {/* Role / Organization / Period */}
      <div
        className={`w-full md:w-[45%] ${isEven ? 'md:pr-8 text-center md:text-right' : 'md:pl-8 text-center md:text-left'}`}
      >
        <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-50">
          {item.role}
        </h3>
        <p
          className={`font-body-md text-body-md font-semibold ${
            isHighlighted ? 'text-secondary' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {item.organization}
        </p>
        <p
          className={`font-body-md text-body-md text-sm mt-1 ${
            item.period.toLowerCase().includes('present') || item.period.toLowerCase().includes('nå')
              ? 'text-secondary font-semibold dark:text-secondary-fixed'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {item.period}
        </p>
      </div>

      {/* Visual Connector Line (Mobile Only) */}
      <div className="md:hidden w-px h-4 bg-slate-300 dark:bg-slate-700 mt-1" aria-hidden="true" />

      {/* Description card */}
      <div
        className={`w-full md:w-[45%] mt-1 md:mt-0 ${!isEven ? 'text-center md:text-right' : 'text-center md:text-left'}`}
      >
        <div
          className={`p-6 rounded-xl border ${
            isHighlighted
              ? 'bg-secondary-container/10 border-secondary-container/40 dark:bg-secondary-container/20 dark:border-secondary-container/50 shadow-sm'
              : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
          }`}
        >
          <p className="font-body-md text-body-md text-slate-600 dark:text-slate-400">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
