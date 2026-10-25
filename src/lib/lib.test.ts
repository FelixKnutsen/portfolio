import { describe, expect, it } from 'vitest';
import { renderHead } from '../content/meta';
import { detectLocale, localeFromPath, localePath } from '../i18n/locale';
import { validateContact } from './contactForm';
import { formatPeriod, toYearFraction } from './dates';
import { connectorPath, labelSides, nodePoints } from './processMap';
import { placeEntries } from './timeline';

describe('locale routing', () => {
  it('reads the locale from the first path segment', () => {
    expect(localeFromPath('/en/')).toBe('en');
    expect(localeFromPath('/no')).toBe('no');
    expect(localeFromPath('/')).toBeNull();
    expect(localeFromPath('/de/')).toBeNull();
  });

  it('builds locale paths that keep the section', () => {
    expect(localePath('en', '#experience')).toBe('/en/#experience');
    expect(localePath('no')).toBe('/no/');
  });

  it('prefers a stored choice, then the browser language, then Norwegian', () => {
    expect(detectLocale('en', ['nb-NO'])).toBe('en');
    expect(detectLocale(null, ['nn-NO', 'en'])).toBe('no');
    expect(detectLocale(null, ['en-US'])).toBe('en');
    expect(detectLocale('xx', ['de-DE'])).toBe('no');
  });
});

describe('dates', () => {
  it('formats periods per language', () => {
    expect(formatPeriod({ start: '2026-01', end: '2026-05' }, 'en')).toBe('Jan 2026 – May 2026');
    expect(formatPeriod({ start: '2026-07', end: null }, 'no')).toBe('juli 2026 – nå');
    expect(formatPeriod({ start: '2019', end: '2020' }, 'en')).toBe('2019 – 2020');
  });

  it('converts partial dates to fractional years', () => {
    expect(toYearFraction('2025-01', 'start')).toBe(2025);
    expect(toYearFraction('2025-12', 'end')).toBe(2026);
    // Year-only dates are school years with unknown months, drawn from mid-year.
    expect(toYearFraction('2019', 'start')).toBe(2019.5);
    expect(toYearFraction('2020', 'end')).toBe(2020.5);
  });

  it('lets a role that ends on a given day meet the next one exactly', () => {
    expect(toYearFraction('2025-01-16', 'end')).toBe(toYearFraction('2025-01-16', 'start'));
    expect(formatPeriod({ start: '2024-08', end: '2025-01-16' }, 'en')).toBe('Aug 2024 – Jan 2025');
  });
});

describe('timeline packing', () => {
  const base = { kind: 'role' as const, label: '', sublabel: '', href: '#' };
  const range = { from: 2018, to: 2027.35 };

  it('stacks overlapping entries in the same track', () => {
    const placed = placeEntries(
      [
        { ...base, id: 'a', track: 'leadership', period: { start: '2025-01', end: '2026-01' } },
        { ...base, id: 'b', track: 'leadership', period: { start: '2025-08', end: '2026-05' } },
        { ...base, id: 'c', track: 'leadership', period: { start: '2026-07', end: null } },
      ],
      { now: 2026.8, range },
    );
    const rowOf = (id: string) => placed.find((entry) => entry.id === id)?.row;
    expect(rowOf('a')).toBe(0);
    expect(rowOf('b')).toBe(1);
    expect(rowOf('c')).toBe(0);
  });

  it('reserves room for labels wider than their bars', () => {
    const placed = placeEntries(
      [
        { ...base, id: 'short', track: 'work', period: { start: '2024-08', end: '2024-11' } },
        { ...base, id: 'next', track: 'work', period: { start: '2025-01', end: '2025-06' } },
      ],
      { now: 2026.8, range, labelSpan: () => 1 },
    );
    expect(placed.find((entry) => entry.id === 'next')?.row).toBe(1);
  });

  it('anchors labels to the end of the bar near the right edge', () => {
    const [entry] = placeEntries(
      [{ ...base, id: 'now', track: 'leadership', period: { start: '2026-07', end: null } }],
      {
        now: 2026.8,
        range,
        labelSpan: () => 1.5,
      },
    );
    expect(entry.labelAlign).toBe('end');
  });

  it('marks a highlighted part of the period', () => {
    const [entry] = placeEntries(
      [
        {
          ...base,
          id: 'vgs',
          track: 'education',
          period: { start: '2018', end: '2021' },
          highlight: { start: '2019', end: '2020' },
        },
      ],
      { now: 2026.8, range },
    );
    expect(entry.highlightStart).toBe(2019.5);
    expect(entry.highlightEnd).toBe(2020.5);
  });
});

describe('process map', () => {
  it('puts each label on the side of its dot that no connector reaches', () => {
    // The hero map: people, process, technology, process, technology, people.
    expect(labelSides(['people', 'process', 'technology', 'process', 'technology', 'people'])).toEqual([
      'above', // only neighbour is below
      'below', // neighbours on both sides: default, halo protects it
      'below', // bottom lane
      'above', // both neighbours are below
      'below',
      'above',
    ]);
  });

  it('routes the connector through every node', () => {
    const points = nodePoints(['people', 'technology']);
    expect(points[0].y).toBeCloseTo(16.67, 1);
    expect(points[1].y).toBeCloseTo(83.33, 1);
    expect(connectorPath(points)).toBe('M 0 16.666666666666664 H 25 H 50 V 83.33333333333334 H 75 H 100');
  });

  it('routes the vertical connector downwards, changing lane between steps', () => {
    const points = nodePoints(['people', 'technology'], 'vertical');
    expect(points[0].x).toBeCloseTo(16.67, 1);
    expect(points[0].y).toBe(25);
    expect(points[1].x).toBeCloseTo(83.33, 1);
    expect(connectorPath(points, 'vertical')).toBe('M 16.666666666666664 0 V 25 V 50 H 83.33333333333334 V 75 V 100');
  });
});

describe('contact form validation', () => {
  it('requires name, a valid email and a message, but not a subject', () => {
    expect(validateContact({ name: '', email: 'x', subject: '', message: ' ' })).toEqual({
      name: 'name',
      email: 'emailInvalid',
      message: 'message',
    });
    expect(validateContact({ name: 'Ola', email: 'ola@firma.no', subject: '', message: 'Hei' })).toEqual({});
  });
});

describe('SEO head', () => {
  it('writes a canonical, hreflang alternates and the right language', () => {
    const head = renderHead('en');
    expect(head).toContain('<link rel="canonical" href="https://felixknutsen.com/en/" />');
    expect(head).toContain('hreflang="nb" href="https://felixknutsen.com/no/"');
    expect(head).toContain('hreflang="x-default"');
    expect(head).toContain('content="en_GB"');
  });
});
