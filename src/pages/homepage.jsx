import React from "react";
import '../output.css';
import logo from '../assets/logo2.png'; // <-- UNCOMMENT and make sure the path is correct
import { useNavigate } from "react-router-dom";
import pic from '../assets/pic1.png';
import ContactUs from "./contactus";

import { useEffect, useState } from 'react';
// import styled from 'styled-components';

export default function HomePage() {
  // Typing effect logic moved here

  const [text, setText] = useState("");
  const full = "The Art Of Byte, Crafting Code, One Line At a Time";
  useEffect(() => {
    let i = 0;
    let interval;
    function startTyping() {
      interval = setInterval(() => {
        setText(full.slice(0, i + 1));
        i++;
        if (i === full.length) {
          clearInterval(interval);
          setTimeout(() => {
            i = 0;
            setText("");
            startTyping();
          }, 1400); // Wait 1.2s before restarting
        }
      }, 40);
    }
    startTyping();
    return () => clearInterval(interval);
  }, []);

const navigateee = useNavigate();
  const navigateToAboutUs = () => {
    navigateee("/AboutUs");
  };

  const fullText = "Code Here. Code Now.";
  const gradientStart = "Code Here. ".length;

  const navigate = useNavigate();
  const navigateToPlayground = () => {
    navigate("/Playground")
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-start p-4">
      {/* Header */}
      <header className="w-full flex justify-between items-center py-4 px-8">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-15 w-22 object-contain" />
          <h1 className="text-3xl font-bold text-blue-500">HappyDebugger</h1>
        </div>
        <nav className="hidden md:flex gap-10 text-big text-gray-300">
        
          {/* <div className="cursor-pointer">Resources</div> */}
          <button onClick={navigateToAboutUs} className="cursor-pointer bg-transparent border-none p-0 m-0">
    About Us
  </button>
          {/* <div className="cursor-pointer">Contact Us</div> */}
          {/* <div className="cursor-pointer">Professional Development</div> */}
          {/* <div className="cursor-pointer">Online IDE</div> */}
          {/* <div className="cursor-pointer"></div> */}
        </nav>
        {/* <div className="text-big flex gap-4 "> */}
          {/* <button className="text-white">Login</button> */}
          {/* <button className="bg-green-400 text-black px-4 py-2 rounded-full">Sign Up</button> */}
        {/* </div> */}
      </header>

      {/* Hero Section */}
      <section className="text-center mt-20 mb-10">
        {/* First: The Art Of Byte, Crafting Code, One Line At a Time (auto-typing) */}
        <div className="mb-4 text-lg text-gray-300 h-8">{text}</div>
        
        {/* Show Code Here. Code Now. as static text */}
        <h1
          className="text-5xl md:text-6xl font-bold mt-2"
          style={{ cursor: "pointer" }}
        >
          {fullText.slice(0, gradientStart)}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {fullText.slice(gradientStart)}
          </span>
        </h1>
        <button
          onClick={navigateToPlayground}
          className="mt-6 bg-green-400 text-black px-6 py-3 rounded-full font-semibold text-lg hover:bg-green-300 transition"
        >
          + Create new project
        </button>
      </section>

      {/* Code Section */}
      <section className="w-full max-w-4xl bg-gray-900 rounded-lg p-6 text-sm mt-4 relative">
        <div className="flex flex-row">
          {/* Left: Code and buttons */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h3 className="text-white mb-4">JavaScript Graphics</h3>
            <pre className="overflow-x-auto text-purple-300">
              {`1  const { createStore, bindActionCreators } = Redux;
2  const { Provider, connect } = ReactRedux;
3  class App extends React.Component {
4    ...render() {
5      ....return (
6        ......<section className="section">
7          .........<h1 className="title">Contacts</h1>
8          .........<AddContact />
9          <addContact={(this.props.addContact)} />
10         .........<Contacts contacts={this.props.contacts} />
11          ........./>
12        ......</section>
13      ....);
14    }
15  }`}
            </pre>
            <div className="absolute top-6 right-6 flex gap-2">
              <button className="bg-purple-600 px-3 py-1 rounded text-white">Output</button>
              <button className="bg-purple-600 px-3 py-1 rounded text-white">Docs</button>
              <button className="bg-purple-600 px-3 py-1 rounded text-white">More</button>
            </div>
            <div className="flex mt-4 gap-4">
              <button className="bg-green-700 px-4 py-1 rounded">Run</button>
              <button className="bg-purple-700 px-4 py-1 rounded">Clear</button>
            </div>
            <div className="mt-6 flex justify-center">
              {/* <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-xl"></div> */}
            </div>
          </div>
          
          {/* Right: Pic below More, aligned right and centered horizontally */}
          <div className="flex flex-col items-end justify-start ml-auto w-1/2">
            <div className="flex flex-col items-center w-full mt-8 ">
              <img
                src={pic}
                alt="Side Illustration"
                className="h-96 w-auto object-contain shadow-lg"
                style={{ background: "transparent" }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Contact Us Section */}
      {/* <section id="contact">
        <ContactUs />
      </section> */}
    </div>
  );
}