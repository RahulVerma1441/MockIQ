import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Send,
  Maximize
} from 'lucide-react';

const ExamInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([1]));
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('Physics');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const fullscreenRef = useRef(null);
  const navigate = useNavigate();
  
  // State for exam data from database
  const [examDetails, setExamDetails] = useState(null);
  const [questions, setQuestions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get exam data from navigation state or URL params
  const location = useLocation();
  const examData = location.state;
  const paperId = location.state?.paperId;

  // Fullscreen functions
  const enterFullscreen = async () => {
    try {
      const element = fullscreenRef.current || document.documentElement;
      
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      }
      setIsFullscreen(true);
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
      alert('Unable to enter fullscreen mode. Please manually press F11 to enter fullscreen.');
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      }
      setIsFullscreen(false);
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  };

  // Start exam function
  const startExam = async () => {
    await enterFullscreen();
    setExamStarted(true);
  };

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement
      );
      
      setIsFullscreen(isCurrentlyFullscreen);
      
      if (!isCurrentlyFullscreen && examStarted) {
        enterFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, [examStarted]);

  // Page exit prevention and security
  useEffect(() => {
    if (!examStarted) return;

    const handleBeforeUnload = (e) => {
      const message = 'Are you sure you want to leave? Your test progress will be lost.';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    const handleKeyDown = (e) => {
      if (
        e.key === 'F5' ||
        (e.ctrlKey && e.key === 'r') ||
        (e.ctrlKey && e.key === 'R') ||
        (e.ctrlKey && e.key === 'w') ||
        (e.ctrlKey && e.key === 'W') ||
        (e.ctrlKey && e.key === 't') ||
        (e.ctrlKey && e.key === 'T') ||
        (e.ctrlKey && e.key === 'n') ||
        (e.ctrlKey && e.key === 'N') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.shiftKey && e.key === 'j') ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 'U') ||
        e.key === 'F12' ||
        (e.altKey && e.key === 'Tab') ||
        (e.altKey && e.key === 'F4')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleVisibilityChange = () => {
      if (document.hidden && examStarted) {
        console.log('User switched away from exam window');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
    };
  }, [examStarted]);

  // Update current subject based on current question
  useEffect(() => {
    if (!examData || !examData.subject || !Array.isArray(examData.subject)) return;
    
    const subject = examData.subject.find(s => 
      s.range && Array.isArray(s.range) && s.range.length >= 2 &&
      currentQuestion >= s.range[0] && currentQuestion <= s.range[1]
    );
    if (subject) {
      setCurrentSubject(subject.name);
    }
  }, [currentQuestion, examData]);

  // Timer effect
  useEffect(() => {
    if (!examStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted]);

  // Fetch exam and question data
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        setError(null);

        // If exam data is passed from previous page
        if (examData) {
          setExamDetails(examData);
          
          // Only fetch questions if paperId exists
          if (paperId) {
            console.log('Fetching questions for paper:', paperId);
            
            try {
              // Build the correct API URL based on your backend structure
              const apiUrl = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
              const response = await fetch(`${apiUrl}/api/questions/paper/${paperId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  // Add any authentication headers if needed
                  // 'Authorization': `Bearer ${token}`,
                },
              });
              
              // Enhanced error handling
              if (!response.ok) {
                // Check if we got HTML instead of JSON (common 404 error)
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("text/html")) {
                  throw new Error(`API endpoint not found (${response.status}). Please check if your backend server is running and the API route exists.`);
                }
                
                // Try to get error message from response
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                try {
                  const errorData = await response.json();
                  errorMessage = errorData.message || errorMessage;
                } catch {
                  // If we can't parse JSON, use the status text
                }
                throw new Error(errorMessage);
              }
              
              // Check if response is JSON
              const contentType = response.headers.get("content-type");
              if (!contentType || !contentType.includes("application/json")) {
                const text = await response.text();
                throw new Error(`Server returned non-JSON response: ${text.substring(0, 200)}...`);
              }
              
              const questionsData = await response.json();
              console.log('Fetched questions successfully:', questionsData);
              
              // Transform questions from your API format to component format
              const questionsMap = {};
              questionsData.forEach(q => {
                // Handle both the format you showed and standard format
                const options = q.options ? 
                  (Array.isArray(q.options) ? q.options.map(opt => opt.optionText || opt) : []) :
                  [];
                
                questionsMap[q.questionNumber] = {
                  subject: q.subject,
                  question: q.questionText,
                  options: options,
                  type: q.questionType ? q.questionType.toLowerCase().replace(' ', '_') : 'single_choice',
                  correctAnswer: q.correctAnswer || 0,
                  explanation: q.explanation || q.solution?.steps?.join(' ') || '',
                  marks: q.marks || 4,
                  expectedTime: q.expectedTime || 120,
                  // Handle numerical questions
                  numericalRange: q.numericalRange || null
                };
              });
              
              setQuestions(questionsMap);
            } catch (fetchError) {
              console.warn('Failed to fetch questions from API:', fetchError);
              // Fall back to mock data
              console.log('Using mock data instead');
              const mockQuestions = generateMockQuestions();
              setQuestions(mockQuestions);
            }
          } else {
            // Use mock data if no paperId
            console.log('No paperId provided, using mock data');
            const mockQuestions = generateMockQuestions();
            setQuestions(mockQuestions);
          }
        } else {
          // No exam data provided, use mock data
          console.log('No exam data provided, using mock data');
          const mockExamData = {
            examName: "JEE Main 2024",
            shift: "Morning Shift",
            year: "2024",
            duration: 180,
            totalQuestions: 90,
            subject: [
              { name: "Physics", range: [1, 30] },
              { name: "Chemistry", range: [31, 60] },
              { name: "Mathematics", range: [61, 90] }
            ]
          };
          setExamDetails(mockExamData);
          
          const mockQuestions = generateMockQuestions();
          setQuestions(mockQuestions);
        }
        
        // Set timer from exam data
        if (examData?.duration) {
          setTimeLeft(examData.duration * 60); 
        } else {
          setTimeLeft(3 * 60 * 60); // Default to 3 hours
        }

        console.log('examDetails.subject:', examData.subject);
        console.log('Exam details:', examData);
        console.log('Is array:', Array.isArray(examData.subject));
        console.log('Subject structure:', examData.subject?.[0]);
        
      } catch (err) {
        console.error('Error fetching exam data:', err);
        setError(err.message);
        
        // As a last resort, try to load with mock data
        try {
          const mockExamData = {
            examName: "JEE Main 2024",
            shift: "Morning Shift",
            year: "2024",
            duration: 180,
            totalQuestions: 90,
            subject: [
              { name: "Physics", range: [1, 30] },
              { name: "Chemistry", range: [31, 60] },
              { name: "Mathematics", range: [61, 90] }
            ]
          };
          setExamDetails(mockExamData);
          setQuestions(generateMockQuestions());
          setTimeLeft(3 * 60 * 60);
          setError(null); // Clear error since we have fallback data
        } catch (mockError) {
          console.error('Even mock data failed:', mockError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examData, paperId]);

  // Helper function to generate mock questions
  const generateMockQuestions = () => {
    const mockQuestions = {};
    for (let i = 1; i <= 90; i++) {
      const subject = i <= 30 ? "Physics" : i <= 60 ? "Chemistry" : "Mathematics";
      mockQuestions[i] = {
        subject: subject,
        question: `This is a sample ${subject} question ${i}. What is the correct answer?`,
        options: [
          "Option A - First choice",
          "Option B - Second choice", 
          "Option C - Third choice",
          "Option D - Fourth choice"
        ],
        type: "single_choice",
        correctAnswer: 0,
        explanation: "This is a sample explanation",
        marks: 4,
        expectedTime: 120
      };
    }
    return mockQuestions;
  };

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get current subject questions range
  const getCurrentSubjectRange = () => {
    if (!examData || !examData.subject || !Array.isArray(examData.subject)) return [1, 30];
    
    const subject = examData.subject.find(s => 
      s.name === currentSubject && s.range && Array.isArray(s.range) && s.range.length >= 2
    );
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
    if (examData && currentQuestion < examData.totalQuestions) {
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

const confirmSubmit = async () => {
  try {
    if (isFullscreen) {
      await exitFullscreen();
    }
    
    // Calculate time taken
    const timeTaken = (examData?.duration * 60) - timeLeft;
    
    // Convert numerical answers to letters before sending to backend
    const convertAnswersToLetters = (answers) => {
      const letterMapping = {
        0: 'A', 1: 'B', 2: 'C', 3: 'D',
      };
      
      const convertedAnswers = {};
      
      Object.keys(answers).forEach(questionNum => {
        const answer = answers[questionNum];
        
        if (answer === null || answer === undefined || answer === '') {
          convertedAnswers[questionNum] = '';
        } else if (Array.isArray(answer)) {
          // For multiple correct questions
          convertedAnswers[questionNum] = answer
            .map(a => letterMapping[a] || String(a))
            .join(',');
        } else {
          // For single correct questions
          convertedAnswers[questionNum] = letterMapping[answer] || String(answer);
        }
      });
      
      return convertedAnswers;
    };
    
    // Convert answers to letter format
    const convertedAnswers = convertAnswersToLetters(answers);
    
    console.log('Original answers:', answers);
    console.log('Converted answers:', convertedAnswers);
    
    // Submit to backend
    if (paperId) {
      try {
        const submissionData = {
          paperId: paperId,
          answers: convertedAnswers,
          markedForReview: Array.from(markedForReview),
          timeTaken: timeTaken
        };
        
        console.log('Sending to server:', submissionData);
        
        const apiUrl = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/exams/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData)
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', errorText);
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('Server result:', result);
        
        if (result.success) {
          setExamStarted(false);
          navigate('/engineering-exams/rules/test-page/test-result', { 
            state: { 
              submissionId: result.submissionId,
              scoreData: result.scoreData,
              subjectWiseData: result.subjectWiseData,
              answers: convertedAnswers,
              questions: questions,
              timeTaken: timeTaken,
              examData: examData
            } 
          });
        } else {
          throw new Error(result.message || 'Failed to submit exam');
        }
      } catch (submitError) {
        console.error('Failed to submit to server:', submitError);
        alert('Failed to submit exam. Please try again or contact support.');
      }
    } else {
      alert('No paper ID found. Please restart the exam.');
    }
  } catch (error) {
    console.error('Error submitting exam:', error);
    alert('There was an error submitting your exam. Please try again.');
  }
};
  // Question statistics for current subject
  const getSubjectQuestionStats = (subjectName) => {
    if (!examData || !examData.subject || !Array.isArray(examData.subject)) {
      return { answered: 0, marked: 0, notAnswered: 0, notVisited: 0 };
    }
    
    const subject = examData.subject.find(s => 
      s.name === subjectName && s.range && Array.isArray(s.range) && s.range.length >= 2
    );
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

  const currentSubjectStats = examData ? getSubjectQuestionStats(currentSubject) : { answered: 0, marked: 0, notAnswered: 0, notVisited: 0 };
  const currentQ = questions[currentQuestion] || questions[1] || { 
    subject: 'Physics', 
    question: 'Loading question...', 
    options: ['Option A', 'Option B', 'Option C', 'Option D'], 
    type: 'single_choice' 
  };
  const [rangeStart, rangeEnd] = getCurrentSubjectRange();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Loading Exam...</h2>
          <p className="text-gray-600">Please wait while we prepare your exam</p>
        </div>
      </div>
    );
  }

  // Error state (only show if we couldn't load any data, including mock data)
  if (error && (!examData || Object.keys(questions).length === 0)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Exam</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Check if exam data is available
  if (!examData || Object.keys(questions).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <AlertTriangle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Exam Data</h2>
          <p className="text-gray-600 mb-4">Please select an exam to begin</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Show start screen if exam hasn't started
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <Monitor className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{examData.examName}</h1>
            <p className="text-lg text-gray-600">{examData.shift} {examData.year}</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Important Instructions:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• The exam will start in fullscreen mode for security</li>
                  <li>• Do not exit fullscreen or switch tabs during the exam</li>
                  <li>• Total duration: {Math.floor(timeLeft / 3600)} hours</li>
                  <li>• Total questions: {examData.totalQuestions}</li>
                  <li>• You can navigate between questions and mark them for review</li>
                </ul>
              </div>
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            <Maximize className="w-6 h-6" />
            <span>Start Exam</span>
          </button>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same...
  return (
    <div ref={fullscreenRef} className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fullscreen status indicator */}
      {!isFullscreen && (
        <div className="bg-red-600 text-white p-2 text-center font-semibold">
          ⚠️ Not in fullscreen mode - Click here to return to fullscreen
          <button onClick={enterFullscreen} className="ml-2 underline">
            Enter Fullscreen
          </button>
        </div>
      )}

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
                <h1 className="text-xl font-bold text-gray-900">{examData.examName}</h1>
                <p className="text-base text-gray-600">{examData.shift} {examData.year}</p>
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
                    Question {currentQuestion} of {examData.totalQuestions}
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
                    disabled={currentQuestion === examData.totalQuestions}
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
                {Array.isArray(examData.subject) &&
                  examData.subject.map(subject => (
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