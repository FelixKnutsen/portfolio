import { useEffect, useRef, useMemo } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
}

/**
 * Observe an element and add the `is-visible` class once it scrolls into view.
 * Unobserves after the first intersection so the animation fires only once.
 */
export function useScrollReveal<T extends Element>(
  options: ScrollRevealOptions = {},
) {
  const { threshold = 0.1 } = options;
  const ref = useRef<T>(null);

  // Stable reference so the effect doesn't re-run on every render
  const observerOptions = useMemo(() => ({ threshold }), [threshold]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [observerOptions]);

  return ref;
}
