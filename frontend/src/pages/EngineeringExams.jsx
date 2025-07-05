import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Calendar, Clock, FileText, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EngineeringExams = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedExam, setSelectedExam] = useState('JEE Main');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(null);

  // API base URL - adjust this to match your backend URL
  const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Set selected exam from navigation state if available
  useEffect(() => {
    if (location.state?.selectedExam) {
      setSelectedExam(location.state.selectedExam);
    }
  }, [location.state]);

  // Fetch exams on component mount
  useEffect(() => {
    fetchExams();
  }, []);

  // Fetch papers when selected exam changes
  useEffect(() => {
    if (selectedExamId) {
      fetchPapers();
    }
  }, [selectedExamId]);

  const fetchExams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/exams?category=Engineering`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Exams API Response:', data);
      
      let examsList = [];
      if (data.success && Array.isArray(data.data)) {
        examsList = data.data;
      } else if (Array.isArray(data)) {
        examsList = data;
      } else if (data.exams && Array.isArray(data.exams)) {
        examsList = data.exams;
      } else {
        console.error('Invalid data structure:', data);
        throw new Error('Invalid response format from exams API');
      }
      
      if (examsList.length === 0) {
        setError('No engineering exams found');
        return;
      }
      
      setExams(examsList);
      
      let targetExam;
      if (location.state?.examId) {
        targetExam = examsList.find(exam => exam._id === location.state.examId);
      } else {
        targetExam = examsList.find(exam => exam.title === selectedExam) || examsList[0];
      }

      if (targetExam) {
        setSelectedExam(targetExam.title);
        setSelectedExamId(targetExam._id);
      }

      
    } catch (err) {
      console.error('Error fetching exams:', err);
      setError(`Failed to fetch exams: ${err.message}`);
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPapers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/papers/exam/${selectedExamId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Papers API Response:', data);
      
      if (data.success && Array.isArray(data.data)) {
        setPapers(data.data);
      } else if (Array.isArray(data)) {
        setPapers(data);
      } else {
        console.error('Invalid papers data structure:', data);
        setError(data.message || 'Failed to fetch papers - invalid response format');
        setPapers([]);
      }
      
    } catch (err) {
      console.error('Error fetching papers:', err);
      setError(`Failed to fetch papers: ${err.message}`);
      setPapers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExamChange = (exam) => {
    setSelectedExam(exam.title);
    setSelectedExamId(exam._id);
    setIsDropdownOpen(false);
  };

  // Helper function to get exam color (from old code)
  const getExamColor = (examTitle) => {
    const colorMap = {
      'JEE Main': 'bg-blue-500',
      'JEE Advanced': 'bg-purple-500',
      'WBJEE': 'bg-green-500',
      'BITSAT': 'bg-orange-500',
      'VITEEE': 'bg-red-500',
      'SRMJEEE': 'bg-indigo-500'
    };
    return colorMap[examTitle] || 'bg-blue-500';  // Default to blue
  };

  // Group papers by year for better organization
  const groupedPapers = papers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {});

  const years = Object.keys(groupedPapers).sort((a, b) => b - a);
  const selectedExamData = exams.find(exam => exam.title === selectedExam);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const handleStartTest = (paper) => {
    const examDetails = {
      examName: selectedExam,
      paperId: paper._id,
      shift: `${paper.session} ${paper.shift}`,
      year: paper.year,
      date: paper.examDate,
      duration: paper.duration || '3 hours', // fallback if duration is not provided
      subjects: paper.subjects || ['Physics', 'Chemistry', 'Mathematics'], // fallback subjects
      totalQuestions: paper.totalQuestions || 90, // fallback
      totalMarks: paper.totalMarks || 300, // fallback
      instructions: paper.instructions || [], // additional instructions if any
      // Additional fields that might be useful
      session: paper.session,
      examId: selectedExamId,
      markingScheme: {
        correct: 4,
        incorrect: -1,
        unanswered: 0
      }
    };
    
    console.log('Starting test with details:', examDetails);
    navigate("/engineering-exams/rules", { state: examDetails });
  };

  // Show loading state
  if (loading && exams.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading exams...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && exams.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <FileText className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Exams</h3>
            <p className="text-red-600 mb-4 text-sm">{error}</p>
            <button 
              onClick={fetchExams}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Original Style */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Previous Year Papers</h1>
              <p className="text-gray-600 mt-2">Practice with authentic exam papers to boost your preparation</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">MockIQ</div>
              <div className="text-lg font-semibold text-gray-900">Engineering Prep</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Exam Selector - Original Style */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Examination
          </label>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full max-w-md px-4 py-3 text-left bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                selectedExamData ? `border-${getExamColor(selectedExam).split('-')[1]}-200` : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedExamData && (
                    <div className={`w-3 h-3 rounded-full ${getExamColor(selectedExam)}`}></div>
                  )}
                  <span className="font-medium text-gray-900">{selectedExam}</span>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full max-w-md mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                {exams.map((exam) => (
                  <button
                    key={exam._id}
                    onClick={() => handleExamChange(exam)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getExamColor(exam.title)}`}></div>
                      <span className="font-medium text-gray-900">{exam.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Overview - Original Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${getExamColor(selectedExam)} bg-opacity-10`}>
                <FileText className={`w-6 h-6 ${getExamColor(selectedExam).replace('bg-', 'text-')}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{papers.length}</p>
                <p className="text-sm text-gray-600">Total Papers Available</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-green-100">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{years.length}</p>
                <p className="text-sm text-gray-600">Years Covered</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg bg-purple-100">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Latest</p>
                <p className="text-sm text-gray-600">{years.length > 0 ? Math.max(...years) : 'N/A'} Papers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading state for papers */}
        {loading && papers.length === 0 && selectedExamId && (
          <div className="text-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto mb-2" />
            <p className="text-gray-600">Loading papers for {selectedExam}...</p>
          </div>
        )}

        {/* Error state for papers */}
        {error && papers.length === 0 && selectedExamId && (
          <div className="text-center py-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
              <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Papers Found</h3>
              <p className="text-yellow-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Papers List - Original Style */}
        <div className="space-y-6">
          {years.map((year) => (
            <div key={year} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className={`px-6 py-4 ${getExamColor(selectedExam)} bg-opacity-10`}>
                <h3 className="text-xl font-bold text-gray-900">{year}</h3>
                <p className="text-sm text-gray-600">{groupedPapers[year].length} papers available</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {groupedPapers[year].map((paper) => (
                  <div key={paper._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {paper.session} {paper.shift}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getExamColor(selectedExam)} bg-opacity-10 ${getExamColor(selectedExam).replace('bg-', 'text-')}`}>
                            {selectedExam}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{paper.examDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{paper.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{paper.subjects && paper.subjects.length > 0 ? paper.subjects.join(', ') : 'All Subjects'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleStartTest(paper)}
                          className={`flex items-center space-x-2 px-8 py-2 text-white ${getExamColor(selectedExam)} hover:opacity-90 rounded-lg transition-all duration-150`}
                        >
                          <span className="font-medium">Start Test</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* No papers message - Original Style */}
        {papers.length === 0 && !loading && !error && selectedExamId && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No papers available</h3>
            <p className="text-gray-600">Papers for {selectedExam} will be added soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngineeringExams;