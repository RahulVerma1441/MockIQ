import React from "react";
import CourseCard from "./CourseCard";

export default function PopularCourses() {
  const exams = [
    {
      emoji: "👨‍💻",
      category: "Engineering",
      categoryColor: "bg-purple-100 text-purple-600",
      title: "JEE Main",
      description: "Sharpen your concepts with real PYQs from JEE Main. Build speed, accuracy, and strategy to ace one of India’s toughest engineering exams.",
      // instructor: "Heydelya",
      rating: "4.8",
      price: "Free",
      bgColor: "bg-white hover:bg-green-100",
      buttonStyle: "text-black font-semibold hover:bg-purple-400 text-black px-6 py-2 rounded-full"
    },
    {
      emoji: "👨‍🏫",
      category: "Medical",
      categoryColor: "bg-pink-100 text-pink-600",
      title: "NEET UG",
      description: "Master Biology, Physics & Chemistry with actual NEET past year papers. Practice like it’s the real exam and achieve your dream rank and college.",
      // instructor: "M. Johansen",
      rating: "4.7",
      price: "Free",
      bgColor: "bg-white hover:bg-green-100",
      buttonStyle: "text-black font-semibold hover:bg-purple-400 text-black px-6 py-2 rounded-full"
    },
    {
      emoji: "👩‍🎨",
      category: "Engineering",
      categoryColor: "bg-purple-100 text-purple-600",
      title: "JEE Advanced",
      description: "Sharpen your concepts with real PYQs from JEE Advanced. Build speed, accuracy, and strategy to ace one of India’s toughest engineering exams.",
      // instructor: "Savannah Nguyen",
      rating: "4.5",
      price: "Free",
      bgColor: "bg-white hover:bg-green-100",
      buttonStyle: "text-black font-semibold hover:bg-purple-400 text-black px-6 py-2 rounded-full"
    }
  ];

  return (
    <section className="mt-20 mb-16">
      <h2 className="text-4xl font-bold text-center mb-12">Popular Exams</h2>
      
      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-gray-100 rounded-full overflow-hidden max-w-2xl w-full">
          <input type="text" placeholder="Exam Name" className="flex-1 px-6 py-3 bg-transparent outline-none" />
          {/* <input type="text" placeholder="Instructor" className="flex-1 px-6 py-3 bg-transparent outline-none border-l border-gray-300" /> */}
          <button className="bg-black text-white px-8 py-3 rounded-full mx-2 my-1">Search</button>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {exams.map((exams, index) => (
          <CourseCard key={index} {...exams} />
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-black text-white px-8 py-3 rounded-full">View All Exams →</button>
      </div>
    </section>
  );
}