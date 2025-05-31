import React from "react";
import heroImg from "../../assets/hero.svg";

export default function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between md: px-6 md:px-12">
      <div className="md:w-[45%]">
        <h1 className="text-6xl font-bold">Master JEE & NEET with Real Exam Questions</h1>
        <p className="mt-4 text-lg text-gray-600">
          Are you tired of pulling all-nighters and still struggling to keep up with your coursework?
        </p>
        <button className="mt-6 px-6 py-3 bg-[#2d0b00] text-white rounded-full">Get Started →</button>
      </div>
      <div className="md:w-[60%] max-w-[800px]">
        <img src={heroImg} alt="Hero" className="w-full" />
      </div>
    </div>
  );
}