import React from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "components/ExampleCarouselImage";

const HomePage = () => {
  return (
    <MiainContainer>
      <div>
        <Header />
      </div>
      <div className="body">
        <div className="carousal">
          <Carousel slide={false}>
            <Carousel.Item>
              <ExampleCarouselImage text="First slide" />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <ExampleCarouselImage text="Second slide" />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <ExampleCarouselImage text="Third slide" />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </MiainContainer>
  );
};

export default HomePage;

const MiainContainer = styled.div`
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
  }
`;
