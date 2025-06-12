import React, { useState, useEffect } from 'react';
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
  Shield,
  Menu,
  X,
  Flag,
  RotateCcw,
  Send
} from 'lucide-react';

const ExamInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([1]));
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('Physics');

  // Sample exam data
  const examDetails = {
    examName: 'JEE Main',
    shift: 'January Shift 1',
    year: 2024,
    totalQuestions: 90,
    subjects: [
      { name: 'Physics', range: [1, 30] },
      { name: 'Chemistry', range: [31, 60] },
      { name: 'Mathematics', range: [61, 90] }
    ]
  };

  // Sample questions data
  const questions = {
    1: {
      subject: 'Physics',
      question: "A particle moves in a circular path of radius 0.5 m with constant angular velocity of 2 rad/s. What is the magnitude of centripetal acceleration of the particle?",
      options: [
        "1.0 m/s²",
        "2.0 m/s²",
        "4.0 m/s²",
        "0.5 m/s²"
      ],
      type: "single"
    },
    2: {
      subject: 'Physics',
      question: "Which of the following compounds has the highest boiling point?",
      options: [
        "CH₄ (Methane)",
        "C₂H₆ (Ethane)",
        "C₃H₈ (Propane)",
        "C₄H₁₀ (Butane)"
      ],
      type: "single"
    },
    31: {
      subject: 'Chemistry',
      question: "Which of the following compounds has the highest boiling point?",
      options: [
        "CH₄ (Methane)",
        "C₂H₆ (Ethane)",
        "C₃H₈ (Propane)",
        "C₄H₁₀ (Butane)"
      ],
      type: "single"
    },
    61: {
      subject: 'Mathematics',
      question: "If f(x) = x² + 2x + 1, then f'(x) is equal to:",
      options: [
        "2x + 2",
        "x² + 2",
        "2x + 1",
        "x + 2"
      ],
      type: "single"
    }
  };

  // Enter fullscreen on component mount
  useEffect(() => {
    const enterFullscreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    };

    enterFullscreen();

    // Prevent accidental page exit
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your test progress will be lost.';
      return e.returnValue;
    };

    const handleKeyDown = (e) => {
      // Prevent F11, Alt+Tab, etc.
      if (e.key === 'F11' || (e.altKey && e.key === 'Tab') || 
          (e.ctrlKey && (e.key === 'w' || e.key === 'W'))) {
        e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update current subject based on current question
  useEffect(() => {
    const subject = examDetails.subjects.find(s => 
      currentQuestion >= s.range[0] && currentQuestion <= s.range[1]
    );
    if (subject) {
      setCurrentSubject(subject.name);
    }
  }, [currentQuestion]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto-submit when time expires
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current subject questions range
  const getCurrentSubjectRange = () => {
    const subject = examDetails.subjects.find(s => s.name === currentSubject);
    return subject ? subject.range : [1, 30];
  };

  // Get question status
  const getQuestionStatus = (questionNum) => {
    const isAnswered = answers[questionNum] !== undefined;
    const isMarkedForReview = markedForReview.has(questionNum);
    const isVisited = visitedQuestions.has(questionNum);

    if (isAnswered && isMarkedForReview) return 'answered-marked';
    if (isAnswered) return 'answered';
    if (isMarkedForReview) return 'marked';
    if (isVisited) return 'not-answered';
    return 'not-visited';
  };

  // Get status color and style
  const getStatusStyle = (status) => {
    const styles = {
      'answered': 'bg-green-600 text-white',
      'not-answered': 'bg-red-600 text-white',
      'not-visited': 'bg-gray-400 text-white',
      'marked': 'bg-purple-600 text-white',
      'answered-marked': 'bg-purple-600 text-white relative'
    };
    return styles[status] || styles['not-visited'];
  };

  // Navigation functions
  const goToQuestion = (questionNum) => {
    setCurrentQuestion(questionNum);
    setVisitedQuestions(prev => new Set([...prev, questionNum]));
  };

  const goNext = () => {
    if (currentQuestion < examDetails.totalQuestions) {
      goToQuestion(currentQuestion + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 1) {
      goToQuestion(currentQuestion - 1);
    }
  };

  // Answer handling
  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleMarkForReview = () => {
    setMarkedForReview(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion];
      return newAnswers;
    });
  };

  const handleSubmitTest = () => {
    setShowSubmitConfirm(true);
  };

  const confirmSubmit = () => {
    // Exit fullscreen before submitting
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    alert('Test submitted successfully!');
    // Here you would typically send the answers to your backend
    console.log('Submitted answers:', answers);
    console.log('Marked for review:', Array.from(markedForReview));
  };

  // Question statistics for current subject
  const getSubjectQuestionStats = (subjectName) => {
    const subject = examDetails.subjects.find(s => s.name === subjectName);
    if (!subject) return { answered: 0, marked: 0, notAnswered: 0, notVisited: 0 };

    const [start, end] = subject.range;
    const subjectQuestions = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    
    const answered = subjectQuestions.filter(q => answers[q] !== undefined).length;
    const marked = subjectQuestions.filter(q => markedForReview.has(q)).length;
    const visited = subjectQuestions.filter(q => visitedQuestions.has(q)).length;
    const notAnswered = visited - answered;
    const notVisited = subjectQuestions.length - visited;

    return { answered, marked, notAnswered, notVisited };
  };

  const currentSubjectStats = getSubjectQuestionStats(currentSubject);
  const currentQ = questions[currentQuestion] || questions[1];
  const [rangeStart, rangeEnd] = getCurrentSubjectRange();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {showSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{examDetails.examName}</h1>
                <p className="text-base text-gray-600">{examDetails.shift} {examDetails.year}</p>
              </div>
            </div>
            
            {/* Timer */}
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-500 font-medium">Time Remaining</div>
                <div className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-blue-600'}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Question Area */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Question Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-base font-semibold ${
                    currentQ.subject === 'Physics' ? 'bg-blue-100 text-blue-700' :
                    currentQ.subject === 'Chemistry' ? 'bg-green-100 text-green-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {currentQ.subject}
                  </span>
                  <span className="text-base text-gray-600 font-medium">
                    Question {currentQuestion} of {examDetails.totalQuestions}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {markedForReview.has(currentQuestion) && (
                    <Flag className="w-6 h-6 text-purple-600" />
                  )}
                  {answers[currentQuestion] !== undefined && (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="mb-8">
                <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-5 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                      answers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={index}
                      checked={answers[currentQuestion] === index}
                      onChange={() => handleAnswerSelect(index)}
                      className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-4 text-gray-900 font-medium text-base">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleMarkForReview}
                    className={`px-6 py-3 rounded-lg font-semibold text-base transition-colors ${
                      markedForReview.has(currentQuestion)
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                    }`}
                  >
                    <Flag className="w-5 h-5 inline mr-2" />
                    {markedForReview.has(currentQuestion) ? 'Unmark' : 'Mark for Review'}
                  </button>
                  
                  <button
                    onClick={handleClearResponse}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold text-base hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-5 h-5 inline mr-2" />
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={goPrevious}
                    disabled={currentQuestion === 1}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold text-base hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-5 h-5 inline mr-2" />
                    Previous
                  </button>
                  
                  <button
                    onClick={goNext}
                    disabled={currentQuestion === examDetails.totalQuestions}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Question Palette */}
        <div className={`bg-white border-l-2 shadow-xl transition-all duration-300 ${
          showSidebar ? 'w-96' : 'w-0 overflow-hidden'
        } lg:w-96`}>
          <div className="p-6 h-full flex flex-col">
            {/* Subject Tabs */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Question Palette</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {examDetails.subjects.map((subject) => (
                  <button
                    key={subject.name}
                    onClick={() => {
                      setCurrentSubject(subject.name);
                      goToQuestion(subject.range[0]);
                    }}
                    className={`text-center p-3 rounded-lg transition-colors ${
                      currentSubject === subject.name
                        ? (subject.name === 'Physics' ? 'bg-blue-600 text-white' :
                           subject.name === 'Chemistry' ? 'bg-green-600 text-white' :
                           'bg-purple-600 text-white')
                        : (subject.name === 'Physics' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                           subject.name === 'Chemistry' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                           'bg-purple-100 text-purple-700 hover:bg-purple-200')
                    }`}
                  >
                    <div className="text-sm font-semibold">{subject.name}</div>
                    <div className="text-xs mt-1">
                      {subject.range[0]}-{subject.range[1]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Grid - Only Current Subject */}
            <div className="flex-1 overflow-y-auto">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  {currentSubject} Questions ({rangeStart}-{rangeEnd})
                </h4>
              </div>
              <div className="grid grid-cols-5 gap-3 mb-8 p-2">
                {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i).map(num => {
                  const status = getQuestionStatus(num);
                  return (
                    <button
                      key={num}
                      onClick={() => goToQuestion(num)}
                      className={`w-12 h-12 rounded-lg text-sm font-bold transition-all hover:scale-105 ${
                        getStatusStyle(status)
                      } ${currentQuestion === num ? 'ring-4 ring-offset-2 ring-blue-500' : ''}`}
                    >
                      {status === 'answered-marked' && (
                        <CheckCircle className="w-4 h-4 absolute top-0 right-0 transform translate-x-1 -translate-y-1" />
                      )}
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="border-t-2 pt-6 mb-6">
              <h4 className="text-base font-bold text-gray-900 mb-4">Legend</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-600 rounded"></div>
                    <span className="font-medium">Answered</span>
                  </div>
                  <span className="font-bold text-green-600">({currentSubjectStats.answered})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-red-600 rounded"></div>
                    <span className="font-medium">Not Answered</span>
                  </div>
                  <span className="font-bold text-red-600">({currentSubjectStats.notAnswered})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                    <span className="font-medium">Not Visited</span>
                  </div>
                  <span className="font-bold text-gray-600">({currentSubjectStats.notVisited})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-purple-600 rounded"></div>
                    <span className="font-medium">Marked for Review</span>
                  </div>
                  <span className="font-bold text-purple-600">({currentSubjectStats.marked})</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitTest}
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-base hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Send className="w-5 h-5 inline mr-2" />
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex items-center space-x-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h3 className="text-xl font-bold text-gray-900">Confirm Submission</h3>
            </div>
            <p className="text-gray-700 mb-8 text-base">
              Are you sure you want to submit the test? You won't be able to make any changes after submission.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold text-base"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="flex-1 py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold text-base"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInterface;