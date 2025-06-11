import React from "react";

export default function Footer() {
  const navLinks = ["Home", "Courses", "Community", "About"];

  return (
    <footer className="mt-20 bg-gray-900 text-white rounded-3xl p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-gray-900 font-bold">O</span>
          </div>
          <span className="text-xl font-bold">MockIQ</span>
        </div>
        
        <nav className="flex gap-8 mb-4 md:mb-0">
          {navLinks.map((link, index) => (
            <a key={index} href="#" className="hover:underline">{link}</a>
          ))}
        </nav>
        
        <p className="text-sm text-gray-400">© 2024 MockIQ.</p>
      </div>
    </footer>
  );
}