// ──────────────────────────────────────────────
// Centralized TypeScript types for the portfolio
// ──────────────────────────────────────────────

import type { Language } from './context/LanguageContext';

/** Internal navigation link (scrolls to a section on the page). */
export interface NavLink {
  label: string;
  /** Section ID for in-page scroll, or a route path like "/about" */
  sectionId: string;
  /** If true, this link navigates to a route instead of scrolling */
  isRoute?: boolean;
}

/** Navigation bar content. */
export interface NavContent {
  brand: string;
  links: NavLink[];
}

/** Hero image data. */
export interface HeroImage {
  src: string;
  alt: string;
}

/** Hero section content. */
export interface HeroContent {
  badge: string;
  headline: string;
  body: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: HeroImage;
}

/** A single course within a degree. */
export interface Course {
  code: string;
  name: string;
  description: string;
  semester: string;
  topics: string[];
  link?: string;
}

/** A single education entry. */
export interface EducationItem {
  degree: string;
  institution: string;
  status: string;
  description: string;
  isActive: boolean;
  courses?: Course[];
}

/** Education section content. */
export interface EducationContent {
  heading: string;
  subtitle: string;
  showCourses: string;
  hideCourses: string;
  semesterLabel: string;
  topicsLabel: string;
  addLabelsLabel: string;
  items: EducationItem[];
}

/** A single experience entry. */
export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
  markerColor: string;
}

/** Experience section content. */
export interface ExperienceContent {
  heading: string;
  subtitle: string;
  items: ExperienceItem[];
}

/** A single project / case study entry. */
export interface ProjectItem {
  /** URL-safe slug for routing, e.g. "phonero-equipment-list" */
  slug: string;
  /** Project title */
  title: string;
  /** Your role on the project */
  role: string;
  /** Technologies used */
  techStack: string[];
  /** The problem the project solved */
  problem: string;
  /** Your architectural/technical solution */
  solution: string;
  /** Measurable business impact / results */
  impact: string[];
  /** Link to GitHub repository */
  githubUrl?: string;
  /** Link to live deployment */
  liveUrl?: string;
  /** Path to hero image for the case study */
  image?: string;
  /** Alt text for hero image */
  imageAlt?: string;
  /** Whether to feature on the home page grid */
  featured: boolean;
  /** Short summary for project cards (1-2 sentences) */
  summary: string;
}

/** Projects section content. */
export interface ProjectsContent {
  heading: string;
  subtitle: string;
  viewCaseStudy: string;
  items: ProjectItem[];
}

/** A single contact link (email, social, etc.). */
export interface ContactLink {
  type: string;
  value: string;
  href: string;
  icon: string;
  external: boolean;
}

/** Contact form labels & placeholders. */
export interface ContactForm {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  subjectLabel: string;
  subjectPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  buttonText: string;
}

/** Contact section content. */
export interface ContactContent {
  heading: string;
  body: string;
  links: ContactLink[];
  form: ContactForm;
}

/** Footer link (external). */
export interface FooterLink {
  label: string;
  href: string;
}

/** Footer section content. */
export interface FooterContent {
  copyright: string;
  links: FooterLink[];
}

/** Meta tags content. */
export interface MetaContent {
  title: string;
  description: string;
}

/** About page content. */
export interface AboutContent {
  heading: string;
  intro: string;
  backToHome: string;
}

/** All content for a single language. */
export interface LocaleContent {
  meta: MetaContent;
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  projects: ProjectsContent;
  education: EducationContent;
  experience: ExperienceContent;
  contact: ContactContent;
  footer: FooterContent;
}

/** Top-level content data, keyed by language code. */
export type ContentData = Record<Language, LocaleContent>;

/** Contact form submission status. */
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
