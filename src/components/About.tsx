import { copy } from '../content/copy';
import { useLocale } from '../i18n/LocaleContext';
import { LENS_ORDER } from '../lib/processMap';
import styles from './About.module.css';

export default function About() {
  const { t } = useLocale();

  return (
    <section className={`frame ${styles.about}`} aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.heading}>
        {t(copy.about.heading)}
      </h2>

      <div className={styles.body}>
        {t(copy.about.body).map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      <dl className={styles.lenses}>
        {LENS_ORDER.map((lens) => (
          <div key={lens} className={styles.lens} data-lens={lens}>
            <dt>
              <span className={styles.lensDot} aria-hidden="true" />
              {t(copy.lenses[lens])}
            </dt>
            <dd>{t(copy.about.lenses[lens])}</dd>
          </div>
        ))}
      </dl>

      <p className={styles.interests}>
        <span>{t(copy.about.interestsLabel)}</span> {t(copy.about.interests)}
      </p>
    </section>
  );
}
