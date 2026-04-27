import { useScrollReveal } from '../hooks/useScrollReveal';

interface ArcProps {
  direction?: 'up' | 'down';
  /** Tailwind text-color class to set the arc fill (e.g. "text-background dark:text-slate-950") */
  fillClassName?: string;
}

export default function Arc({ direction = 'up', fillClassName }: ArcProps) {
  const ref = useScrollReveal<SVGSVGElement>();

  // Filled paths extend far beyond the viewBox so the straight closing edge
  // is never visible — only the smooth curve shows.
  const filledPath = direction === 'up'
    ? 'M -10 100 Q 500 0 1010 100 L 1010 200 L -10 200 Z'
    : 'M -10 0 Q 500 100 1010 0 L 1010 -100 L -10 -100 Z';

  return (
    <div
      className="w-full flex justify-center overflow-visible h-[40px] md:h-[60px] -my-[60px] md:-my-[90px] relative z-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg
        ref={ref}
        className="w-[150%] md:w-[120%] h-full animate-on-scroll"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        style={{ animationDelay: '0.1s', overflow: 'visible' }}
      >
        {fillClassName && (
          <g className={fillClassName}>
            <path
              d={filledPath}
              fill="currentColor"
              stroke="none"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
