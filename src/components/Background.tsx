import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { copy } from '../content/copy';
import { certificates, degrees } from '../content/education';
import { roles } from '../content/roles';
import type { Course, Degree, Role, Track } from '../content/types';
import { useLocale } from '../i18n/LocaleContext';
import { formatPeriod, toYearFraction, type Period } from '../lib/dates';
import ExternalLink from './ExternalLink';
import SectionHead from './SectionHead';
import styles from './Background.module.css';

const RANGE = { from: 2018, to: 2027.6 };
const YEARS = Array.from({ length: 10 }, (_, index) => 2018 + index);
/** The build date, not the visitor's clock, so the prerendered page and the hydrated one agree. */
const NOW = toYearFraction(__BUILD_DATE__, 'start');
const TRACKS: Track[] = ['work', 'leadership', 'education'];

const percent = (year: number) => ((year - RANGE.from) / (RANGE.to - RANGE.from)) * 100;

type BarKind = 'employment' | 'project' | 'role' | 'education';

function Bar({ period, kind, highlight }: { period: Period; kind: BarKind; highlight?: Period }) {
  const { t } = useLocale();
  const start = toYearFraction(period.start, 'start');
  const end = period.end === null ? NOW : toYearFraction(period.end, 'end');
  const style = { '--start': `${percent(start)}%`, '--end': `${percent(end)}%` } as CSSProperties;
  const highlightStyle = highlight
    ? ({
        '--h-start': `${((toYearFraction(highlight.start, 'start') - start) / (end - start)) * 100}%`,
        '--h-end': `${((toYearFraction(highlight.end ?? period.start, 'end') - start) / (end - start)) * 100}%`,
      } as CSSProperties)
    : undefined;

  return (
    <div className={styles.track} aria-hidden="true">
      <span className={styles.bar} data-kind={kind} data-ongoing={period.end === null} style={style}>
        {highlight ? <span className={styles.highlight} style={highlightStyle} title={t(copy.background.exchange)} /> : null}
      </span>
    </div>
  );
}

interface RowProps {
  title: string;
  org: string;
  period: Period;
  kind: BarKind;
  highlight?: Period;
  /** A link to where the story is told, instead of expandable details. */
  href?: string;
  hrefLabel?: string;
  details?: ReactNode;
}

function Row({ title, org, period, kind, highlight, href, hrefLabel, details }: RowProps) {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className={styles.row} data-open={open}>
      <div className={styles.info}>
        <h4 className={styles.title}>
          {details ? (
            <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((value) => !value)}>
              <span>{title}</span>
              <span className={styles.toggleIcon} aria-hidden="true" />
              <span className="visually-hidden">{t(open ? copy.background.hideDetails : copy.background.showDetails)}</span>
            </button>
          ) : href ? (
            <a className={styles.titleLink} href={href}>
              {title}
              <span className="visually-hidden">, {hrefLabel}</span>
            </a>
          ) : (
            title
          )}
        </h4>
        <p className={styles.meta}>
          <span>{org}</span>
          <span className={styles.period}>
            {formatPeriod(period, locale)}
            {period.end === null ? <span className={styles.ongoing}>{t(copy.background.ongoing)}</span> : null}
          </span>
        </p>
      </div>
      <Bar period={period} kind={kind} highlight={highlight} />
      {details ? (
        <div id={panelId} className={styles.details} hidden={!open}>
          {details}
        </div>
      ) : null}
    </li>
  );
}

function roleRow(role: Role, t: <T>(value: { no: T; en: T }) => T) {
  const story = role.storyHref ?? (role.track === 'leadership' && !role.details ? '#leadership' : undefined);
  return (
    <Row
      key={role.id}
      title={t(role.title)}
      org={role.org}
      period={role.period}
      kind={role.track === 'leadership' ? 'role' : role.kind === 'project' ? 'project' : 'employment'}
      href={story}
      hrefLabel={story ? t(story.startsWith('#work') ? copy.background.readCase : copy.background.readStory) : undefined}
      details={
        role.details ? (
          <ul className={styles.list}>
            {[t(role.summary), ...t(role.details)].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : undefined
      }
    />
  );
}

function Courses({ courses }: { courses: Course[] }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const id = useId();
  const labels = copy.background;
  if (courses.length === 0) return null;

  return (
    <div className={styles.courses}>
      <button type="button" className={styles.coursesToggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        {t(open ? labels.hideCourses : labels.showCourses)} ({courses.length} {t(labels.courseCount)})
      </button>
      <ul id={id} className={styles.courseList} hidden={!open}>
        {courses.map((course) => (
          <li key={course.code}>
            <span className={styles.courseCode}>{course.code}</span>
            {course.href ? (
              <ExternalLink href={course.href} className={styles.courseLink}>
                {course.name}
              </ExternalLink>
            ) : (
              <span>{course.name}</span>
            )}
            <span className={styles.courseTerm}>
              {t(labels.terms[course.term])} {course.year}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function degreeRow(degree: Degree, t: <T>(value: { no: T; en: T }) => T) {
  return (
    <Row
      key={degree.id}
      title={t(degree.title)}
      org={degree.institution}
      period={degree.period}
      kind="education"
      highlight={degree.highlight}
      details={
        <>
          <p className={styles.description}>{t(degree.description)}</p>
          {degree.journey ? (
            <ol className={styles.journey} aria-label={t(copy.background.journeyLabel)}>
              {t(degree.journey).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}
          <Courses courses={degree.courses} />
        </>
      }
    />
  );
}

export default function Background() {
  const { t } = useLocale();
  const labels = copy.background;
  const newestFirst = <T extends { period: Period }>(a: T, b: T) =>
    toYearFraction(b.period.start, 'start') - toYearFraction(a.period.start, 'start');

  const rowsFor = (track: Track) =>
    track === 'education'
      ? [...degrees].sort(newestFirst).map((degree) => degreeRow(degree, t))
      : roles
          .filter((role) => role.track === track)
          .sort(newestFirst)
          .map((role) => roleRow(role, t));

  return (
    <section id="background" data-anchor className={styles.section} aria-labelledby="background-heading">
      <div className="frame">
        <SectionHead id="background-heading" title={t(labels.heading)} intro={t(labels.intro)} />

        <div className={styles.ledger} style={{ '--now': `${percent(NOW)}%` } as CSSProperties}>
          <div className={styles.axis} aria-label={t(labels.axisLabel)} role="img">
            <span className={styles.axisSpacer} />
            <div className={styles.years}>
              {YEARS.map((year) => (
                <span key={year} className={styles.year} style={{ '--at': `${percent(year)}%` } as CSSProperties}>
                  {year}
                </span>
              ))}
              <span className={styles.todayLabel}>{t(labels.today)}</span>
            </div>
          </div>

          {TRACKS.map((track) => (
            <div key={track} className={styles.group}>
              <h3 className={styles.groupHeading}>{t(labels.tracks[track])}</h3>
              <ul className={styles.rows}>{rowsFor(track)}</ul>
            </div>
          ))}
        </div>

        <div className={styles.certificates}>
          <h3 className={styles.groupHeading}>{t(labels.certificatesHeading)}</h3>
          <ul className={styles.certificateList}>
            {certificates.map((certificate) => (
              <li key={certificate.title.en}>
                <span className={styles.certificateTitle}>{t(certificate.title)}</span>
                <span className={styles.certificateIssuer}>{certificate.issuer}</span>
                {certificate.href ? (
                  <ExternalLink href={certificate.href} className={styles.certificateLink}>
                    {t(labels.openCertificate)}
                  </ExternalLink>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
