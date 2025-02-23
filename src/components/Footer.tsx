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
  padding: 0 20%; /* Add padding for space */
  padding-top: 1%;
  color: white;
  font-family: "Montserrat-Regular";
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
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px; /* Space between icons */

  a {
    color: white;
    font-size: 2rem; /* Larger icon size */
    text-decoration: none;

    &:hover {
      color: #00aaff; /* Hover effect for icons */
    }
  }
`;
