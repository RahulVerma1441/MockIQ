const Exam = require('../models/Exam');

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

module.exports = {
  getAllExams,
  getExamsByCategory,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  seedExamsData,
  getCategories
};