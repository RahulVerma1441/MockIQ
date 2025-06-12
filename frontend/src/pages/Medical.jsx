import React from 'react';
import { Heart, Calendar, Users, Trophy, ArrowRight, Clock, Target, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Medical = () => {
  const navigate = useNavigate();
  const examCards = [
    {
      id: 'neet-ug',
      title: 'NEET UG',
      subtitle: 'National Eligibility cum Entrance Test',
      description: 'Single entrance exam for admission to medical and dental colleges across India',
      examDate: 'May 2024',
      duration: '3 hours 20 minutes',
      totalQuestions: '200 Questions',
      subjects: ['Physics', 'Chemistry', 'Biology '],
      difficulty: 'High',
      attempts: '1 attempt per year',
      gradient: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
      stats: {
        mockTests: 52,
        students: '18L+',
        successRate: '89%'
      }
    },
    // {
    //   id: 'aiims',
    //   title: 'AIIMS',
    //   subtitle: 'All India Institute of Medical Sciences',
    //   description: 'Premier medical entrance exam for AIIMS institutes across India',
    //   examDate: 'May 2024',
    //   duration: '3 hours 30 minutes',
    //   totalQuestions: '200 Questions',
    //   subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge', 'Logical Thinking'],
    //   difficulty: 'Very High',
    //   attempts: '1 attempt per year',
    //   gradient: 'from-emerald-500 to-teal-600',
    //   bgColor: 'bg-emerald-50',
    //   iconColor: 'text-emerald-600',
    //   borderColor: 'border-emerald-200',
    //   stats: {
    //     mockTests: 42,
    //     students: '3.2L+',
    //     successRate: '94%'
    //   }
    // },
    // {
    //   id: 'jipmer',
    //   title: 'JIPMER',
    //   subtitle: 'Jawaharlal Institute of Postgraduate Medical Education',
    //   description: 'Entrance exam for JIPMER Puducherry and Karaikal campuses',
    //   examDate: 'Jun 2024',
    //   duration: '2 hours 30 minutes',
    //   totalQuestions: '200 Questions',
    //   subjects: ['Physics', 'Chemistry', 'Biology', 'English & Logical Reasoning'],
    //   difficulty: 'High',
    //   attempts: '1 attempt per year',
    //   gradient: 'from-blue-500 to-cyan-600',
    //   bgColor: 'bg-blue-50',
    //   iconColor: 'text-blue-600',
    //   borderColor: 'border-blue-200',
    //   stats: {
    //     mockTests: 35,
    //     students: '1.5L+',
    //     successRate: '91%'
    //   }
    // },
    // {
    //   id: 'wbneet',
    //   title: 'WB NEET',
    //   subtitle: 'West Bengal National Eligibility cum Entrance Test',
    //   description: 'State counseling process for NEET qualified candidates in West Bengal',
    //   examDate: 'Post NEET Results',
    //   duration: 'Counseling Process',
    //   totalQuestions: 'Based on NEET Score',
    //   subjects: ['NEET Score Based', 'State Quota Counseling'],
    //   difficulty: 'Moderate',
    //   attempts: 'Multiple Rounds',
    //   gradient: 'from-orange-500 to-amber-600',
    //   bgColor: 'bg-orange-50',
    //   iconColor: 'text-orange-600',
    //   borderColor: 'border-orange-200',
    //   stats: {
    //     mockTests: 28,
    //     students: '2.1L+',
    //     successRate: '86%'
    //   }
    // }
  ];

    // Handle navigation to exam papers page
  const handleStartPreparation = (examTitle) => {
    navigate('/medical-exams', { 
      state: { selectedExam: examTitle } 
    });
  };

  // Handle free mock test navigation
  const handleFreeMockTest = () => {
    navigate('/medical-exams');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          {/* <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-red-600" />
          </div> */}
          <h1 className="text-3xl font-bold text-gray-900">Medical Entrance Exams</h1>
        </div>
        <p className="text-gray-600 text-lg">Your gateway to becoming a doctor - comprehensive preparation for medical entrance examinations</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Mock Tests</p>
              <p className="text-2xl font-bold text-gray-900">157</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aspiring Doctors</p>
              <p className="text-2xl font-bold text-gray-900">24.8L+</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Selection Rate</p>
              <p className="text-2xl font-bold text-gray-900">90%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Score Improvement</p>
              <p className="text-2xl font-bold text-gray-900">+38%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <Heart className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Questions</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{exam.totalQuestions}</span>
                </div>
                
                {/* <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Difficulty</span>
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${exam.difficulty === 'Very High' ? 'bg-red-100 text-red-700' : exam.difficulty === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {exam.difficulty}
                  </span>
                </div> */}
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
              <button 
                className={`w-full bg-gradient-to-r ${exam.gradient} text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}
                onClick={() => handleStartPreparation(exam.title)}
              >
                <span>Start Preparation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Success Stories Section */}
      {/* <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AIIMS Delhi</h3>
            <p className="text-sm text-gray-600">2,847 students got selected in AIIMS through our platform</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Government Medical Colleges</h3>
            <p className="text-sm text-gray-600">15,623 students secured seats in government medical colleges</p>
          </div>
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Private Medical Colleges</h3>
            <p className="text-sm text-gray-600">8,456 students got admission in top private medical colleges</p>
          </div>
        </div>
      </div> */}

      {/* Bottom CTA Section */}
      <div className="mt-12 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Become a Doctor?</h2>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          Join thousands of successful medical students who achieved their dream of becoming doctors with our expert-designed preparation courses
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-red-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          onClick={() => handleFreeMockTest()}
          >
            Take Free Mock Test
          </button>
          {/* <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-300">
            View Study Plans
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Medical;