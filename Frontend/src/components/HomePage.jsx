import React, { useState, useEffect } from "react";
import Header from "./Header";
import styled, { keyframes } from "styled-components";

// Carousel Component
const Carousel = () => {
  const [index, setIndex] = useState(0);
  const [students, setStudents] = useState([{ rollNo: "", name: "", usn: "" }]);
  const slides = [1, 2, 3];
  const [title, setTitle] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const addStudentField = () => {
    if (students.length >= 10) {
      alert("Maximum 10 students allowed.");
      return;
    }
    setStudents([...students, { rollNo: "", name: "", usn: "" }]);
  };

  useEffect(() => {
    if (index === 0) {
      document.querySelector(".left").style.display = "none";
    }
    if (index === 1 || index === 2) {
      document.querySelector(".left").style.display = "block";
    }
    if (index === 2) {
      document.querySelector(".right").style.display = "none";
    }
    if (index === 0 || index === 1) {
      document.querySelector(".right").style.display = "block";
    }
  }, [index]);
  const generateReport = () => {
    console.log("Generating Report");
    console.log(title);
    console.log(keyPoints);
    console.log(students);
  };
  const deleteStudentField = (index) => () => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  return (
    <CarouselContainer>
      <CarouselInner index={index}>
        <CarouselItem>
          <div>Please fill up the details</div>
          <div className="inputbox">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <span>Title</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="text"
              required
              value={keyPoints}
              onChange={(e) => {
                setKeyPoints(e.target.value);
              }}
            />
            <span>Key Points</span>
            <i></i>
          </div>
        </CarouselItem>
        <CarouselItem style={{ justifyContent: "center" }}>
          <div>Please add students details</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "98%",
              justifyContent: "center",
            }}
            className="studentDetails"
          >
            {students.map((student, index) => (
              <React.Fragment key={index}>
                <div className="flex ">
                  <div className="textInputWrapper" style={{ width: "100px" }}>
                    <input
                      placeholder="Roll no."
                      type="number"
                      min={1}
                      value={student.rollNo}
                      onChange={(e) => {
                        const updatedStudents = [...students];
                        updatedStudents[index].rollNo = e.target.value;
                        setStudents(updatedStudents);
                      }}
                      className="textInput"
                    />
                  </div>
                  <div className="textInputWrapper" style={{ width: "280px" }}>
                    <input
                      placeholder="Name"
                      type="text"
                      value={student.name}
                      onChange={(e) => {
                        const updatedStudents = [...students];
                        updatedStudents[index].name = e.target.value;
                        setStudents(updatedStudents);
                      }}
                      className="textInput"
                    />
                  </div>
                  <div className="textInputWrapper" style={{ width: "200px" }}>
                    <input
                      placeholder="USN"
                      type="text"
                      value={student.usn}
                      onChange={(e) => {
                        const updatedStudents = [...students];
                        updatedStudents[index].usn = e.target.value;
                        setStudents(updatedStudents);
                      }}
                      className="textInput"
                    />
                  </div>
                  <div className="flex justify-center items-center">
                    <button class="Btn" onClick={deleteStudentField(index)}>
                      <div class="sign">
                        <svg
                          viewBox="0 0 16 16"
                          class="bi bi-trash3-fill"
                          fill="currentColor"
                          height="18"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                        </svg>
                      </div>

                      <div class="text">Delete</div>
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
          <div>
            <button
              class="group cursor-pointer outline-none hover:rotate-90 duration-300"
              title="Add Student"
              onClick={addStudentField}
            >
              <svg
                class="stroke-black fill-none group-hover:fill-white group-active:stroke-white group-active:fill-white group-active:duration-0 duration-300"
                viewBox="0 0 24 24"
                height="40px"
                width="40px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-width="1.5"
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                ></path>
                <path stroke-width="1.5" d="M8 12H16"></path>
                <path stroke-width="1.5" d="M12 16V8"></path>
              </svg>
            </button>
          </div>
        </CarouselItem>
        <CarouselItem>
          <button
            onClick={generateReport}
            class="group relative outline-0 bg-sky-200 [--sz-btn:68px] [--space:calc(var(--sz-btn)/5.5)] [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))] h-[65px] w-[200px] border border-solid border-transparent rounded-xl flex items-center justify-center aspect-square cursor-pointer transition-transform duration-200 active:scale-[0.95] bg-[linear-gradient(135deg,#000000,#000000)] [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]"
          >
            <svg
              class="animate-pulse absolute z-10 overflow-visible transition-all duration-300 text-[#2e2e2e] group-hover:text-white top-[calc(var(--sz-text)/7)] left-[calc(var(--sz-text)/7)] h-[var(--gen-sz)] w-[var(--gen-sz)] group-hover:h-[var(--sz-text)] group-hover:w-[var(--sz-text)] group-hover:left-[calc(var(--sz-text)/0.6)] group-hover:top-[calc(calc(var(--gen-sz))/2)]"
              stroke="none"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
              ></path>
            </svg>
            <span class="text-xl font-bold leading-none text-white transition-all duration-200 group-hover:opacity-0">
              Generate Report
            </span>
          </button>
        </CarouselItem>
      </CarouselInner>
      <CarouselButton className="left" onClick={prevSlide}>
        Prev &#10094;
      </CarouselButton>
      <CarouselButton className="right" onClick={nextSlide}>
        Next &#10095;
      </CarouselButton>
    </CarouselContainer>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <MainContainer>
      <Header />
      <div className="body">
        <Carousel />
      </div>
    </MainContainer>
  );
};

export default HomePage;

// Keyframes
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
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .body {
    position: relative;
    height: 90vh;
    width: 100vw;
    flex-direction: column;
    background: linear-gradient(135deg, #2c2c2c, #6f6f6f, #828181);
    border-radius: 10px 10px 0 0;
    animation: ${fadeIn} 1s ease-in-out,
      ${gradientAnimation} 10s infinite alternate ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #ddd;
`;

const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.index * 100}%);
`;

const CarouselItem = styled.div`
  min-width: 100%;
  height: 400px;
  background: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .inputbox {
    position: relative;
    width: 400px;
  }

  .inputbox input {
    position: relative;
    width: 100%;
    padding: 20px 10px 10px;
    background: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    color: white;
    font-size: 1em;
    letter-spacing: 0.05em;
    transition: 0.5s;
    z-index: 10;
  }

  .inputbox span {
    position: absolute;
    left: 0;
    padding: 20px 10px 10px;
    font-size: 1em;
    color: #525252;
    letter-spacing: 00.05em;
    transition: 0.5s;
    pointer-events: none;
  }

  .inputbox input:valid ~ span,
  .inputbox input:focus ~ span {
    color: black;
    transform: translateX(-10px) translateY(-34px);
    font-size: 0, 75em;
  }

  .inputbox i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: black;
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
    z-index: 9;
  }

  .inputbox input:valid ~ i,
  .inputbox input:focus ~ i {
    height: 44px;
  }
  .textInputWrapper {
    position: relative;
    width: 180px;
    margin: 12px 5px;
    --accent-color: white;
  }

  .textInputWrapper:before {
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  .textInputWrapper:before,
  .textInputWrapper:after {
    content: "";
    left: 0;
    right: 0;
    position: absolute;
    pointer-events: none;
    bottom: -1px;
    z-index: 4;
    width: 100%;
  }

  .textInputWrapper:focus-within:before {
    border-bottom: 1px solid var(--accent-color);
  }

  .textInputWrapper:before {
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  }

  .textInputWrapper:focus-within:before {
    border-bottom: 1px solid var(--accent-color);
    transform: scaleX(1);
  }

  .textInputWrapper:focus-within:after {
    border-bottom: 2px solid var(--accent-color);
    transform: scaleX(1);
  }

  .textInputWrapper:after {
    content: "";
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    will-change: transform;
    border-bottom: 2px solid var(--accent-color);
    border-bottom-color: var(--accent-color);
  }

  .textInput::placeholder {
    transition: opacity 250ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    opacity: 1;
    user-select: none;
    color: rgba(255, 255, 255, 0.582);
  }

  .textInputWrapper .textInput {
    border-radius: 5px 5px 0px 0px;
    box-shadow: 0px 2px 5px rgb(35 35 35 / 30%);
    max-height: 36px;
    background-color: #252525;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 200ms;
    transition-property: background-color;
    color: #e8e8e8;
    font-size: 14px;
    font-weight: 500;
    padding: 12px;
    width: 100%;
    border-left: none;
    border-bottom: none;
    border-right: none;
  }

  .textInputWrapper .textInput:focus,
  .textInputWrapper .textInput:active {
    outline: none;
  }

  .textInputWrapper:focus-within .textInput,
  .textInputWrapper .textInput:focus,
  .textInputWrapper .textInput:active {
    background-color: #353535;
  }

  .textInputWrapper:focus-within .textInput::placeholder {
    opacity: 0;
  }

  .Btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
    background: rgb(0, 0, 0);
    background: linear-gradient(250deg, #000000 15%, #4d4d4d 65%);
  }

  .sign {
    width: 100%;
    transition-duration: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sign svg {
    width: 17px;
  }

  .sign svg path {
    fill: white;
  }
  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1em;
    font-weight: 600;
    transition-duration: 0.3s;
  }
  .Btn:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: 0.3s;
  }

  .Btn:hover .sign {
    width: 30%;
    transition-duration: 0.3s;
    padding-left: 20px;
  }
  .Btn:hover .text {
    opacity: 1;
    width: 70%;
    transition-duration: 0.3s;
    padding-right: 10px;
  }
  .Btn:active {
    transform: translate(2px, 2px);
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 90%;
  transform: translateY(-50%);
  color: gray;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  ${(props) => (props.className === "left" ? "left: 10px;" : "right: 10px;")}
  &:hover {
    color: #000;
  }
`;
