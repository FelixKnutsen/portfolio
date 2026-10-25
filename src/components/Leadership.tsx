import { copy } from '../content/copy';
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

export default function Leadership() {
  const { locale, t } = useLocale();
  const sta = byId('sta');
  const parliament = byId('parliament');

  return (
    <section id="leadership" data-anchor className={styles.section} aria-labelledby="leadership-heading">
      <div className="frame">
        <SectionHead id="leadership-heading" title={t(copy.leadership.heading)}>
          <p>{t(copy.leadership.intro)}</p>
        </SectionHead>

        <div className={styles.grid}>
          <article id="lead-sta" className={styles.sta} aria-labelledby="sta-title">
            <p className={styles.current}>
              <span className={styles.nowMarker} aria-hidden="true" />
              <span>{t(copy.leadership.current)}</span>
              <time dateTime={sta.period.start} className={styles.currentPeriod}>
                {formatPeriod(sta.period, locale)}
              </time>
            </p>
            <h3 id="sta-title" className={styles.roleTitle}>
              {t(sta.title)}
            </h3>
            <p className={styles.org}>{sta.org}</p>
            <p className={styles.text}>{t(copy.leadership.staText)}</p>
            <p className={styles.source}>
              <ExternalLink href={t(STA_BOARD_PAGE)}>{t(copy.leadership.staSource)}</ExternalLink>
            </p>

            <h4 className={styles.subhead}>{t(copy.leadership.staFocusLabel)}</h4>
            <ul className={styles.focus}>
              {t(copy.leadership.staFocus).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.nito} aria-labelledby="nito-title">
            <h3 id="nito-title" className={styles.nitoTitle}>
              NITO Studentene
            </h3>
            <p className={styles.text}>{t(copy.leadership.nitoStory)}</p>

            <ol className={styles.path}>
              {NITO_PATH.map((role) => (
                <li key={role.id} id={`lead-${role.id}`} data-current={role.period.end === null}>
                  <span className={styles.pathNode} aria-hidden="true" />
                  <span className={styles.pathRole}>{t(role.title)}</span>
                  <span className={styles.pathMeta}>
                    {role.org}, <time dateTime={role.period.start}>{formatPeriod(role.period, locale)}</time>
                  </span>
                  {role.id === 'nito-chair' ? (
                    <span className={styles.awardRow}>
                      <span className={styles.award}>{t(copy.leadership.awardLabel)}</span>
                      <ExternalLink href={AWARD_DIPLOMA}>{t(copy.leadership.awardDiploma)}</ExternalLink>
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </article>

          <article id="lead-parliament" className={styles.earlier} aria-labelledby="parliament-title">
            <p className={styles.subhead}>{t(copy.leadership.parliamentLabel)}</p>
            <h3 id="parliament-title" className={styles.earlierTitle}>
              {t(parliament.title)}
            </h3>
            <p className={styles.pathMeta}>
              {parliament.org},{' '}
              <time dateTime={parliament.period.start}>{formatPeriod(parliament.period, locale)}</time>
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
