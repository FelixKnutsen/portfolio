// ──────────────────────────────────────────────
// Centralized TypeScript types for the portfolio
// ──────────────────────────────────────────────

import type { Language } from './context/LanguageContext';

/** Internal navigation link (scrolls to a section on the page). */
export interface NavLink {
  label: string;
  sectionId: string;
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
  image: HeroImage;
}

/** A single education entry. */
export interface EducationItem {
  degree: string;
  institution: string;
  status: string;
  description: string;
  isActive: boolean;
}

/** Education section content. */
export interface EducationContent {
  heading: string;
  subtitle: string;
  items: EducationItem[];
}

/** A single experience entry. */
export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
  markerColor: string;
}

/** Experience section content. */
export interface ExperienceContent {
  heading: string;
  subtitle: string;
  items: ExperienceItem[];
}

/** A single certificate entry. */
export interface CertificateItem {
  title: string;
  issuer: string;
  icon: string;
  pdfLink?: string;
}

/** Certificates section content. */
export interface CertificatesContent {
  heading: string;
  subtitle: string;
  items: CertificateItem[];
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

/** All content for a single language. */
export interface LocaleContent {
  meta: MetaContent;
  nav: NavContent;
  hero: HeroContent;
  education: EducationContent;
  experience: ExperienceContent;
  certificates: CertificatesContent;
  contact: ContactContent;
  footer: FooterContent;
}

/** Top-level content data, keyed by language code. */
export type ContentData = Record<Language, LocaleContent>;

/** Contact form submission status. */
export type FormStatus = 'idle' | 'loading' | 'success' | 'error';
