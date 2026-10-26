import { describe, expect, it } from 'vitest';
import { renderHead } from '../content/meta';
import { detectLocale, localeFromPath, localePath } from '../i18n/locale';
import { validateContact } from './contactForm';
import { formatPeriod, toYearFraction } from './dates';
import { easeInOutCubic, scatter, seededRandom, staggered } from './scatter';
import { blockAt, blockName, buildBlocks, contains, fitView, prism } from './twin';

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

describe('hero scatter', () => {
  it('repeats the same random sequence for the same seed', () => {
    const a = seededRandom(42);
    const b = seededRandom(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it('places every box inside the area and clear of what it must avoid', () => {
    const area = { x: 0, y: 0, width: 1000, height: 600 };
    const headline = { x: 0, y: 0, width: 1000, height: 250 };
    const sizes = Array.from({ length: 12 }, () => ({ width: 120, height: 36 }));
    const points = scatter(sizes, area, [headline], 3);
    expect(points).toHaveLength(12);
    for (const point of points) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x + 120).toBeLessThanOrEqual(1000);
      expect(point.y + 36).toBeLessThanOrEqual(600);
      expect(point.y).toBeGreaterThanOrEqual(250);
    }
  });

  it('still places a box when nothing is clear, rather than failing', () => {
    const area = { x: 0, y: 0, width: 100, height: 100 };
    const points = scatter([{ width: 80, height: 80 }], area, [area]);
    expect(points).toHaveLength(1);
  });

  it('settles every fragment by the end of the scroll, starting with the first', () => {
    expect(staggered(0, 0, 10)).toBe(0);
    expect(staggered(1, 9, 10)).toBe(1);
    expect(staggered(0.3, 0, 10)).toBeGreaterThan(staggered(0.3, 9, 10));
    expect(easeInOutCubic(0.5)).toBeCloseTo(0.5);
  });
});

describe('digital twin illustration', () => {
  const blocks = buildBlocks(8, 6);

  it('builds the same town every time, in back-to-front drawing order', () => {
    expect(buildBlocks(8, 6)).toEqual(blocks);
    expect(blocks).toHaveLength(48);
    const depths = blocks.map((block) => block.gx + block.gy);
    expect(depths).toEqual([...depths].sort((a, b) => a - b));
  });

  it('fits the town inside the canvas', () => {
    const view = fitView(600, 480, 8, 6, Math.max(...blocks.map((block) => block.storeys)));
    for (const block of blocks) {
      for (const point of prism(view, block, block.storeys).outline) {
        expect(point.x).toBeGreaterThanOrEqual(0);
        expect(point.x).toBeLessThanOrEqual(600);
        expect(point.y).toBeGreaterThanOrEqual(0);
        expect(point.y).toBeLessThanOrEqual(480);
      }
    }
  });

  it('finds the front-most block under the pointer', () => {
    const view = fitView(600, 480, 8, 6, 10);
    const index = blocks.findIndex((block) => block.storeys > 0);
    const top = prism(view, blocks[index], blocks[index].storeys).top;
    const centre = { x: (top[0].x + top[2].x) / 2, y: (top[0].y + top[2].y) / 2 };
    const hit = blockAt(view, blocks, centre);
    expect(hit).toBeGreaterThanOrEqual(index);
    expect(blockAt(view, blocks, { x: -50, y: -50 })).toBe(-1);
  });

  it('tests points against polygons and names blocks like map references', () => {
    const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
    expect(contains(square, { x: 5, y: 5 })).toBe(true);
    expect(contains(square, { x: 15, y: 5 })).toBe(false);
    expect(blockName({ gx: 2, gy: 3, storeys: 1 })).toBe('C4');
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
