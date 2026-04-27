import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollTo } from '../hooks/useScrollTo';
import contentData from '../data/content.json';
import type { ContentData, NavLink } from '../types';

const typedContent = contentData as unknown as ContentData;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { scrollToSection, scrollToTop } = useScrollTo();
  const content = typedContent[language];

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (sectionId: string) => {
      scrollToSection(sectionId);
      setMobileMenuOpen(false);
    },
    [scrollToSection],
  );

  const handleBrandClick = useCallback(() => {
    scrollToTop();
    setMobileMenuOpen(false);
  }, [scrollToTop]);

  return (
    <nav
      className="bg-surface-container-lowest/95 dark:bg-slate-950/95 backdrop-blur-sm text-slate-900 dark:text-slate-50 font-['Inter'] font-semibold text-sm tracking-tight fixed top-0 w-full z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center max-w-[1120px] mx-auto px-5 md:px-8 h-16">
        {/* Brand */}
        <button
          className="text-lg font-black tracking-wide text-slate-900 dark:text-slate-50 hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer"
          onClick={handleBrandClick}
          type="button"
        >
          {content.nav.brand}
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8" role="menubar">
          {content.nav.links.map((link: NavLink) => (
            <button
              key={link.sectionId}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors bg-transparent border-none cursor-pointer font-semibold text-sm"
              onClick={() => handleNavClick(link.sectionId)}
              type="button"
              role="menuitem"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              className="font-button text-button hover:bg-slate-100 dark:hover:bg-slate-900 px-3 py-2 rounded-full transition-colors flex items-center justify-center gap-1 font-bold"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
              aria-expanded={langDropdownOpen}
              aria-haspopup="true"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                language
              </span>
              {language.toUpperCase()}
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {langDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {langDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-24 bg-surface-container-lowest dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg overflow-hidden z-50 py-1"
                role="menu"
                aria-label="Language options"
              >
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    language === 'en'
                      ? 'font-bold text-secondary'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  role="menuitem"
                  aria-current={language === 'en' ? 'true' : undefined}
                  type="button"
                >
                  EN
                </button>
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    language === 'no'
                      ? 'font-bold text-secondary'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                  onClick={() => {
                    setLanguage('no');
                    setLangDropdownOpen(false);
                  }}
                  role="menuitem"
                  aria-current={language === 'no' ? 'true' : undefined}
                  type="button"
                >
                  NO
                </button>
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            className="hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-200 p-2 rounded-full active:translate-y-0.5"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            type="button"
          >
            <span className="material-symbols-outlined block" aria-hidden="true">
              {theme === 'dark' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors p-2 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <span className="material-symbols-outlined block" aria-hidden="true">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay + drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-[2px]"
            aria-hidden="true"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            ref={mobileMenuRef}
            className="fixed top-16 left-0 right-0 bg-surface-container-lowest dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-xl z-50 md:hidden animate-in slide-in-from-top duration-300"
            role="menu"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col py-6 px-5 gap-1">
              {content.nav.links.map((link: NavLink) => (
                <button
                  key={link.sectionId}
                  className="text-left text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all py-4 px-5 rounded-xl font-semibold text-lg bg-transparent border-none cursor-pointer"
                  onClick={() => handleNavClick(link.sectionId)}
                  role="menuitem"
                  type="button"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
