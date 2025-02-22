// StyledComponents.ts

import styled from "styled-components";

export const JourneySection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15%;
  background: #0a001f;
  color: white;
  font-family: "Montserrat-Regular";
`;

export const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  width: 100%;
  padding-left: 2rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #4facfe, #00f2fe);
  }
`;

export const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

export const TimelineIcon = styled.div`
  position: absolute;
  left: -1.5rem;
  top: -1rem;
  width: 3rem;
  height: 3rem;
  background: #0a001f;
  border: 2px solid #4facfe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #4facfe;
`;

export const TimelineContent = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: white;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const TimelineDate = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4facfe;
`;
