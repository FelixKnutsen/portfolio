import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const { language } = useLanguage();
  const content = contentData[language];
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-surface-bright dark:bg-slate-900/50 py-section-padding relative overflow-hidden" id="education">
      <div className="max-w-[1120px] mx-auto px-8 relative z-10">
        <div 
          ref={headerRef}
          className="mb-16 pt-20 animate-on-scroll"
        >
          <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">{content.education.heading}</h2>
          <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">{content.education.subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {content.education.items.map((item, index) => {
            const itemRef = useScrollReveal<HTMLDivElement>();
            return (
              <div 
                key={index}
                ref={itemRef}
                className="bg-surface-container-lowest dark:bg-slate-950 p-10 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden group animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.isActive && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary-fixed-dim"></div>
                )}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-50">{item.degree}</h3>
                    <p className="font-body-md text-body-md text-slate-600 dark:text-slate-400">{item.institution}</p>
                  </div>
                  <div className={
                    item.isActive 
                      ? "bg-secondary-fixed-dim/10 text-secondary-container px-3 py-1 rounded-full font-label-caps text-label-caps"
                      : "text-slate-500 dark:text-slate-400 font-label-caps text-label-caps"
                  }>
                    {item.status}
                  </div>
                </div>
                <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Decorative Arc */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-32 bg-background dark:bg-slate-950 rounded-b-[100%] z-0 shadow-sm"></div>
    </section>
  );
}
