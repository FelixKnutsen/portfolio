import { useScrollReveal } from '../hooks/useScrollReveal';
import type { EducationItem as EducationItemType } from '../types';

interface EducationCardProps {
  item: EducationItemType;
  index: number;
}

export default function EducationCard({ item, index }: EducationCardProps) {
  const itemRef = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={itemRef}
      className="bg-white dark:bg-slate-950 p-6 md:p-10 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden group animate-on-scroll"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {item.isActive && (
        <div className="absolute top-0 left-0 w-1 h-full bg-secondary-fixed-dim" />
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-headline-md text-xl md:text-headline-md text-slate-900 dark:text-slate-50 leading-tight">
            {item.degree}
          </h3>
          <p className="font-body-md text-base md:text-body-md text-slate-600 dark:text-slate-400 mt-1">
            {item.institution}
          </p>
        </div>
        <div
          className={
            item.isActive
              ? 'bg-secondary-fixed-dim/10 text-secondary px-3 py-1 rounded-full font-label-caps text-label-caps whitespace-nowrap self-start sm:self-auto'
              : 'text-slate-500 dark:text-slate-400 font-label-caps text-label-caps whitespace-nowrap self-start sm:self-auto'
          }
        >
          {item.status}
        </div>
      </div>
      {item.description && (
        <p className="font-body-md text-sm md:text-body-md text-slate-500 dark:text-slate-400 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );
}
