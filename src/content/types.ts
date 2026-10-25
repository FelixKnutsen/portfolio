import type { L } from '../i18n/locale';
import type { Period } from '../lib/dates';

/** The three lanes of the hero process map, and the lens used throughout the site. */
export type Lens = 'people' | 'process' | 'technology';

/** Lanes of the experience timeline. */
export type Track = 'work' | 'leadership' | 'education';

/** How an entry is labelled on the experience timeline: a short title and a short organisation name. */
export interface TimelineLabel {
  title: L;
  org: string;
}

export interface Role {
  id: string;
  track: Track;
  /** Projects (such as a thesis) are drawn differently from employment on the timeline. */
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

export interface CaseStudy {
  id: string;
  org: string;
  context: L;
  period: Period;
  title: L;
  lede: L;
  /** The actual sequence of work, drawn as a process trace. Each step says what was done. */
  steps: CaseStep[];
  /** Group work: the steps describe what the group did, not Felix alone. */
  team?: boolean;
  /** Felix's own part, when the work was done with others. */
  role?: L;
  decision?: L;
  outcome?: L;
  learning?: L;
  evidence?: Evidence;
  note?: L;
  stack?: string[];
  links?: ExternalLink[];
}

export interface MapNode {
  lens: Lens;
  label: L;
  source: L;
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
