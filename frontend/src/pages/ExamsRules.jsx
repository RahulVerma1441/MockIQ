import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Monitor,
  ArrowLeft,
  ArrowRight,
  Book,
  Calculator,
  Info,
  Shield
} from 'lucide-react';

const ExamRules = () => {
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [canStart, setCanStart] = useState(false);
  const navigate= useNavigate();
  // Navigation function - replace with your routing logic
  

  // Sample exam details - you can pass these as props
  const examDetails = {
    examName: 'JEE Main',
    shift: 'January Shift 1',
    year: 2024,
    date: '24 Jan 2024',
    duration: '3 hours',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    totalQuestions: 90,
    totalMarks: 300
  };

  // Auto enter fullscreen on component mount
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (error) {
        console.log('Fullscreen not supported or denied:', error);
      }
    };

    enterFullscreen();

    // Exit fullscreen on component unmount
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(console.error);
      }
    };
  }, []);

  // Countdown timer for start button
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanStart(true);
    }
  }, [timeLeft]);

  const handleStartTest = () => {
    if (canStart && agreedToRules) {
      alert('Starting test! This is where you would navigate to the test page.');
      console.log('Test started with details:', examDetails);
    }
  };

  const handleGoBack = () => {
    // Exit fullscreen when going back
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    }
    navigate("/engineering-exams");
  };

  const rules = [
    {
      category: "Test Duration & Timing",
      icon: <Clock className="w-6 h-6" />,
      color: "blue",
      items: [
        { text: `Total duration: ${examDetails.duration}`, highlight: true },
        { text: "The test will auto-submit when time expires", important: true },
        { text: "You can view remaining time in the top-right corner" },
        { text: "No additional time will be given for any reason", important: true }
      ]
    },
    {
      category: "Question Pattern & Marking Scheme",
      icon: <FileText className="w-6 h-6" />,
      color: "green",
      items: [
        { text: `Total questions: ${examDetails.totalQuestions}`, highlight: true },
        { text: `Total marks: ${examDetails.totalMarks}`, highlight: true },
        { text: "Each correct answer: +4 marks", positive: true },
        { text: "Each incorrect answer: -1 mark (negative marking)", negative: true },
        { text: "Unanswered questions: 0 marks" }
      ]
    },
    {
      category: "Navigation & Submission",
      icon: <Monitor className="w-6 h-6" />,
      color: "purple",
      items: [
        { text: "You can navigate between questions using Next/Previous buttons" },
        { text: "Mark questions for review using the 'Mark for Review' option" },
        { text: "You can change your answers anytime before submission" },
        { text: "Click 'Submit Test' to end the exam early" },
        { text: "Ensure stable internet connection throughout the test", important: true }
      ]
    }
  ];

  const examInfo = [
    { label: "Exam", value: examDetails.examName, icon: <Book className="w-5 h-5" /> },
    { label: "Paper", value: `${examDetails.shift} ${examDetails.year}`, icon: <FileText className="w-5 h-5" /> },
    { label: "Date", value: examDetails.date, icon: <Clock className="w-5 h-5" /> },
    { label: "Duration", value: examDetails.duration, icon: <Clock className="w-5 h-5" /> },
    { label: "Subjects", value: examDetails.subjects.join(", "), icon: <Calculator className="w-5 h-5" /> }
  ];

  // NTA-style question status indicators
  const questionStatusIndicators = [
    {
      status: "Answered",
      color: "bg-green-600",
      description: "Question attempted and answered",
      textColor: "text-green-800"
    },
    {
      status: "Not Answered",
      color: "bg-red-600",
      description: "Question visited but not answered",
      textColor: "text-red-800"
    },
    {
      status: "Not Visited",
      color: "bg-gray-400",
      description: "Question not visited yet",
      textColor: "text-gray-800"
    },
    {
      status: "Marked for Review",
      color: "bg-purple-600",
      description: "Question marked for review (not answered)",
      textColor: "text-purple-800"
    },
    {
      status: "Answered & Marked for Review",
      color: "bg-purple-600 relative",
      description: "Question answered and marked for review",
      textColor: "text-purple-800",
      hasCheck: true
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      green: "bg-green-50 border-green-200 text-green-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700"
    };
    return colorMap[color] || "bg-blue-50 border-blue-200 text-blue-700";
  };

  const getTextStyles = (item) => {
    let classes = "text-base text-gray-800";
    
    if (item.highlight) classes += " font-semibold text-blue-700";
    else if (item.important) classes += " font-medium text-red-600";
    else if (item.positive) classes += " font-medium text-green-600";
    else if (item.negative) classes += " font-medium text-red-600";
    
    return classes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleGoBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Test Instructions</h1>
                <p className="text-base text-gray-600 font-medium">{examDetails.examName} - {examDetails.shift}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 font-medium">MockIQ</div>
              <div className="text-xl font-bold text-blue-600">Engineering Prep</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Important Notice */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-r-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-7 h-7 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">⚠️ Important Instructions</h3>
                  <p className="text-base text-yellow-700 leading-relaxed">
                    Please read all instructions carefully before starting the test. 
                    Once started, you <span className="font-semibold">cannot pause or restart</span> the examination.
                  </p>
                </div>
              </div>
            </div>

            {/* Rules Sections */}
            {rules.map((section, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className={`px-6 py-4 border-b ${getColorClasses(section.color)}`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{section.category}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className={getTextStyles(item)}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Question Status Legend */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Monitor className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Question Status Indicators</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {questionStatusIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="relative">
                        <div className={`w-8 h-8 ${indicator.color} rounded-sm flex items-center justify-center shadow-sm`}>
                          {indicator.hasCheck && (
                            <CheckCircle className="w-5 h-5 text-white absolute" />
                          )}
                        </div>
                      </div>
                      <div>
                        <div className={`text-base font-semibold ${indicator.textColor}`}>
                          {indicator.status}
                        </div>
                        <div className="text-sm text-gray-600">
                          {indicator.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agreement Checkbox */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={agreedToRules}
                  onChange={(e) => setAgreedToRules(e.target.checked)}
                  className="mt-2 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="agreement" className="text-base text-gray-700 cursor-pointer leading-relaxed">
                  I have read and understood all the instructions and rules mentioned above. 
                  I agree to abide by these rules during the examination and understand that 
                  <span className="font-semibold text-red-600"> violation may result in disqualification</span>.
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exam Details */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-bold text-white">Exam Details</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {examInfo.map((info, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <div className="p-1 bg-gray-100 rounded">
                        {info.icon}
                      </div>
                      <span className="text-base font-medium">{info.label}</span>
                    </div>
                    <span className="text-base font-semibold text-gray-900 text-right">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-bold text-red-800 mb-2">Security Notice</h4>
                  <p className="text-sm text-red-700 leading-relaxed">
                    This test is monitored for security. Tab switching or leaving fullscreen 
                    may be tracked and could affect your test validity.
                  </p>
                </div>
              </div>
            </div>

            {/* Start Test Button */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
              <button
                onClick={handleStartTest}
                disabled={!canStart || !agreedToRules}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 ${
                  canStart && agreedToRules
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg'
                    : 'bg-gray-400 cursor-not-allowed shadow-sm'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  {!canStart ? (
                    <>
                      <Clock className="w-5 h-5" />
                      <span>Please wait {timeLeft}s</span>
                    </>
                  ) : !agreedToRules ? (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      <span>Accept Rules to Continue</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      <span>Start Test</span>
                    </>
                  )}
                </div>
              </button>
              
              {!canStart && (
                <p className="text-sm text-gray-500 text-center mt-3 font-medium">
                  Please read the instructions carefully while you wait
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamRules;