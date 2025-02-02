import React from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const HomePage = () => {
  return (
    <MainContainer>
      <div>
        <Header />
      </div>
      <div className="body">
        <div className="card">
          
        </div>
      </div>
    </MainContainer>
  );
};

export default HomePage;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .body {
    position: relative;
    height: 90vh;
    width: 100vw;
    background: linear-gradient(135deg, #2c2c2c, #6f6f6f, #828181);
    border-radius: 10px 10px 0 0;
    animation: ${fadeIn} 1s ease-in-out,
      ${gradientAnimation} 10s infinite alternate ease-in-out;
  }
`;
