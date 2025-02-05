import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styled, { keyframes } from "styled-components";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
const Reports = () => {
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
      <Header handleLogout={handleLogout} />
      <div className="body">
        <div>
          <h3>No Reports to display</h3>
        </div>
      </div>
      <Footer handleLogout={handleLogout} />
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

export default Reports;

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
    display: flex;
    justify-content: center;
    align-items: center;
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
