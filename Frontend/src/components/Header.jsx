import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <MainContainer>
      <Link to="/" className="logo"></Link>
      {location.pathname === "/homepage" ? (
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
      ) : (
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
          Back
        </Link>
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
`;
