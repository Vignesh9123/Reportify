import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled, { keyframes } from "styled-components";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Footer from "./Footer";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const About = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        const signOutPromise = axios
          .get("http://localhost:8000/api/auth/logout", {
            withCredentials: true,
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
          .then(() => {
            localStorage.removeItem("token");
            navigate("/");
          });
        toast.promise(signOutPromise, {
          pending: "Signing out...",
          success: "Signed out successfully!",
          error: "Failed to sign out. Please try again.",
        });
      })
      .catch((error) => {
        if (error.status === 429) {
          toast.error("Too Many Requests - please try again later");
          navigate("/");
        }
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
        <div className="left flex flex-col text-white text-center justify-center items-center space-y-6 p-8">
          <h2 className="text-4xl font-bold text-cyan-400">About Us</h2>
          <p className="text-lg text-gray-300 max-w-2xl">
            Welcome to{" "}
            <span className="text-cyan-300 font-semibold">REPORTIFY</span>, your
            AI-powered solution for effortless and professional report
            generation. Designed specifically for JSS STU students, our platform
            simplifies documentation for students and educators, ensuring time
            efficiency, accuracy, and structured formatting. Transform your
            ideas into well-organized reports instantly and focus on what truly
            matters.
          </p>
          <div className="boxes flex space-x-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
              <h3 className="text-xl font-semibold text-cyan-300">
                AI-Powered
              </h3>
              <p className="text-gray-400">
                Generate structured reports with AI in seconds.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
              <h3 className="text-xl font-semibold text-cyan-300">
                Accuracy & Clarity
              </h3>
              <p className="text-gray-400">
                Ensure professional & polished reports every time.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer">
              <h3 className="text-xl font-semibold text-cyan-300">
                Effortless Workflow
              </h3>
              <p className="text-gray-400">
                Streamline your reporting process with automation.
              </p>
            </div>
            <div className="bg-gray-800 p-0 rounded-lg shadow-lg hover:scale-105 transition cursor-pointer"></div>
          </div>
        </div>

        <div className="right"></div>
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
    transform: translateY(20px);
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
    width: 100vw;
    height: 80vh;
    position: absolute;
    top: 10vh;
    display: flex;
    animation: ${fadeIn} 0.5s ease-in-out,
      ${gradientAnimation} 10s infinite alternate ease-in-out;
    @media (max-width: 1024px) {
      flex-direction: column-reverse;
    }
  }
  .body .left {
    width: 60vw;
    height: 79vh;
    .boxes {
      position: relative;
      left: 15px;
    }
    position: relative;
    @media (max-width: 1024px) {
      width: 100vw;
    }
    @media (max-width: 665px) {
      overflow: auto;
      height: 100vh;
      padding-top: 10vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .boxes {
        flex-direction: column;
        gap: 20px;
      }
    }
    @media (max-width: 390px) {
      padding-top: 16vh;
      .boxes {
        flex-direction: column;
        gap: 20px;
      }
    }
    @media (max-height: 910px) and (max-width: 665px) {
      padding-top: 20vh;
    }
    @media (max-height: 852px) and (max-width: 665px) {
      padding-top: 27vh;
    }
    @media (max-height: 796px) and (max-width: 665px) {
      padding-top: 40vh;
    }
    @media (max-height: 700px) and (max-width: 665px) {
      padding-top: 48vh;
    }
  }
  .body .right {
    width: 40vw;
    height: 79vh;
    position: relative;
    right: 0;
    background: url("AI.png") no-repeat bottom right/contain;
    @media (max-width: 1024px) {
      width: 100vw;
      height: 0;
      background: none;
    }
    @media (max-width: 665px) {
      height: 0;
      background: none;
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
