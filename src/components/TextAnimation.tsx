import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';

interface TextAnimationProps {
  text: string;
}

const TextAnimation = memo(function TextAnimation({ text }: TextAnimationProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const words = container.children;
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: 'power2.out',
          delay: 0.2,
        },
      );
    }, container);

    return () => ctx.revert();
  }, [text]);

  return (
    <p
      ref={containerRef}
      className="font-body-lg text-body-lg text-slate-600 dark:text-slate-400 max-w-2xl flex flex-wrap gap-x-1.5"
    >
      {text.split(/\s+/).filter(Boolean).map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block opacity-0">
          {word}
        </span>
      ))}
    </p>
  );
});

export default TextAnimation;
