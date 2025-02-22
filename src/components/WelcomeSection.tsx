import React from "react";
import styled from "styled-components";
import TextAnimation from "./TextAnimation";
import Introanimated from "./IntroAnimation";

const WelcomeSection: React.FC = () => {
  return (
    <Hero>
      <ImageContainer>
        <LogoImage src="assets/white_on_trans.png" alt="Felix Logo" />
        <SocialLinks>
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
        <Introanimated text="My name is Felix Fabricius Knutsen, an inspiring full-stack developer based in Kristiansand. I am a 3rd-year bachelor student in Information Systems at the University of Agder. I am passionate about development and business technology." />
      </Content>
    </Hero>
  );
};

// Styled Components
const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15%;
  min-height: 100vh;
  background: #0a001f;
  color: white;
  position: relative;
  overflow: hidden;
  font-family: "Montserrat-Regular";

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 150px;
    background: white;
    clip-path: ellipse(60% 70% at 50% 100%);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5%;
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
    margin-top: 2rem;
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
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem; // Add space between links

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
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
