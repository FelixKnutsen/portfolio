import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import CertificateCard from './CertificateCard';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function Certificates() {
  const { language } = useLanguage();
  const content = typedContent[language];
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      className="bg-surface-bright dark:bg-slate-900/50 py-section-padding relative overflow-hidden"
      id="certificates"
      aria-label={content.certificates.heading}
    >
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-16 pt-32 md:pt-20 animate-on-scroll">
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">
            {content.certificates.heading}
          </h2>
          <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">
            {content.certificates.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.certificates.items.map((item, index) => (
            <CertificateCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative Arc (Top) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-background dark:bg-slate-950 rounded-b-[100%] z-0 shadow-sm"
        aria-hidden="true"
      />
    </section>
  );
}
