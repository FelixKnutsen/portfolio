import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Certificates() {
  const { language } = useLanguage();
  const content = contentData[language];
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-surface-bright dark:bg-slate-900/50 py-section-padding relative overflow-hidden" id="certificates">
      <div className="max-w-[1120px] mx-auto px-8 relative z-10">
        <div 
          ref={headerRef}
          className="mb-16 pt-20 animate-on-scroll"
        >
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">{content.certificates.heading}</h2>
          <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">{content.certificates.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.certificates.items.map((item, index) => {
            const itemRef = useScrollReveal<HTMLDivElement>();
            const pdfLink = (item as any).pdfLink;
            
            const cardContent = (
              <>
                <div className="p-3 bg-surface-variant dark:bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary-container">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">{item.title}</h3>
                  <p className="font-body-md text-sm text-slate-500 dark:text-slate-400">{item.issuer}</p>
                </div>
              </>
            );
            
            const className = "bg-surface-container-lowest dark:bg-slate-950 p-8 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-start gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-on-scroll h-full";

            if (pdfLink) {
              return (
                <a 
                  key={index}
                  ref={itemRef as unknown as React.RefObject<HTMLAnchorElement>}
                  href={pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${className} cursor-pointer hover:border-secondary-container/50 focus:ring-2 focus:ring-secondary-container outline-none`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  title="View Certificate PDF"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div 
                key={index}
                ref={itemRef}
                className={className}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Decorative Arc (Top) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-background dark:bg-slate-950 rounded-b-[100%] z-0 shadow-sm"></div>
    </section>
  );
}
