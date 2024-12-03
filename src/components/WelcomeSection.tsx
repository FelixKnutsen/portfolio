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
    </Hero>
  );
};

// Styled Components
const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  min-height: 100vh;
  background: #0a001f;
  color: white;
  position: relative;
  overflow: hidden;

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
  max-width: 33%;
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

export default WelcomeSection;
