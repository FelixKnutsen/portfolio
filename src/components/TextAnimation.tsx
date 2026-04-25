import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextAnimationProps {
  text: string;
}

const TextAnimation: React.FC<TextAnimationProps> = ({ text }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      const words = containerRef.current!.children;
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup previous animation before starting a new one
  }, [text]);

  return (
    <p
      ref={containerRef}
      className="font-body-lg text-body-lg text-slate-600 dark:text-slate-400 max-w-2xl flex flex-wrap gap-x-1.5"
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block opacity-0">
          {word}
        </span>
      ))}
    </p>
  );
};

export default TextAnimation;
