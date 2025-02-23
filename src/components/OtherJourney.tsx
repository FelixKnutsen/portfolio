// OtherJourney.tsx

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons
import { FaShieldAlt, FaUsers } from "react-icons/fa";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const OtherJourney: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineRef.current) {
      const cards = timelineRef.current.querySelectorAll(".timeline-item");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }
  }, []);

  return (
    <JourneySection>
      <Title>Other Experiences</Title>
      <Timeline ref={timelineRef}>
        {OtherJourneyData.map((item, index) => (
          <TimelineItem key={index} className="timeline-item">
            <TimelineIcon>{item.icon}</TimelineIcon>
            <TimelineContent>
              <TimelineDate>{item.date}</TimelineDate>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </JourneySection>
  );
};

const OtherJourneyData = [
  {
    date: "2022-",
    title: "Closing Manager at Kiwi",
    description:
      "While studying, I worked as a closing manager at Kiwi, where I developed leadership, time management, and teamwork skills. Balancing work and education enhanced my adaptability and organizational abilities.",
    icon: <FaUsers />,
  },
  {
    date: "2024-2025",
    title: "NITO Students Board Member",
    description:
      "I actively contributed to student initiatives as a member of the NITO Students Board, gaining experience in organizational leadership and strategic planning.",
    icon: <FaUsers />,
  },
  {
    date: "2025-",
    title: "Leader of NITO Students",
    description:
      "I took on the role of Leader of NITO Students, where I'm currently learning to guide a team effectively, manage responsibilities, and inspire collaboration among members.",
    icon: <FaShieldAlt />,
  },
];

// Styled Components
const JourneySection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15%;
  min-height: 95vh;
  background: #0a001f;
  color: white;
  font-family: "Montserrat-Regular";

  @media (max-width: 768px) {
    padding: 0 5%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 3rem;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
`;

const Timeline = styled.div`
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

  @media (max-width: 768px) {
    padding-left: 1rem;

    &::before {
      left: 0;
    }
  }
`;

const TimelineItem = styled.div`
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

  @media (max-width: 768px) {
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const TimelineIcon = styled.div`
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

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
    left: -1rem;
    font-size: 1.2rem;
  }
`;

const TimelineContent = styled.div`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: white;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);

    @media (max-width: 768px) {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
`;

const TimelineDate = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #4facfe;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
`;

export default OtherJourney;
