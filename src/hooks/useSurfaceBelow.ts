import { useEffect, useState } from 'react';

export type Surface = 'blue' | 'ink' | 'paper';

/**
 * Which surface is under the fixed header (`data-surface` on a section, or
 * paper by default), so the header can switch colours as the page changes
 * from the ultramarine hero to paper and back.
 */
export function useSurfaceBelow(probeY = 32): Surface {
  // Starts as the hero's surface everywhere, including the prerender, so hydration matches.
  const [surface, setSurface] = useState<Surface>('blue');

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const stack = document.elementsFromPoint(window.innerWidth / 2, probeY);
      const below = stack.find((element) => !element.closest('header'));
      const value = below?.closest<HTMLElement>('[data-surface]')?.dataset.surface;
      setSurface(value === 'blue' || value === 'ink' ? value : 'paper');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [probeY]);

  return surface;
}
