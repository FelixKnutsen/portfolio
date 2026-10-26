/** The site's mark: three sorted columns, the middle one carrying a note. Shared with the favicon. */
export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2" y="3" width="4.5" height="18" rx="1.2" fill="currentColor" />
      <rect x="9.75" y="3" width="4.5" height="11" rx="1.2" fill="currentColor" />
      <rect x="9.75" y="16" width="4.5" height="5" rx="1.2" fill="var(--note)" />
      <rect x="17.5" y="3" width="4.5" height="14" rx="1.2" fill="currentColor" />
    </svg>
  );
}
