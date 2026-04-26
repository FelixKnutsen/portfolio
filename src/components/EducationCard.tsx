import { useRef, useEffect, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import contentData from '../data/content.json';
import { gsap } from 'gsap';
import type { EducationItem as EducationItemType, ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

interface EducationCardProps {
  id: string;
  item: EducationItemType;
  index: number;
  isExpanded: boolean;
  forceFullHeight: boolean;
  onToggle: () => void;
}

export default function EducationCard({ id, item, index, isExpanded, forceFullHeight, onToggle }: EducationCardProps) {
  const { language } = useLanguage();
  const labels = typedContent[language].education;
  const itemRef = useScrollReveal<HTMLDivElement>();
  const coursesRef = useRef<HTMLDivElement>(null);

  const semesterSortValue = (semesterStr: string) => {
    const parts = semesterStr.split(' ');
    const season = parts[0];
    const year = parts[parts.length - 1];
    const yearVal = parseInt(year) || 0;
    const seasonLower = season.toLowerCase();
    const isSpring = seasonLower === 'spring' || seasonLower === 'vår';
    const seasonVal = isSpring ? 1 : 2;
    return yearVal * 10 + seasonVal;
  };

  // Group and sort courses
  const groupedCourses = useMemo(() => {
    if (!item.courses) return null;
    
    // Sort courses first: by semester value, then by code
    const sortedCourses = [...item.courses].sort((a, b) => {
      const semA = semesterSortValue(a.semester);
      const semB = semesterSortValue(b.semester);
      if (semA !== semB) return semA - semB;
      return a.code.localeCompare(b.code);
    });

    const groups: { semester: string; courses: typeof item.courses }[] = [];
    sortedCourses.forEach(course => {
      const existingGroup = groups.find(g => g.semester === course.semester);
      if (existingGroup) {
        existingGroup.courses.push(course);
      } else {
        groups.push({ semester: course.semester, courses: [course] });
      }
    });
    return groups;
  }, [item.courses]);

  // GSAP animation for expanding/collapsing course list
  useEffect(() => {
    if (!coursesRef.current) return;

    const ctx = gsap.context(() => {
      if (isExpanded) {
        gsap.to(coursesRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
          marginTop: 24,
          display: 'block'
        });
      } else {
        gsap.to(coursesRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          marginTop: 0,
          display: 'none'
        });
      }
    }, coursesRef);

    return () => ctx.revert();
  }, [isExpanded]);

  const hasCourses = item.courses && item.courses.length > 0;

  return (
    <div
      ref={itemRef}
      id={id}
      data-card-id={id}
      className={`bg-white dark:bg-slate-950 p-6 md:p-10 rounded-xl shadow-sm border transition-all duration-300 relative overflow-hidden group animate-on-scroll flex flex-col ${
        forceFullHeight ? 'h-full' : ''
      } ${
        hasCourses ? 'cursor-pointer hover:border-secondary-container/50' : 'border-slate-200 dark:border-slate-800'
      } ${isExpanded ? 'ring-2 ring-secondary-container/30 border-secondary-container shadow-md' : 'border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-md'}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={(e) => {
        // Prevent click if clicking on links or buttons inside
        if ((e.target as HTMLElement).closest('a, button')) return;
        if (hasCourses) onToggle();
      }}
      role={hasCourses ? 'button' : 'article'}
      aria-expanded={isExpanded}
      tabIndex={hasCourses ? 0 : undefined}
      onKeyDown={(e) => {
        if (hasCourses && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {item.isActive && (
        <div className="absolute top-0 left-0 w-1 h-full bg-secondary-fixed-dim" />
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
             <h3 className="font-headline-md text-xl md:text-headline-md text-slate-900 dark:text-slate-50 leading-tight">
              {item.degree}
            </h3>
          </div>
          <p className="font-body-md text-base md:text-body-md text-slate-600 dark:text-slate-400">
            {item.institution}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 self-start sm:self-auto">
          <div
            className={
              item.isActive
                ? 'bg-secondary-fixed-dim/10 text-secondary px-3 py-1 rounded-full font-label-caps text-label-caps whitespace-nowrap'
                : 'text-slate-500 dark:text-slate-400 font-label-caps text-label-caps whitespace-nowrap'
            }
          >
            {item.status}
          </div>
          {item.isActive && (
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px] font-label-caps flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {language === 'no' ? 'Nåværende' : 'Current'}
            </span>
          )}
        </div>
      </div>

      {item.description && (
        <p className={`font-body-md text-sm md:text-body-md text-slate-500 dark:text-slate-400 leading-relaxed ${forceFullHeight ? 'flex-grow' : ''}`}>
          {item.description}
        </p>
      )}

      {hasCourses && !isExpanded && (
        <p className="mt-4 font-label-caps text-[10px] text-secondary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          {labels.showCourses}
        </p>
      )}

      {/* Course List - Always rendered but height animated via GSAP */}
      <div 
        ref={coursesRef} 
        className="overflow-hidden opacity-0"
        style={{ height: 0, display: 'none' }}
        aria-hidden={!isExpanded}
      >
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-8">
          {groupedCourses && groupedCourses.map(({ semester, courses }) => (
            <div key={semester} className="space-y-4">
              <h4 className="font-label-caps text-xs text-slate-400 dark:text-slate-50 flex items-center gap-2">
                <span className="w-8 h-px bg-slate-200 dark:bg-slate-800" />
                {semester}
              </h4>
              <div className="grid gap-4">
                {courses.map((course) => (
                  <div 
                    key={course.code} 
                    className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="font-label-caps text-[10px] bg-secondary-container/20 text-secondary px-2 py-0.5 rounded">
                        {course.code}
                      </span>
                    </div>
                    <h5 className="font-headline-md text-sm font-semibold mb-1">
                      {course.link && course.link !== '#' ? (
                        <a 
                          href={course.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-slate-800 dark:text-slate-200 hover:text-secondary transition-colors inline-flex items-center gap-1"
                        >
                          {course.name}
                          <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                        </a>
                      ) : (
                        <span className="text-slate-800 dark:text-slate-200">
                          {course.name}
                        </span>
                      )}
                    </h5>
                    <p className="font-body-md text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {course.description}
                    </p>
                    
                    {/* Descriptive Labels / Topics */}
                    <div className="flex flex-wrap gap-1.5">
                      {course.topics && course.topics.length > 0 ? (
                        course.topics.map((topic) => (
                          <span 
                            key={topic} 
                            className="text-[9px] font-label-caps px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-secondary/30 transition-colors"
                          >
                            {topic}
                          </span>
                        ))
                      ) : (
                        <span className="text-[9px] font-label-caps px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-700">
                          {labels.addLabelsLabel}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="w-full py-2 mt-4 font-label-caps text-[10px] text-slate-400 hover:text-secondary transition-colors flex items-center justify-center gap-2"
          >
            {labels.hideCourses}
          </button>
        </div>
      </div>
    </div>
  );
}
