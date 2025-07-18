/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import styled, { keyframes } from "styled-components";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getSections } from "../constants";
import { IoWarning } from "react-icons/io5";
import { UserCircle, BookText, Sparkles } from "lucide-react";
const Carousel = ({
  setIndexy,
  creditsUsed,
  maxCredits,
  renewalDateFormatted,
}) => {
  const [index, setIndex] = useState(0);
  const [students, setStudents] = useState([
    { rollNumber: "", name: "", USN: "" },
  ]);
  const slides = [1, 2, 3];
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [branch, setBranch] = useState("");
  const [sem, setSem] = useState("");
  const [professorName, setprofessorName] = useState("");
  const [designation, setDesignation] = useState("");
  const [finalDetails, setFinalDetails] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [currentSection, setCurrentSection] = useState("");
  const [num, setNum] = useState(0);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState("");
  const [current, setCurrent] = useState(0);

  const addSection = () => {
    if (newSection.trim() !== "") {
      setSections([
        ...sections,
        {
          title: newSection,
          prompt: `Provide detailed content or information for the section titled \"${newSection}\" on topic: ${title}.`,
        },
      ]);
      setNewSection("");
    }
  };
  const steps = [
    {
      icon: <BookText className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Report Details",
    },
    {
      icon: <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Student Information",
    },
    {
      icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Report Sections",
    },
  ];

  const [draggedIndex, setDraggedIndex] = useState(null);
  const scrollContainerRef = useRef(null);
  const autoScrollSpeed = 10;
  let scrollInterval = null;
  const scrollIntervalRef = useRef(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.target.style.opacity = "0.6";
  };

  const handleDragEnd = (e) => {
    setDraggedIndex(null);
    e.target.style.opacity = "1";
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const scrollThreshold = 60;

    const mouseY = e.clientY;
    const topTrigger = containerRect.top + scrollThreshold;
    const bottomTrigger = containerRect.bottom - scrollThreshold;

    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }

    if (mouseY < topTrigger && container.scrollTop > 0) {
      scrollIntervalRef.current = setInterval(() => {
        if (container.scrollTop > 0) {
          container.scrollTop = Math.max(
            0,
            container.scrollTop - autoScrollSpeed
          );
        } else {
          clearInterval(scrollIntervalRef.current);
          scrollIntervalRef.current = null;
        }
      }, 16);
    } else if (
      mouseY > bottomTrigger &&
      container.scrollTop < container.scrollHeight - container.clientHeight
    ) {
      scrollIntervalRef.current = setInterval(() => {
        if (
          container.scrollTop <
          container.scrollHeight - container.clientHeight
        ) {
          container.scrollTop = Math.min(
            container.scrollHeight - container.clientHeight,
            container.scrollTop + autoScrollSpeed
          );
        } else {
          clearInterval(scrollIntervalRef.current);
          scrollIntervalRef.current = null;
        }
      }, 16);
    }

    const newSections = [...sections];
    const draggedItem = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedItem);

    setSections(newSections);
    setDraggedIndex(index);
  };

  useEffect(() => {
    if (index == 2) {
      const sections = getSections(title);
      setSections(sections);
    }
  }, [index]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const nextSlide = () => {
    if (
      (!title ||
        !subject ||
        !subjectCode ||
        !branch ||
        !sem ||
        !professorName ||
        !designation) &&
      index === 0
    ) {
      toast.info("Some fields are missing. Please scroll down.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if (index === 1) {
      let flag = false;
      for (let i = 0; i < students.length; i++) {
        if (
          students[i].rollNumber === "" ||
          students[i].name === "" ||
          students[i].USN === ""
        ) {
          flag = true;
          break;
        }
      }
      if (flag || students.length === 0) {
        toast.info(
          "Some fields are missing. Please ensure everything is completed.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
        return;
      }
    }
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    setIndexy((prevIndex) => (prevIndex + 1) % slides.length);
    setCurrent((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setIndexy((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    setCurrent((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const addStudentField = () => {
    if (students.length >= 10) {
      alert("Maximum 10 students allowed.");
      return;
    }
    setStudents([...students, { rollNumber: "", name: "", USN: "" }]);
  };

  useEffect(() => {
    const leftBtn = document.querySelector(".left");
    const rightBtn = document.querySelector(".right");
    if (leftBtn && rightBtn) {
      leftBtn.style.display = index === 0 ? "none" : "block";
      rightBtn.style.display = index === slides.length - 1 ? "none" : "block";
    }
  }, [index, slides.length]);

  const generateReport = async () => {
    if (
      !title ||
      !professorName ||
      !designation ||
      !branch ||
      !subject ||
      !subjectCode ||
      !sem ||
      students.length === 0 ||
      sections.length < 5
    ) {
      toast.info("Add atleast five sections", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if (sections.length > 9) {
      toast.info("Maximum 9 sections allowed. Please remove some sections", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    setFlag(true);
    let content = "";

    for (const section of sections) {
      setNum((prevNum) => prevNum + 1);

      setCurrentSection(section.title);
      try {
        const response = await axios.post(
          "https://reportify-backend.vercel.app/api/content/generate",
          {
            title: section.title,
            promptContent: section.prompt,

            firstSection: section.title == sections[0].title, // true only for the first section
            lastSection: section.title == sections[sections.length - 1].title,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        content += response.data.data;
      } catch (error) {
        if (error.status === 429) {
          toast.error("Too Many Requests - please try again later");
          navigate("/");
        }
      }
    }
    setNum(0);
    setFlag(false);
    setFlag2(false);

    const report = {
      topic: title,
      content: content,
      professorDetails: {
        name: professorName,
        designation: designation,
        department: branch,
        college: "JSS Science and Technology University",
        subject: subject,
        subjectCode: subjectCode,
        sem: sem,
      },
      submissionDetails: students,
    };

    try {
      const response = await axios.post(
        "https://reportify-backend.vercel.app/api/report/generate",
        report,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      setFinalDetails(JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (error.status === 429) {
        toast.error("Too Many Requests - please try again later");
        navigate("/");
      }
    }
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const deleteStudentField = (idx) => () => {
    const updatedStudents = students.filter((_, i) => i !== idx);
    setStudents(updatedStudents);
  };

  const handleDelete = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  if (flag) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-md z-9999">
        <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-2xl shadow-xl">
          <Spinner className="w-10 h-10 text-blue-400 animate-spin" />
          <p className="mt-4 text-lg font-medium text-gray-300 text-center">
            Your report is being generated. Please wait.
          </p>
          <span className="mt-2 text-xl font-semibold text-blue-400 animate-pulse">
            Generating {currentSection}... ( {num} / {sections.length} )
          </span>
        </div>
      </div>
    );
  }

  if (flag2) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 backdrop-blur-md z-9999">
        <div className="bg-gray-900 text-white rounded-2xl shadow-2xl w-96 p-6 flex flex-col items-center">
          {/* Header */}
          <h3 className="text-lg  mb-2 font-bold">Important Notice</h3>

          {/* Credits Info */}
          <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-2">
            {/* Credit Information */}
            <p className="text-gray-400 text-center text-sm bg-gray-800 py-2 px-1 rounded-lg">
              1. Generating this report will cost
              <span className="font-bold text-red-500"> 1 credit</span>. You{" "}
              <br /> have
              <span className="font-bold text-red-500">
                {" "}
                {maxCredits - creditsUsed}
              </span>
              {maxCredits - creditsUsed === 1
                ? " credit remaining."
                : " credits remaining."}
            </p>
            <p className="text-gray-400 text-center text-sm bg-gray-800 py-2 px-1 rounded-lg">
              2. This report is AI-generated and may contain errors. Please
              review it carefully before use.
            </p>
            <p className="text-gray-400 text-center text-sm bg-gray-800 py-2  rounded-lg">
              3. The table of contents will be generated once{" "}
              <span className="font-bold">"Enable Editing"</span> is clicked in
              MS Word.
            </p>
          </div>

          <div className="flex justify-between gap-4 mt-5 w-full">
            <button
              onClick={() => {
                setFlag2(false);
              }}
              className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition cursor-pointer text-xl"
            >
              Cancel
            </button>
            <button
              onClick={generateReport}
              className="w-1/2 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition text-xl cursor-pointer"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <CarouselContainer>
      {creditsUsed >= maxCredits ? (
        <div className="flex items-center justify-center h-full w-full p-4">
          <div className="text-center text-gray-600 font-bold">
            <span className="text-red-600">
              Insufficient Credits.
              <br />
            </span>
            All 5 credits have been used for this period.
            <br />
            Credits will be renewed on{" "}
            <span className="text-blue-500">{renewalDateFormatted}.</span>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-muted/30 px-3 sm:px-6 py-3 sm:py-4 border-b bg-zinc-800">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full mb-1 sm:mb-2 transition-all ${
                      index === current
                        ? "bg-blue-300 text-primary-foreground"
                        : index < current
                        ? "bg-blue-400/20 text-blue-300"
                        : "text-white"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      index === current ? "text-blue-300" : "text-white"
                    }`}
                  >
                    {width >= 356 ? <>{step.title}</> : ""}
                  </span>

                  {/* Progress line - hidden on mobile */}
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block absolute h-0.5 w-[calc((100%/3)-3rem)] bg-muted left-[calc((100%/6)+1.5rem)] transform translate-y-5">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: current > index ? "100%" : "0%" }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <CarouselInner
            index={index}
            className=" w-full h-auto mb-[20vh] "
          >
            <CarouselItem className="overflow-y-auto">
              <div className="inputbox">
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span>Title  (e.g.,Reportify-AI Powered Report Builder)</span>
                <i></i>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <span>Subject</span>
                <i></i>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value.toUpperCase())}
                />
                <span>Subject Code</span>
                <i></i>
              </div>
              <div className="inputbox">
                <input
                  type="number"
                  list="sems"
                  min={1}
                  max={8}
                  required
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                />
                <datalist id="sems">
                  <option value="1" />
                  <option value="2" />
                  <option value="3" />
                  <option value="4" />
                  <option value="5" />
                  <option value="6" />
                  <option value="7" />
                  <option value="8" />
                </datalist>
                <span>Sem</span>
                <i></i>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required
                  list="branches"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
                <datalist id="branches">
                  <option value="Computer Science and Engineering" />
                  <option value="Electronics and Communication Engineering" />
                  <option value="Mechanical Engineering" />
                  <option value="Civil Engineering" />
                  <option value="Electrical and Electronics Engineering" />
                  <option value="Information Science and Engineering" />
                  <option value="Environmental Engineering" />
                  <option value="Polymer Science and Technology" />
                </datalist>
                <span>Branch</span>
                <i></i>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required
                  value={professorName}
                  onChange={(e) => setprofessorName(e.target.value)}
                />
                <span>Professor Name</span>
                <i></i>
              </div>
              <div className="inputbox">
                <input
                  type="text"
                  required
                  list="designations"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                <datalist id="designations">
                  <option value="Associate Professor" />
                  <option value="Assistant Professor" />
                </datalist>
                <span>Professor Designation</span>
                <i></i>
              </div>
            </CarouselItem>

            <CarouselItem style={{ justifyContent: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "98%",
                  justifyContent: "center",
                }}
                className="studentDetails"
              >
                {students.map((student, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex fields">
                      <div
                        className="textInputWrapper"
                        style={{ width: "100px" }}
                      >
                        <input
                          placeholder="Roll no."
                          type="number"
                          min={1}
                          value={student.rollNumber}
                          onChange={(e) => {
                            const updatedStudents = [...students];
                            updatedStudents[idx].rollNumber = e.target.value;
                            setStudents(updatedStudents);
                          }}
                          className="textInput"
                        />
                      </div>
                      <div
                        className="textInputWrapper"
                        style={{ width: "280px" }}
                      >
                        <input
                          placeholder="Name"
                          type="text"
                          value={student.name}
                          onChange={(e) => {
                            const updatedStudents = [...students];
                            updatedStudents[idx].name = e.target.value;
                            setStudents(updatedStudents);
                          }}
                          className="textInput"
                        />
                      </div>
                      <div
                        className="textInputWrapper"
                        style={{ width: "200px" }}
                      >
                        <input
                          placeholder="USN"
                          type="text"
                          value={student.USN}
                          onChange={(e) => {
                            const updatedStudents = [...students];
                            updatedStudents[idx].USN =
                              e.target.value.toUpperCase();
                            setStudents(updatedStudents);
                          }}
                          className="textInput"
                        />
                      </div>
                      <div className="flex justify-center items-center">
                        <button
                          className="Btn"
                          onClick={() => deleteStudentField(idx)()}
                        >
                          <div className="sign">
                            <svg
                              viewBox="0 0 16 16"
                              className="bi bi-trash3-fill"
                              fill="currentColor"
                              height="18"
                              width="18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"></path>
                            </svg>
                          </div>
                          <div className="text">Delete</div>
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div>
                <button
                  className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                  title="Add Student"
                  onClick={addStudentField}
                >
                  <svg
                    className="stroke-black fill-none group-hover:fill-white group-active:stroke-white group-active:fill-white group-active:duration-0 duration-300"
                    viewBox="0 0 24 24"
                    height="40px"
                    width="40px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeWidth="1.5"
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    ></path>
                    <path strokeWidth="1.5" d="M8 12H16"></path>
                    <path strokeWidth="1.5" d="M12 16V8"></path>
                  </svg>
                </button>
              </div>
            </CarouselItem>

            <CarouselItem
              ref={scrollContainerRef}
              className="overflow-y-auto"
            >
              <div className="w-full mx-auto mb-5 p-5 bg-gray-100 rounded-xl shadow-md">
                <div className="space-y-2">
                  {sections.map((section, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleDragOver(e, index)}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-lg bg-white border border-gray-200 shadow-sm ${
                        draggedIndex === index
                          ? "opacity-60 border-blue-400"
                          : "opacity-100"
                      } transform transition-all duration-200 cursor-grab active:cursor-grabbing`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex items-center justify-center w-6 h-6 text-gray-400">
                          ⋮⋮
                        </span>
                        <span className="text-base font-medium text-gray-800 truncate">
                          {index + 1}) {section.title}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete section"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Add custom section"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addSection}
                  className="bg-gray-400 border-1 text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  Add
                </button>
              </div>

              <button
                onClick={() => {
                  setFlag2(true);
                }}
                className="group relative outline-0 bg-sky-200 [--sz-btn:68px] [--space:calc(var(--sz-btn)/5.5)] [--gen-sz:calc(var(--space)*2)] [--sz-text:calc(var(--sz-btn)-var(--gen-sz))] h-[65px] w-[200px] border border-solid border-transparent rounded-xl flex items-center justify-center aspect-square cursor-pointer transition-transform duration-200 active:scale-[0.95] bg-[linear-gradient(135deg,#000000,#000000)] [box-shadow:#3c40434d_0_1px_2px_0,#3c404326_0_2px_6px_2px,#0000004d_0_30px_60px_-30px,#34343459_0_-2px_6px_0_inset]"
              >
                <svg
                  className="animate-pulse absolute z-10 overflow-visible transition-all duration-300 text-[#2e2e2e] group-hover:text-white top-[calc(var(--sz-text)/7)] left-[calc(var(--sz-text)/7)] h-[var(--gen-sz)] w-[var(--gen-sz)] group-hover:h-[var(--sz-text)] group-hover:w-[var(--sz-text)] group-hover:left-[calc(var(--sz-text)/0.6)] group-hover:top-[calc(calc(var(--gen-sz))/2)]"
                  stroke="none"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                  ></path>
                </svg>
                <span className="text-xl font-bold leading-none text-white transition-all duration-200 group-hover:opacity-0">
                  Generate Report
                </span>
              </button>
            </CarouselItem>
          </CarouselInner>
        </>
      )}
      <div>
        <CarouselButton className="left" onClick={prevSlide}>
          Prev &#10094;
        </CarouselButton>

        <CarouselButton className="right" onClick={nextSlide}>
          Next &#10095;
        </CarouselButton>
      </div>
    </CarouselContainer>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [indexy, setIndexy] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [creditsUsed, setCreditsUsed] = useState(0);
  const [maxCredits, setMaxCredits] = useState(5);
  const [renewalDate, setRenewalDate] = useState(null);
  const [renewalDateFormatted, setRenewalDateFormatted] = useState("");

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://reportify-backend.vercel.app/api/auth/current-user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setCurrentUser(response.data.data);
      setCreditsUsed(response.data.data.creditsUsed);
      setMaxCredits(response.data.data.maxCredits);

      const createdAt = new Date(response.data.data.creditsResetDate);

      const formattedRenewalDate = createdAt.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setRenewalDate(createdAt);
      setRenewalDateFormatted(formattedRenewalDate);
    } catch (error) {
      if (error.status === 401) {
        toast.error("Session Expired - please login again");
        navigate("/");
      } else if (error.status === 429) {
        toast.error("Too Many Requests - please try again later");
        navigate("/");
      } else {
        toast.error("Something went wrong - please try again later");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        const signOutPromise = axios
          .get("https://reportify-backend.vercel.app/api/auth/logout", {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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
        <p className="text-white">Loading Homepage...</p>
      </LoadingContainer>
    );
  }
  return (
    <MainContainer>
      <div className="flex flex-col min-h-[100vh] justify-between overflow-hidden bg-gradient-to-br from-black via-gray-800 to-gray-900">
        <div>
          <Header
            handleLogout={handleLogout}
            creditsUsed={creditsUsed}
            maxCredits={maxCredits}
            renewalDateFormatted={renewalDateFormatted}
          />
        </div>
        <div className="body">
          <div className="hello text-white flex flex-col items-center justify-center space-y-8 animate-fadeIn">
            <h1 className="text-5xl font-bold drop-shadow-lg bg-gradient-to-r from-gray-900 to-black bg-clip-text py-4 text-white">
              Hello, {currentUser.name} !
            </h1>
            
            <p className="text-2xl italic text-gray-400">
              Generate your report effortlessly in{" "}
              <span className="font-bold bg-clip-text  text-transparent bg-gradient-to-r from-amber-200 to-amber-400">
                3 simple steps
              </span>
            </p>

            <div className="mt-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              {indexy === 0 ? (
                <span className="px-8 py-3 bg-gradient-to-r from-red-900 to-red-800 text-gray-100 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-wiggle ring-2 ring-red-500">
                  🚀 Step 1: Enter Project Title, Course & Professor Details
                </span>
              ) : indexy === 1 ? (
                <span className="px-8 py-3 bg-gradient-to-r from-green-700 to-green-900 text-gray-100 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-float ring-2 ring-green-500">
                  📄 Step 2: Provide Student Information
                </span>
              ) : (
                <span className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-gray-100 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300 animate-bounceSlow ring-2 ring-blue-500">
                  🎓 Step 3: Organize Your Sections &{" "}
                  <span className="text-xl font-bold text-white">
                    Generate Report
                  </span>
                </span>
              )}
            </div>
          </div>

          <Carousel
            setIndexy={setIndexy}
            creditsUsed={creditsUsed}
            maxCredits={maxCredits}
            renewalDateFormatted={renewalDateFormatted}
          />
        </div>
        <div>
          <Footer handleLogout={handleLogout} />
        </div>
      </div>
    </MainContainer>
  );
};

export default HomePage;

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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #2c2c2c, #6f6f6f, #828181);
  position: relative;
  justify-content: space-between;
  overflow: hidden;
  .body {
    height: 80vh;
    border-radius: 10px;
    display: flex;
    & .hello {
      width: 50vw;
      height: 70vh;
      position: absolute;
      top: 15vh;
      left: 5vw;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: none;
    }
    @media (max-width: 1295px) {
      .hello {
        left: 2vw;
      }
    }
    @media (max-width: 1202px) {
      .hello {
        left: 0vw;
      }
    }
    @media (max-width: 1169px) {
      .hello {
        display: none;
      }
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(22, 5, 5, 0.445);
  }

  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    background-color: black;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  max-width: 600px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-color: #e8e8e8;
  transition: all 0.5s ease-in-out;
  margin: 0 auto;
  top: 6vh;
  left: 25vw;
  @media (max-width: 590px) {
    max-width: 400px;
    height: 500px;
  }
  @media (max-width: 412px) {
    max-width: 350px;
    height: 550px;
  }
  @media (max-width: 355px) {
    max-width: 300px;
    height: 530px;
  }
  @media (max-width: 298px) {
    max-width: 250px;
    height: 530px;
  }
  @media (max-height: 777px) {
    height: 500px;
  }
  @media (max-height: 646px) {
    height: 400px;
  }
  @media (max-width: 1169px) {
    left: 0;
  }
`;

const CarouselInner = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => -props.index * 100}%);
`;

const CarouselItem = styled.div`
  min-width: 100%;
  max-height: 320px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* overflow: auto; */
  overflow-x: hidden;
  
  .deleteButton {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }
  .deleteButton svg {
    width: 44%;
  }
  .deleteButton:hover {
    background-color: rgb(237, 56, 56);
    overflow: visible;
  }
  .bin path {
    transition: all 0.2s;
  }
  .deleteButton:hover .bin path {
    fill: #fff;
  }
  .deleteButton:active {
    transform: scale(0.98);
  }
  .inputbox {
    position: relative;
    width: 500px;
  }

  .inputbox input {
    position: relative;
    width: 100%;
    padding: 40px 10px 10px;
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
    padding: 40px 10px 10px;
    font-size: 1em;
    color: #525252;
    letter-spacing: 0.05em;
    transition: 0.5s;
    pointer-events: none;
  }

  .inputbox input:valid ~ span,
  .inputbox input:focus ~ span {
    color: black;
    transform: translateX(-10px) translateY(-34px);
    font-size: 0.75em;
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

  @media (max-width: 590px) {
    max-height: 360px;
    .inputbox {
      position: relative;
      width: 350px;
    }
  }
  @media (max-width: 412px) {
    .inputbox {
      position: relative;
      width: 300px;
    }
  }
  @media (max-width: 355px) {
    .inputbox {
      position: relative;
      width: 250px;
    }
    .Btn {
      width: 20px;
      height: 20px;
      & .sign {
        font-size: 10px;
      }
    }
  }
  @media (max-width: 298px) {
    .inputbox {
      position: relative;
      width: 230px;
    }
  }
  @media (max-height: 777px) {
    height: 410px;
  }
  @media (max-height: 646px) {
    height: 350px;
  }
`;

const CarouselButton = styled.button`
  top: 90%;
  position: absolute;
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
  @media (max-width: 590px) {
    font-size: 1.2rem;
  }
  @media (max-height: 777px) {
    font-size: 18px;
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
