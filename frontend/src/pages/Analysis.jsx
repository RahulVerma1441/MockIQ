import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Target, Clock, BookOpen, Award, Calendar, Filter } from 'lucide-react';

const AnalysisPage = () => {
  const [selectedExam, setSelectedExam] = useState('all');
  const [timeRange, setTimeRange] = useState('3months');

  // Mock data for charts
  const performanceData = [
    { test: 'Test 1', date: '2024-01-15', marks: 65, totalMarks: 300, percentage: 21.7, exam: 'JEE Main' },
    { test: 'Test 2', date: '2024-01-22', marks: 78, totalMarks: 300, percentage: 26.0, exam: 'JEE Main' },
    { test: 'Test 3', date: '2024-01-29', marks: 92, totalMarks: 300, percentage: 30.7, exam: 'JEE Main' },
    { test: 'Test 4', date: '2024-02-05', marks: 85, totalMarks: 300, percentage: 28.3, exam: 'JEE Advanced' },
    { test: 'Test 5', date: '2024-02-12', marks: 108, totalMarks: 300, percentage: 36.0, exam: 'JEE Main' },
    { test: 'Test 6', date: '2024-02-19', marks: 125, totalMarks: 300, percentage: 41.7, exam: 'JEE Advanced' },
    { test: 'Test 7', date: '2024-02-26', marks: 142, totalMarks: 300, percentage: 47.3, exam: 'JEE Main' },
    { test: 'Test 8', date: '2024-03-05', marks: 156, totalMarks: 300, percentage: 52.0, exam: 'WBJEE' },
  ];

  const subjectWiseData = [
    { subject: 'Physics', correct: 28, incorrect: 12, unattempted: 15, accuracy: 70, averageTime: 2.3 },
    { subject: 'Chemistry', correct: 32, incorrect: 8, unattempted: 10, accuracy: 80, averageTime: 1.8 },
    { subject: 'Mathematics', correct: 25, incorrect: 15, unattempted: 20, accuracy: 62.5, averageTime: 3.2 },
  ];

  const radarData = [
    { subject: 'Physics', strength: 70, fullMark: 100 },
    { subject: 'Chemistry', strength: 85, fullMark: 100 },
    { subject: 'Mathematics', strength: 62, fullMark: 100 },
    { subject: 'Speed', strength: 68, fullMark: 100 },
    { subject: 'Accuracy', strength: 75, fullMark: 100 },
  ];

  const recentTests = [
    {
      id: 1,
      name: 'JEE Main Mock Test #12',
      date: '2024-03-05',
      exam: 'JEE Main',
      score: 156,
      totalMarks: 300,
      percentage: 52.0,
      rank: 1247,
      duration: '3h 0m',
      status: 'completed'
    },
    {
      id: 2,
      name: 'JEE Advanced Practice #8',
      date: '2024-02-26',
      exam: 'JEE Advanced',
      score: 142,
      totalMarks: 300,
      percentage: 47.3,
      rank: 2156,
      duration: '3h 0m',
      status: 'completed'
    },
    {
      id: 3,
      name: 'WBJEE Full Test #5',
      date: '2024-02-19',
      exam: 'WBJEE',
      score: 125,
      totalMarks: 200,
      percentage: 62.5,
      rank: 892,
      duration: '2h 0m',
      status: 'completed'
    },
    {
      id: 4,
      name: 'JEE Main Sectional Test #15',
      date: '2024-02-12',
      exam: 'JEE Main',
      score: 108,
      totalMarks: 300,
      percentage: 36.0,
      rank: 3245,
      duration: '3h 0m',
      status: 'completed'
    },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  const getExamColor = (exam) => {
    switch (exam) {
      case 'JEE Main': return '#6366f1';
      case 'JEE Advanced': return '#8b5cf6';
      case 'WBJEE': return '#10b981';
      default: return '#6b7280';
    }
  };

  const filteredData = selectedExam === 'all' 
    ? performanceData 
    : performanceData.filter(item => item.exam === selectedExam);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analysis</h1>
        <p className="text-gray-600">Track your progress and identify areas for improvement</p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select 
            value={selectedExam} 
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Exams</option>
            <option value="JEE Main">JEE Main</option>
            <option value="JEE Advanced">JEE Advanced</option>
            <option value="WBJEE">WBJEE</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Key Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">42.3%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8.2% improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Rank</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">Improved by 1.2K</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Study Time</p>
              <p className="text-2xl font-bold text-gray-900">156h</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+15h this month</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trend Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="test" 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: '#6366f1', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Strength Radar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strength Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis tick={{ fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
              />
              <Radar
                name="Strength"
                dataKey="strength"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject-wise Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {subjectWiseData.map((subject) => (
            <div key={subject.subject} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  subject.accuracy >= 75 ? 'bg-green-100 text-green-800' :
                  subject.accuracy >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {subject.accuracy}% Accuracy
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Correct:</span>
                  <span className="font-medium text-green-600">{subject.correct}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Incorrect:</span>
                  <span className="font-medium text-red-600">{subject.incorrect}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unattempted:</span>
                  <span className="font-medium text-gray-600">{subject.unattempted}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Time:</span>
                  <span className="font-medium">{subject.averageTime} min</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${subject.accuracy}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subject Performance Bar Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={subjectWiseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="subject" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip />
            <Bar dataKey="correct" name="Correct" fill="#10b981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="incorrect" name="Incorrect" fill="#ef4444" radius={[2, 2, 0, 0]} />
            <Bar dataKey="unattempted" name="Unattempted" fill="#6b7280" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Test History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Test History</h3>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Test Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Exam</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Percentage</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentTests.map((test) => (
                <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{test.name}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(test.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getExamColor(test.exam) }}
                    >
                      {test.exam}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium">
                    {test.score}/{test.totalMarks}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${
                      test.percentage >= 50 ? 'text-green-600' :
                      test.percentage >= 35 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {test.percentage}%
                    </span>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    #{test.rank.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {test.duration}
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;