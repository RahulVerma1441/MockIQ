import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Calendar, Clock, FileText, Download, Eye } from 'lucide-react';

const EnigineeringExams = () => {
  const location = useLocation();
  const [selectedExam, setSelectedExam] = useState('JEE Main');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Set selected exam from navigation state if available
  useEffect(() => {
    if (location.state?.selectedExam) {
      setSelectedExam(location.state.selectedExam);
    }
  }, [location.state]);

  const exams = [
    { id: 'jee-main', name: 'JEE Main', color: 'bg-blue-500' },
    { id: 'jee-advanced', name: 'JEE Advanced', color: 'bg-purple-500' },
    { id: 'wbjee', name: 'WBJEE', color: 'bg-green-500' }
  ];

  const papers = {
    'JEE Main': [
      { year: 2024, session: 'January', shift: 'Shift 1', date: '24 Jan 2024', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2024, session: 'January', shift: 'Shift 2', date: '25 Jan 2024', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2024, session: 'April', shift: 'Shift 1', date: '4 Apr 2024', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2024, session: 'April', shift: 'Shift 2', date: '5 Apr 2024', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2023, session: 'January', shift: 'Shift 1', date: '24 Jan 2023', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2023, session: 'January', shift: 'Shift 2', date: '25 Jan 2023', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2023, session: 'April', shift: 'Shift 1', date: '6 Apr 2023', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2022, session: 'June', shift: 'Shift 1', date: '23 Jun 2022', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2022, session: 'June', shift: 'Shift 2', date: '24 Jun 2022', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2021, session: 'February', shift: 'Shift 1', date: '23 Feb 2021', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' }
    ],
    'JEE Advanced': [
      { year: 2024, session: 'May', shift: 'Paper 1', date: '26 May 2024', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2024, session: 'May', shift: 'Paper 2', date: '26 May 2024', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2023, session: 'June', shift: 'Paper 1', date: '4 Jun 2023', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2023, session: 'June', shift: 'Paper 2', date: '4 Jun 2023', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2022, session: 'August', shift: 'Paper 1', date: '28 Aug 2022', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2022, session: 'August', shift: 'Paper 2', date: '28 Aug 2022', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2021, session: 'July', shift: 'Paper 1', date: '3 Jul 2021', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' },
      { year: 2021, session: 'July', shift: 'Paper 2', date: '3 Jul 2021', subjects: ['Physics', 'Chemistry', 'Mathematics'], duration: '3 hours' }
    ],
    'WBJEE': [
      { year: 2024, session: 'April', shift: 'Paper 1', date: '28 Apr 2024', subjects: ['Physics', 'Chemistry'], duration: '2 hours' },
      { year: 2024, session: 'April', shift: 'Paper 2', date: '28 Apr 2024', subjects: ['Mathematics'], duration: '1.5 hours' },
      { year: 2023, session: 'April', shift: 'Paper 1', date: '30 Apr 2023', subjects: ['Physics', 'Chemistry'], duration: '2 hours' },
      { year: 2023, session: 'April', shift: 'Paper 2', date: '30 Apr 2023', subjects: ['Mathematics'], duration: '1.5 hours' },
      { year: 2022, session: 'July', shift: 'Paper 1', date: '17 Jul 2022', subjects: ['Physics', 'Chemistry'], duration: '2 hours' },
      { year: 2022, session: 'July', shift: 'Paper 2', date: '17 Jul 2022', subjects: ['Mathematics'], duration: '1.5 hours' },
      { year: 2021, session: 'July', shift: 'Paper 1', date: '11 Jul 2021', subjects: ['Physics', 'Chemistry'], duration: '2 hours' },
      { year: 2021, session: 'July', shift: 'Paper 2', date: '11 Jul 2021', subjects: ['Mathematics'], duration: '1.5 hours' }
    ]
  };

  const filteredPapers = papers[selectedExam] || [];
  const selectedExamData = exams.find(exam => exam.name === selectedExam);

  // Group papers by year for better organization
  const groupedPapers = filteredPapers.reduce((acc, paper) => {
    if (!acc[paper.year]) {
      acc[paper.year] = [];
    }
    acc[paper.year].push(paper);
    return acc;
  }, {});

  const years = Object.keys(groupedPapers).sort((a, b) => b - a);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsDropdownOpen(false);
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
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
        {/* Exam Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Examination
          </label>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full max-w-md px-4 py-3 text-left bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ${
                selectedExamData ? `border-${selectedExamData.color.split('-')[1]}-200` : 'border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {selectedExamData && (
                    <div className={`w-3 h-3 rounded-full ${selectedExamData.color}`}></div>
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
                    key={exam.id}
                    onClick={() => {
                      setSelectedExam(exam.name);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${exam.color}`}></div>
                      <span className="font-medium text-gray-900">{exam.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${selectedExamData?.color || 'bg-blue-500'} bg-opacity-10`}>
                <FileText className={`w-6 h-6 ${selectedExamData?.color.replace('bg-', 'text-') || 'text-blue-500'}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{filteredPapers.length}</p>
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
                <p className="text-sm text-gray-600">{Math.max(...years)} Papers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Papers List */}
        <div className="space-y-6">
          {years.map((year) => (
            <div key={year} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className={`px-6 py-4 ${selectedExamData?.color || 'bg-blue-500'} bg-opacity-10`}>
                <h3 className="text-xl font-bold text-gray-900">{year}</h3>
                <p className="text-sm text-gray-600">{groupedPapers[year].length} papers available</p>
              </div>
              
              <div className="divide-y divide-gray-100">
                {groupedPapers[year].map((paper, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {paper.session} {paper.shift}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedExamData?.color || 'bg-blue-500'} bg-opacity-10 ${selectedExamData?.color.replace('bg-', 'text-') || 'text-blue-500'}`}>
                            {selectedExam}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{paper.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{paper.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-4 h-4" />
                            <span>{paper.subjects.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">Preview</span>
                        </button>
                        <button className={`flex items-center space-x-2 px-4 py-2 text-white ${selectedExamData?.color || 'bg-blue-500'} hover:opacity-90 rounded-lg transition-all duration-150`}>
                          <Download className="w-4 h-4" />
                          <span className="font-medium">Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
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

export default EnigineeringExams;