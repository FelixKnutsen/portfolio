import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "styled-components";

interface AnimatedTextProps {
  text: string; // The text to animate
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const words = textRef.current?.querySelectorAll("span");
    if (words) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 5, rotation: -15 }, // Initial state
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.5, // Duration of each animation
          ease: "power2.out",
          stagger: 0.05, // Delay between each word's animation
        }
      );
    }
  }, []);

  return (
    <TextContainer ref={textRef}>
      {text.split(" ").map((word, index) => (
        <span key={index}>{word}&nbsp;</span> // Wrap each word in a span
      ))}
    </TextContainer>
  );
};

// Styled Components
const TextContainer = styled.div`
  display: inline-block;
  font-size: 1.2rem;
  line-height: 1.8;
i

  span {
    display: inline-block; // Ensure each word animates independently
    white-space: nowrap;
  }
`;

export default AnimatedText;
