import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import contentData from '../data/content.json';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const content = contentData[language];
  
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm text-slate-900 dark:text-slate-50 font-['Inter'] font-semibold text-sm tracking-tight sticky top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
      <div className="flex justify-between items-center max-w-[1120px] mx-auto px-8 h-16">
        <a className="text-lg font-black tracking-wide text-slate-900 dark:text-slate-50 hover:opacity-80 transition-opacity" href="#top">
          {content.nav.brand}
        </a>
        
        <div className="hidden md:flex gap-8">
          {content.nav.links.map((link, index) => (
            <a 
              key={index}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors" 
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative" ref={langDropdownRef}>
            <button 
              className="font-button text-button hover:bg-slate-50 dark:hover:bg-slate-900 px-3 py-2 rounded-full transition-colors flex items-center justify-center gap-1 font-bold" 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
              title="Select Language"
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
              {language.toUpperCase()}
              <span className="material-symbols-outlined text-[18px]">{langDropdownOpen ? 'expand_less' : 'expand_more'}</span>
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-surface-bright dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg overflow-hidden z-50 py-1">
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${language === 'en' ? 'font-bold text-secondary-container' : 'text-slate-700 dark:text-slate-300'}`}
                  onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                >
                  EN
                </button>
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${language === 'no' ? 'font-bold text-secondary-container' : 'text-slate-700 dark:text-slate-300'}`}
                  onClick={() => { setLanguage('no'); setLangDropdownOpen(false); }}
                >
                  NO
                </button>
              </div>
            )}
          </div>
          
          <button 
            className="hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 p-2 rounded-full active:translate-y-0.5 transition-transform" 
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <span className="material-symbols-outlined block">dark_mode</span>
            ) : (
              <span className="material-symbols-outlined block">light_mode</span>
            )}
          </button>
          

        </div>
      </div>
    </nav>
  );
}
