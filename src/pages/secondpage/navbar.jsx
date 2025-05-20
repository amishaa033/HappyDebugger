import React from "react";
import logo from "../../assets/logo2.png"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const fullText = "Happy Debugger";
  const [idx, setIdx] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (idx < fullText.length) {
      const timeout = setTimeout(() => {
        setIdx((prev) => prev + 1);
      }, 90); // Animation speed
      return () => clearTimeout(timeout);
    }
  }, [idx, fullText]);
  return (
    <div className="bg-gray-900 text-white flex items-center justify-between px-4 py-2 h-[80px]">
      <h1 className="text-2xl font-bold flex items-center gap-1">
        <button
        onClick={() => navigate("/")}
        className="mr-4 text-gray-400 hover:text-white transition-colors text-2xl font-bold"
        aria-label="Back to home"
      >
        ←
      </button>
       
        <span className="text-cyan-400">
           <img src={logo} alt="Logo" className="h-15 w-22 object-contain" />
          </span> <span className="text-3xl font-extrabold flex items-center relative animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-300% hover:scale-105 transform transition-all duration-300 cursor-default">
          {fullText.slice(0, idx)}
        </span>
      </h1>
    </div>
  );
};

export default Navbar;