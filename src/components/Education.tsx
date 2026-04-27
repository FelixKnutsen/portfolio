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

    // Only scroll when closing a box, and ONLY if the user has scrolled down
    // past the top of the specific card they are closing.
    if (isClosing) {
      setTimeout(() => {
        const card = document.getElementById(id);
        if (card) {
          const headerOffset = 120; // Account for fixed navbar and some breathing room
          const rect = card.getBoundingClientRect();
          
          // If the top of the card is hidden above the viewport, scroll to it.
          // This prevents dragging the user if they are already looking at the card.
          if (rect.top < headerOffset) {
            const offsetPosition = rect.top + window.scrollY - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }, 50);
    }
  };

  return (
    <section
      className="bg-surface-bright dark:bg-slate-900/50 py-section-padding relative overflow-hidden"
      id="education"
      aria-label={content.education.heading}
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 relative z-10 pt-24 md:pt-10">
        <div ref={headerRef} className="mb-12 md:mb-16 text-center md:text-left animate-on-scroll">
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">
            {content.education.heading}
          </h2>
          <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">
            {content.education.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
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
