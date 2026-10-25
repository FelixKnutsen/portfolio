import { copy } from '../content/copy';
import { CV_DOWNLOAD_NAME, CV_PUBLIC_PATH } from '../content/cvFile';
import { useLocale } from '../i18n/LocaleContext';
import styles from './CvActions.module.css';

/** A single "View CV" link for the hero's action row. Renders nothing if the PDF was missing at build time. */
export function CvViewLink({ className }: { className?: string }) {
  const { t } = useLocale();
  if (!__CV_AVAILABLE__) return null;
  return (
    <a className={className} href={CV_PUBLIC_PATH} target="_blank" rel="noopener" aria-label={t(copy.cv.viewLabel)}>
      {t(copy.cv.view)}
      <span aria-hidden="true" className="external-mark" />
    </a>
  );
}

/** View and download links for the CV, shown in the contact section. Renders nothing if the PDF was missing at build time. */
export default function CvActions() {
  const { t } = useLocale();
  if (!__CV_AVAILABLE__) return null;

  return (
    <div className={styles.cv}>
      <p className={styles.heading}>
        {t(copy.cv.heading)} <span className={styles.format}>{t(copy.cv.format)}</span>
      </p>
      <ul className={styles.actions}>
        <li>
          <a
            className={styles.action}
            href={CV_PUBLIC_PATH}
            target="_blank"
            rel="noopener"
            type="application/pdf"
            aria-label={t(copy.cv.viewLabel)}
          >
            {t(copy.cv.view)}
            <span aria-hidden="true" className="external-mark" />
          </a>
        </li>
        <li>
          <a
            className={styles.action}
            href={CV_PUBLIC_PATH}
            download={CV_DOWNLOAD_NAME}
            type="application/pdf"
            aria-label={t(copy.cv.downloadLabel)}
          >
            {t(copy.cv.download)}
            <span aria-hidden="true" className={styles.downloadMark} />
          </a>
        </li>
      </ul>
    </div>
  );
}
