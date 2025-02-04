import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = ({ handleLogout }) => {
  const location = useLocation();
  return (
    <MainContainer>
      <Link to="/homepage" className="logo"></Link>
      {location.pathname === "/homepage" ? (
        <div className="flex gap-2.5">
          <button className="button2" onClick={handleLogout}>
            Log Out
          </button>

          <Link to="/reports" className="button">
            <span className="button__icon-wrapper">
              <svg
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="button__icon-svg"
                width="10"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>

              <svg
                viewBox="0 0 14 15"
                fill="none"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
                className="button__icon-svg button__icon-svg--copy"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            My Reports
          </Link>
        </div>
      ) : (
        <div className="flex gap-2.5">
          <button className="button2" onClick={handleLogout}>
            Log Out
          </button>

          <Link to="/homepage" className="button">
            <span className="button__icon-wrapper">
              <svg
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="button__icon-svg"
                width="10"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>

              <svg
                viewBox="0 0 14 15"
                fill="none"
                width="10"
                xmlns="http://www.w3.org/2000/svg"
                className="button__icon-svg button__icon-svg--copy"
              >
                <path
                  d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            Home Page
          </Link>
        </div>
      )}
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
  height: 10vh;
  backdrop-filter: blur(10px);
  border: 1px solid black;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 15px;
  align-items: center;
  background-color: #000;
  animation: ${fadeIn} 0.5s ease-in-out,
    ${gradientAnimation} 10s infinite alternate ease-in-out;
  .logo {
    position: relative;
    background: url("Reportify-logo.png") no-repeat center/contain;
    min-width: 200px;
    height: 60px;
    animation: dp 0.4s linear;
    filter: drop-shadow(1px 1px 4px purple);
  }
  .button {
    line-height: 1;
    text-decoration: none;
    display: inline-flex;
    cursor: pointer;
    align-items: center;
    gap: 0.75rem;
    background-color: var(--clr);
    color: white;
    border: 2px solid #fff;
    border-radius: 10rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s;
  }

  .button__icon-wrapper {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    position: relative;
    color: var(--clr);
    background-color: #fff;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    color: black;
  }

  .button:hover {
    background-color: white;
    color: black;
  }

  .button:hover .button__icon-wrapper {
    color: white;
    background-color: #000;
  }

  .button__icon-svg--copy {
    position: absolute;
    transform: translate(-150%, 150%);
  }

  .button:hover .button__icon-svg:first-child {
    transition: transform 0.3s ease-in-out;
    transform: translate(150%, -150%);
  }

  .button:hover .button__icon-svg--copy {
    transition: transform 0.3s ease-in-out 0.1s;
    transform: translate(0);
  }
  .button2 {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    background-color: black;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 17px;
    cursor: pointer;
  }

  .icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease-in-out;
  }

  .button2:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }

  .button2:hover .icon {
    transform: translate(4px);
  }

  .button2:hover::before {
    animation: shine 1.5s ease-out infinite;
  }

  .button2::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(0, 0, 0, 0) 30%,
      rgba(239, 239, 239, 0.856),
      rgba(0, 0, 0, 0) 70%
    );

    top: 0;
    left: -100px;
    opacity: 0.6;
  }

  @keyframes shine {
    0% {
      left: -100px;
    }

    60% {
      left: 100%;
    }

    to {
      left: 100%;
    }
  }
`;
