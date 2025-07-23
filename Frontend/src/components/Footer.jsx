/* eslint-disable */
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <MainFooterContainer>
        <div className="w-full border-1 absolute left-0 top-0 border-gray-600"></div>
        <div className="left text-gray-500">
          <p className="text-xl">
            &copy; {new Date().getFullYear()} Reportify. All rights reserved.
          </p>
        </div>
        <div className="right">
          <ul className="ul flex gap-8">
            <li className="cursor-pointer">
              <Link to="/team">Contact Us</Link>
            </li>
            <li className="cursor-pointer">
              <Link to="/about">About</Link>
            </li>
            <li className="cursor-pointer">
              <a href="AI in Automobile Industry.docx" download>
                Sample Report
              </a>
            </li>
          </ul>
        </div>
      </MainFooterContainer>
    </>
  );
};

export default Footer;


const MainFooterContainer = styled.div`
  width: 100%;
  height: 7vh;
  bottom: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-top: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  background-color: #000;
  color: white;
  margin-top: auto;
  height: 10vh;
  .ul li:hover {
    text-decoration: underline;
  }

  @media (max-width: 610px) {
    .ul {
      gap: 15px;
    }
  }
  @media (max-width: 550px) {
    height: 10vh;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    .ul {
      font-size: 14px;
      gap: 15px;
    }
  }

  @media (max-width: 325px) {
    height: 13vh;
    .left {
      font-size: 12px;
    }
    .ul {
      font-size: 12px;
      gap: 10px;
    }
  }
`;
