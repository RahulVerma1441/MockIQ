import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  Clock, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  ArrowRight,
  Book,
  Info,
  Menu,
  X,
  Eye,
  EyeOff,
  Home,
  BarChart2,
  Check,
  Loader,
  Award
} from 'lucide-react';

const TestAnalysisPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentSubject, setCurrentSubject] = useState('Physics');
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { testId } = useParams();
  
  // State for test data
  const [testData, setTestData] = useState(null);
  const [questions, setQuestions] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [testDetails, setTestDetails] = useState(null);

  // Get test ID from params or location state
  const submissionId = testId || location.state?.submissionId;

  // Fetch test analysis data
  useEffect(() => {
    const fetchTestAnalysis = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
  
        // If data is passed through navigation state (optional - for optimization)
        if (location.state && location.state.questions && location.state.answers) {
          setQuestions(location.state.questions);
          setUserAnswers(location.state.answers);
          setTestDetails(location.state.examData);
          setTestData({
            scoreData: location.state.scoreData,
            subjectWiseData: location.state.subjectWiseData,
            timeTaken: location.state.timeTaken
          });
        } else if (submissionId) {
          // Fetch from API using the new endpoint
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const response = await fetch(`${apiUrl}/api/submissions/test-analysis/${submissionId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch test analysis');
          }
  
          const data = await response.json();
          
          if (data.success) {
            setQuestions(data.questions);
            setUserAnswers(data.userAnswers);
            setTestDetails(data.testDetails);
            setTestData({
              scoreData: data.scoreData,
              subjectWiseData: data.subjectWiseData,
              timeTaken: data.timeTaken,
              submittedAt: data.submittedAt,
              markedForReview: data.markedForReview
            });
          } else {
            throw new Error(data.message || 'Failed to load test data');
          }
        } else {
          throw new Error('No test submission ID provided');
        }
  
      } catch (err) {
        console.error('Error fetching test analysis:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTestAnalysis();
  }, [submissionId, location.state, navigate]);

  // Update current subject based on current question
  useEffect(() => {
    if (!testDetails || !testDetails.subject) return;
    
    const subject = testDetails.subject.find(s => 
      currentQuestion >= s.range[0] && currentQuestion <= s.range[1]
    );
    if (subject) {
      setCurrentSubject(subject.name);
    }
  }, [currentQuestion, testDetails]);

  // Get current subject questions range
  const getCurrentSubjectRange = () => {
    if (!testDetails || !testDetails.subject) return [1, 30];
    
    const subject = testDetails.subject.find(s => s.name === currentSubject);
    return subject ? subject.range : [1, 30];
  };

  // Convert answer to indices for comparison
  const convertAnswerToIndices = (answer, questionType) => {
    if (!answer || answer === '') return [];
    
    const letterMapping = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    
    if (questionType === 'Numerical') {
      return answer;
    }
    
    if (questionType === 'Multiple Correct') {
      let answers = [];
      
      // Handle different formats of answers
      if (Array.isArray(answer)) {
        answers = answer;
      } else if (typeof answer === 'string') {
        // Handle formats like "A,C" or "A, C" or "0,2"
        answers = answer.split(',').map(a => a.trim());
      } else {
        answers = [answer.toString()];
      }
      
      return answers.map(ans => {
        const ansStr = ans.toString().trim();
        // Check if it's a letter
        if (letterMapping[ansStr.toUpperCase()] !== undefined) {
          return letterMapping[ansStr.toUpperCase()];
        }
        // Check if it's already a number
        const num = parseInt(ansStr);
        return !isNaN(num) ? num : -1;
      }).filter(idx => idx !== -1);
    } else {
      // Single answer
      const ans = answer.toString().trim();
      if (letterMapping[ans.toUpperCase()] !== undefined) {
        return [letterMapping[ans.toUpperCase()]];
      }
      const num = parseInt(ans);
      return !isNaN(num) ? [num] : [];
    }
  };

  // Convert correct answer to indices
  const convertCorrectAnswerToIndices = (correctAnswer, questionType) => {
    if (questionType === 'Numerical') {
      return correctAnswer;
    }
    
    const letterMapping = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    
    if (questionType === 'Multiple Correct') {
      let answers = [];
      
      // Handle different formats of correct answers
      if (Array.isArray(correctAnswer)) {
        answers = correctAnswer;
      } else if (typeof correctAnswer === 'string') {
        // Handle formats like "A,C" or "A, C" or "0,2"
        answers = correctAnswer.split(',').map(a => a.trim());
      } else {
        answers = [correctAnswer.toString()];
      }
      
      return answers.map(ans => {
        const ansStr = ans.toString().trim();
        // Check if it's a letter
        if (letterMapping[ansStr.toUpperCase()] !== undefined) {
          return letterMapping[ansStr.toUpperCase()];
        }
        // Check if it's already a number
        const num = parseInt(ansStr);
        return !isNaN(num) ? num : -1;
      }).filter(idx => idx !== -1);
    } else {
      // Single answer
      const ans = correctAnswer.toString().trim();
      if (letterMapping[ans.toUpperCase()] !== undefined) {
        return [letterMapping[ans.toUpperCase()]];
      }
      const num = parseInt(ans);
      return !isNaN(num) ? [num] : [];
    }
  };

  // Check if user's answer is correct
  const checkIfCorrect = (questionNum) => {
    const userAnswer = userAnswers[questionNum];
    const question = questions[questionNum];
    
    if (!question || userAnswer === undefined || userAnswer === '' || userAnswer === null) {
      return false;
    }

    if (question.type === 'Numerical') {
      const userNum = parseFloat(userAnswer);
      const correctNum = parseFloat(question.correctAnswer);
      
      if (isNaN(userNum) || isNaN(correctNum)) return false;
      
      const tolerance = 0.01;
      return Math.abs(userNum - correctNum) <= tolerance;
    } else if (question.type === 'Multiple Correct') {
      const userIndices = convertAnswerToIndices(userAnswer, question.type);
      const correctIndices = convertCorrectAnswerToIndices(question.correctAnswer, question.type);
      
      if (userIndices.length !== correctIndices.length) return false;
      
      const sortedUser = [...userIndices].sort();
      const sortedCorrect = [...correctIndices].sort();
      
      return JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
    } else {
      // Single correct
      const userIndices = convertAnswerToIndices(userAnswer, question.type);
      const correctIndices = convertCorrectAnswerToIndices(question.correctAnswer, question.type);
      
      return userIndices.length > 0 && correctIndices.length > 0 && userIndices[0] === correctIndices[0];
    }
  };

  // Get question status for analysis view
  const getQuestionStatus = (questionNum) => {
    const userAnswer = userAnswers[questionNum];
    const question = questions[questionNum];
    
    if (!question) return 'not-visited';
    
    const isCorrect = checkIfCorrect(questionNum);
    
    if (userAnswer !== undefined && userAnswer !== '' && userAnswer !== null) {
      return isCorrect ? 'correct' : 'incorrect';
    }
    
    return 'unattempted';
  };

  // Get marks obtained for current question
  const getQuestionMarks = (questionNum) => {
    const question = questions[questionNum];
    const userAnswer = userAnswers[questionNum];
    
    if (!question) return 0;
    
    const isCorrect = checkIfCorrect(questionNum);
    const isAttempted = userAnswer !== undefined && userAnswer !== '' && userAnswer !== null;
    
    let fullMarks = 4;
    let negativeMarks = 1;
    
    if (question.marks) {
      if (typeof question.marks === 'object') {
        fullMarks = question.marks.positive || 4;
        negativeMarks = Math.abs(question.marks.negative) || 1;
      } else {
        fullMarks = question.marks;
      }
    }
    
    if (question.negativeMarks) {
      if (typeof question.negativeMarks === 'object') {
        negativeMarks = Math.abs(question.negativeMarks.negative) || 1;
      } else {
        negativeMarks = Math.abs(question.negativeMarks);
      }
    }
    
    if (isCorrect) {
      return fullMarks;
    } else if (isAttempted && !isCorrect) {
      return -negativeMarks;
    } else {
      return 0;
    }
  };

  // Get status color and style for analysis view
  const getStatusStyle = (status) => {
    const styles = {
      'correct': 'bg-green-600 text-white relative',
      'incorrect': 'bg-red-600 text-white relative',
      'unattempted': 'bg-gray-400 text-white',
      'not-visited': 'bg-gray-400 text-white'
    };
    return styles[status] || styles['not-visited'];
  };

  // Navigation functions
  const goToQuestion = (questionNum) => {
    setCurrentQuestion(questionNum);
    setShowExplanation(false);
  };

  const goNext = () => {
    if (testDetails && currentQuestion < testDetails.totalQuestions) {
      goToQuestion(currentQuestion + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 1) {
      goToQuestion(currentQuestion - 1);
    }
  };

  // Get subject statistics
  const getSubjectStats = (subjectName) => {
    if (!testDetails || !testDetails.subject) {
      return { correct: 0, incorrect: 0, unattempted: 0 };
    }
    
    const subject = testDetails.subject.find(s => s.name === subjectName);
    if (!subject) return { correct: 0, incorrect: 0, unattempted: 0 };

    const [start, end] = subject.range;
    let correct = 0, incorrect = 0, unattempted = 0;
    
    for (let i = start; i <= end; i++) {
      const status = getQuestionStatus(i);
      if (status === 'correct') correct++;
      else if (status === 'incorrect') incorrect++;
      else unattempted++;
    }

    return { correct, incorrect, unattempted };
  };

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper function to get option text safely
  const getOptionText = (option) => {
    if (typeof option === 'string') {
      return option;
    }
    if (typeof option === 'object' && option !== null) {
      return option.optionText || option.text || option.option || '';
    }
    return '';
  };

  // Get user answer display text
//   const getUserAnswerText = (questionNum) => {
//     const userAnswer = userAnswers[questionNum];
//     const question = questions[questionNum];
    
//     if (!userAnswer || userAnswer === '') return 'Not Attempted';
    
//     if (question?.type === 'Numerical') {
//       return userAnswer.toString();
//     }
    
//     return userAnswer.toString();
//   };

  // Get correct answer display text
//   const getCorrectAnswerText = (questionNum) => {
//     const question = questions[questionNum];
    
//     if (!question) return '';
    
//     if (question.type === 'Numerical') {
//       return question.correctAnswer.toString();
//     }
    
//     return question.correctAnswer.toString();
//   };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <Loader className="animate-spin h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Test Analysis...</h2>
          <p className="text-gray-600">Please wait while we prepare your results</p>
        </div>
      </div>
    );
  }

  if (error || !questions || Object.keys(questions).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Analysis</h2>
          <p className="text-gray-600 mb-4">{error || 'No test data available'}</p>
          <button
            onClick={() => navigate('/analysis')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Analysis
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion] || {};
  const userAnswer = userAnswers[currentQuestion];
  const isCorrect = checkIfCorrect(currentQuestion);
  const currentSubjectStats = getSubjectStats(currentSubject);
  const [rangeStart, rangeEnd] = getCurrentSubjectRange();
  const questionMarks = getQuestionMarks(currentQuestion);
  
  // Get user and correct answer indices for display
//   const userAnswerIndices = convertAnswerToIndices(userAnswer, currentQ.type);
//   const correctAnswerIndices = convertCorrectAnswerToIndices(currentQ.correctAnswer, currentQ.type);

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
                <h1 className="text-xl font-bold text-gray-900">Test Analysis - {testDetails?.examName || 'Loading...'}</h1>
                <p className="text-base text-gray-600">{testDetails?.shift} {testDetails?.year}</p>
              </div>
            </div>
            
            {/* Score and Time Info */}
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-500 font-medium">Your Score</div>
                <div className="text-2xl font-bold text-blue-600">
                  {testData?.scoreData?.score || 0}/{testData?.scoreData?.totalMarks || 360}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 font-medium">Time Taken</div>
                <div className="text-lg font-semibold text-gray-700">
                  {formatTime(testData?.timeTaken || 0)}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
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
                    Question {currentQuestion} of {testDetails?.totalQuestions || 90}
                  </span>
                  {currentQ.type === 'Multiple Correct' && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      Multiple Correct
                    </span>
                  )}
                  {currentQ.type === 'Numerical' && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                      Numerical
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  {/* Marks Display */}
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-gray-600" />
                    <span className={`font-bold text-lg ${
                      questionMarks > 0 ? 'text-green-600' : 
                      questionMarks < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {questionMarks > 0 ? '+' : ''}{questionMarks} marks
                    </span>
                  </div>
                  {/* Status Display */}
                  {isCorrect ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold">Correct</span>
                    </div>
                  ) : userAnswer !== undefined && userAnswer !== '' ? (
                    <div className="flex items-center space-x-2 text-red-600">
                      <XCircle className="w-6 h-6" />
                      <span className="font-semibold">Incorrect</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <AlertTriangle className="w-6 h-6" />
                      <span className="font-semibold">Unattempted</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Question Content */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
              <div className="mb-8">
                <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options for Single/Multiple Choice */}
              {currentQ.type !== 'Numerical' && currentQ.options && (
                <div className="space-y-4">
                  {/* Answer Summary for Multiple Correct */}
                  {/* {currentQ.type === 'Multiple Correct' && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
                      <h4 className="font-semibold text-gray-900 mb-3">Answer Summary:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Your Answer:</span>
                          <div className={`mt-1 px-3 py-2 rounded-lg text-sm font-medium ${
                            userAnswer && userAnswer !== '' 
                              ? isCorrect 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {getUserAnswerText(currentQuestion)}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-600">Correct Answer:</span>
                          <div className="mt-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                            {getCorrectAnswerText(currentQuestion)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}

                  {currentQ.options.map((option, index) => {
                    const optionLetter = String.fromCharCode(65 + index);
                    const selectedLetters=typeof userAnswer === 'string'
                    ? userAnswer
                        .split(',')
                        .map(s => s.trim().toUpperCase())
                    : [];
                    const isUserSelected = selectedLetters.includes(optionLetter);
                    const correctLetters = typeof currentQ.correctAnswer === 'string'
                        ? currentQ.correctAnswer
                            .split(',')
                            .map(s => s.trim().toUpperCase())
                        : [];
                    const isCorrectOption = correctLetters.includes(optionLetter);
                    const hasUserAnswer = userAnswer !== undefined && userAnswer !== '' && userAnswer !== null;
                    
                    let borderColor = 'border-gray-200';
                    let bgColor = '';
                    let icons = [];

                    // Determine styling based on option status
                    if (currentQ.type === 'Multiple Correct') {
                      // For multiple correct questions
                      if (isCorrectOption && isUserSelected) {
                        // User selected a correct option
                        borderColor = 'border-green-500';
                        bgColor = 'bg-green-50';
                        icons.push(<CheckCircle key="correct" className="w-5 h-5 text-green-600" />);
                      } else if (isCorrectOption && !isUserSelected) {
                        // Correct option that user didn't select
                        borderColor = 'border-green-500';
                        bgColor = 'bg-green-50';
                        icons.push(<CheckCircle key="correct" className="w-5 h-5 text-green-600" />);
                      } else if (!isCorrectOption && isUserSelected) {
                        // User selected an incorrect option
                        borderColor = 'border-red-500';
                        bgColor = 'bg-red-50';
                        icons.push(<XCircle key="incorrect" className="w-5 h-5 text-red-600" />);
                      }
                    } else {
                      // For single correct questions
                      if (isCorrectOption) {
                        borderColor = 'border-green-500';
                        bgColor = 'bg-green-50';
                        icons.push(<CheckCircle key="correct" className="w-5 h-5 text-green-600" />);
                      }
                      
                      if (hasUserAnswer && isUserSelected && !isCorrectOption) {
                        borderColor = 'border-red-500';
                        bgColor = 'bg-red-50';
                        icons = [<XCircle key="incorrect" className="w-5 h-5 text-red-600" />];
                      }
                    }

                    return (
                      <div
                        key={index}
                        className={`flex items-center p-5 border-2 rounded-lg ${borderColor} ${bgColor} transition-all`}
                      >
                        <div className="flex items-center flex-1">
                          <input
                            type={currentQ.type === 'Multiple Correct' ? 'checkbox' : 'radio'}
                            checked={isUserSelected}
                            disabled
                            className="w-5 h-5 text-blue-600 border-gray-300"
                          />
                          <span className="ml-4 text-gray-900 font-medium text-base">
                            {String.fromCharCode(65 + index)}. {getOptionText(option)}
                          </span>
                        </div>
                        {icons.length > 0 && (
                          <div className="ml-4 flex space-x-2">
                            {icons}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Numerical Answer Display */}
              {currentQ.type === 'Numerical' && (
                <div className="max-w-md space-y-4">
                  {/* User's Answer (if attempted) */}
                  {userAnswer !== undefined && userAnswer !== '' && userAnswer !== null && (
                    <div>
                      <label className="block mb-2">
                        <span className="text-gray-700 font-medium">Your Answer:</span>
                      </label>
                      <div className={`px-4 py-3 border-2 rounded-lg ${
                        isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium">
                            {userAnswer}
                          </span>
                          <span className="ml-3">
                            {isCorrect ? 
                              <CheckCircle className="w-5 h-5 text-green-600" /> : 
                              <XCircle className="w-5 h-5 text-red-600" />
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Correct Answer */}
                  <div>
                    <label className="block mb-2">
                      <span className="text-gray-700 font-medium">
                        {(!userAnswer || userAnswer === '' || userAnswer === null) 
                          ? 'Correct Answer (Not Attempted):' 
                          : 'Correct Answer:'
                        }
                      </span>
                    </label>
                    <div className="px-4 py-3 border-2 border-green-500 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-green-700">
                          {currentQ.correctAnswer}
                        </span>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>

                  {/* Show comparison for incorrect numerical answers */}
                  {userAnswer && !isCorrect && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="text-sm text-yellow-800">
                        <span className="font-medium">Note:</span> Your answer differs from the correct answer. 
                        For numerical questions, answers are compared with a tolerance of ±0.01.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Explanation Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="w-full flex items-center justify-between px-6 py-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Info className="w-5 h-5" />
                  <span className="font-semibold text-base">
                    {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                  </span>
                </div>
                {showExplanation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              
              {showExplanation && currentQ.explanation && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Explanation:</h3>
                  <p className="text-gray-700 leading-relaxed">{currentQ.explanation}</p>
                  
                  <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600">
                    <span className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Full Marks: {
                        typeof currentQ.marks === 'object' 
                          ? currentQ.marks.positive || 4 
                          : currentQ.marks || 4
                      }</span>
                    </span>
                    {(currentQ.negativeMarks || (currentQ.marks && typeof currentQ.marks === 'object' && currentQ.marks.negative)) && (
                      <span>Negative Marks: -{
                        typeof currentQ.marks === 'object' && currentQ.marks.negative
                          ? Math.abs(currentQ.marks.negative)
                          : typeof currentQ.negativeMarks === 'object'
                          ? Math.abs(currentQ.negativeMarks.negative)
                          : Math.abs(currentQ.negativeMarks) || 1
                      }</span>
                    )}
                    {currentQ.expectedTime && (
                      <span className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Expected Time: {Math.floor(currentQ.expectedTime / 60)} min {currentQ.expectedTime % 60} sec</span>
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={goPrevious}
                  disabled={currentQuestion === 1}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold text-base hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={goNext}
                  disabled={currentQuestion === (testDetails?.totalQuestions || 90)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
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
                {testDetails?.subject?.map(subject => (
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
                      {subject.range[0]} - {subject.range[1]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  {currentSubject} Questions ({rangeStart}-{rangeEnd})
                </h4>
              </div>
              <div className="grid grid-cols-5 gap-3 mb-8 p-2">
                {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i).map(num => {
                  const status = getQuestionStatus(num);
                  const statusIcon = status === 'correct' ? 
                    <Check className="w-3 h-3 absolute top-0.5 right-0.5" /> :
                    status === 'incorrect' ? 
                    <X className="w-3 h-3 absolute top-0.5 right-0.5" /> : null;

                  return (
                    <button
                      key={num}
                      onClick={() => goToQuestion(num)}
                      className={`w-12 h-12 rounded-lg text-sm font-bold transition-all hover:scale-105 ${
                        getStatusStyle(status)
                      } ${currentQuestion === num ? 'ring-4 ring-offset-2 ring-blue-500' : ''}`}
                    >
                      {statusIcon}
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
                    <div className="w-5 h-5 bg-green-600 rounded relative">
                      <Check className="w-3 h-3 text-white absolute top-1 left-1" />
                    </div>
                    <span className="font-medium">Correct</span>
                  </div>
                  <span className="font-bold text-green-600">({currentSubjectStats.correct})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-red-600 rounded relative">
                      <X className="w-3 h-3 text-white absolute top-1 left-1" />
                    </div>
                    <span className="font-medium">Incorrect</span>
                  </div>
                  <span className="font-bold text-red-600">({currentSubjectStats.incorrect})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-400 rounded"></div>
                    <span className="font-medium">Unattempted</span>
                  </div>
                  <span className="font-bold text-gray-600">({currentSubjectStats.unattempted})</span>
                </div>
              </div>
            </div>

            {/* Overall Performance Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Overall Performance</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Total Score:</span>
                  <span className="font-bold text-blue-900">
                    {testData?.scoreData?.score || 0}/{testData?.scoreData?.totalMarks || 360}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Percentage:</span>
                  <span className="font-bold text-blue-900">
                    {typeof testData?.scoreData?.percentage === 'number' 
                      ? testData.scoreData.percentage.toFixed(2) 
                      : testData?.scoreData?.percentage || 0}%
                  </span>
                </div>
                {testData?.scoreData?.rank && (
                  <div className="flex justify-between">
                    <span className="text-blue-700">Rank:</span>
                    <span className="font-bold text-blue-900">
                      #{testData.scoreData.rank}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAnalysisPage;