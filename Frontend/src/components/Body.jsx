/* eslint-disable*/
import React, { useState } from "react";
import styled from "styled-components";
import Register from "./Register";
import Signin from "./Signin";

constBody = () => {
  const displayForm = () => {
    if (display === 0) {
      return <Register/>;
    } else if (display === 1) {
      return <Signin/>;
    }
  };

  return (
    <MainContainer>
      
    </MainContainer>
  );
};

export default Body;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;