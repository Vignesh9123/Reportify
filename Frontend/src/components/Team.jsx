import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled, { keyframes } from "styled-components";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Footer from "./Footer";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Team = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        const signOutPromise = axios.get(
          "https://reportify-backend.vercel.app/api/auth/logout",
          {
            withCredentials: true,
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          
          }
        ).then(() => {
          localStorage.removeItem("token");
          navigate("/");
        })
        toast.promise(signOutPromise, {
          pending: "Signing out...",
          success: "Signed out successfully!",
          error: "Failed to sign out. Please try again.",
        });
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
        <div className="card">
          <div className="top-section">
            <div className="border"></div>
            <div className="icons">
              <div className="logo text-white flex justify-center items-center font-bold">
                Backend
              </div>
            </div>
          </div>
          <div className="bottom-section">
            <p className="font-bold text-blue-300 text-2xl text-center">
              VIGNESH D
            </p>
            <p className="text-white text-sm text-center">Student @ SJCE 26'</p>
            <div className="row row1">
              <div className="item flex justify-center items-center cursor-pointer">
                <a href="https://github.com/Vignesh9123" target="_blank">
                  <FaGithub className="text-4xl  duration-100 hover:text-black hover:scale-130" />
                </a>
              </div>
              <div className="item flex justify-center items-center cursor-pointer">
                <a
                  href="https://www.linkedin.com/in/vignesh-d-mys/"
                  target="_blank"
                >
                  <FaLinkedin className="text-4xl duration-100 hover:text-blue-500 hover:scale-130" />
                </a>
              </div>
              <div className="item flex justify-center items-center cursor-pointer">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=vignesh.d9123@gmail.com"
                  target="_blank"
                >
                  <SiGmail className="text-4xl duration-100 hover:text-red-500 hover:scale-130" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="top-section">
            <div className="border"></div>
            <div className="icons">
              <div className="logo text-white flex justify-center items-center font-bold">
                Frontend
              </div>
            </div>
          </div>
          <div className="bottom-section">
            <p className="font-bold text-blue-300 text-2xl text-center">
              SURAJ S G DHANVA
            </p>
            <p className="text-white text-sm text-center">Student @ SJCE 26'</p>
            <div className="row row1">
              <div className="item flex justify-center items-center cursor-pointer">
                <a href="https://github.com/SurajSG23" target="_blank">
                  <FaGithub className="text-4xl  duration-100 hover:text-black hover:scale-130" />
                </a>
              </div>
              <div className="item flex justify-center items-center cursor-pointer">
                <a
                  href="https://www.linkedin.com/in/suraj-s-g-dhanva-995a23298/"
                  target="_blank"
                >
                  <FaLinkedin className="text-4xl duration-100 hover:text-blue-500 hover:scale-130" />
                </a>
              </div>
              <div className="item flex justify-center items-center cursor-pointer">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=surajsgd23@gmail.com"
                  target="_blank"
                >
                  <SiGmail className="text-4xl duration-100 hover:text-red-500 hover:scale-130" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer handleLogout={handleLogout}/>
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

export default Team;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
  background: linear-gradient(135deg, #2c2c2c, #6f6f6f, #828181);
  position: relative;
  justify-content: space-between;
  overflow: hidden;
  a {
    all: unset;
  }
  .body {
    position: relative;
    height: 90vh;
    width: 100vw;
    background: linear-gradient(135deg, #2c2c2c, #6f6f6f, #828181);
    border-radius: 10px 10px 0 0;
    animation: ${fadeIn} 1s ease-in-out,
      ${gradientAnimation} 10s infinite alternate ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10vw;
  }

  .card {
    width: 250px;
    border-radius: 20px;
    background: #3b3b3b;
    padding: 5px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 20px 0px;
    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card:nth-child(1) .top-section {
    height: 200px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background: url("vig.png") no-repeat center/cover;
    position: relative;
  }
  .card:nth-child(2) .top-section {
    height: 200px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    background: url("suraj.png") no-repeat center/cover;
    position: relative;
  }

  .card .top-section .border {
    border-bottom-right-radius: 10px;
    height: 30px;
    width: 130px;
    background: #3b3b3b;
    position: relative;
    transform: skew(-40deg);
    box-shadow: -10px -10px 0 0 #3b3b3b;
  }

  .card .top-section .border::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    top: 0;
    right: -15px;
    background: rgba(255, 255, 255, 0);
    border-top-left-radius: 10px;
    box-shadow: -5px -5px 0 2px #3b3b3b;
  }

  .card .top-section::before {
    content: "";
    position: absolute;
    top: 30px;
    left: 0;
    background: rgba(255, 255, 255, 0);
    height: 15px;
    width: 15px;
    border-top-left-radius: 15px;
    box-shadow: -5px -5px 0 2px #3b3b3b;
  }

  .card .top-section .icons {
    position: absolute;
    top: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
  }

  .card .top-section .icons .logo {
    height: 100%;
    aspect-ratio: 1;
    padding: 7px 0 7px 15px;
  }

  .card .top-section .icons .logo .top-section {
    height: 100%;
  }

  .card .top-section .icons .social-media {
    height: 100%;
    padding: 8px 15px;
    display: flex;
    gap: 7px;
  }

  .card .top-section .icons .social-media .svg {
    height: 100%;
    fill: #1b233d;
  }

  .card .top-section .icons .social-media .svg:hover {
    fill: white;
  }

  .card .bottom-section {
    margin-top: 15px;
    padding: 10px 5px;
  }

  .card .bottom-section .title {
    display: block;
    font-size: 17px;
    font-weight: bolder;
    color: white;
    text-align: center;
    letter-spacing: 2px;
  }

  .card .bottom-section .row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .card .bottom-section .row .item {
    flex: 30%;
    text-align: center;
    padding: 5px;
    color: #fff;
  }

  .card .bottom-section .row .item .big-text {
    font-size: 12px;
    display: block;
  }

  .card .bottom-section .row .item .regular-text {
    font-size: 9px;
  }

  .card .bottom-section .row .item:nth-child(2) {
    border-left: 1px solid rgba(255, 255, 255, 0.126);
    border-right: 1px solid rgba(255, 255, 255, 0.126);
  }

  @media (max-width: 556px) {
    .body {
      position: relative;
      min-height: 110vh;
      width: 100vw;
      background: linear-gradient(135deg, #2c2c2c, #6f6f6f, #828181);
      border-radius: 10px 10px 0 0;
      animation: ${fadeIn} 1s ease-in-out,
        ${gradientAnimation} 10s infinite alternate ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: nowrap;
      margin-top: 10vh;
      gap: 10vw;
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
