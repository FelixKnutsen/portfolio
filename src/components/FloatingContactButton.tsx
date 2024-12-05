import React, { useState } from "react";
import styled from "styled-components";
import { FaEnvelope } from "react-icons/fa";

const FloatingContactButton: React.FC = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button>
        <FaEnvelope />
      </Button>
      <Dropdown isVisible={isDropdownVisible}>
        <DropdownItem>
          <span>Email:</span> felix.knutsen@gmail.com
        </DropdownItem>
        <DropdownItem>
          <span>Phone:</span> +47 90 40 66 10
        </DropdownItem>
        <DropdownItem>
          <a href="mailto:felix.knutsen@example.com">Send Email</a>
        </DropdownItem>
      </Dropdown>
    </Container>
  );
};

export default FloatingContactButton;

// Styled Components
const Container = styled.div`
  position: fixed;
  bottom: 1%; /* Adjust to place higher or lower */
  right: 10px; /* Positioned closer to the right */
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align dropdown closer to the button */
  z-index: 1000;
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  background: #00aaff;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #007acc;
  }
`;

const Dropdown = styled.div<{ isVisible: boolean }>`
  margin-top: 10px;
  background: #ffffff;
  color: #000000;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(-10px)"};
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the right */
  padding: 10px;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid #eeeeee;
  font-size: 1rem;
  text-align: left;
  width: 100%; /* Ensure full width for alignment */

  &:last-child {
    border-bottom: none;
  }

  span {
    font-weight: bold;
    margin-right: 10px;
  }

  a {
    color: #007acc;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
