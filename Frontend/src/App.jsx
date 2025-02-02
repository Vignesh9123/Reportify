import { useState } from "react";
import styled, { keyframes } from "styled-components";
import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function App() {
  const [display, setDisplay] = useState(true);
  const [text] = useTypewriter({
    words: [
      "Effortlessly generate AI-powered college reports for JSS STU students with just a title.",
      "Save time, enhance accuracy, and streamline your documentation process in seconds!",
      "Transform your ideas into well-structured reports instantly.",
      "Ensure clarity, professionalism, and efficiency all at your fingertips.",
      "Unlock the power of AI for smoother report generation.",
      "Spend less time writing and more time focusing on what matters.",
      "Get accurate and professional reports, instantly.",
      "Your ideas, transformed into polished documents, in seconds.",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 30,
  });
  return (
    <MainContainer>
      <div className="logo">
        <img src="Reportify-logo-full.png" alt="LOGO" width={350} />
      </div>
      <LeftContainer>
        <h1>Welcome to REPORTIFY</h1>
        <h3>An AI-driven Report Generator.</h3>
        <p>
          <span style={{ fontWeight: "bold", color: "white" }}>
            {text}
            <Cursor cursorColor="rgb(0, 255, 247)" />
          </span>
        </p>
      </LeftContainer>
      <RightContainer>
        {display ? (
          <Signup setDisplay={setDisplay} />
        ) : (
          <Signin setDisplay={setDisplay} />
        )}
      </RightContainer>
    </MainContainer>
  );
}

export default App;

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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #000, #1d1d1d, #828181);
  font-family: "Poppins", sans-serif;
  color: white;
  .logo {
    position: absolute;
    top: 5vh;
    right: 0;
    width: 60vw;
    animation: ${fadeIn} 1s ease-in-out,
      ${gradientAnimation} 10s infinite alternate ease-in-out;
  }
`;

const LeftContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #1e1e1e, #333, #4f4f4f);
  background-size: 200% 200%;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-in-out,
    ${gradientAnimation} 10s infinite alternate ease-in-out;

  & h1 {
    font-size: 2.5rem;
    text-transform: uppercase;
    background: linear-gradient(45deg, #f9f9ff, #00eaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${fadeIn} 1.5s ease-in-out;
  }

  & h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
    background: linear-gradient(45deg,  #00eaff,#f9f9ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${fadeIn} 1.5s ease-in-out;
  }

  & p {
    width: 60%;
    font-size: 1.2rem;
    color: #ddd;
    opacity: 0.9;
    animation: ${fadeIn} 2s ease-in-out;
  }
`;

const RightContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;
