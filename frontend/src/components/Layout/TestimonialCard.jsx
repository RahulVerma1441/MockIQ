import React from "react";

export default function TestimonialCard({
  emoji,
  name,
  grade,
  rating = 5,
  review,
  category,
  categoryColor,
  course
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-xl">{emoji}</span>
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-500">{grade}</p>
        </div>
      </div>
      <div className="text-yellow-500 mb-3">
        {"⭐".repeat(rating)}
      </div>
      <p className="text-sm text-gray-600 mb-4">{review}</p>
      <div className={`${categoryColor} px-3 py-1 rounded-full text-xs inline-block`}>
        {category}
      </div>
      <p className="text-sm font-semibold mt-2">{course}</p>
    </div>
  );
}