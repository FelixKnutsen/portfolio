import { copy } from '../content/copy';
import type { CaseStudy } from '../content/types';
import { caseStudies } from '../content/work';
import { useLocale } from '../i18n/LocaleContext';
import { formatPeriod } from '../lib/dates';
import ExternalLink from './ExternalLink';
import ProcessTrace from './ProcessTrace';
import SectionHead from './SectionHead';
import styles from './SelectedWork.module.css';

function Case({ study }: { study: CaseStudy }) {
  const { locale, t } = useLocale();

  return (
    <article id={study.id} className={styles.case} aria-labelledby={`${study.id}-title`}>
      <header className={styles.meta}>
        <p className={styles.org}>{study.org}</p>
        <p>{t(study.context)}</p>
        <p className={styles.period}>
          <time dateTime={study.period.start}>{formatPeriod(study.period, locale)}</time>
        </p>
        {study.links ? (
          <ul className={styles.links}>
            {study.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{t(link.label)}</ExternalLink>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className={styles.story}>
        <h3 id={`${study.id}-title`} className={styles.title}>
          {t(study.title)}
        </h3>
        <p className={styles.lede}>{t(study.lede)}</p>

        {study.role ? (
          <p className={styles.role}>
            <span className={styles.roleLabel}>{t(copy.work.roleLabel)}</span> {t(study.role)}
          </p>
        ) : null}

        <ProcessTrace
          label={t(study.team ? copy.work.groupStepsLabel : copy.work.stepsLabel)}
          steps={study.steps.map((step) => ({ title: t(step.title), text: t(step.text) }))}
        />

        {study.evidence ? (
          <figure className={styles.evidence}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${study.evidence.src}-640.webp 640w, ${study.evidence.src}-1060.webp 1060w`}
                sizes="(min-width: 56rem) 40rem, 100vw"
              />
              <img
                src={`${study.evidence.src}-1060.jpg`}
                width={study.evidence.width}
                height={study.evidence.height}
                alt={t(study.evidence.alt)}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption>{t(study.evidence.caption)}</figcaption>
          </figure>
        ) : null}

        {study.decision || study.outcome || study.learning ? (
          <dl className={styles.facts}>
            {study.decision ? (
              <div>
                <dt>{t(copy.work.decisionLabel)}</dt>
                <dd>{t(study.decision)}</dd>
              </div>
            ) : null}
            {study.outcome ? (
              <div>
                <dt>{t(copy.work.outcomeLabel)}</dt>
                <dd>{t(study.outcome)}</dd>
              </div>
            ) : null}
            {study.learning ? (
              <div>
                <dt>{t(copy.work.learningLabel)}</dt>
                <dd>{t(study.learning)}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        {study.stack ? (
          <p className={styles.stack}>
            <span>{t(copy.work.stackLabel)}:</span> {study.stack.join(', ')}
          </p>
        ) : null}
        {study.note ? <p className={styles.note}>{t(study.note)}</p> : null}
      </div>
    </article>
  );
}

export default function SelectedWork() {
  const { t } = useLocale();

  return (
    <section id="work" data-anchor className={`frame ${styles.section}`} aria-labelledby="work-heading">
      <SectionHead id="work-heading" title={t(copy.work.heading)}>
        <p>{t(copy.work.intro)}</p>
      </SectionHead>
      <div className={styles.cases}>
        {caseStudies.map((study) => (
          <Case key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
