import { describe, expect, it } from 'vitest';
import { LOCALES } from '../i18n/locale';
import { copy } from './copy';
import { certificates, degrees } from './education';
import { renderLlmsTxt } from './llms';
import { roles } from './roles';
import { caseStudies, mapNodes } from './work';

/** Walks a value and returns every bilingual leaf as [path, value]. */
function bilingualLeaves(value: unknown, path = 'copy'): [string, Record<string, unknown>][] {
  if (Array.isArray(value)) return value.flatMap((item, index) => bilingualLeaves(item, `${path}[${index}]`));
  if (!value || typeof value !== 'object') return [];
  const record = value as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length > 0 && keys.every((key) => (LOCALES as readonly string[]).includes(key))) {
    return [[path, record]];
  }
  return keys.flatMap((key) => bilingualLeaves(record[key], `${path}.${key}`));
}

const allBilingual = [
  ...bilingualLeaves(copy),
  ...bilingualLeaves(roles, 'roles'),
  ...bilingualLeaves(caseStudies, 'caseStudies'),
  ...bilingualLeaves(mapNodes, 'mapNodes'),
  ...bilingualLeaves(degrees, 'degrees'),
  ...bilingualLeaves(certificates, 'certificates'),
];

describe('bilingual content', () => {
  it('finds a meaningful amount of bilingual content', () => {
    expect(allBilingual.length).toBeGreaterThan(150);
  });

  it.each(allBilingual)('%s exists in every language', (_path, value) => {
    for (const locale of LOCALES) {
      const text = value[locale];
      if (Array.isArray(text)) {
        expect(text.length).toBeGreaterThan(0);
        text.forEach((item) => expect(String(item).trim()).not.toBe(''));
      } else {
        expect(String(text ?? '').trim()).not.toBe('');
      }
    }
  });

  it.each(allBilingual.filter(([, value]) => Array.isArray(value.no)))(
    '%s has the same number of items in both languages',
    (_path, value) => {
      expect((value.no as unknown[]).length).toBe((value.en as unknown[]).length);
    },
  );
});

describe('facts', () => {
  const dates = [...roles, ...degrees, ...caseStudies].flatMap((item) => [item.period.start, item.period.end]);

  it('uses YYYY, YYYY-MM or YYYY-MM-DD dates', () => {
    for (const date of dates) {
      if (date !== null) expect(date).toMatch(/^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/);
    }
  });

  it('never ends a role before it starts', () => {
    for (const item of [...roles, ...degrees, ...caseStudies]) {
      if (item.period.end !== null) expect(item.period.end >= item.period.start).toBe(true);
    }
  });

  it('has unique ids for roles and case studies', () => {
    const ids = [...roles.map((role) => role.id), ...caseStudies.map((study) => study.id)];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('links map nodes and stories only to sections that exist', () => {
    const targets = new Set(['#leadership', ...caseStudies.map((study) => `#${study.id}`)]);
    for (const href of [...mapNodes.map((node) => node.href), ...roles.flatMap((role) => role.storyHref ?? [])]) {
      expect(targets.has(href)).toBe(true);
    }
  });

  it('gives every timeline entry a short label in both languages', () => {
    for (const item of [...roles, ...degrees]) {
      expect(item.timeline.org.trim()).not.toBe('');
      expect(item.timeline.title.no.length).toBeLessThanOrEqual(40);
      expect(item.timeline.title.en.length).toBeLessThanOrEqual(40);
    }
  });

  it('gives each listed work role either details or a link to its case study, never both', () => {
    for (const role of roles.filter((candidate) => candidate.track === 'work')) {
      expect(Boolean(role.details) !== Boolean(role.storyHref)).toBe(true);
    }
  });

  it('never links courses to the spring 2023 pages UiA has removed', () => {
    for (const course of degrees.flatMap((degree) => degree.courses)) {
      if (course.year === 2023 && course.term === 'spring') expect(course.href).toBeUndefined();
    }
  });

  it('only links courses to real UiA pages, never to placeholders', () => {
    for (const course of degrees.flatMap((degree) => degree.courses)) {
      if (course.href) expect(course.href).toMatch(/^https:\/\/www\.uia\.no\//);
    }
  });
});

describe('llms.txt', () => {
  const text = renderLlmsTxt();

  it('links both language versions and lists every case study', () => {
    expect(text).toContain('https://felixknutsen.com/en/');
    expect(text).toContain('https://felixknutsen.com/no/');
    for (const study of caseStudies) expect(text).toContain(study.title.en);
  });

  it('never prints a missing value', () => {
    expect(text).not.toMatch(/undefined|null|\[object/);
  });
});
