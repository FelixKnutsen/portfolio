import { useState } from 'react';
import { copy } from '../content/copy';
import { certificates, degrees } from '../content/education';
import type { Course, Degree } from '../content/types';
import { useLocale } from '../i18n/LocaleContext';
import { formatPeriod } from '../lib/dates';
import ExternalLink from './ExternalLink';
import SectionHead from './SectionHead';
import styles from './Education.module.css';

function groupByTerm(courses: Course[]) {
  const groups = new Map<string, Course[]>();
  for (const course of courses) {
    const key = `${course.year}-${course.term}`;
    groups.set(key, [...(groups.get(key) ?? []), course]);
  }
  return Array.from(groups.values());
}

function DegreeRow({ degree }: { degree: Degree }) {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const coursesId = `edu-${degree.id}-courses`;
  const start = degree.period.start.slice(0, 4);
  const end = degree.period.end?.slice(0, 4);

  return (
    <li id={`edu-${degree.id}`} className={styles.degree}>
      <p className={styles.years} aria-hidden="true">
        <span>{start}</span>
        <span className={styles.yearsRule} />
        <span>{end ?? '…'}</span>
      </p>

      <div className={styles.degreeBody}>
        <h3 className={styles.degreeTitle}>{t(degree.title)}</h3>
        <p className={styles.institution}>
          {degree.institution}, <time dateTime={degree.period.start}>{formatPeriod(degree.period, locale)}</time>
        </p>
        <p className={styles.description}>{t(degree.description)}</p>

        {degree.journey ? (
          <div className={styles.journey}>
            <h4 className={styles.journeyLabel}>{t(copy.education.journeyLabel)}</h4>
            <ol className={styles.journeySteps}>
              {t(degree.journey).map((step, index) => (
                <li key={step} data-away={index === 1}>
                  <span className={styles.journeyNode} aria-hidden="true" />
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {degree.courses.length > 0 ? (
          <>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={coursesId}
              onClick={() => setOpen((value) => !value)}
            >
              <span className={styles.toggleIcon} aria-hidden="true" />
              {t(open ? copy.education.hideCourses : copy.education.showCourses)}
              <span className={styles.count}>
                {degree.courses.length} {t(copy.education.courseCount)}
              </span>
            </button>

            <div id={coursesId} className={styles.courses} hidden={!open}>
              {groupByTerm(degree.courses).map((group) => {
                const { term, year } = group[0];
                return (
                  <div key={`${year}-${term}`} className={styles.term}>
                    <h4 className={styles.termTitle}>
                      {t(copy.education.terms[term])} {year}
                    </h4>
                    <ul>
                      {group.map((course) => (
                        <li key={course.code}>
                          <span className={styles.code}>{course.code}</span>
                          {course.href ? (
                            <ExternalLink href={course.href}>{course.name}</ExternalLink>
                          ) : (
                            <span>{course.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </li>
  );
}

export default function Education() {
  const { t } = useLocale();

  return (
    <section id="education" data-anchor className={`frame ${styles.section}`} aria-labelledby="education-heading">
      <SectionHead id="education-heading" title={t(copy.education.heading)} variant="compact">
        <p>{t(copy.education.intro)}</p>
      </SectionHead>

      <ol className={styles.degrees}>
        {degrees.map((degree) => (
          <DegreeRow key={degree.id} degree={degree} />
        ))}
      </ol>

      <div className={styles.certificates}>
        <h3 className={styles.certificatesTitle}>{t(copy.education.certificatesHeading)}</h3>
        <ul>
          {certificates.map((certificate) => (
            <li key={certificate.issuer + certificate.title.no}>
              <span className={styles.certificateName}>{t(certificate.title)}</span>
              <span className={styles.issuer}>{certificate.issuer}</span>
              {certificate.href ? (
                <ExternalLink href={certificate.href}>{t(copy.education.openCertificate)}</ExternalLink>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
