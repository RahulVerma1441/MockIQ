import React from "react";
import TestimonialCard from "./TestimonialCard";

export default function SkillBuildingSection() {
  const testimonials = [
    {
      emoji: "👧",
      name: "Bessie Cooper",
      grade: "Grade 2 Student",
      review: "With expert guidance and practical tips, you'll gain the skills you need to create stunning flat illustrations that stand out from the crowd.",
      category: "Illustration",
      categoryColor: "bg-purple-100 text-purple-600",
      course: "Basic Flat Illustration"
    },
    {
      emoji: "👩",
      name: "Kristin Watson",
      grade: "Grade 1 Student",
      review: "I can't express how much my life has changed since taking on the e-courses journey focusing on design, UI/UX. It all started with a simple desire to enhance my skill set, but little did I know that this decision.",
      category: "UI/UX",
      categoryColor: "bg-pink-100 text-pink-600",
      course: "UI Landing Page"
    },
    {
      emoji: "👨",
      name: "Ronax Bright",
      grade: "Grade 3 Student",
      review: "The first course I took was on design fundamentals, and it laid a solid foundation for my creative journey. Learning from an industry expert through comprehensive video lectures and practical exercises.",
      category: "Illustration",
      categoryColor: "bg-purple-100 text-purple-600",
      course: "Isometric Illustration"
    },
    {
      emoji: "👦",
      name: "Ralph Edwards",
      grade: "Grade 1 Student",
      review: "With the help of the e-course, I learned HTML, CSS, and JavaScript from scratch. The practical examples and real-world projects were incredibly valuable.",
      category: "Web Development",
      categoryColor: "bg-yellow-100 text-yellow-600",
      course: "Html and JavaScript"
    }
  ];

  return (
    <section className="mt-20 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">A Skill-Building Journey with OTA</h2>
        <p className="text-gray-600">How real exam questions helped thousands gain confidence and improve their scores.</p>
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}