import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Award, 
  BarChart3, 
  PieChart, 
  Download, 
  Share2, 
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  BookOpen,
  Star,
  Zap,
  Calendar,
  FileText,
  Medal,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ChevronRight,
  Activity,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

const ExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [animatedValues, setAnimatedValues] = useState({
    totalMarks: 0,
    percentile: 0,
    rank: 0
  });

  // Get data from navigation state
  const navigationData = location.state || {};
  const {
    submissionId,
    scoreData,
    subjectWiseData,
    answers,
    questions,
    timeTaken,
    examData,
    isLocalSubmission
  } = navigationData;

  // Redirect if no data is available
  useEffect(() => {
    if (!scoreData || !examData) {
      navigate('/engineering-exams');
    }
  }, [scoreData, examData, navigate]);

  // Calculate percentile (mock calculation - you might want to implement actual percentile logic)
  const calculatePercentile = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    // This is a mock calculation - replace with actual percentile logic
    if (percentage >= 90) return 95.5;
    if (percentage >= 80) return 88.2;
    if (percentage >= 70) return 75.8;
    if (percentage >= 60) return 62.4;
    if (percentage >= 50) return 48.9;
    return 35.2;
  };

  // Calculate rank (mock calculation - you might want to implement actual rank logic)
  const calculateRank = (percentile, totalCandidates = 875432) => {
    return Math.floor(totalCandidates * (100 - percentile) / 100);
  };

  // Prepare results data from scoreData
  const results = {
    totalMarks: scoreData?.totalScore || 0,
    totalCorrect: scoreData?.correctAnswers || 0,
    totalIncorrect: scoreData?.incorrectAnswers || 0,
    totalUnattempted: scoreData?.unattempted || 0,
    percentile: calculatePercentile(scoreData?.totalScore || 0, examData?.totalMarks || 300),
    rank: 0, // Will be calculated after percentile
    totalCandidates: 875432, // Mock value - replace with actual data
    cutoffMarks: examData?.cutoff || 89,
    timeSpent: formatTime(timeTaken),
    completionRate: ((scoreData?.totalQuestions - scoreData?.unattempted) / scoreData?.totalQuestions * 100).toFixed(1),
    subjects: {}
  };

  // Calculate rank based on percentile
  results.rank = calculateRank(results.percentile);

  // Process subject-wise data
  if (subjectWiseData && examData?.subject) {
    examData.subject.forEach(subjectInfo => {
      const subjectName = subjectInfo.name;
      const subjectData = subjectWiseData[subjectName] || {
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        total: 0,
        marks: 0
      };

      results.subjects[subjectName] = {
        correct: subjectData.correct,
        incorrect: subjectData.incorrect,
        unattempted: subjectData.unattempted,
        marks: subjectData.marks,
        maxMarks: subjectInfo.marks || 100,
        percentile: calculatePercentile(subjectData.marks, subjectInfo.marks || 100),
        averageTime: calculateAverageTime(subjectData.total, timeTaken),
        topicWise: generateTopicWiseData(subjectName, subjectData)
      };
    });
  }

  // Format time helper
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Calculate average time per question
  function calculateAverageTime(totalQuestions, totalTimeInSeconds) {
    if (totalQuestions === 0) return '0 min';
    const avgSeconds = totalTimeInSeconds / totalQuestions;
    const avgMinutes = (avgSeconds / 60).toFixed(1);
    return `${avgMinutes} min`;
  }

  // Generate topic-wise data (mock implementation - customize based on your needs)
  function generateTopicWiseData(subjectName, subjectData) {
    // This is a simplified version - you might want to implement actual topic analysis
    const topics = {
      Physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics'],
      Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
      Mathematics: ['Algebra', 'Calculus', 'Coordinate Geometry']
    };

    const subjectTopics = topics[subjectName] || [];
    const topicData = {};

    subjectTopics.forEach((topic, index) => {
      const proportion = 1 / subjectTopics.length;
      topicData[topic] = {
        correct: Math.floor(subjectData.correct * proportion),
        total: Math.floor(subjectData.total * proportion),
        marks: Math.floor(subjectData.marks * proportion)
      };
    });

    return topicData;
  }

  // Animation effect for key metrics
  useEffect(() => {
    const animateValues = () => {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        const progress = currentStep / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setAnimatedValues({
          totalMarks: Math.floor(results.totalMarks * easeOut),
          percentile: (results.percentile * easeOut).toFixed(1),
          rank: Math.floor(results.rank * easeOut)
        });
        
        currentStep++;
        if (currentStep > steps) {
          clearInterval(interval);
          setAnimatedValues({
            totalMarks: results.totalMarks,
            percentile: results.percentile,
            rank: results.rank
          });
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    };
    
    const timer = setTimeout(animateValues, 500);
    return () => clearTimeout(timer);
  }, [results.totalMarks, results.percentile, results.rank]);

  // Calculate accuracy
  const calculateAccuracy = (correct, incorrect) => {
    const attempted = correct + incorrect;
    return attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : 0;
  };

  // Get grade based on percentage
  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-50' };
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (percentage >= 60) return { grade: 'B', color: 'text-indigo-600', bg: 'bg-indigo-50' };
    if (percentage >= 50) return { grade: 'C+', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { grade: 'C', color: 'text-orange-600', bg: 'bg-orange-50' };
  };

  const overallPercentage = ((results.totalMarks / (examData?.totalMarks || 300)) * 100).toFixed(1);
  const overallGrade = getGrade(overallPercentage);

  // Circular progress component
  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color = "#3b82f6" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2;
    const dash = (percentage * circumference) / 100;
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
        </div>
      </div>
    );
  };

  // Show loading if data is not available
  if (!scoreData || !examData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{examData?.name || 'Exam'} Results</h1>
                <p className="text-sm text-gray-500">
                  {examData?.shift || 'Test'} • {new Date().toLocaleDateString()}
                  {isLocalSubmission && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      <AlertCircle className="w-3 h-3 inline mr-1" />
                      Offline Submission
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2 inline" />
                Download
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="w-4 h-4 mr-2 inline" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Score */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">SCORE</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">{animatedValues.totalMarks}</div>
              <div className="text-sm text-gray-500">out of {examData?.totalMarks || 300}</div>
              <div className="text-xs text-green-600 font-medium">
                {results.totalMarks > results.cutoffMarks ? 
                  `+${results.totalMarks - results.cutoffMarks} above cutoff` : 
                  `${results.cutoffMarks - results.totalMarks} below cutoff`}
              </div>
            </div>
          </div>

          {/* Percentile */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">PERCENTILE</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">{animatedValues.percentile}%</div>
              <div className="text-sm text-gray-500">Top {(100 - results.percentile).toFixed(1)}%</div>
              <div className="text-xs text-emerald-600 font-medium">
                {results.percentile >= 90 ? 'Excellent performance' : 
                 results.percentile >= 70 ? 'Good performance' : 
                 'Keep improving'}
              </div>
            </div>
          </div>

          {/* Rank */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Medal className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">RANK</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">{animatedValues.rank?.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Estimated Rank</div>
              <div className="text-xs text-purple-600 font-medium">Among {results.totalCandidates.toLocaleString()} candidates</div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">COMPLETION</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-gray-900">{results.completionRate}%</div>
              <div className="text-sm text-gray-500">{results.totalCorrect + results.totalIncorrect} attempted</div>
              <div className="text-xs text-orange-600 font-medium">{results.totalUnattempted} unattempted</div>
            </div>
          </div>
        </div>

        {/* Performance Overview with Circular Progress */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${overallGrade.bg} ${overallGrade.color}`}>
              Grade {overallGrade.grade}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Circular Progress Chart */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <CircularProgress 
                  percentage={parseFloat(overallPercentage)} 
                  size={160} 
                  strokeWidth={12}
                  color="#3b82f6"
                />
                <div className="mt-4">
                  <div className="text-lg font-semibold text-gray-900">Overall Score</div>
                  <div className="text-sm text-gray-500">{overallPercentage}% of total marks</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Correct Answers</div>
                    <div className="text-sm text-gray-600">Well done!</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{results.totalCorrect}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Incorrect Answers</div>
                    <div className="text-sm text-gray-600">Room for improvement</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-red-600">{results.totalIncorrect}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Accuracy Rate</div>
                    <div className="text-sm text-gray-600">Overall precision</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {calculateAccuracy(results.totalCorrect, results.totalIncorrect)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject-wise Performance */}
        {Object.keys(results.subjects).length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Subject-wise Analysis</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {Object.entries(results.subjects).map(([subject, data], index) => {
                const percentage = ((data.marks / data.maxMarks) * 100).toFixed(1);
                const grade = getGrade(percentage);
                const accuracy = calculateAccuracy(data.correct, data.incorrect);
                const colors = ['blue', 'emerald', 'purple'][index % 3];
                
                return (
                  <div key={subject} className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-colors">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-900">{subject}</h3>
                      <div className={`px-2 py-1 rounded-lg text-xs font-medium ${grade.bg} ${grade.color}`}>
                        {grade.grade}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Score</span>
                        <span className="font-bold text-gray-900">{data.marks}/{data.maxMarks}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Percentage</span>
                        <span className="font-semibold text-gray-800">{percentage}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Percentile</span>
                        <span className={`font-semibold text-${colors}-600`}>{data.percentile.toFixed(1)}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Accuracy</span>
                        <span className="font-semibold text-emerald-600">{accuracy}%</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="pt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-${colors}-500 transition-all duration-1000 ease-out`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <div className="text-lg font-bold text-emerald-600">{data.correct}</div>
                          <div className="text-xs text-gray-500">Correct</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">{data.incorrect}</div>
                          <div className="text-xs text-gray-500">Wrong</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-500">{data.unattempted}</div>
                          <div className="text-xs text-gray-500">Skipped</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Topic-wise Analysis (Collapsible) */}
        {Object.keys(results.subjects).length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Topic-wise Analysis</h2>
              <button
                onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {showDetailedAnalysis ? 'Hide Details' : 'Show Details'}
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${showDetailedAnalysis ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {showDetailedAnalysis && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-gray-100">
                {Object.entries(results.subjects).map(([subject, data]) => (
                  <div key={subject} className="space-y-4">
                    <h3 className="font-bold text-gray-900 pb-2 border-b border-gray-200">{subject}</h3>
                    {Object.entries(data.topicWise || {}).map(([topic, topicData]) => {
                      const topicAccuracy = topicData.total > 0 ? ((topicData.correct / topicData.total) * 100).toFixed(0) : 0;
                      return (
                        <div key={topic} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex justify-between items-start mb-3">
                            <span className="font-medium text-gray-800 text-sm">{topic}</span>
                            <span className="text-xs font-bold text-gray-600 bg-white px-2 py-1 rounded">
                              {topicData.correct}/{topicData.total}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm mb-2">
                            <span className="text-gray-600">Accuracy: {topicAccuracy}%</span>
                            <span className="font-semibold text-blue-600">Marks: {topicData.marks}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full transition-all duration-1000 ${
                                topicAccuracy >= 80 ? 'bg-emerald-500' :
                                topicAccuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${topicAccuracy}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Key Strengths</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <ArrowUp className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-emerald-800">Excellent Chemistry Performance</div>
                  <div className="text-sm text-emerald-700">Scored 87/100 with 94.1 percentile</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <ArrowUp className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-emerald-800">High Overall Accuracy</div>
                  <div className="text-sm text-emerald-700">Maintained {calculateAccuracy(results.totalCorrect, results.totalIncorrect)}% accuracy rate</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                <ArrowUp className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-emerald-800">Strong in Organic Chemistry</div>
                  <div className="text-sm text-emerald-700">Near perfect score of 29/30 marks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <Target className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Growth Areas</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <TrendingDown className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-orange-800">Physics Mechanics</div>
                  <div className="text-sm text-orange-700">Focus on problem-solving techniques</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <TrendingDown className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-orange-800">Mathematics Accuracy</div>
                  <div className="text-sm text-orange-700">Review calculation errors in Calculus</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-orange-800">Time Management</div>
                  <div className="text-sm text-orange-700">Reduce unattempted questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
              <FileText className="w-5 h-5 mr-2" />
              Detailed Report
            </button>
            
            <button className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
              <Download className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            
            <button className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
              <BarChart3 className="w-5 h-5 mr-2" />
              Compare Results
            </button>
            
            <button className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            onClick={() => navigate('/dashboard')}
            >
              <Home className="w-5 h-5 mr-2" />
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResult;