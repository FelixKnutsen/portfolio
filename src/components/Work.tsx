import { copy } from '../content/copy';
import type { CaseStudy } from '../content/types';
import { caseStudies } from '../content/work';
import { useLocale } from '../i18n/LocaleContext';
import { formatPeriod } from '../lib/dates';
import EquipmentDemo from './EquipmentDemo';
import ExternalLink from './ExternalLink';
import SectionHead from './SectionHead';
import TwinCanvas from './TwinCanvas';
import WebsiteDemo from './WebsiteDemo';
import styles from './Work.module.css';

function Illustration({ study }: { study: CaseStudy }) {
  switch (study.illustration) {
    case 'equipment':
      return <EquipmentDemo />;
    case 'website':
      return <WebsiteDemo evidence={study.evidence} />;
    case 'twin':
      return <TwinCanvas />;
  }
}

function Chapter({ study }: { study: CaseStudy }) {
  const { locale, t } = useLocale();
  const labels = copy.work;
  const headingId = `${study.id}-heading`;

  return (
    <article id={study.id} data-anchor className={styles.chapter} data-illustration={study.illustration} aria-labelledby={headingId}>
      <header className={styles.chapterHead}>
        <p className={styles.org}>{study.org}</p>
        <p className={styles.context}>
          <span>{t(study.context)}</span>
          <span>{formatPeriod(study.period, locale)}</span>
        </p>
        <h3 id={headingId} className={styles.title}>
          {t(study.title)}
        </h3>
      </header>

      <div className={styles.text}>
        <div className={styles.problem}>
          <h4 className={styles.label}>{t(labels.problemLabel)}</h4>
          <p className={styles.problemText}>{t(study.problem)}</p>
        </div>
        <p className={styles.lede}>{t(study.lede)}</p>

        {study.role ? (
          <div className={styles.block}>
            <h4 className={styles.label}>{t(labels.roleLabel)}</h4>
            <p>{t(study.role)}</p>
          </div>
        ) : null}

        <div className={styles.block}>
          <h4 className={styles.label}>{t(study.team ? labels.groupStepsLabel : labels.stepsLabel)}</h4>
          <ol className={styles.steps}>
            {study.steps.map((step) => (
              <li key={step.title.en} className={styles.step}>
                <strong>{t(step.title)}</strong>
                <span>{t(step.text)}</span>
              </li>
            ))}
          </ol>
        </div>

        {study.outcome ? (
          <div className={styles.block}>
            <h4 className={styles.label}>{t(labels.outcomeLabel)}</h4>
            <p>{t(study.outcome)}</p>
          </div>
        ) : null}

        {study.learning ? (
          <blockquote className={styles.learning}>
            <h4 className={styles.label}>{t(labels.learningLabel)}</h4>
            <p>{t(study.learning)}</p>
          </blockquote>
        ) : null}

        {study.stack ? (
          <div className={styles.block}>
            <h4 className={styles.label}>{t(labels.stackLabel)}</h4>
            <ul className={styles.stack}>
              {study.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {study.links ? (
          <div className={styles.block}>
            <h4 className={styles.label}>{t(labels.linksLabel)}</h4>
            <ul className={styles.links}>
              {study.links.map((link) => (
                <li key={link.href}>
                  <ExternalLink href={link.href} className={styles.linkItem}>
                    {t(link.label)}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {study.note ? <p className={styles.note}>{t(study.note)}</p> : null}
      </div>

      {/* The illustration sits on its own plate, which runs off the edge of the page. */}
      <div className={styles.plate}>
        <div className={styles.visual}>
          <Illustration study={study} />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const { locale, t } = useLocale();
  return (
    <section id="work" data-anchor className={styles.work} aria-labelledby="work-heading">
      <div className="frame">
        <SectionHead id="work-heading" title={t(copy.work.heading)} intro={t(copy.work.intro)} />
        <ul className={styles.index} aria-label={t(copy.work.indexLabel)}>
          {caseStudies.map((study) => (
            <li key={study.id}>
              <a className={styles.indexLink} href={`#${study.id}`}>
                <span className={styles.indexOrg}>{study.org}</span>
                <span className={styles.indexTitle}>{t(study.title)}</span>
                <span className={styles.indexMeta}>
                  <span>{t(study.context)}</span>
                  <span>{formatPeriod(study.period, locale)}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.chapters}>
          {caseStudies.map((study) => (
            <Chapter key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
