import React from 'react';

// Recommended PYQs Component
const RecommendedPYQs = () => {
  const pyqs = [
    'JEE Main 2023',
    'NEET 2022',
    'JEE Main 2022',
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended PYQs</h3>
      <div className="space-y-3">
        {pyqs.map((pyq) => (
          <button
            key={pyq}
            className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="font-medium text-gray-900">{pyq}</span>
            <span className="text-gray-400">›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPYQs;