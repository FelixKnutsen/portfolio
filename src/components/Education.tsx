import { useState } from 'react';
import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import EducationCard from './EducationCard';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function Education() {
  const { language } = useLanguage();
  const content = typedContent[language];
  const headerRef = useScrollReveal<HTMLDivElement>();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    const isClosing = selectedId === id;
    setSelectedId(isClosing ? null : id);

    // Always scroll to section header when state changes to keep user oriented,
    // especially when closing or switching cards.
    setTimeout(() => {
      const section = document.getElementById('education');
      if (section) {
        const headerOffset = 100; // Account for fixed navbar
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const isAnyExpanded = selectedId !== null;

  return (
    <section
      className="bg-surface-bright dark:bg-slate-900/50 py-section-padding relative overflow-hidden"
      id="education"
      aria-label={content.education.heading}
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-16 pt-32 md:pt-20 text-center md:text-left animate-on-scroll">
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">
            {content.education.heading}
          </h2>
          <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">
            {content.education.subtitle}
          </p>
        </div>

        {/* Use items-stretch when nothing is expanded to keep boxes same size, switch to items-start when one opens */}
        <div className={`grid md:grid-cols-2 gap-8 ${isAnyExpanded ? 'items-start' : 'items-stretch'}`}>
          {content.education.items.map((item, index) => {
            // Generate a unique ID based on degree and index
            const cardId = `edu-card-${index}`;
            return (
              <EducationCard 
                key={cardId}
                id={cardId}
                item={item} 
                index={index} 
                isExpanded={selectedId === cardId}
                forceFullHeight={!isAnyExpanded}
                onToggle={() => handleToggle(cardId)}
              />
            );
          })}
        </div>
      </div>

      {/* Decorative Arc */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-background dark:bg-slate-950 rounded-b-[100%] z-0 shadow-sm"
        aria-hidden="true"
      />
    </section>
  );
}
