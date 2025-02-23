// WelcomeSection.tsx

import React from "react";
import styled from "styled-components";
import TextAnimation from "./TextAnimation";
import Introanimated from "./IntroAnimation";

const WelcomeSection: React.FC = () => {
  return (
    <Hero>
      <ImageContainer>
        <LogoImage src="assets/white_on_trans.png" alt="Felix Logo" />
        {/* Social links for desktop view */}
        <SocialLinks className="desktop-only">
          <SocialLink
            href="https://github.com/FelixKnutsen"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/felix-knutsen"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </SocialLink>
        </SocialLinks>
      </ImageContainer>
      <Content>
        <TextAnimation />
        <Introanimated text="My name is Felix Fabricius Knutsen, an aspiring full-stack developer based in Kristiansand. I am a 3rd-year bachelor student in Information Systems at the University of Agder. I am passionate about development and business technology." />
        {/* Social links for mobile view */}
        <SocialLinks className="mobile-only">
          <SocialLink
            href="https://github.com/FelixKnutsen"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </SocialLink>
          <SocialLink
            href="https://linkedin.com/in/felix-knutsen"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </SocialLink>
        </SocialLinks>
      </Content>
    </Hero>
  );
};

// Styled Components
const Hero = styled.section`
  display: flex;
  flex-direction: row-reverse; /* Swap the positions in desktop view */
  justify-content: space-between;
  align-items: center;
  padding: 0 15%;
  min-height: 100vh;
  background: #0a001f;
  color: white;
  position: relative;
  font-family: "Montserrat-Regular";
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 150px;
    background: white;
    clip-path: ellipse(60% 70% at 50% 100%);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5%;
    padding-bottom: 50px;

    /* Adjust the ellipse in mobile view */
    &::after {
      height: 100px; /* Reduce the height */
      clip-path: ellipse(80% 40% at 50% 100%);
    }
  }
`;

const Content = styled.div`
  max-width: 45%;

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    max-width: 500px;
    margin-top: 2rem;

    @media (max-width: 768px) {
      margin-top: 1rem;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 2rem;
    order: 2; /* Content comes after ImageContainer */
    text-align: center;
  }
`;

const ImageContainer = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column; // Stack elements vertically
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 100%;
    order: 1; /* ImageContainer comes first */
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 80%; // Adjust size of the logo
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.6));

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SocialLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem; // Add space between links

  /* Base display settings */
  &.desktop-only {
    display: flex;
  }

  &.mobile-only {
    display: none;
  }

  /* Adjust display based on screen size */
  @media (max-width: 768px) {
    /* Hide desktop social links */
    &.desktop-only {
      display: none;
    }

    /* Show mobile social links */
    &.mobile-only {
      display: flex;
      justify-content: center;
      margin-top: -3rem;
      margin-bottom: 1rem;
    }
  }
`;

const SocialLink = styled.a`
  font-size: 1.2rem;
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #0a001f;
  }
`;

export default WelcomeSection;
