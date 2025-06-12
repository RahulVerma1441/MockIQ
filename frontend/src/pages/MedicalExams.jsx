import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, Clock, FileText, Download, Eye } from 'lucide-react';

const MedicalExams = () => {
  const [selectedExam, setSelectedExam] = useState('NEET UG');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const exams = [
    { id: 'neet-ug', name: 'NEET UG', color: 'bg-red-500' },
    // { id: 'neet-pg', name: 'NEET PG', color: 'bg-pink-500' },
    // { id: 'aiims', name: 'AIIMS', color: 'bg-indigo-500' },
    // { id: 'jipmer', name: 'JIPMER', color: 'bg-teal-500' }
  ];

  const papers = {
    'NEET UG': [
      { year: 2024, session: 'May', shift: 'Phase 1', date: '5 May 2024', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '3 hours 20 minutes' },
      { year: 2024, session: 'May', shift: 'Phase 2', date: '5 May 2024', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '3 hours 20 minutes' },
      { year: 2023, session: 'May', shift: 'Single Phase', date: '7 May 2023', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '3 hours 20 minutes' },
      { year: 2022, session: 'July', shift: 'Phase 1', date: '17 Jul 2022', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '3 hours 20 minutes' },
      { year: 2022, session: 'July', shift: 'Phase 2', date: '17 Jul 2022', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '3 hours 20 minutes' },
      { year: 2021, session: 'September', shift: 'Single Phase', date: '12 Sep 2021', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '3 hours 20 minutes' },
      { year: 2020, session: 'September', shift: 'Single Phase', date: '13 Sep 2020', subjects: ['Physics', 'Chemistry', 'Biology'], duration: '3 hours 20 minutes' }
    ],
    // 'NEET PG': [
    //   { year: 2024, session: 'August', shift: 'Single Phase', date: '11 Aug 2024', subjects: ['Pre-clinical', 'Para-clinical', 'Clinical'], duration: '3 hours 30 minutes' },
    //   { year: 2023, session: 'March', shift: 'Single Phase', date: '5 Mar 2023', subjects: ['Pre-clinical', 'Para-clinical', 'Clinical'], duration: '3 hours 30 minutes' },
    //   { year: 2022, session: 'May', shift: 'Single Phase', date: '21 May 2022', subjects: ['Pre-clinical', 'Para-clinical', 'Clinical'], duration: '3 hours 30 minutes' },
    //   { year: 2021, session: 'September', shift: 'Single Phase', date: '11 Sep 2021', subjects: ['Pre-clinical', 'Para-clinical', 'Clinical'], duration: '3 hours 30 minutes' }
    // ],
    // 'AIIMS': [
    //   { year: 2023, session: 'May', shift: 'Phase 1', date: '20 May 2023', subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'], duration: '3 hours 30 minutes' },
    //   { year: 2023, session: 'May', shift: 'Phase 2', date: '21 May 2023', subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'], duration: '3 hours 30 minutes' },
    //   { year: 2022, session: 'June', shift: 'Phase 1', date: '12 Jun 2022', subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'], duration: '3 hours 30 minutes' },
    //   { year: 2021, session: 'February', shift: 'Phase 1', date: '20 Feb 2021', subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'], duration: '3 hours 30 minutes' }
    // ],
    // 'JIPMER': [
    //   { year: 2023, session: 'June', shift: 'Phase 1', date: '4 Jun 2023', subjects: ['Physics', 'Chemistry', 'Biology', 'English'], duration: '2 hours 30 minutes' },
    //   { year: 2022, session: 'July', shift: 'Phase 1', date: '6 Jul 2022', subjects: ['Physics', 'Chemistry', 'Biology', 'English'], duration: '2 hours 30 minutes' },
    //   { year: 2021, session: 'August', shift: 'Phase 1', date: '1 Aug 2021', subjects: ['Physics', 'Chemistry', 'Biology', 'English'], duration: '2 hours 30 minutes' }
    // ]
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Previous Year Papers</h1>
              <p className="text-gray-600 mt-2">Practice with authentic exam papers to boost your medical preparation</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">MockIQ</div>
              <div className="text-lg font-semibold text-gray-900">Medical Prep</div>
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
              } focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
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
              <div className={`p-3 rounded-lg ${selectedExamData?.color || 'bg-red-500'} bg-opacity-10`}>
                <FileText className={`w-6 h-6 ${selectedExamData?.color.replace('bg-', 'text-') || 'text-red-500'}`} />
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
              <div className={`px-6 py-4 ${selectedExamData?.color || 'bg-red-500'} bg-opacity-10`}>
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
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedExamData?.color || 'bg-red-500'} bg-opacity-10 ${selectedExamData?.color.replace('bg-', 'text-') || 'text-red-500'}`}>
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
                        {/* <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150">
                          <Eye className="w-4 h-4" />
                          <span className="font-medium">Preview</span>
                        </button> */}
                        <button className={`flex items-center space-x-2 px-8 py-2 text-white ${selectedExamData?.color || 'bg-red-500'} hover:opacity-90 rounded-lg transition-all duration-150`}>
                          {/* <Download className="w-4 h-4" /> */}
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

export default MedicalExams;