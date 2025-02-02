import React from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

const HomePage = () => {
  return (
    <MiainContainer>
      <div>
        <Header />
      </div>
      <div className="body"></div>
    </MiainContainer>
  );
};

export default HomePage;

const MiainContainer = styled.div`
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
  }
  
`;
