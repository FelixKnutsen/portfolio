import { contactDetails, copy } from '../content/copy';
import { useLocale } from '../i18n/LocaleContext';
import ExternalLink from './ExternalLink';
import styles from './SiteFooter.module.css';

export default function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className={styles.footer}>
      <div className={`frame ${styles.inner}`}>
        <p>© {new Date().getFullYear()} Felix Fabricius Knutsen</p>
        <p>
          {t(copy.footer.builtWith)} <ExternalLink href={contactDetails.repo}>{t(copy.footer.source)}</ExternalLink>
        </p>
      </div>
    </footer>
  );
}
