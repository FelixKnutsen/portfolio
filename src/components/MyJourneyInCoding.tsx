// MyJourneyInCoding.tsx

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icons
import {
  FaHtml5,
  FaJs,
  FaUniversity,
  FaCode,
  FaPython,
  FaShieldAlt,
  FaJava,
  FaNetworkWired,
} from "react-icons/fa";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const MyJourneyInCoding: React.FC = () => {
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
      <Title>My Journey in Coding</Title>
      <Timeline ref={timelineRef}>
        {timelineData.map((item, index) => (
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

const timelineData = [
  {
    date: "2018",
    title: "Started Learning HTML, CSS, and JavaScript",
    description:
      "I began my coding journey by exploring the basics of web development, including HTML, CSS, and JavaScript. This experience ignited my passion for creating interactive and dynamic web applications.",
    icon: <FaHtml5 />,
  },
  {
    date: "2019",
    title: "Explored ActionScript",
    description:
      "I learned ActionScript, which introduced me to object-oriented programming and event-driven development. This foundational knowledge helped me understand essential coding principles.",
    icon: <FaCode />,
  },
  {
    date: "2020 - 2022",
    title: "Web Development Projects",
    description:
      "I engaged in personal web development projects, experimenting with various designs and functionalities. These projects were not published but significantly enhanced my problem-solving and creative thinking abilities.",
    icon: <FaJs />,
  },
  {
    date: "2022-2025",
    title: "Bachelor's in IT and Information Systems",
    description:
      "I started my academic journey at the University of Agder, where I received formal training in HTML, CSS, JavaScript, and UX design. This deepened my understanding of web development and user-centered design.",
    icon: <FaUniversity />,
  },
  {
    date: "2023",
    title: "Learning Golang",
    description:
      "I expanded my knowledge by learning Golang, focusing on networking, information security, and system architecture. This experience broadened my perspective on backend development and secure systems.",
    icon: <FaNetworkWired />,
  },
  {
    date: "2023",
    title: ".NET, C#, and Database Development",
    description:
      "I learned .NET, C#, and database management, along with systems analysis and development. During this time, I worked on a prototype for 'Nøsted &', creating a web application for employee progress tracking and information management.",
    icon: <FaCode />,
  },
  {
    date: "2023",
    title: "Learning Java and OOP",
    description:
      "I delved into Java programming, with a focus on object-oriented programming concepts, which strengthened my understanding of modular and maintainable code design.",
    icon: <FaJava />,
  },
  {
    date: "2024",
    title: "Python and Information Security",
    description:
      "I learned Python and studied information security principles. I also explored algorithms, applying theoretical knowledge by developing Python-based solutions.",
    icon: <FaPython />,
  },
  {
    date: "2024",
    title: "Internship at Phonero",
    description:
      "I gained industry experience during my internship at Phonero, working with GraphQL, React, and TypeScript. This role provided insight into professional development workflows and team collaboration.",
    icon: <FaCode />,
  },
  {
    date: "2025-",
    title: "Bachelor Thesis with Phonero",
    description:
      "I chose to write my bachelor thesis in collaboration with Phonero, integrating my academic learnings with real-world challenges, which significantly enhanced my research and problem-solving skills.",
    icon: <FaShieldAlt />,
  },
];

const JourneySection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15%;
  min-height: 100vh;
  background: #0a001f;
  color: white;
  position: relative;
  overflow: hidden;
  font-family: "Montserrat-Regular";

  @media (max-width: 768px) {
    padding: 0 5%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 1rem;

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

export default MyJourneyInCoding;
