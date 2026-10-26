import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { SECTION_IDS, copy } from '../content/copy';
import { CV_PUBLIC_PATH } from '../content/cvFile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useSurfaceBelow } from '../hooks/useSurfaceBelow';
import { useLocale } from '../i18n/LocaleContext';
import { HTML_LANG, LOCALES, localePath, type Locale } from '../i18n/locale';
import { trackEvent } from '../lib/analytics';
import BrandMark from './BrandMark';
import styles from './SiteHeader.module.css';

function LanguageSwitch({ onSwitch }: { onSwitch?: () => void }) {
  const { locale, setLocale, t } = useLocale();

  const choose = (event: MouseEvent<HTMLAnchorElement>, next: Locale) => {
    event.preventDefault();
    if (next !== locale) trackEvent({ name: 'Language switch', to: next });
    setLocale(next);
    onSwitch?.();
  };

  return (
    <nav className={styles.language} aria-label={t(copy.language.label)}>
      {LOCALES.map((option) => (
        <a
          key={option}
          href={localePath(option)}
          hrefLang={HTML_LANG[option]}
          lang={HTML_LANG[option]}
          aria-current={option === locale ? 'true' : undefined}
          className={styles.languageOption}
          onClick={(event) => choose(event, option)}
        >
          <span aria-hidden="true">{copy.language.short[option]}</span>
          <span className="visually-hidden">{copy.language.names[option]}</span>
        </a>
      ))}
    </nav>
  );
}

function CvLink({ className }: { className: string }) {
  const { t } = useLocale();
  if (!__CV_AVAILABLE__) return null;
  return (
    <a
      className={className}
      href={CV_PUBLIC_PATH}
      target="_blank"
      rel="noopener"
      aria-label={t(copy.cv.viewLabel)}
      onClick={() => trackEvent({ name: 'CV view', placement: 'header' })}
    >
      {t(copy.cv.short)}
      <span aria-hidden="true" className="external-mark" />
    </a>
  );
}

export default function SiteHeader() {
  const { t } = useLocale();
  const active = useActiveSection(SECTION_IDS);
  const surface = useSurfaceBelow();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>('a, button') ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = [toggleRef.current, ...focusables()].filter((item): item is HTMLElement => item !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const links = (className: string) =>
    SECTION_IDS.map((id) => (
      <li key={id}>
        <a href={`#${id}`} className={className} aria-current={active === id ? 'location' : undefined} onClick={closeMenu}>
          {t(copy.nav.sections[id])}
        </a>
      </li>
    ));

  return (
    <header className={styles.header} data-surface={menuOpen ? 'blue' : surface} data-open={menuOpen}>
      <a className="visually-hidden-focusable" href="#main">
        {t(copy.skipLink)}
      </a>
      <div className={`frame ${styles.bar}`}>
        <a className={styles.brand} href="#top" aria-label={t(copy.homeLabel)}>
          <BrandMark className={styles.brandMark} />
          <span className={styles.brandName}>Felix Fabricius Knutsen</span>
        </a>

        <nav className={styles.desktopNav} aria-label={t(copy.nav.label)}>
          <ul>{links(styles.navLink)}</ul>
        </nav>

        <div className={styles.tools}>
          <CvLink className={styles.cv} />
          <div className={styles.desktopLanguage}>
            <LanguageSwitch />
          </div>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.menuIcon} data-open={menuOpen} aria-hidden="true" />
            <span className={styles.menuLabel}>{t(menuOpen ? copy.nav.close : copy.nav.open)}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={menuRef} className={styles.sheet} hidden={!menuOpen}>
        <nav aria-label={t(copy.nav.label)} className="frame">
          <ul className={styles.sheetList}>{links(styles.sheetLink)}</ul>
        </nav>
        <div className={`frame ${styles.sheetFoot}`}>
          <LanguageSwitch onSwitch={closeMenu} />
          <CvLink className={styles.sheetCv} />
        </div>
      </div>
    </header>
  );
}
