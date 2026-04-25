import contentData from '../data/content.json';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import TextAnimation from './TextAnimation';

export default function Hero() {
  const { language } = useLanguage();
  const content = contentData[language];
  const headlineRef = useScrollReveal<HTMLHeadingElement>();
  const bodyRef = useScrollReveal<HTMLParagraphElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();
  const imageRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="max-w-[1120px] mx-auto px-8 py-section-padding grid md:grid-cols-12 gap-gutter items-center">
      <div className="md:col-span-7 space-y-8">
        <div className="inline-block px-3 py-1 bg-secondary-fixed-dim/10 text-secondary-container font-label-caps text-label-caps rounded-full border border-secondary-fixed-dim/20">
          {content.hero.badge}
        </div>

        <h1
          ref={headlineRef}
          className="font-headline-xl text-headline-xl text-slate-900 dark:text-slate-50 animate-on-scroll"
        >
          {content.hero.headline}
        </h1>

        <div
          ref={bodyRef}
          className="max-w-2xl animate-on-scroll w-full"
          style={{ animationDelay: '0.1s' }}
        >
          <TextAnimation text={content.hero.body} />
        </div>

        <div
          ref={ctaRef}
          className="flex gap-4 pt-4 animate-on-scroll"
          style={{ animationDelay: '0.2s' }}
        >
          <a
            className="bg-primary text-on-primary dark:bg-slate-50 dark:text-slate-900 px-6 py-3 rounded-DEFAULT font-button text-button hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors inline-flex items-center gap-2"
            href={content.hero.ctaLink}
          >
            {content.hero.ctaText} <span className="material-symbols-outlined text-sm">arrow_downward</span>
          </a>
        </div>
      </div>

      <div
        ref={imageRef}
        className="md:col-span-5 relative animate-on-scroll"
        style={{ animationDelay: '0.3s' }}
      >
        <div className="aspect-[4/5] rounded-xl relative z-10" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}>
          <img
            alt={content.hero.image.alt}
            className="w-full h-full object-cover object-top"
            src={content.hero.image.src}
          />
        </div>
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl z-0"></div>
      </div>
    </section>
  );
}
