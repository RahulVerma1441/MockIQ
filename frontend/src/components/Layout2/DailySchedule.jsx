import React from 'react';

const DailySchedule = () => {
  const schedule = [
    { time: '09:00', subject: 'Physics' },
    { time: '11:00', subject: 'Biology' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Schedule</h3>
        <p className="text-sm text-gray-600 mb-4">Today, 18 April</p>
        
        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 w-12">{item.time}</span>
              <div className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                <span className="font-medium">{item.subject}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Daily Schedule</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">09:00</span>
            <span className="text-gray-600">10:00</span>
          </div>
          <div className="text-center font-medium text-gray-900">Physics</div>
        </div>
      </div>
    </div>
  );
};

export default DailySchedule;