import { copy } from '../content/copy';
import { mapNodes } from '../content/work';
import { useLocale } from '../i18n/LocaleContext';
import { CvViewLink } from './CvActions';
import ProcessMap from './ProcessMap';
import styles from './Hero.module.css';

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className={`frame ${styles.hero}`} aria-labelledby="hero-name">
      <h1 id="hero-name" className={styles.name}>
        <span>Felix</span> <span>Fabricius</span> <span>Knutsen</span>
      </h1>

      <div className={styles.intro}>
        <p className={styles.role}>{t(copy.hero.role)}</p>
        <p className={styles.statement}>{t(copy.hero.statement)}</p>
        <p className={styles.seeking}>{t(copy.hero.seeking)}</p>
        <div className={styles.actions}>
          <a className={styles.primary} href="#work">
            {t(copy.hero.primaryCta)}
          </a>
          <CvViewLink className={styles.secondary} />
          <a className={styles.secondary} href="#contact">
            {t(copy.hero.secondaryCta)}
          </a>
        </div>
      </div>

      <p className={styles.now}>
        <span className={styles.nowMarker} aria-hidden="true" />
        {t(copy.hero.now)}
      </p>

      <figure className={styles.portrait}>
        <picture>
          <source
            type="image/webp"
            srcSet="/images/felix-480.webp 480w, /images/felix-880.webp 880w"
            sizes="(min-width: 56rem) 22rem, 42vw"
          />
          <img
            src="/images/felix-880.jpg"
            width={880}
            height={1100}
            alt={t(copy.hero.portraitAlt)}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <figcaption className={styles.credit}>{t(copy.hero.portraitCredit)}</figcaption>
      </figure>

      <div className={styles.map}>
        <ProcessMap nodes={mapNodes} />
      </div>
    </section>
  );
}
