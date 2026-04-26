import { useCallback } from 'react';

/**
 * Hook for smooth-scrolling to sections by their element ID.
 * Does NOT modify `window.location.hash`, keeping the URL clean.
 */
export function useScrollTo() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { scrollToSection, scrollToTop };
}
