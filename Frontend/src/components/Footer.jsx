import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <MainContainer>
      <div className="left text-gray-500">
        All Rights Reserved &copy; 2025 Reportify
      </div>
      <div className="right">
        <ul className="ul flex gap-8 ">
          <li className="cursor-pointer">
            <Link to="/team" className="">
              Our Team
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/team" className="">
              About
            </Link>
          </li>
          <li className="cursor-pointer">
            <a href="Crypto.docx">Sample Report</a>
          </li>
        </ul>
      </div>
    </MainContainer>
  );
};

export default Header;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const MainContainer = styled.div`
  width: 100vw;
  height: 7vh;
  position: absolute;
  bottom: 0;
  backdrop-filter: blur(10px);
  border: 1px solid black;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  align-items: center;
  background-color: #000;
  animation: ${fadeIn} 0.5s ease-in-out,
    ${gradientAnimation} 10s infinite alternate ease-in-out;
  color: white;

  .ul li:hover {
    text-decoration: underline;
  }

  @media (max-width: 610px) {
    .ul {
      gap: 15px;
    }
  }
  @media (max-width: 550px) {
    height: 10vh;
    flex-direction: column;
    gap: 10px;
    justify-content: space-evenly;
    .ul {
      font-size: 14px;
      gap: 20px;
    }
  }
  @media (max-width: 303px) {
    height: 13vh;
    position: absolute;
    bottom: -10px;
    .left{
      font-size: 14px;
    }
    .ul {
      gap: 15px;
    }
  }
`;
