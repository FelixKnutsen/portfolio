import { copy } from '../content/copy';
import { useLocale } from '../i18n/LocaleContext';
import styles from './Intro.module.css';

export default function Intro() {
  const { t } = useLocale();
  const facts = copy.intro.facts;
  const rows = [
    [facts.seekingLabel, facts.seeking],
    [facts.nowLabel, facts.now],
    [facts.placeLabel, facts.place],
    [facts.interestsLabel, facts.interests],
  ] as const;

  return (
    <section id="about" data-anchor className={styles.intro} aria-labelledby="about-heading">
      <div className={`frame ${styles.layout}`}>
        <h2 id="about-heading" className="visually-hidden">
          {t(copy.intro.heading)}
        </h2>
        <p className={styles.statement}>{t(copy.intro.statement)}</p>

        <div className={styles.body}>
          {t(copy.intro.body).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <figure className={styles.portrait}>
          <picture>
            <source type="image/webp" srcSet="/images/felix-480.webp 480w, /images/felix-880.webp 880w" sizes="(max-width: 56rem) 70vw, 26rem" />
            <img
              src="/images/felix-880.jpg"
              width={880}
              height={1100}
              alt={t(copy.intro.portraitAlt)}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption>{t(copy.intro.portraitCredit)}</figcaption>
        </figure>

        <dl className={styles.facts}>
          {rows.map(([label, value]) => (
            <div key={label.en} className={styles.fact}>
              <dt>{t(label)}</dt>
              <dd>{t(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
