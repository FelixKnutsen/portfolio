import { LOCALE_TAG, type Locale } from '../i18n/locale';

/** `YYYY-MM-DD` when the day matters, `YYYY-MM` when the month is known, `YYYY` when only the year is. */
export type PartialDate = string;

export interface Period {
  start: PartialDate;
  /** `null` means the role is ongoing. */
  end: PartialDate | null;
}

const PRESENT: Record<Locale, string> = { no: 'nå', en: 'present' };

function parse(date: PartialDate): { year: number; month: number | null; day: number | null } {
  const [year, month, day] = date.split('-').map(Number);
  return { year, month: month ? month : null, day: day ? day : null };
}

export function formatDate(date: PartialDate, locale: Locale): string {
  const { year, month } = parse(date);
  if (month === null) return String(year);
  return new Intl.DateTimeFormat(LOCALE_TAG[locale], { month: 'short', year: 'numeric' })
    .format(new Date(Date.UTC(year, month - 1, 1)))
    .replace(/\.$/, '');
}

export function formatPeriod({ start, end }: Period, locale: Locale): string {
  const from = formatDate(start, locale);
  if (end === null) return `${from} – ${PRESENT[locale]}`;
  if (end === start) return from;
  return `${from} – ${formatDate(end, locale)}`;
}

/**
 * Converts a partial date to a fractional year for drawing timelines.
 * Month dates snap to the start or end of their month. Year-only dates are
 * school years whose months are unknown, so they are drawn from mid-year.
 */
export function toYearFraction(date: PartialDate, edge: 'start' | 'end'): number {
  const { year, month, day } = parse(date);
  if (month === null) return year + 0.5;
  if (day !== null) {
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return year + (month - 1 + (day - 1) / daysInMonth) / 12;
  }
  return year + (month - 1 + (edge === 'end' ? 1 : 0)) / 12;
}
