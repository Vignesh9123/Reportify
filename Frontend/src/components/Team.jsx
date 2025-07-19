import { useEffect, useState } from "react";
import Header from "./Header";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import Footer from "./Footer";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-white mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen justify-between overflow-hidden bg-gradient-to-br from-black via-gray-800 to-gray-900">
      <div>
        <Header handleLogout={handleLogout} />
      </div>
      
      <div className="relative h-auto w-full rounded-t-[10px] animate-fade-in flex justify-center items-center flex-wrap gap-[10vw] py-8 md:py-16 px-4 md:flex-row flex-col md:gap-[10vw] gap-[5vh]">
        <div className="group w-64 rounded-[20px] bg-black p-[5px] overflow-hidden shadow-[rgba(0,0,0,0.2)_0px_7px_20px_0px] transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] border border-gray-600 hover:scale-105">
          <div className="relative h-[200px] rounded-[15px] flex flex-col bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('vig.png')"}}>
            <div className="relative h-[30px] w-[130px] bg-black transform -skew-x-[40deg] rounded-br-[10px] shadow-[-10px_-10px_0_0_black] before:content-[''] before:absolute before:w-[15px] before:h-[15px] before:top-0 before:right-[-15px] before:bg-transparent before:rounded-tl-[10px] before:shadow-[-5px_-5px_0_2px_black] after:content-[''] after:absolute after:top-[30px] after:left-0 after:bg-transparent after:h-[15px] after:w-[15px] after:rounded-tl-[15px] after:shadow-[-5px_-5px_0_2px_black]"></div>
            
            <div className="absolute top-0 w-full h-[30px] flex justify-between">
              <div className="h-full aspect-square pt-[7px] pb-[7px] pl-[15px] text-white flex justify-center items-center font-bold">
                Backend
              </div>
            </div>
          </div>
          
          <div className="mt-[15px] p-[10px_5px]">
            <p className="font-bold text-blue-300 text-2xl text-center tracking-[2px]">
              VIGNESH D
            </p>
            <p className="text-white text-sm text-center mt-2">
              Student @ SJCE 26'
            </p>
            <div className="flex justify-between mt-5">
              <div className="flex-[30%] text-center p-[5px] text-white flex justify-center items-center cursor-pointer">
                <a href="https://github.com/Vignesh9123" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-4xl duration-100 hover:text-zinc-700 hover:scale-125 transition-all" />
                </a>
              </div>
              <div className="flex-[30%] text-center p-[5px] text-white flex justify-center items-center cursor-pointer border-l border-r border-white/20">
                <a
                  href="https://www.linkedin.com/in/vignesh-d-mys/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-4xl duration-100 hover:text-blue-500 hover:scale-125 transition-all" />
                </a>
              </div>
              <div className="flex-[30%] text-center p-[5px] text-white flex justify-center items-center cursor-pointer">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=vignesh.d9123@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGmail className="text-4xl duration-100 hover:text-red-500 hover:scale-125 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="group w-64 rounded-[20px] bg-black p-[5px] overflow-hidden shadow-[rgba(0,0,0,0.2)_0px_7px_20px_0px] transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] border border-gray-600 hover:scale-105">
          <div className="relative h-[200px] rounded-[15px] flex flex-col bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('suraj.png')"}}>
            <div className="relative h-[30px] w-[130px] bg-black transform -skew-x-[40deg] rounded-br-[10px] shadow-[-10px_-10px_0_0_black] before:content-[''] before:absolute before:w-[15px] before:h-[15px] before:top-0 before:right-[-15px] before:bg-transparent before:rounded-tl-[10px] before:shadow-[-5px_-5px_0_2px_black] after:content-[''] after:absolute after:top-[30px] after:left-0 after:bg-transparent after:h-[15px] after:w-[15px] after:rounded-tl-[15px] after:shadow-[-5px_-5px_0_2px_black]"></div>
            
            <div className="absolute top-0 w-full h-[30px] flex justify-between">
              <div className="h-full aspect-square pt-[7px] pb-[7px] pl-[15px] text-white flex justify-center items-center font-bold">
                Frontend
              </div>
            </div>
          </div>
          
          <div className="mt-[15px] p-[10px_5px]">
            <p className="font-bold text-blue-300 text-[21px] text-center tracking-[2px]">
              SURAJ S G DHANVA
            </p>
            <p className="text-white text-sm text-center mt-2">
              Student @ SJCE 26'
            </p>
            <div className="flex justify-between mt-5">
              <div className="flex-[30%] text-center p-[5px] text-white flex justify-center items-center cursor-pointer">
                <a href="https://github.com/SurajSG23" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-4xl duration-100 hover:text-zinc-700 hover:scale-125 transition-all" />
                </a>
              </div>
              <div className="flex-[30%] text-center p-[5px] text-white flex justify-center items-center cursor-pointer border-l border-r border-white/20">
                <a
                  href="https://www.linkedin.com/in/suraj-s-g-dhanva-995a23298/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-4xl duration-100 hover:text-blue-500 hover:scale-125 transition-all" />
                </a>
              </div>
              <div className="flex-[30%] text-center p-[5px] text-white flex justify-center items-center cursor-pointer">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=surajsgd23@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGmail className="text-4xl duration-100 hover:text-red-500 hover:scale-125 transition-all" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Team;