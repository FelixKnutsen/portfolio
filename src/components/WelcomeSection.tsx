import React from "react";
import styled from "styled-components";
import TextAnimation from "./TextAnimation";
import Introanimated from "./IntroAnimation";

const WelcomeSection: React.FC = () => {
  return (
    <Hero>
      <Content>
        <TextAnimation />
        <Introanimated text="My name is Felix Fabricius Knutsen, a fullstack developer based in Kristiansand, Norway. I'm a 3rd-year bachelor student in Information Systems at the University of Agder. I’m passionate about development and business technology. My current goal is to increase my knowledge about backend development." />
      </Content>
      <ImageContainer>
        <LogoImage src="/assets/white_on_trans.png" alt="Felix Logo" />
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
`;

const ImageContainer = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column; // Stack elements vertically
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 80%; // Adjust size of the logo
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.6));
`;

const SocialLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem; // Add space between links
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
