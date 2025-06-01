import React from 'react';
import { BookOpen, Calendar, Users, Trophy, ArrowRight, Clock, Target } from 'lucide-react';

const Engineering = () => {
  const examCards = [
    {
      id: 'jee-main',
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
      id: 'jee-advanced',
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
      id: 'wbjee',
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

  return (

    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Engineering Entrance Exams</h1>
        <p className="text-gray-600 text-lg">Prepare for top engineering entrance examinations with comprehensive study materials and mock tests</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Mock Tests</p>
              <p className="text-2xl font-bold text-gray-900">115</p>
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
              <p className="text-2xl font-bold text-gray-900">16.3L+</p>
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
              <p className="text-2xl font-bold text-gray-900">85%</p>
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
              <p className="text-2xl font-bold text-gray-900">+42%</p>
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
            key={exam.id}
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
                  <p className="text-lg font-bold text-gray-900">{exam.stats.mockTests}</p>
                  <p className="text-xs text-gray-600">Mock Tests</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{exam.stats.students}</p>
                  <p className="text-xs text-gray-600">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{exam.stats.successRate}</p>
                  <p className="text-xs text-gray-600">Success Rate</p>
                </div>
              </div>

              {/* Action Button */}
              <button className={`w-full bg-gradient-to-r ${exam.gradient} text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}>
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
        <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          Take Free Mock Test
        </button>
      </div>
    </div>
  );
};

export default Engineering;