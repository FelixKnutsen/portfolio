import type { ReactNode } from 'react';
import { copy } from '../content/copy';
import { useLocale } from '../i18n/LocaleContext';
import { hostOf, trackEvent } from '../lib/analytics';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** A link that opens in a new tab and says so to assistive technology. */
export default function ExternalLink({ href, children, className = 'link' }: ExternalLinkProps) {
  const { t } = useLocale();
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        const host = hostOf(href);
        if (host !== window.location.host) trackEvent({ name: 'Outbound link', host });
      }}
    >
      {children}
      <span className="visually-hidden"> ({t(copy.external)})</span>
      <span aria-hidden="true" className="external-mark" />
    </a>
  );
}
