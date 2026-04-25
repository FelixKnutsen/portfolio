import contentData from '../data/content.json';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  const content = contentData[language];
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-['Inter'] text-xs uppercase tracking-widest w-full py-20 border-t border-slate-200 dark:border-slate-800 flat">
      <div className="max-w-[1120px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="opacity-80 hover:opacity-100">{content.footer.copyright}</div>
        <div className="flex gap-6">
          {content.footer.links.map((link, index) => (
            <a 
              key={index}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors" 
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
