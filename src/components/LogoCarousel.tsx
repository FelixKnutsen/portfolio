import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const logos = [
  // Languages
  "https://skillicons.dev/icons?i=javascript",
  "https://skillicons.dev/icons?i=typescript",
  "https://skillicons.dev/icons?i=python",
  "https://skillicons.dev/icons?i=java",
  "https://skillicons.dev/icons?i=go",
  "https://skillicons.dev/icons?i=php",
  "https://skillicons.dev/icons?i=html",
  "https://skillicons.dev/icons?i=css",

  // Frameworks/Libraries
  "https://skillicons.dev/icons?i=react",
  "https://skillicons.dev/icons?i=nodejs",
  "https://skillicons.dev/icons?i=tailwind",
  "https://skillicons.dev/icons?i=bootstrap",
  "https://skillicons.dev/icons?i=graphql",
  "https://skillicons.dev/icons?i=dotnet",

  // DevOps/Tools
  "https://skillicons.dev/icons?i=docker",
  "https://skillicons.dev/icons?i=git",
  "https://skillicons.dev/icons?i=github",
  "https://skillicons.dev/icons?i=azure",
  "https://skillicons.dev/icons?i=npm",
  "https://skillicons.dev/icons?i=postgres",

  // Platforms/Other
  "https://skillicons.dev/icons?i=ubuntu",
  "https://skillicons.dev/icons?i=vercel",
  "https://skillicons.dev/icons?i=vite",
];

const LogoCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      // Duplicate the logos to ensure seamless looping
      const duplicateContent = carousel.innerHTML;
      carousel.innerHTML += duplicateContent;

      gsap.to(carousel, {
        x: `-${carousel.scrollWidth / 2}px`, // Move left by half the content's width
        duration: 50, // Smooth scrolling duration
        ease: "none",
        repeat: -2, // Infinite scrolling
      });
    }
  }, []);

  return (
    <CarouselContainer>
      <Carousel ref={carouselRef}>
        {logos.map((logo, index) => (
          <Logo key={index}>
            <img src={logo} alt={`Logo ${index}`} />
          </Logo>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

// Styled Components
const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden; // Hide excess logos
  background: #ffffff;
  padding: 1rem 0;
`;

const Carousel = styled.div`
  display: flex;
  white-space: nowrap; // Prevent wrapping
`;

const Logo = styled.div`
  flex: none; // Prevent resizing
  margin-right: 1.5%; // Space between logos
  img {
    width: 80px; // Icon size
    height: 80px;
    object-fit: contain; // Maintain aspect ratio
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5)); // Add shadow effect
  }
`;

export default LogoCarousel;
