import { SITE_URL } from '../i18n/locale';
import { formatPeriod } from '../lib/dates';
import { contactDetails, copy } from './copy';
import { CV_PUBLIC_PATH } from './cvFile';
import { degrees } from './education';
import { roles } from './roles';
import { caseStudies } from './work';

/**
 * /llms.txt (llmstxt.org): a plain summary for AI tools, built at build time
 * from the same content as the page, so it can never say more than the site.
 */
export function renderLlmsTxt(): string {
  const en = 'en' as const;
  const line = (text: string) => text.replace(/\s+/g, ' ').trim();

  const work = roles
    .filter((role) => role.track === 'work')
    .map((role) => `- ${role.title.en}, ${role.org} (${formatPeriod(role.period, en)}): ${line(role.summary.en)}`);
  const elected = roles
    .filter((role) => role.track === 'leadership')
    .map((role) => `- ${role.title.en}, ${role.org} (${formatPeriod(role.period, en)}): ${line(role.summary.en)}`);
  const education = degrees.map(
    (degree) => `- ${degree.title.en}, ${degree.institution} (${formatPeriod(degree.period, en)}): ${line(degree.description.en)}`,
  );
  const projects = caseStudies.map((study) => {
    const parts = [`- ${study.title.en} (${study.org}, ${formatPeriod(study.period, en)}): ${line(study.lede.en)}`];
    if (study.role) parts.push(`  Role: ${line(study.role.en)}`);
    return parts.join('\n');
  });

  return `# Felix Fabricius Knutsen

> ${line(copy.hero.role.en)}. ${line(copy.intro.statement.en)} Looking for: ${line(copy.intro.facts.seeking.en)}

This file summarises the portfolio at ${SITE_URL}. The full site is available in English and Norwegian.

## Pages

- [Portfolio in English](${SITE_URL}/en/)
- [Portfolio in Norwegian](${SITE_URL}/no/)
- [CV (PDF, Norwegian)](${SITE_URL}${CV_PUBLIC_PATH})

## Selected work

${projects.join('\n')}

## Work and projects

${work.join('\n')}

## Elected roles

${elected.join('\n')}

## Education

${education.join('\n')}

## Contact

- Email: ${contactDetails.email}
- [LinkedIn](${contactDetails.linkedin})
- [GitHub](${contactDetails.github})
`;
}
