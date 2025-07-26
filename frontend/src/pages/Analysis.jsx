import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Target, Clock, BookOpen, Award, Calendar, Filter, Loader } from 'lucide-react';
import axios from 'axios';


const AnalysisPage = () => {
  const [selectedExam, setSelectedExam] = useState('all');
  const [timeRange, setTimeRange] = useState('3months');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllTests, setShowAllTests] = useState(false); // New state for toggling test view

  // State for all data
  const [performanceData, setPerformanceData] = useState([]);
  const [subjectWiseData, setSubjectWiseData] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [recentTests, setRecentTests] = useState([]);
  const [stats, setStats] = useState({
    totalTests: 0,
    testsChange: 0,
    averageScore: 0,
    scoreImprovement: 0,
    bestRank: 0,
    rankImprovement: 0,
    studyTime: 0,
    studyTimeChange: 0
  });

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];
  // Fix: Use VITE_ prefix for Vite environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const getExamColor = (exam) => {
    switch (exam) {
      case 'JEE Main': return '#6366f1';
      case 'JEE Advanced': return '#8b5cf6';
      case 'WBJEE': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Create axios instance with auth header
  const createAuthAxios = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If no token, redirect to login
      window.location.href = '/login';
      return null;
    }
    
    return axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  };

  // Check JWT token expiry
  const checkTokenExpiry = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      
      console.log('Token expiry:', new Date(expiry));
      console.log('Current time:', new Date(now));
      console.log('Token expired?', now > expiry);
      
      return now > expiry;
    } catch (e) {
      console.error('Error checking token:', e);
      return true;
    }
  };

  // Fetch all data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    
    // Check if token is expired
    if (checkTokenExpiry(token)) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }
    
    fetchAllData();
  }, [selectedExam, timeRange]);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    try {
      const authAxios = createAuthAxios();
      if (!authAxios) return;

      const params = {
        exam: selectedExam,
        timeRange: timeRange
      };

      console.log('Fetching data with params:', params);

      // Fetch all data in parallel with better error handling
      const requests = [
        authAxios.get('/api/submissions/performance', { params }).catch(err => {
          console.error('Performance API error:', err);
          return { data: { data: [] } };
        }),
        authAxios.get('/api/submissions/subject-wise', { params }).catch(err => {
          console.error('Subject-wise API error:', err);
          return { data: { data: [] } };
        }),
        authAxios.get('/api/submissions/stats', { params }).catch(err => {
          console.error('Stats API error:', err);
          return { data: { data: {
            totalTests: 0,
            testsChange: 0,
            averageScore: 0,
            scoreImprovement: 0,
            bestRank: 0,
            rankImprovement: 0,
            studyTime: 0,
            studyTimeChange: 0
          } } };
        }),
        // Updated to fetch all tests but we'll filter in component
        authAxios.get('/api/submissions/recent-tests', { params: { exam: selectedExam } }).catch(err => {
          console.error('Recent tests API error:', err);
          return { data: { data: [] } };
        }),
        authAxios.get('/api/submissions/strength', { params }).catch(err => {
          console.error('Strength API error:', err);
          return { data: { data: [] } };
        })
      ];

      const [
        performanceRes,
        subjectWiseRes,
        statsRes,
        recentTestsRes,
        strengthRes
      ] = await Promise.all(requests);

      console.log('API Responses:', {
        performance: performanceRes.data,
        subjectWise: subjectWiseRes.data,
        stats: statsRes.data,
        recentTests: recentTestsRes.data,
        strength: strengthRes.data
      });

      // Set data with proper defaults
      setPerformanceData(performanceRes.data?.data || []);
      setSubjectWiseData(subjectWiseRes.data?.data || []);
      setStats(statsRes.data?.data || {
        totalTests: 0,
        testsChange: 0,
        averageScore: 0,
        scoreImprovement: 0,
        bestRank: 0,
        rankImprovement: 0,
        studyTime: 0,
        studyTimeChange: 0
      });
      setRecentTests(recentTestsRes.data?.data || []);
      setRadarData(strengthRes.data?.data || []);

    } catch (err) {
      console.error('Error fetching analysis data:', err);
      
      // Check if it's an authentication error
      if (err.response?.status === 401) {
        setError('Session expired. Please login again.');
        setTimeout(() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }, 2000);
      } else if (err.code === 'ECONNREFUSED' || err.message === 'Network Error') {
        setError('Unable to connect to server. Please check if the server is running.');
      } else {
        setError('Failed to load analysis data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to get displayed tests based on showAllTests state
  const getDisplayedTests = () => {
    if (showAllTests) {
      return recentTests;
    }
    return recentTests.slice(0, 3); // Show only first 3 tests
  };

  // Function to toggle test view
  const toggleTestView = () => {
    setShowAllTests(!showAllTests);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchAllData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-indigo-600">
            Score: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

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
              <p className="text-2xl font-bold text-gray-900">{stats.totalTests || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.testsChange > 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{stats.testsChange}% from last period</span>
              </>
            ) : stats.testsChange < 0 ? (
              <>
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">{stats.testsChange}% from last period</span>
              </>
            ) : (
              <span className="text-sm text-gray-600">No change from last period</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{stats.averageScore || 0}%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.scoreImprovement > 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{stats.scoreImprovement}% improvement</span>
              </>
            ) : stats.scoreImprovement < 0 ? (
              <>
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">{Math.abs(stats.scoreImprovement)}% decrease</span>
              </>
            ) : (
              <span className="text-sm text-gray-600">No change</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Best Rank</p>
              <p className="text-2xl font-bold text-gray-900">{stats.bestRank || 'N/A'}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.rankImprovement > 0 && (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Improved by {stats.rankImprovement}</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Study Time</p>
              <p className="text-2xl font-bold text-gray-900">{stats.studyTime || 0}h</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {stats.studyTimeChange !== 0 && (
              <>
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  {stats.studyTimeChange > 0 ? '+' : ''}{stats.studyTimeChange}h this period
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Performance Trend Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
          {performanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="test" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
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
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No performance data available. Take some tests to see your progress!
            </div>
          )}
        </div>

        {/* Subject Strength Radar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strength Analysis</h3>
          {radarData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
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
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No strength data available yet
            </div>
          )}
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject-wise Performance</h3>
        {subjectWiseData.length > 0 ? (
          <>
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
                <Bar dataKey="correct" name="Correct" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="incorrect" name="Incorrect" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="unattempted" name="Unattempted" fill="#6b7280" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-gray-500">
            No subject-wise data available yet
          </div>
        )}
      </div>

      {/* Recent Test History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {showAllTests ? 'All Test History' : 'Recent Test History'}
          </h3>
          {recentTests.length > 3 && (
            <button 
              onClick={toggleTestView}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors duration-200"
            >
              {showAllTests ? 'Show Recent' : 'View All'}
            </button>
          )}
        </div>

        {recentTests.length > 0 ? (
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
                {getDisplayedTests().map((test) => (
                  <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{test.name}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {new Date(test.date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
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
                      <button 
                        onClick={() => window.location.href = `/dashboard/analysis/${test.id}`}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-gray-500">
            No recent tests available. Start taking tests to see your history!
          </div>
        )}

        {/* Show count information when in limited view */}
        {recentTests.length > 3 && !showAllTests && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Showing 3 of {recentTests.length} tests
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPage;