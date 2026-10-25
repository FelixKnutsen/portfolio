import type { Track } from '../content/types';
import { toYearFraction, type Period } from './dates';

/** Employment and projects share the work lane but are drawn differently. */
export type EntryKind = 'employment' | 'project' | 'role' | 'education';

export interface TimelineEntry {
  id: string;
  track: Track;
  kind: EntryKind;
  /** Short, already localised label shown above the bar. */
  label: string;
  sublabel: string;
  period: Period;
  /** A part of the period marked inside the bar (an exchange year, for example). */
  highlight?: Period;
  href: string;
}

export interface PlacedEntry extends TimelineEntry {
  /** Row within its track, so overlapping entries stack instead of colliding. */
  row: number;
  start: number;
  end: number;
  /** Labels near the right edge are anchored to the end of the bar so they never leave the chart. */
  labelAlign: 'start' | 'end';
  highlightStart?: number;
  highlightEnd?: number;
}

export interface TimelineRange {
  from: number;
  to: number;
}

interface PlaceOptions {
  now: number;
  range: TimelineRange;
  /** Width of an entry's label in years at the current chart width, including breathing room. */
  labelSpan?: (entry: TimelineEntry) => number;
}

/**
 * Greedy interval packing per track. Each entry occupies the wider of its bar
 * and its label. A label normally starts where its bar starts, but may end
 * where the bar ends instead if that lets the entry share a row, and it is
 * always end-anchored if it would otherwise run past the chart. Labels never
 * overlap, and bar lengths stay true to the dates.
 */
export function placeEntries(
  entries: TimelineEntry[],
  { now, range, labelSpan = () => 0 }: PlaceOptions,
): PlacedEntry[] {
  type Interval = [number, number];
  const rows = new Map<Track, Interval[][]>();
  const fits = (row: Interval[], [from, to]: Interval) => row.every(([a, b]) => to <= a || from >= b);

  const sorted = entries
    .map((entry) => ({
      entry,
      start: toYearFraction(entry.period.start, 'start'),
      end: entry.period.end === null ? now : toYearFraction(entry.period.end, 'end'),
      span: labelSpan(entry),
    }))
    .sort((a, b) => a.start - b.start);

  return sorted.map(({ entry, start, end, span }) => {
    const options: { align: PlacedEntry['labelAlign']; interval: Interval }[] = [];
    if (start + span <= range.to) options.push({ align: 'start', interval: [start, Math.max(end, start + span)] });
    if (end - span >= range.from || options.length === 0) {
      options.push({ align: 'end', interval: [Math.min(start, end - span), end] });
    }

    const trackRows = rows.get(entry.track) ?? [];
    let row = -1;
    let choice = options[0];
    for (let index = 0; index < trackRows.length && row === -1; index++) {
      const fit = options.find((option) => fits(trackRows[index], option.interval));
      if (fit) {
        row = index;
        choice = fit;
      }
    }
    if (row === -1) {
      row = trackRows.length;
      trackRows.push([]);
    }
    trackRows[row].push(choice.interval);
    rows.set(entry.track, trackRows);

    const highlight = entry.highlight
      ? {
          highlightStart: toYearFraction(entry.highlight.start, 'start'),
          highlightEnd: entry.highlight.end === null ? now : toYearFraction(entry.highlight.end, 'end'),
        }
      : {};
    return { ...entry, row, start, end, labelAlign: choice.align, ...highlight };
  });
}

export function rowCount(placed: PlacedEntry[], track: Track): number {
  return placed.filter((entry) => entry.track === track).reduce((max, entry) => Math.max(max, entry.row + 1), 0);
}

/** Position of a fractional year as a percentage of the range. */
export function toPercent(year: number, range: TimelineRange): number {
  return ((year - range.from) / (range.to - range.from)) * 100;
}

export function currentYearFraction(date = new Date()): number {
  return date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365;
}
