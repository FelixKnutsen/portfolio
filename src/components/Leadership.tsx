import { copy } from '../content/copy';
import { awardMoment } from '../content/moments';
import { roles } from '../content/roles';
import { useLocale } from '../i18n/LocaleContext';
import { formatPeriod } from '../lib/dates';
import ExternalLink from './ExternalLink';
import SectionHead from './SectionHead';
import styles from './Leadership.module.css';

const byId = (id: string) => {
  const role = roles.find((candidate) => candidate.id === id);
  if (!role) throw new Error(`Unknown role: ${id}`);
  return role;
};

const STA_BOARD_PAGE = { no: 'https://stastudent.no/om-oss/sta-styret/', en: 'https://stastudent.no/en/sta-styret/' };
const AWARD_DIPLOMA = '/certificates/nito-arets-lokallag-2026.pdf';
const NITO_PATH = ['nito-board', 'nito-chair', 'nito-central'].map(byId);

/** The award as the LinkedIn post showed it: the board on stage, one line and the diploma. */
function AwardFigure() {
  const { t } = useLocale();
  const { photo, caption, post } = awardMoment;

  return (
    <figure className={styles.award}>
      <div className={styles.awardPhoto}>
        <img src={photo.src} alt={t(photo.alt)} width={629} height={419} loading="lazy" decoding="async" />
        {photo.credit ? (
          <span className={styles.credit}>
            {t(copy.leadership.awardPhotoBy)}: {photo.credit}
          </span>
        ) : null}
      </div>
      <figcaption className={styles.awardCaption}>
        <strong className={styles.awardLabel}>{t(copy.leadership.awardLabel)}</strong>
        <span>{t(caption)}</span>
        <span className={styles.awardLinks}>
          <ExternalLink href={AWARD_DIPLOMA}>{t(copy.leadership.awardDiploma)}</ExternalLink>
          <ExternalLink href={post}>{t(copy.leadership.awardPost)}</ExternalLink>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Leadership() {
  const { locale, t } = useLocale();
  const labels = copy.leadership;
  const sta = byId('sta');
  const parliament = byId('parliament');

  return (
    <section id="leadership" data-anchor className={styles.section} aria-labelledby="leadership-heading">
      <div className="frame">
        <SectionHead id="leadership-heading" title={t(labels.heading)} intro={t(labels.intro)} />

        <div className={styles.grid}>
          <AwardFigure />

          <article className={styles.nito} aria-labelledby="nito-title">
            <h3 id="nito-title" className={styles.roleTitle}>
              {t(labels.nitoHeading)}
            </h3>
            <p className={styles.text}>{t(labels.nitoStory)}</p>
            <ol className={styles.path}>
              {NITO_PATH.map((role) => (
                <li key={role.id} className={styles.pathItem} data-current={role.period.end === null}>
                  <span className={styles.pathRole}>{t(role.title)}</span>
                  <span className={styles.pathMeta}>
                    {role.org}, <time dateTime={role.period.start}>{formatPeriod(role.period, locale)}</time>
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <article className={styles.sta} aria-labelledby="sta-title">
            <p className={styles.current}>
              <span>{t(labels.current)}</span>
              <time dateTime={sta.period.start}>{formatPeriod(sta.period, locale)}</time>
            </p>
            <h3 id="sta-title" className={styles.roleTitle}>
              {t(sta.title)}
            </h3>
            <p className={styles.org}>{sta.org}</p>
            <p className={styles.text}>{t(labels.staText)}</p>
            <h4 className={styles.subhead}>{t(labels.staFocusLabel)}</h4>
            <ul className={styles.focus}>
              {t(labels.staFocus).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <ExternalLink href={t(STA_BOARD_PAGE)}>{t(labels.staSource)}</ExternalLink>
            </p>
          </article>

          <article className={styles.earlier} aria-labelledby="parliament-title">
            <p className={styles.subhead}>{t(labels.earlier)}</p>
            <h3 id="parliament-title" className={styles.earlierTitle}>
              {t(parliament.title)}
            </h3>
            <p className={styles.pathMeta}>
              {parliament.org}, <time dateTime={parliament.period.start}>{formatPeriod(parliament.period, locale)}</time>
            </p>
            <p className={styles.earlierText}>
              {t(parliament.summary)} {parliament.details ? t(parliament.details).join(' ') : null}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
