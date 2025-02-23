// Experience.tsx

import React from "react";
import styled from "styled-components";

const Experience: React.FC = () => {
  return (
    <>
      <ExperienceSection>
        <Content>
          <Title>My Projects</Title>
          <Subtitle>A collection of my work and experiences:</Subtitle>
          <p>Coming soon</p>
        </Content>
      </ExperienceSection>
      <Arc />
      <Box />
    </>
  );
};

export default Experience;

// Styled Components
const ExperienceSection = styled.section`
  padding: 10% 0 0 0;
  align-items: center;
  min-height: 100vh;
  background: #ffffff;
  font-family: "Montserrat-Regular";
  color: black;

  @media (max-width: 768px) {
    padding: 5% 0 0 0;
  }
`;

const Content = styled.div`
  width: 100%;
  background: #ffffff;
  justify-content: center;
  text-align: center;

  p {
    font-size: 1.2rem;
    line-height: 1.8;
    max-width: 100%;
    margin-top: 2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.6;
      margin-top: 1rem;
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const Box = styled.div`
  position: relative;
  height: 150px;
  background: #0a001f; /* Background color of the box */
`;

const Arc = styled.div`
  position: relative;
  top: 150px;
  height: 150px;
  background: white;
  clip-path: ellipse(60% 70% at 50% 0);
  z-index: 1;

  @media (max-width: 768px) {
    height: 150px; /* Adjust the height for mobile view */
    clip-path: ellipse(80% 20% at 50% 0); /* Make the ellipse flatter */
  }
`;
