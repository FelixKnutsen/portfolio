import { contactDetails, copy } from '../content/copy';
import { useLocale } from '../i18n/LocaleContext';
import BrandMark from './BrandMark';
import ExternalLink from './ExternalLink';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className={styles.footer} data-surface="blue">
      <div className={`frame ${styles.inner}`}>
        <p className={styles.name}>
          <BrandMark className={styles.mark} />
          {/* The year comes from the build in the prerendered HTML and can differ from the visitor's clock around New Year. */}
          <span suppressHydrationWarning>© {new Date().getFullYear()} Felix Fabricius Knutsen</span>
        </p>
        <p>
          {t(copy.footer.builtWith)}{' '}
          <ExternalLink href={contactDetails.repo} className={styles.link}>
            {t(copy.footer.source)}
          </ExternalLink>
        </p>
        <a className={styles.link} href="#top">
          {t(copy.footer.top)}
        </a>
      </div>
    </footer>
  );
}
