import React from 'react';
import TestPerformanceChart from '../components/Layout2/TestPerformance';
import TimeSpentChart from '../components/Layout2/TimeSpent';
import RecommendedPYQs from '../components/Layout2/RecommendedPYQ';
import MockTestCTA from '../components/Layout2/MockCTA';
import SubjectStrength from '../components/Layout2/SubjectStrength';

// Main Dashboard Component
const Dashboard = () => {
  return (
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Let's Start Your Preparation ✅
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <TestPerformanceChart />
                <TimeSpentChart />
              </div>

              {/* Middle Column */}
              <div className="space-y-6">
                <RecommendedPYQs />
                <MockTestCTA />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <SubjectStrength />
                {/* <DailySchedule /> */}
              </div>
            </div>
          </div>
        </main>
  );
};

export default Dashboard;