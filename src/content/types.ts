import type { L } from '../i18n/locale';
import type { Period } from '../lib/dates';

/** The three columns the hero sorts the work into, and the lens used throughout the site. */
export type Lens = 'people' | 'process' | 'technology';

/** Lanes of the background ledger. */
export type Track = 'work' | 'leadership' | 'education';

/** How an entry is labelled on the background ledger: a short title and a short organisation name. */
export interface TimelineLabel {
  title: L;
  org: string;
}

export interface Role {
  id: string;
  track: Track;
  /** Projects (such as a thesis) are drawn differently from employment on the ledger. */
  kind?: 'project';
  title: L;
  timeline: TimelineLabel;
  org: string;
  place?: L;
  period: Period;
  summary: L;
  /** Only for roles without a case study or leadership story; otherwise the summary links there instead. */
  details?: L<string[]>;
  /** Section or case study that tells the longer story, if any. */
  storyHref?: string;
}

export interface ExternalLink {
  label: L;
  href: string;
}

export interface CaseStep {
  title: L;
  text: L;
}

/** A genuine screenshot of the work, never a mock-up. */
export interface Evidence {
  /** Base path without size suffix, e.g. `/images/sta-prototype-documents`. */
  src: string;
  width: number;
  height: number;
  alt: L;
  caption: L;
}

/** Which interactive illustration explains a case. Each is drawn by its own component. */
export type Illustration = 'equipment' | 'website' | 'twin';

export interface CaseStudy {
  id: string;
  org: string;
  context: L;
  period: Period;
  title: L;
  /** The problem in one or two sentences, before anything about the solution. */
  problem: L;
  lede: L;
  illustration: Illustration;
  /** The actual sequence of work. Each step says what was done. */
  steps: CaseStep[];
  /** Group work: the steps describe what the group did, not Felix alone. */
  team?: boolean;
  /** Felix's own part, when the work was done with others. */
  role?: L;
  outcome?: L;
  learning?: L;
  evidence?: Evidence;
  note?: L;
  stack?: string[];
  links?: ExternalLink[];
}

/** A fragment of real work, sorted into a column in the hero. */
export interface MapNode {
  lens: Lens;
  label: L;
  source: L;
  href: string;
  /** Small screens show only the main fragments. */
  minor?: boolean;
}

/** A way of working, with the project that shows it. */
export interface Principle {
  title: L;
  text: L;
  evidence: { label: L; href: string };
}

/** A method or tool, and where it was actually used. */
export interface Skill {
  name: L;
  where: L;
  href: string;
}

export interface Course {
  code: string;
  name: string;
  term: 'spring' | 'autumn';
  year: number;
  href?: string;
}

export interface Degree {
  id: string;
  title: L;
  timeline: TimelineLabel;
  institution: string;
  period: Period;
  description: L;
  courses: Course[];
  /** A sequence of stages within this education, such as an exchange year. */
  journey?: L<string[]>;
  /** A part of the period to mark inside the timeline bar, such as an exchange year. */
  highlight?: Period;
}

export interface Certificate {
  title: L;
  issuer: string;
  href?: string;
}
