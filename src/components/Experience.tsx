import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { language } = useLanguage();
  const content = contentData[language];
  const headerRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="max-w-[1120px] mx-auto px-8 py-section-padding relative" id="experience">
      <div 
        ref={headerRef}
        className="mb-16 pt-20 animate-on-scroll"
      >
        <h2 className="font-headline-lg text-headline-lg text-slate-900 dark:text-slate-50">{content.experience.heading}</h2>
        <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 mt-2">{content.experience.subtitle}</p>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-outline-variant dark:bg-slate-800 md:-translate-x-1/2"></div>
        
        {/* Timeline Items */}
        <div className="space-y-12">
          {content.experience.items.map((item, index) => {
            const itemRef = useScrollReveal<HTMLDivElement>();
            const isEven = index % 2 === 0;
            const containerClasses = `relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} md:justify-between items-center w-full group animate-on-scroll`;
            const alignClasses = `w-full md:w-[45%] ${isEven ? 'md:pr-8 text-left md:text-right' : 'md:pl-8 text-left'} ml-12 md:ml-0`;
            const contentClasses = `w-full md:w-[45%] ml-12 md:ml-0 mt-4 md:mt-0 ${!isEven ? 'text-left md:text-right' : ''}`;
            
            return (
              <div 
                key={index} 
                ref={itemRef}
                className={containerClasses}
              >
                <div className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full ${item.markerColor} border-4 border-background dark:border-slate-950 md:-translate-x-1/2 shadow-sm z-10`}></div>
                
                <div className={alignClasses}>
                  <h3 className="font-headline-md text-headline-md text-slate-900 dark:text-slate-50">{item.role}</h3>
                  <p className={`font-body-md text-body-md font-semibold ${item.markerColor.includes('secondary') ? 'text-secondary-container' : 'text-slate-700 dark:text-slate-300'}`}>
                    {item.organization}
                  </p>
                  <p className={`font-body-md text-body-md text-sm mt-1 ${item.period.toLowerCase().includes('present') ? 'text-secondary-container font-semibold dark:text-secondary-fixed' : 'text-slate-500 dark:text-slate-400'}`}>
                    {item.period}
                  </p>
                </div>
                
                <div className={contentClasses}>
                  <div className={`p-6 rounded-xl border ${item.markerColor.includes('secondary') ? 'bg-secondary-container/10 border-secondary-container/40 dark:bg-secondary-container/20 dark:border-secondary-container/50 shadow-sm' : 'bg-surface-container-lowest dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'}`}>
                    <p className="font-body-md text-body-md text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
