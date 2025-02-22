import React from "react";
import { Link } from "react-router-dom"; // Use React Router for navigation
import styled from "styled-components";

const NavBar: React.FC = () => {
  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/journey">My Journey</NavLink>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background: rgb(15, 1, 46);
  position: sticky;
  top: 0;
  z-index: 1000;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.7)); // Add shadow effect
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #00aaff;
  }
`;

export default NavBar;
