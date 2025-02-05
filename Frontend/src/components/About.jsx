import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled, { keyframes } from "styled-components";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Footer from "./Footer";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) {
    return (
      <LoadingContainer className="bg-black">
        <Spinner />
        <p className="text-white">Loading...</p>
      </LoadingContainer>
    );
  }
  return (
    <MainContainer>
      <div>
        <Header handleLogout={handleLogout} />
      </div>
      <div className="body">
        <p>
          ▶️<b>Reportify </b>is a modern web-based reporting platform that
          simplifies the creation, management, and sharing of reports. Designed
          for efficiency, it enables users to generate professional reports with
          ease while ensuring data security and accessibility. <br />
          ▶️With a clean and intuitive UI, Reportify enhances user experience by
          allowing seamless navigation and quick access to reports. The platform
          features role-based access control, ensuring that only authorized
          users can view or edit specific reports. <br />
          ▶️Reportify is fully responsive, meaning it adapts to different screen
          sizes, including mobile, tablet, and desktop. Whether you're on the go
          or at your workstation, accessing reports is always convenient. <br />
          ▶️The platform also supports real-time updates, ensuring that users
          always work with the latest information. With the ability to export
          reports, share documents, and track progress, Reportify serves as a
          valuable tool for individuals and organizations alike. <br />
          ▶️By integrating cutting-edge technology and a focus on usability,
          Reportify aims to revolutionize the way reports are handled, making
          reporting faster, smarter, and more efficient.
        </p>
      </div>
      <div>
        <Footer handleLogout={handleLogout} />
      </div>
    </MainContainer>
  );
};

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

export default About;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(135deg, #141414, #383838, #585858);
  position: relative;
  justify-content: space-between;
  overflow: hidden;
  a {
    all: unset;
  }

  .body {
    display: flex;
    top: 10vh;
    position: relative;
    width: 60%;
    margin: 0 auto;
    text-align: justify;
    font-size: 24px;
    font-weight: 600;
    height: auto;
    color: white;
    & p {
      height: 90vh;
      overflow-y: auto;
    }
  }
  ::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.227);
  }

  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    background-color: rgba(0, 234, 255, 0.6);
  }

  @media (max-width: 1024px) {
    .body {
      width: 90%;
    }
  }
  @media (max-width: 500px) {
    .body {
      width: 98%;
      & p {
        font-weight: 700;
        height: 90vh;
        overflow-y: auto;
        color: white;
        margin: 20px 0 12vh 0;
      }
    }
  }
  @media (max-height:570px){
    .body{
      padding: 0 0 15vh 0;
    }
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #000;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
