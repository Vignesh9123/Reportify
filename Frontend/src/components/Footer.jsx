import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const Header = ({ handleLogout }) => {
  return (
    <MainFooterContainer>
      <div className="left text-gray-500">
        All Rights Reserved &copy; 2025 Reportify
      </div>
      <div className="right">
        <ul className="ul flex gap-8">
          <li className="cursor-pointer">
            <Link to="/team">Our Team</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer">
            <a href="AI in Automobile Industry.docx" download>
              Sample Report
            </a>
          </li>
          <li className="cursor-pointer logout" onClick={handleLogout}>
            <a className="text-red-400 px-1 py-0.5 rounded-2xl">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </MainFooterContainer>
  );
};

export default Header;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const MainFooterContainer = styled.div`
  width: 100%;
  height: 7vh;
  bottom: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-top: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: #000;
  animation: ${fadeIn} 0.5s ease-in-out;
  color: white;
  border-radius: 10px 10px 0 0;
  margin-top: auto;
  height: 10vh;
  .logout {
    display: none;
  }
  .ul li:hover {
    text-decoration: underline;
  }

  @media (max-width: 610px) {
    .ul {
      gap: 15px;
    }
  }
  @media (max-width: 584px) {
    .logout {
      display: block;
    }
  }
  @media (max-width: 550px) {
    height: 10vh;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    .ul {
      font-size: 14px;
      gap: 15px;
    }
  }

  @media (max-width: 303px) {
    height: 13vh;
    .left {
      font-size: 12px;
    }
    .ul {
      font-size: 12px;
      gap: 10px;
    }
  }
`;
