// Footer.tsx

import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <>
      <FooterContainer>
        <FooterContent>
          <p>
            &copy; 2025{" "}
            <a href="https://felixknutsen.vercel.app/">
              FelixKnutsen.vercel.app
            </a>
          </p>
        </FooterContent>
        <SocialLinks>
          <a
            href="https://github.com/FelixKnutsen"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/felix-knutsen/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </SocialLinks>
      </FooterContainer>
    </>
  );
};

export default Footer;

// Styled Components
const FooterContainer = styled.footer`
  height: 150px;
  background: #0a001f;
  display: flex;
  justify-content: space-between; /* Align content to edges */
  align-items: center;
  padding: 0 20%; /* Add padding for space */
  color: white;
  font-family: "Montserrat-Regular";

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto; /* Allow height to adjust based on content */
    padding: 20px 5%; /* Reduce horizontal padding */
    text-align: center; /* Center text content */
  }
`;

const FooterContent = styled.div`
  p {
    margin: 0;
    font-size: 1rem;

    a {
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 768px) {
    order: 2; /* Place FooterContent after SocialLinks */
    margin-top: 20px; /* Space between icons and text */
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px; /* Space between icons */

  a {
    color: white;
    font-size: 2rem; /* Icon size */
    text-decoration: none;

    &:hover {
      color: #00aaff; /* Hover effect for icons */
    }
  }

  @media (max-width: 768px) {
    order: 1; /* Place SocialLinks before FooterContent */
    justify-content: center; /* Center the icons */
  }
`;
