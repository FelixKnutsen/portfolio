import { useEffect, useRef, useState } from 'react';

/** Becomes `true` the first time the element scrolls into view, then stops observing. */
export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  // Starts `false` everywhere, including the prerender, so the hydrated page matches the HTML it takes over.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView };
}
