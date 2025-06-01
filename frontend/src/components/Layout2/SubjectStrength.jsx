import React from 'react';


const SubjectStrength = () => {
  const subjects = [
    { name: 'Physics', percentage: 80, color: 'bg-blue-500' },
    { name: 'Chemistry', percentage: 60, color: 'bg-gray-400' },
    { name: 'Mathematics', percentage: 55, color: 'bg-gray-400' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${65 * 2.51} ${100 * 2.51}`}
              className="text-blue-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-900">65%</span>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900">Subject strength</p>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{subject.name}</span>
              <span className="text-sm text-gray-600">{subject.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${subject.color}`}
                style={{ width: `${subject.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectStrength;