import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import SlidingAuthPanel from "../../pages/Login";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center mb-12">
        <div className="text-2xl font-bold flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
          OTA
        </div>
        <nav className="hidden md:flex gap-8 text-lg">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            Courses
          </a>
          <a href="#" className="hover:underline">
            Community
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
        </nav>
        <button
          onClick={togglePanel}
          className="bg-[#2B0500] text-white px-4 py-2 rounded-full hover:bg-[#3B0600] transition-colors"
        >
          Sign in
        </button>
      </header>
      
      <SlidingAuthPanel isOpen={isOpen} togglePanel={togglePanel} />
    </>
  );
}