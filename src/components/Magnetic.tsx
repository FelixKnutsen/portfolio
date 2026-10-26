import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Lets a primary action lean a few pixels towards the pointer, so it feels
 * within reach. Only with a fine pointer and without reduced motion; the
 * child keeps its normal size, focus ring and click target.
 */
export default function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    let frame = 0;
    const move = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      move((event.clientX - rect.left - rect.width / 2) * strength, (event.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => move(0, 0);

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      style={{ display: 'inline-flex', transition: 'transform 380ms var(--ease-out)', willChange: 'transform' }}
    >
      {children}
    </span>
  );
}
