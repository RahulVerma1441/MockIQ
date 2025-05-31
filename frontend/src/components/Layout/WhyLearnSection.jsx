import React from "react";

export default function WhyLearnSection() {
  const features = [
    "Authentic PYQs Only",
    "Tailored for JEE, NEET & more",
    "No Cost, No Gimmicks"
  ];

  return (
    <section className="mt-20 mb-16">
      <div className="bg-purple-200 rounded-3xl p-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {/* Illustration placeholder - you can replace with actual illustration */}
            <div className="bg-purple-300 rounded-2xl h-64 flex items-center justify-center">
              <span className="text-6xl">🐱‍💻</span>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Why We Learn From OTA</h2>
            <p className="text-gray-700 mb-8">Looking to crack top-tier engineering and medical entrance exams? Our platform offers actual previous year questions from the most competitive exams—absolutely free. Practice smarter, not harder.</p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}