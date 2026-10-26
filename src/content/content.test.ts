import { describe, expect, it } from 'vitest';
import { LOCALES } from '../i18n/locale';
import { copy } from './copy';
import { certificates, degrees } from './education';
import { renderLlmsTxt } from './llms';
import { personJsonLd } from './meta';
import { roles } from './roles';
import { caseStudies, mapNodes, principles, problems, skills } from './work';

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
  ...bilingualLeaves(problems, 'problems'),
  ...bilingualLeaves(principles, 'principles'),
  ...bilingualLeaves(skills, 'skills'),
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

  it('links hero fragments, principles, skills and stories only to sections that exist', () => {
    const targets = new Set(['#leadership', ...caseStudies.map((study) => `#${study.id}`)]);
    const hrefs = [
      ...mapNodes.map((node) => node.href),
      ...principles.map((principle) => principle.evidence.href),
      ...skills.map((skill) => skill.href),
      ...roles.flatMap((role) => role.storyHref ?? []),
    ];
    for (const href of hrefs) expect(targets.has(href)).toBe(true);
  });

  it('sorts at least one fragment into every column of the hero, and keeps most of them on small screens', () => {
    for (const lens of ['people', 'process', 'technology'] as const) {
      const inLens = mapNodes.filter((node) => node.lens === lens);
      expect(inLens.length).toBeGreaterThan(0);
      expect(inLens.filter((node) => !node.minor).length).toBeGreaterThanOrEqual(3);
    }
  });

  it('sets the hero headline as four lines in both languages', () => {
    for (const locale of LOCALES) expect(copy.hero.headline[locale]).toHaveLength(4);
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

describe('structured data', () => {
  it.each(LOCALES)('is valid JSON with a Person as the main entity (%s)', (locale) => {
    const json = personJsonLd(locale);
    expect(json).not.toContain('<');
    const graph = JSON.parse(json)['@graph'] as Record<string, unknown>[];
    const page = graph.find((node) => node['@type'] === 'ProfilePage');
    const person = graph.find((node) => node['@type'] === 'Person');
    expect(page?.mainEntity).toEqual({ '@id': person?.['@id'] });
    expect(person?.name).toBe('Felix Fabricius Knutsen');
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
