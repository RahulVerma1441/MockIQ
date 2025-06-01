import React from 'react';

// Time Spent Chart Component
const TimeSpentChart = () => {
  const days = ['Apr 9', 'Apr 6', 'Apr 12', 'Apr 16', 'Apr 15'];
  const subjects = ['Physics', 'Chemistry', 'Mathematics'];
  const colors = ['bg-green-400', 'bg-red-400', 'bg-blue-400'];
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Time Spent studying</h3>
      <p className="text-sm text-gray-600 mb-6">Last week</p>
      
      <div className="flex items-end justify-between h-24 mb-4">
        {days.map((day) => (
          <div key={day} className="flex flex-col items-center space-y-1">
            <div className="flex flex-col space-y-1">
              {subjects.map((subject, subjectIndex) => (
                <div
                  key={subject}
                  className={`w-4 h-3 ${colors[subjectIndex]} rounded-sm`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSpentChart;