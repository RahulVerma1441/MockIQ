const Exam = require('../models/Exam');
const Paper = require('../models/Paper');
const Question = require('../models/Question');
const Submission = require('../models/Submission');

// Get all exams with optional category filtering
const getAllExams = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build query object
    let query = { isActive: true };
    
    // Add category filter if provided
    if (category) {
      query.category = category;
    }
    
    const exams = await Exam.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: exams.length,
      category: category || 'All',
      exams
    });
  } catch (error) {
    console.error('Get all exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exams',
      error: error.message
    });
  }
};

// Get exams by category (dedicated endpoint)
const getExamsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const exams = await Exam.find({ 
      category: category, 
      isActive: true 
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: exams.length,
      category,
      exams
    });
  } catch (error) {
    console.error('Get exams by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exams by category',
      error: error.message
    });
  }
};

// Get exam by ID
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.status(200).json({
      success: true,
      exam
    });
  } catch (error) {
    console.error('Get exam by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching exam',
      error: error.message
    });
  }
};

// Create new exam
const createExam = async (req, res) => {
  try {
    const examData = req.body;
    
    // Check if exam with same title already exists
    const existingExam = await Exam.findOne({ title: examData.title });
    if (existingExam) {
      return res.status(400).json({
        success: false,
        message: 'Exam with this title already exists'
      });
    }

    const exam = new Exam(examData);
    const savedExam = await exam.save();

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      exam: savedExam
    });
  } catch (error) {
    console.error('Create exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating exam',
      error: error.message
    });
  }
};

// Update exam
const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const exam = await Exam.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Exam updated successfully',
      exam
    });
  } catch (error) {
    console.error('Update exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating exam',
      error: error.message
    });
  }
};

// Delete exam
const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findByIdAndDelete(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Exam deleted successfully'
    });
  } catch (error) {
    console.error('Delete exam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting exam',
      error: error.message
    });
  }
};

// Seed initial exam data with categories
const seedExamsData = async (req, res) => {
  try {
    // Check if exams already exist
    const existingExams = await Exam.countDocuments();
    if (existingExams > 0) {
      return res.status(400).json({
        success: false,
        message: 'Exams data already exists. Use individual create/update endpoints.'
      });
    }

    // Default ENGINEERING exam data to seed
    const engineeringExams = [
      {
        title: 'JEE Main',
        subtitle: 'Joint Entrance Examination - Main',
        description: 'Gateway to NITs, IIITs, and other premier engineering colleges',
        category: 'Engineering',
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
        title: 'JEE Advanced',
        subtitle: 'Joint Entrance Examination - Advanced',
        description: 'Your pathway to IITs - the most prestigious engineering institutes',
        category: 'Engineering',
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
        title: 'WBJEE',
        subtitle: 'West Bengal Joint Entrance Examination',
        description: 'State-level exam for engineering and medical colleges in West Bengal',
        category: 'Engineering',
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

    // Default MEDICAL exam data to seed
    const medicalExams = [
      {
        title: 'NEET',
        subtitle: 'National Eligibility cum Entrance Test',
        description: 'National level medical entrance exam for MBBS and BDS admissions',
        category: 'Medical',
        examDate: 'May 2024',
        duration: '3 hours 20 minutes',
        totalQuestions: '180 Questions',
        subjects: ['Physics', 'Chemistry', 'Biology'],
        difficulty: 'Hard',
        attempts: '1 attempt per year',
        gradient: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-600',
        borderColor: 'border-red-200',
        stats: {
          mockTests: 50,
          students: '18L+',
          successRate: '82%'
        }
      },
      {
        title: 'AIIMS',
        subtitle: 'All India Institute of Medical Sciences',
        description: 'Entrance exam for AIIMS medical colleges across India',
        category: 'Medical',
        examDate: 'June 2024',
        duration: '3 hours',
        totalQuestions: '200 Questions',
        subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'],
        difficulty: 'Very High',
        attempts: '1 attempt per year',
        gradient: 'from-indigo-500 to-indigo-600',
        bgColor: 'bg-indigo-50',
        iconColor: 'text-indigo-600',
        borderColor: 'border-indigo-200',
        stats: {
          mockTests: 42,
          students: '5L+',
          successRate: '95%'
        }
      }
    ];

    // Combine all exams
    const allExams = [...engineeringExams, ...medicalExams];
    const createdExams = await Exam.insertMany(allExams);

    res.status(201).json({
      success: true,
      message: 'Exam data seeded successfully',
      count: createdExams.length,
      engineeringCount: engineeringExams.length,
      medicalCount: medicalExams.length,
      exams: createdExams
    });
  } catch (error) {
    console.error('Seed exams error:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding exam data',
      error: error.message
    });
  }
};

// Get all available categories
const getCategories = async (req, res) => {
  try {
    const categories = await Exam.distinct('category', { isActive: true });
    
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
};

// Simplified calculateScoreAndAnalysis function - Optimized version
const calculateScoreAndAnalysis = (answers, questions, markedForReview = []) => {
  let totalScore = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unattempted = 0;
  const subjects = {};
  
  // Create a map of questions for O(1) lookup
  const questionMap = {};
  questions.forEach(q => {
    questionMap[q.questionNumber] = q;
    // Initialize subject tracking
    const subject = q.subject || 'General';
    if (!subjects[subject]) {
      subjects[subject] = {
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        total: 0,
        marks: 0,
        accuracy: 0
      };
    }
    subjects[subject].total++;
  });
  
  // Track which questions have been processed
  const processedQuestions = new Set();
  
  // Process all answered questions (only iterate over answers)
  Object.entries(answers).forEach(([questionNumber, userAnswer]) => {
    const qNum = parseInt(questionNumber);
    const question = questionMap[qNum];
    
    if (!question) {
      console.warn(`Question ${qNum} not found in database`);
      return;
    }
    
    processedQuestions.add(qNum);
    const subject = question.subject || 'General';
    
    // Check if answer is empty (unattempted)
    if (userAnswer === null || userAnswer === undefined || userAnswer === '' || 
        (typeof userAnswer === 'string' && userAnswer.trim() === '')) {
      unattempted++;
      subjects[subject].unattempted++;
      return;
    }
    
    // Question is attempted - check if correct
    let isCorrect = false;
    const correctAnswer = String(question.correctAnswer).trim();
    const userAnswerStr = String(userAnswer).trim();
    
    switch (question.questionType) {
      case 'Single Correct':
        isCorrect = userAnswerStr.toUpperCase() === correctAnswer.toUpperCase();
        break;
        
      case 'Multiple Correct':
        const userOptions = userAnswerStr.toUpperCase().split(',')
          .map(opt => opt.trim())
          .filter(opt => opt !== '')
          .sort();
        const correctOptions = correctAnswer.toUpperCase().split(',')
          .map(opt => opt.trim())
          .filter(opt => opt !== '')
          .sort();
        isCorrect = JSON.stringify(userOptions) === JSON.stringify(correctOptions);
        break;
        
      case 'Integer':
        const userInt = parseInt(userAnswerStr);
        const correctInt = parseInt(correctAnswer);
        if (!isNaN(userInt) && !isNaN(correctInt)) {
          isCorrect = userInt === correctInt;
        }
        break;
        
      case 'Numerical':
      case 'Decimal':
        const userNum = parseFloat(userAnswerStr);
        const correctNum = parseFloat(correctAnswer);
        
        if (!isNaN(userNum) && !isNaN(correctNum)) {
          if (question.numericalRange && question.numericalRange.tolerance) {
            const tolerance = question.numericalRange.tolerance;
            const diff = Math.abs(userNum - correctNum);
            const maxDiff = Math.abs(correctNum) * (tolerance / 100);
            isCorrect = diff <= maxDiff;
          } else if (question.numericalRange && 
                     question.numericalRange.min !== null && 
                     question.numericalRange.max !== null) {
            isCorrect = userNum >= question.numericalRange.min && 
                       userNum <= question.numericalRange.max;
          } else {
            isCorrect = question.questionType === 'Integer' 
              ? userNum === correctNum 
              : Math.abs(userNum - correctNum) < 0.01;
          }
        }
        break;
        
      default:
        isCorrect = userAnswerStr.toUpperCase() === correctAnswer.toUpperCase();
        break;
    }
    
    // Update scores
    const positiveMarks = question.marks?.positive || 4;
    const negativeMarks = question.marks?.negative || -1;
    
    if (isCorrect) {
      correctAnswers++;
      subjects[subject].correct++;
      totalScore += positiveMarks;
      subjects[subject].marks += positiveMarks;
    } else {
      incorrectAnswers++;
      subjects[subject].incorrect++;
      totalScore += negativeMarks;
      subjects[subject].marks += negativeMarks;
    }
  });
  
  // Process marked for review questions that weren't answered
  markedForReview.forEach(questionNumber => {
    const qNum = parseInt(questionNumber);
    // Only count as unattempted if not already processed
    if (!processedQuestions.has(qNum)) {
      const question = questionMap[qNum];
      if (question) {
        const subject = question.subject || 'General';
        unattempted++;
        subjects[subject].unattempted++;
        processedQuestions.add(qNum);
      }
    }
  });
  
  // Calculate remaining unattempted questions
  const totalProcessed = processedQuestions.size;
  const remainingUnattempted = questions.length - totalProcessed;
  unattempted += remainingUnattempted;
  
  // Distribute remaining unattempted questions proportionally to subjects
  if (remainingUnattempted > 0) {
    Object.keys(subjects).forEach(subject => {
      const subjectQuestions = questions.filter(q => (q.subject || 'General') === subject);
      const subjectProcessed = subjectQuestions.filter(q => processedQuestions.has(q.questionNumber)).length;
      const subjectUnattempted = subjectQuestions.length - subjectProcessed;
      subjects[subject].unattempted += subjectUnattempted;
    });
  }
  
  // Calculate accuracies
  Object.keys(subjects).forEach(subject => {
    const attempted = subjects[subject].correct + subjects[subject].incorrect;
    subjects[subject].accuracy = attempted > 0 
      ? parseFloat(((subjects[subject].correct / attempted) * 100).toFixed(2))
      : 0;
    subjects[subject].marks = Math.max(0, subjects[subject].marks);
  });
  
  // Ensure total score doesn't go below 0
  totalScore = Math.max(0, totalScore);
  
  // Calculate overall statistics
  const totalAttempted = correctAnswers + incorrectAnswers;
  const overallAccuracy = totalAttempted > 0 
    ? parseFloat(((correctAnswers / totalAttempted) * 100).toFixed(2))
    : 0;
  
  return {
    scoreData: {
      totalScore,
      correctAnswers,
      incorrectAnswers,
      unattempted,
      totalQuestions: questions.length,
      attempted: totalAttempted,
      accuracy: overallAccuracy
    },
    subjectWiseData: subjects
  };
};

// Updated submitExam function
const submitExam = async (req, res) => {
  try {
    const { paperId, answers, markedForReview, timeTaken } = req.body;
    
    // Validate input
    if (!paperId || !answers) {
      return res.status(400).json({
        success: false,
        message: 'Paper ID and answers are required'
      });
    }
    
    if (typeof answers !== 'object' || Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Answers must be an object with question numbers as keys'
      });
    }
    
    // Get paper
    const paper = await Paper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ 
        success: false,
        message: 'Paper not found' 
      });
    }
    
    // Get all questions for this paper
    const questions = await Question.find({ 
      paperId: paperId, 
      isActive: true 
    }).sort({ questionNumber: 1 });
    
    if (questions.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'No questions found for this paper' 
      });
    }
    
    // Calculate score and analysis
    const { scoreData, subjectWiseData } = calculateScoreAndAnalysis(answers, questions, markedForReview);
    
    // Create submission
    const submissionData = {
      paperId,
      answers,
      markedForReview: markedForReview || [],
      timeTaken: timeTaken || 0,
      score: scoreData.totalScore,
      totalQuestions: scoreData.totalQuestions,
      attempted: scoreData.attempted,
      correctAnswers: scoreData.correctAnswers,
      incorrectAnswers: scoreData.incorrectAnswers,
      unattempted: scoreData.unattempted,
      accuracy: scoreData.accuracy,
      scoreData,
      subjectWiseData,
      submittedAt: new Date()
    };
    
    const submission = new Submission(submissionData);
    const savedSubmission = await submission.save();
    
    // Return response
    res.status(200).json({
      success: true,
      submissionId: savedSubmission._id,
      scoreData: scoreData,
      subjectWiseData: subjectWiseData,
      message: 'Exam submitted successfully'
    });
    
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error submitting exam', 
      error: error.message
    });
  }
};

// Get exam result
const getExamResult = async (req, res) => {
  try {
    const { submissionId } = req.params;
    
    const submission = await Submission.findById(submissionId)
      .populate('paperId');
    
    if (!submission) {
      return res.status(404).json({ 
        success: false,
        message: 'Submission not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      submission
    });
  } catch (error) {
    console.error('Error fetching exam result:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching exam result', 
      error: error.message 
    });
  }
};

module.exports = {
  getAllExams,
  getExamsByCategory,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  seedExamsData,
  getCategories,
  submitExam,
  getExamResult
};