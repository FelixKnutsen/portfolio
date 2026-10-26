import { useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { copy } from '../content/copy';
import { degrees } from '../content/education';
import { roles } from '../content/roles';
import type { Track } from '../content/types';
import { useLocale } from '../i18n/LocaleContext';
import {
  currentYearFraction,
  placeEntries,
  rowCount,
  toPercent,
  type EntryKind,
  type TimelineEntry,
  type TimelineRange,
} from '../lib/timeline';
import styles from './TimelineChart.module.css';

const TRACKS: Track[] = ['work', 'leadership', 'education'];
const LEGEND: EntryKind[] = ['employment', 'project', 'role', 'education'];
const FIRST_YEAR = 2018;

// Must match .label and .sublabel in TimelineChart.module.css.
const LABEL_FONT = '600 14px "Schibsted Grotesk", "Segoe UI", sans-serif';
const SUBLABEL_FONT = '400 13px "Schibsted Grotesk", "Segoe UI", sans-serif';
const LABEL_GAP_PX = 20;

/** Tracks the rendered width of an element. */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Measure once straight away: ResizeObserver only reports when the page renders,
    // which never happens in a background tab, and labels would be packed as if zero-width.
    const measure = () => setWidth(element.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}

const subscribeToNothing = () => () => {};
const buildDay = () => currentYearFraction(new Date(`${__BUILD_DATE__}T12:00:00`));

/**
 * Today as a fractional year. The prerendered chart is drawn as of the build day; React hydrates
 * with that same value and then re-renders with the visitor's today, so the two never disagree.
 */
function useToday() {
  return useSyncExternalStore(subscribeToNothing, () => currentYearFraction(), buildDay);
}

/** Re-measures once the web font has loaded, so label widths match what is drawn. */
function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    document.fonts?.ready.then(() => active && setReady(true));
    return () => {
      active = false;
    };
  }, []);
  return ready;
}

/** Measures label widths with the real web font once it has loaded, and estimates until then. */
function createMeasurer(fontsLoaded: boolean) {
  const context = fontsLoaded ? document.createElement('canvas').getContext('2d') : null;
  return (text: string, font: string) => {
    if (!context) return text.length * 7.5;
    context.font = font;
    return context.measureText(text).width;
  };
}

interface TimelineChartProps {
  onSelect: (id: string) => void;
}

/**
 * A swimlane overview of every role and education. Each bar's length is its
 * real duration; its label sits above it and is packed so it is never clipped
 * or overlapped. The list below carries the same information for assistive
 * technology, so the chart content is hidden from it and kept out of the tab order.
 */
export default function TimelineChart({ onSelect }: TimelineChartProps) {
  const { t } = useLocale();
  const now = useToday();
  const range: TimelineRange = useMemo(() => ({ from: FIRST_YEAR, to: Math.floor(now) + 1.35 }), [now]);
  const years = Array.from({ length: Math.floor(range.to) - range.from + 1 }, (_, index) => range.from + index);
  const { ref: plotRef, width: plotWidth } = useWidth<HTMLDivElement>();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const fontsReady = useFontsReady();

  const entries: TimelineEntry[] = useMemo(
    () => [
      ...roles.map((role) => ({
        id: role.id,
        track: role.track,
        kind: (role.track === 'leadership' ? 'role' : role.kind === 'project' ? 'project' : 'employment') as EntryKind,
        label: t(role.timeline.title),
        sublabel: role.timeline.org,
        period: role.period,
        href: role.track === 'leadership' ? `#lead-${role.id}` : `#role-${role.id}`,
      })),
      ...degrees.map((degree) => ({
        id: degree.id,
        track: 'education' as const,
        kind: 'education' as const,
        label: t(degree.timeline.title),
        sublabel: degree.timeline.org,
        period: degree.period,
        highlight: degree.highlight,
        href: `#edu-${degree.id}`,
      })),
    ],
    [t],
  );

  const placed = useMemo(() => {
    const measure = createMeasurer(fontsReady);
    const yearsWide = range.to - range.from;
    const labelSpan = (entry: TimelineEntry) => {
      if (plotWidth === 0) return 0;
      const px = Math.max(measure(entry.label, LABEL_FONT), measure(entry.sublabel, SUBLABEL_FONT)) + LABEL_GAP_PX;
      return (px / plotWidth) * yearsWide;
    };
    return placeEntries(entries, { now, range, labelSpan });
  }, [entries, now, range, plotWidth, fontsReady]);

  // On narrow screens the chart scrolls sideways. Start with today at the right edge, where the newest roles are.
  const scrolled = useRef(false);
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || scrolled.current || plotWidth === 0) return;
    scrolled.current = true;
    const todayX = (toPercent(now, range) / 100) * scroller.scrollWidth;
    scroller.scrollLeft = Math.max(0, todayX - scroller.clientWidth + 44);
  }, [plotWidth, now, range]);

  const todayLeft = `${toPercent(now, range)}%`;

  return (
    <figure className={styles.figure}>
      <div
        ref={scrollerRef}
        className={styles.scroller}
        role="region"
        tabIndex={0}
        aria-label={`${t(copy.experience.chartLabel)}. ${t(copy.experience.chartListNote)}`}
      >
        <div className={styles.chart} aria-hidden="true">
          <div className={styles.axis}>
            <span className={styles.corner} />
            <div ref={plotRef} className={styles.plot}>
              {years.map((year) => (
                <span key={year} className={styles.tick} style={{ left: `${toPercent(year, range)}%` }}>
                  {year}
                </span>
              ))}
            </div>
          </div>

          {TRACKS.map((track) => (
            <div key={track} className={styles.track} data-track={track}>
              <span className={styles.trackLabel}>{t(copy.experience.tracks[track])}</span>
              <div className={styles.plot} style={{ '--rows': Math.max(1, rowCount(placed, track)) } as CSSProperties}>
                {years.map((year) => (
                  <span key={year} className={styles.gridLine} style={{ left: `${toPercent(year, range)}%` }} />
                ))}
                <span className={styles.today} style={{ left: todayLeft }} />
                {placed
                  .filter((entry) => entry.track === track)
                  .map((entry) => {
                    const left = toPercent(entry.start, range);
                    const width = toPercent(entry.end, range) - left;
                    const span = entry.end - entry.start;
                    return (
                      <a
                        key={entry.id}
                        href={entry.href}
                        tabIndex={-1}
                        className={styles.entry}
                        data-kind={entry.kind}
                        data-align={entry.labelAlign}
                        data-ongoing={entry.period.end === null}
                        style={{ left: `${left}%`, width: `${width}%`, '--index': entry.row } as CSSProperties}
                        onClick={() => onSelect(entry.id)}
                      >
                        <span className={styles.labels}>
                          <span className={styles.label}>{entry.label}</span>
                          <span className={styles.sublabel}>{entry.sublabel}</span>
                        </span>
                        <span className={styles.bar}>
                          {entry.highlightStart !== undefined && entry.highlightEnd !== undefined ? (
                            <span
                              className={styles.highlight}
                              style={{
                                left: `${((entry.highlightStart - entry.start) / span) * 100}%`,
                                width: `${((entry.highlightEnd - entry.highlightStart) / span) * 100}%`,
                              }}
                            />
                          ) : null}
                        </span>
                      </a>
                    );
                  })}
              </div>
            </div>
          ))}

          <div className={styles.axis}>
            <span className={styles.corner} />
            <div className={styles.plot}>
              <span className={styles.todayLabel} style={{ left: todayLeft }}>
                {t(copy.experience.today)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <figcaption className={styles.caption}>
        <ul className={styles.legend}>
          {LEGEND.map((kind) => (
            <li key={kind}>
              <span className={styles.swatch} data-kind={kind} aria-hidden="true" />
              {t(copy.experience.legend[kind])}
            </li>
          ))}
          <li>
            <span className={styles.swatch} data-kind="highlight" aria-hidden="true" />
            {t(copy.experience.legend.highlight)}
          </li>
        </ul>
        <p className={styles.hint}>
          <span className={styles.hintPointer}>{t(copy.experience.chartHint)}</span>{' '}
          <span className={styles.hintScroll}>{t(copy.experience.scrollHint)}</span>
        </p>
      </figcaption>
    </figure>
  );
}
