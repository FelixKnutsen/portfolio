import contentData from '../data/content.json';
import { useLanguage } from '../context/LanguageContext';
import type { ContentData } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function Footer() {
  const { language } = useLanguage();
  const content = typedContent[language];

  return (
    <footer className="bg-surface-container dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-['Inter'] text-xs uppercase tracking-widest w-full py-16 md:py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-[1120px] mx-auto px-5 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <div className="opacity-80 hover:opacity-100 transition-opacity text-center md:text-left">
          {content.footer.copyright}
        </div>
        <nav className="flex gap-6" aria-label="Footer links">
          {content.footer.links.map((link) => (
            <a
              key={link.label}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
