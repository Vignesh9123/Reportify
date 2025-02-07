import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FaLocationArrow } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { apiClient } from ".";

const provider = new GoogleAuthProvider();
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

function App() {
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
  const navigate = useNavigate();

  useEffect(() => {
    toast.info("Welcome! Please click 'Get Started' to log in with Google.", {
      position: "bottom-left",
      autoClose: 3000,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in user: ", user);
      const userData = {
        name: user.displayName,
        email: user.email,
      };
      const signInPromise = axios.post("https://reportify-backend.vercel.app/api/auth/google-login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(()=>{
        navigate("/homepage");
        console.log("Login Response:", response.data);
      })

      toast.promise(signInPromise, {
        pending: "Signing in...",
        success: "Signed in successfully!",
        error: "Failed to sign in. Please try again.",
      })
      console.log("Login Response:", response.data);
      navigate("/homepage");
    } catch (error) {
      console.error("Error during Google Sign-in: ", error);
    }
  };
  return (
    <MainContainer>
      <LeftContainer>
        <div className="logo">
          <img src="Reportify-logo-full.png" alt="LOGO" width={300} />
        </div>
        <div>
          <h1>Welcome to REPORTIFY</h1>
          <h3>An AI-driven Report Generator.</h3>
          <p>
            <span style={{ fontWeight: "bold", color: "white" }}>
              {text}
              <Cursor cursorColor="rgb(0, 255, 247)" />
            </span>
          </p>
        </div>
        <div className="button">
          <div className="border-line top-line"></div>
          <div className="border-line bottom-line"></div>
          <div className="border-line left-line"></div>
          <div className="border-line right-line"></div>
          <div className="inner1" onClick={handleGoogleSignIn}>
            Get Started
            <div className="tl tri"></div>
            <div className="tr tri"></div>
            <div className="bl tri"></div>
            <div className="br tri"></div>
          </div>
          <div className="tl tri"></div>
          <div className="tr tri"></div>
          <div className="bl tri"></div>
          <div className="br tri"></div>
          <div className="dot dl"></div>
          <div className="dot dr"></div>
        </div>
      </LeftContainer>
      <ToastContainer />
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
  height: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #414141, #000000, #4b4b4b);
  font-family: "Poppins", sans-serif;
  color: white;

  .logo {
    top: 5vh;
    width: 60vw;
    animation: ${fadeIn} 1s ease-in-out,
      ${gradientAnimation} 10s infinite alternate ease-in-out;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeftContainer = styled.div`
  width: 60%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  background-size: 200% 200%;
  border-radius: 15px;
  position: relative;
  animation: ${fadeIn} 1s ease-in-out,
    ${gradientAnimation} 10s infinite alternate ease-in-out;

  & h1 {
    font-size: 2.5rem;
    text-transform: uppercase;
    background: linear-gradient(45deg, #f9f9ff, #00eaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 600;
    animation: ${fadeIn} 1.5s ease-in-out;
  }

  & h3 {
    font-size: 1.5rem;
    text-transform: uppercase;
    background: linear-gradient(135deg, #00b7ffc1, #fcfcfc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${fadeIn} 1.5s ease-in-out;
  }

  & p {
    font-size: 1.2rem;
    color: #ddd;
    opacity: 0.9;
    animation: ${fadeIn} 2s ease-in-out;
  }

  .button {
    background: radial-gradient(circle 80px at 50% 50%, #214d58, #0a1f24);
    color: #8cd1fa;
    padding: 8px;
    border-radius: 6px;
    position: relative;
    cursor: pointer;
  }
  .border-line {
    background-color: #8cd1fa;
    width: 0px;
    height: 1px;
    position: absolute;
    box-shadow: 0 0 10px #33a3be;
    border-radius: 10px;
    transition: all 0.4s ease;
  }
  .top-line {
    top: 0;
  }
  .bottom-line {
    bottom: 0;
    right: 0;
  }
  .right-line {
    right: 0;
    top: 12px;
    width: 1px;
    height: 0px;
  }
  .left-line {
    left: 0;
    bottom: 12px;
    width: 1px;
    height: 0px;
  }
  .button:hover > .top-line {
    width: 160px;
  }
  .button:hover > .left-line {
    height: 35px;
  }
  .button:hover > .right-line {
    height: 35px;
  }
  .button:hover > .bottom-line {
    width: 160px;
  }
  .button:hover > .dot {
    background-color: #5edaff;
    box-shadow: 0 0 5px;
  }

  .inner1 {
    background-color: #142c2b;
    padding: 7px 26px;
    position: relative;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 2px;
    border: solid 1px;
    transition: all 0.4s ease;
    cursor: pointer;
    border-radius: 9px;
  }
  .inner1:hover {
    text-shadow: 0 0 4px #4fb8ff;
    box-shadow: inset 0px 0px 6px #5edaff;
  }
  .tri {
    position: absolute;
    width: 0;
    height: 0;
  }
  .tl {
    border-top: 9px solid #0a1f24;
    border-right: 9px solid transparent;
    top: -1px;
    left: -1px;
  }
  .tr {
    border-top: 9px solid #0a1f24;
    border-left: 9px solid transparent;
    top: -1px;
    right: -1px;
  }
  .bl {
    border-bottom: 9px solid #0a1f24;
    border-right: 9px solid transparent;
    bottom: -1px;
    left: -1px;
  }
  .br {
    border-bottom: 9px solid #0a1f24;
    border-left: 9px solid transparent;
    bottom: -1px;
    right: -1px;
  }
  .button > .tl {
    border-top: 13px solid #000;
    border-right: 13px solid transparent;
    top: -1px;
    left: -1px;
  }
  .button > .bl {
    border-bottom: 13px solid #000000;
    border-right: 13px solid transparent;
    bottom: -1px;
    left: -1px;
  }
  .button > .br {
    border-bottom: 13px solid #000;
    border-left: 13px solid transparent;
    bottom: -1px;
    right: -1px;
  }
  .button > .tr {
    border-top: 13px solid #000;
    border-left: 13px solid transparent;
    top: -1px;
    right: -1px;
  }

  .dot {
    width: 2px;
    height: 10px;
    position: absolute;
    background-color: #244e4d;
    border-radius: 990px;
    box-shadow: 0 0 4px #000;
  }
  .dl {
    left: 12%;
    top: 43%;
  }
  .dr {
    right: 12%;
    top: 43%;
  }

  @media (max-width: 1024px) {
    width: 90%;
    margin-left: 0px;
    height: 20vh;
  }

  @media (max-width: 420px) {
    .logo {
      top: 3vh;
      width: 68vw;
      animation: ${fadeIn} 1s ease-in-out,
        ${gradientAnimation} 10s infinite alternate ease-in-out;
      display: flex;
      justify-content: center;
    }
  }
  @media (max-width: 320px) {
    h1 {
      font-size: 35px;
    }
    h3 {
      font-size: 20px;
    }
  }
`;
