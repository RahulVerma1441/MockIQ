import React from "react";

export default function CourseCard({ 
  emoji, 
  category, 
  categoryColor, 
  title, 
  description, 
  instructor, 
  rating, 
  price, 
  bgColor = "bg-white",
  buttonStyle = "text-blue-600 font-semibold"
}) {
  return (
    <div className={`${bgColor} border border-gray-200 rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">{emoji}</span>
        </div>
        <span className={`${categoryColor} px-3 py-1 rounded-full text-sm`}>{category}</span>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center mb-4">
        <span className="text-sm text-gray-500 mr-2">👤 {instructor}</span>
        <span className="text-yellow-500 text-sm">⭐ {rating}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">${price}</span>
        {buttonStyle.includes('bg-') ? (
          <button className={buttonStyle}>Join Now →</button>
        ) : (
          <button className={buttonStyle}>Join Now →</button>
        )}
      </div>
    </div>
  );
}