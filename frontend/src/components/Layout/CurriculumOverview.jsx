import React from "react";

export default function CurriculumOverview() {
  return (
    <section className="mt-20 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Real PYQs. Real Results.</h2>
        <h3 className="text-3xl font-semibold mb-2">A Detailed Look at Our Curriculum</h3>
        <p className="text-gray-600 max-w-md mx-auto">Crack NEET & JEE using actual previous year questions.
No fluff. Just the practice that matters.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Learn at your own pace card */}
        <div className="bg-blue-100 p-8 rounded-3xl">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Master competitive exams at your own pace with real PYQs.</h3>
          <p className="text-gray-700">Get ahead with hands-on practice using actual previous year questions from JEE, NEET, and other top exams. Practice anytime, review your mistakes, and track your progress — all for free.</p>
        </div>

        {/* Teachers card */}
        <div className="bg-green-100 p-8 rounded-3xl">
          <div className="w-12 h-12 bg-red-400 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">This platform is shaped by students and mentored by top scorers.</h3>
          <p className="text-gray-700">We believe that real success comes from real experiences. Our platform is designed by students who understand the journey — and backed by top achievers who’ve cracked these exams. Every question and feature is crafted to help you reach your goal faster.</p>
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 mt-12">
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">Get Actual Rank</span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">AI Assistant</span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">Detailed Analysis</span>
        <span className="bg-gray-200 px-4 py-2 rounded-full text-sm">Lifetime Support</span>
      </div>
    </section>
  );
}