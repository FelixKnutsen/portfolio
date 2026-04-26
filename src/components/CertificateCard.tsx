import { useScrollReveal } from '../hooks/useScrollReveal';
import type { CertificateItem } from '../types';

interface CertificateCardProps {
  item: CertificateItem;
  index: number;
}

export default function CertificateCard({ item, index }: CertificateCardProps) {
  const itemRef = useScrollReveal<HTMLDivElement>();

  const cardContent = (
    <>
      <div className="p-3 bg-surface-variant dark:bg-slate-900 rounded-lg flex items-center justify-center">
        <span className="material-symbols-outlined text-secondary" aria-hidden="true">
          {item.icon}
        </span>
      </div>
      <div>
        <h3 className="font-headline-md text-base font-semibold text-slate-900 dark:text-slate-50 mb-1">
          {item.title}
        </h3>
        <p className="font-body-md text-sm text-slate-500 dark:text-slate-400">
          {item.issuer}
        </p>
      </div>
    </>
  );

  const baseClassName =
    'bg-white dark:bg-slate-950 p-8 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col items-start gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-on-scroll h-full';

  if (item.pdfLink) {
    return (
      <a
        ref={itemRef as unknown as React.RefObject<HTMLAnchorElement>}
        href={item.pdfLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClassName} cursor-pointer hover:border-secondary-container/50 focus:ring-2 focus:ring-secondary-container outline-none`}
        style={{ animationDelay: `${index * 0.1}s` }}
        aria-label={`View certificate: ${item.title}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div
      ref={itemRef}
      className={baseClassName}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {cardContent}
    </div>
  );
}
