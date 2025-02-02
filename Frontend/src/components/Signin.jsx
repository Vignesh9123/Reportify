import React from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signin = ({ setDisplay }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  };
  const handleSignInWithGoogle = () => {
    console.log("Sign in with Google");
  };
  return (
    <MainContainer>
      <div className="container-right">
        <div className="card">
          <a className="singup">Sign In</a>
          <form action="" onSubmit={handleSignIn} className="form">
            <div className="inputBox1">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <span className="user">Email</span>
            </div>

            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span>Password</span>
            </div>

            {/* <button className="enter" type="submit"> */}
            <Link to="/homepage" className="enter">Sign In</Link>
            {/* </button> */}
          </form>
          <div className="line"></div>
          <div className="google">
            <button
              className="enter"
              style={{ marginBottom: "20px", marginTop: "20px" }}
              onClick={handleSignInWithGoogle}
            >
              <FaGoogle /> Google
            </button>
          </div>
          <div className="signin-text">
            Don't have an account?{" "}
            <a
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => {
                setDisplay(true);
              }}
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Signin;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
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
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out,
      ${gradientAnimation} 10s infinite alternate ease-in-out;
  a{
    all: unset;
  }
  .singup {
    color: #000;
    text-transform: uppercase;
    letter-spacing: 2px;
    display: block;
    font-weight: bold;
    font-size: x-large;
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 350px;
    width: auto;
    height: auto;
    flex-direction: column;
    /* gap: 35px; */
    border-radius: 15px;
    background: #ababab;
    box-shadow: 2px 2px 10px gray;
    border-radius: 8px;
    padding: 20px 40px;
  }

  .inputBox,
  .inputBox1 {
    position: relative;
    width: 250px;
    margin-top: 35px;
  }

  .inputBox input,
  .inputBox1 input {
    width: 100%;
    padding: 10px;
    outline: none;
    border: none;
    color: #000;
    font-size: 1em;
    background: transparent;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
    transition: 0.1s;
    border-bottom-left-radius: 8px;
  }

  .inputBox span,
  .inputBox1 span {
    margin-top: 5px;
    position: absolute;
    left: 0;
    transform: translateY(-4px);
    margin-left: 10px;
    padding: 10px;
    pointer-events: none;
    font-size: 12px;
    color: #000;
    text-transform: uppercase;
    transition: 0.5s;
    letter-spacing: 3px;
    border-radius: 8px;
  }

  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    transform: translateX(113px) translateY(-15px);
    font-size: 0.8em;
    padding: 5px 10px;
    background: #000;
    letter-spacing: 0.2em;
    color: #fff;
    border: 2px;
  }

  .inputBox1 input:valid ~ span,
  .inputBox1 input:focus ~ span {
    transform: translateX(156px) translateY(-15px);
    font-size: 0.8em;
    padding: 5px 10px;
    background: #000;
    letter-spacing: 0.2em;
    color: #fff;
    border: 2px;
  }

  .inputBox input:valid,
  .inputBox input:focus,
  .inputBox1 input:valid,
  .inputBox1 input:focus {
    border: 2px solid #000;
    border-radius: 8px;
  }

  .enter {
    height: auto;
    padding: 8px 0;
    width: 100px;
    border-radius: 5px;
    border: 2px solid #000;
    cursor: pointer;
    background-color: transparent;
    transition: 0.5s;
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    margin-top: 35px;
    color: black;
  }

  .enter:hover {
    background-color: rgb(0, 0, 0);
    color: white;
  }
  .line {
    width: 130%;
    border: 1px solid gray;
    margin-top: 15px;
  }
  .signin-text {
    color: black;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
