import React from "react";
import monster from "../assets/monster.png";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] flex flex-col justify-center items-center text-white p-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full gap-12">
        {/* Left Side - Image */}
        <div className="flex justify-center md:w-1/2">
          { <img
            src={monster} // Replace with your local path or hosted URL matching the uploaded screenshot
            alt="monster"
            className="w-60 md:w-72"
          /> }
        </div>

        {/* Right Side - Text & Buttons */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-white">
            ABOUT US
          </h2>
          <hr className="w-16 border-t border-white mx-auto md:mx-0" />
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
            HappyDebugger
            Fix bugs, have fun, and debug your way to glory! Happy-Debugger is the ultimate playground for freshers to test their logic, spot errors, and smile through the code chaos. Debugging has never been this exciting!
          </p>
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <button 
              className="border border-white px-6 py-2 hover:bg-white hover:text-[#0A0F2C] transition justify-center items-center "
              onClick={() => window.location.href = '/ContactUs'}
            >
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
