import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, Users, Trophy, ArrowRight, Clock, Target, Loader2 } from 'lucide-react';

const Engineering = () => {
  const navigate = useNavigate();
  const [examCards, setExamCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalMockTests: 0,
    activeStudents: '0',
    avgSuccessRate: '0%',
    avgImprovement: '+0%'
  });

  // Backend API base URL - adjust this to match your backend URL
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Fetch exams data from backend
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/exams`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && data.exams) {
          setExamCards(data.exams);
          calculateStats(data.exams);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError(err.message);
        // Fallback to hardcoded data if API fails
        setExamCards(getHardcodedExams());
        calculateStats(getHardcodedExams());
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Calculate aggregated stats from exams
  const calculateStats = (exams) => {
    if (!exams || exams.length === 0) return;

    const totalMockTests = exams.reduce((sum, exam) => sum + (exam.stats?.mockTests || 0), 0);
    const totalStudents = exams.reduce((sum, exam) => {
      const studentCount = exam.stats?.students || '0';
      // Convert string like "12L+" to number
      const numericValue = parseFloat(studentCount.replace(/[^0-9.]/g, ''));
      return sum + (numericValue || 0);
    }, 0);
    
    const avgSuccessRate = exams.reduce((sum, exam) => {
      const rate = parseFloat((exam.stats?.successRate || '0%').replace('%', ''));
      return sum + rate;
    }, 0) / exams.length;

    setStats({
      totalMockTests,
      activeStudents: `${totalStudents.toFixed(1)}L+`,
      avgSuccessRate: `${Math.round(avgSuccessRate)}%`,
      avgImprovement: '+42%' // This could be calculated from user performance data
    });
  };

  // Hardcoded fallback data (your original data)
  const getHardcodedExams = () => [
    {
      _id: 'jee-main',
      title: 'JEE Main',
      subtitle: 'Joint Entrance Examination - Main',
      description: 'Gateway to NITs, IIITs, and other premier engineering colleges',
      examDate: 'Jan & Apr 2024',
      duration: '3 hours',
      totalQuestions: '90 Questions',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      difficulty: 'Moderate',
      attempts: '2 attempts per year',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
      stats: {
        mockTests: 45,
        students: '12L+',
        successRate: '85%'
      }
    },
    {
      _id: 'jee-advanced',
      title: 'JEE Advanced',
      subtitle: 'Joint Entrance Examination - Advanced',
      description: 'Your pathway to IITs - the most prestigious engineering institutes',
      examDate: 'May 2024',
      duration: '6 hours (2 papers)',
      totalQuestions: '54 Questions',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      difficulty: 'Very High',
      attempts: '1 attempt per year',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200',
      stats: {
        mockTests: 38,
        students: '2.5L+',
        successRate: '92%'
      }
    },
    {
      _id: 'wbjee',
      title: 'WBJEE',
      subtitle: 'West Bengal Joint Entrance Examination',
      description: 'State-level exam for engineering and medical colleges in West Bengal',
      examDate: 'Apr 2024',
      duration: '2 hours',
      totalQuestions: '155 Questions',
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      difficulty: 'Moderate',
      attempts: '1 attempt per year',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200',
      stats: {
        mockTests: 32,
        students: '1.8L+',
        successRate: '78%'
      }
    }
  ];

  // Handle navigation to exam papers page
  const handleStartPreparation = (examTitle, examId) => {
    navigate('/engineering-exams', { 
      state: { 
        selectedExam: examTitle,
        examId: examId 
      } 
    });
  };

  // Handle free mock test navigation
  const handleFreeMockTest = () => {
    navigate('/engineering-exams');
  };

  // Loading state
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading engineering exams...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && examCards.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Exams</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Engineering Entrance Exams</h1>
        <p className="text-gray-600 text-lg">Prepare for top engineering entrance examinations with comprehensive study materials and mock tests</p>
        {error && (
          <div className="mt-2 text-sm text-yellow-600 bg-yellow-50 border border-yellow-200 rounded p-2">
            ⚠️ Using cached data due to connection issues
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Mock Tests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMockTests}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgSuccessRate}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Score Improvement</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgImprovement}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {examCards.map((exam) => (
          <div
            key={exam._id || exam.id}
            className={`bg-white rounded-2xl border-2 ${exam.borderColor} overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
          >
            {/* Card Header with Gradient */}
            <div className={`bg-gradient-to-r ${exam.gradient} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-1">{exam.title}</h3>
                <p className="text-white/90 text-sm font-medium">{exam.subtitle}</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{exam.description}</p>

              {/* Exam Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Exam Date</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{exam.examDate}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Duration</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{exam.duration}</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Questions</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{exam.totalQuestions}</span>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-3">Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {exam.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 ${exam.bgColor} ${exam.iconColor} text-xs font-medium rounded-full`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{exam.stats?.mockTests || 0}</p>
                  <p className="text-xs text-gray-600">Mock Tests</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{exam.stats?.students || '0'}</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{exam.stats?.successRate || '0%'}</p>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => handleStartPreparation(exam.title, exam._id || exam.id)}
                className={`w-full bg-gradient-to-r ${exam.gradient} text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}
              >
                <span>Start Preparation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Your Engineering Journey?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of successful students who cracked their engineering entrance exams with our comprehensive preparation platform
        </p>
        <button 
          onClick={handleFreeMockTest}
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
        >
          Take Free Mock Test
        </button>
      </div>
    </div>
  );
};

export default Engineering;