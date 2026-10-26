import { track } from '@vercel/analytics';

/**
 * Custom interaction events for Vercel Web Analytics. Only labels and
 * destinations are sent, never anything a visitor typed. Custom events are
 * only recorded on Vercel plans that include them; elsewhere this is a no-op.
 */
export type AnalyticsEvent =
  | { name: 'CV view'; placement: 'header' | 'contact' }
  | { name: 'CV download'; placement: 'contact' }
  | { name: 'Contact form'; result: 'sent' | 'failed' }
  | { name: 'Email click' }
  | { name: 'Language switch'; to: string }
  | { name: 'Outbound link'; host: string };

export function trackEvent({ name, ...properties }: AnalyticsEvent): void {
  try {
    track(name, properties);
  } catch {
    // Analytics must never break the page.
  }
}

export function hostOf(href: string): string {
  try {
    return new URL(href, window.location.href).host;
  } catch {
    return 'unknown';
  }
}
