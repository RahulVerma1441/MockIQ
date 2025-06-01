import React from 'react'

// Test Performance Chart Component
const TestPerformanceChart = () => {
  const data = [65, 75, 85, 70, 78];
  const maxValue = Math.max(...data);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Performance</h3>
      <p className="text-sm text-gray-600 mb-6">12 mock tests taken</p>
      
      <div className="flex items-end space-x-3 h-32 mb-4">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className={`w-full rounded-t-lg ${index === 2 ? 'bg-blue-600' : 'bg-blue-300'}`}
              style={{ height: `${(value / maxValue) * 100}%` }}
            />
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
          <span>75%</span>
        </div>
      </div>
    </div>
  );
};

export default TestPerformanceChart ;