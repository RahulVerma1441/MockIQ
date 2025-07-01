const Paper = require('../models/Paper');
const Exam = require('../models/Exam');

// Get all papers with filters
const getAllPapers = async (req, res) => {
  try {
    const {
      examId,
      year,
      session,
      shift,
      category,
      difficulty,
      paperType,
      isPremium,
      page = 1,
      limit = 20,
      search
    } = req.query;

    // Build filter object
    const filter = { isActive: true };
    
    if (examId) filter.examId = examId;
    if (year) filter.year = parseInt(year);
    if (session) filter.session = session;
    if (shift) filter.shift = shift;
    if (difficulty) filter.difficulty = difficulty;
    if (paperType) filter.paperType = paperType;
    if (isPremium !== undefined) filter.isPremium = isPremium === 'true';

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get papers with population
    const papers = await Paper.find(filter)
      .populate('examId', 'title category subtitle')
      .sort({ year: -1, session: 1, shift: 1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-questions -previousVersions -moderationNotes');

    // Get total count for pagination
    const total = await Paper.countDocuments(filter);

    // If category filter is requested, filter by exam category
    let filteredPapers = papers;
    if (category) {
      filteredPapers = papers.filter(paper => 
        paper.examId && paper.examId.category === category
      );
    }

    res.json({
      success: true,
      message: 'Papers fetched successfully',
      data: filteredPapers,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: filteredPapers.length,
        totalRecords: total
      }
    });
  } catch (error) {
    console.error('Error fetching papers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching papers',
      error: error.message,
      data: []
    });
  }
};

// Get papers by exam ID
const getPapersByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { year, session } = req.query;

    // Validate examId
    if (!examId) {
      return res.status(400).json({
        success: false,
        message: 'Exam ID is required',
        data: []
      });
    }

    // Check if exam exists
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
        data: []
      });
    }

    const filter = { 
      examId: examId, 
      isActive: true 
    };

    if (year) filter.year = parseInt(year);
    if (session) filter.session = session;

    const papers = await Paper.find(filter)
      .populate('examId', 'title category subtitle')
      .sort({ year: -1, session: 1, shift: 1 })
      .select('-questions -previousVersions -moderationNotes');

    res.json({
      success: true,
      message: `Papers fetched successfully for ${exam.title}`,
      data: papers,
      count: papers.length,
      examInfo: {
        id: exam._id,
        title: exam.title,
        category: exam.category
      }
    });
  } catch (error) {
    console.error('Error fetching papers by exam:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching papers by exam',
      error: error.message,
      data: []
    });
  }
};

// Get paper by ID
const getPaperById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Paper ID is required',
        data: null
      });
    }

    const paper = await Paper.findById(id)
      .populate('examId', 'title category subtitle')
      .populate('questions')
      .populate('relatedPapers', 'title year session shift');

    if (!paper) {
      return res.status(404).json({
        success: false,
        message: 'Paper not found',
        data: null
      });
    }

    // Check if paper is accessible (you can add user-based logic here)
    // const isAccessible = paper.isAccessible(req.user);
    // if (!isAccessible) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Access denied to this paper',
    //     data: null
    //   });
    // }

    res.json({
      success: true,
      message: 'Paper fetched successfully',
      data: paper
    });
  } catch (error) {
    console.error('Error fetching paper:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching paper',
      error: error.message,
      data: null
    });
  }
};

// Get featured papers
const getFeaturedPapers = async (req, res) => {
  try {
    const { limit = 10, category } = req.query;

    let papers = await Paper.getFeaturedPapers(parseInt(limit));

    // Filter by category if specified
    if (category) {
      papers = papers.filter(paper => 
        paper.examId && paper.examId.category === category
      );
    }

    res.json({
      success: true,
      message: 'Featured papers fetched successfully',
      data: papers,
      count: papers.length
    });
  } catch (error) {
    console.error('Error fetching featured papers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured papers',
      error: error.message,
      data: []
    });
  }
};

// Get popular papers
const getPopularPapers = async (req, res) => {
  try {
    const { limit = 10, category } = req.query;

    let papers = await Paper.getPopularPapers(parseInt(limit));

    // Filter by category if specified
    if (category) {
      papers = papers.filter(paper => 
        paper.examId && paper.examId.category === category
      );  
    }

    res.json({
      success: true,
      message: 'Popular papers fetched successfully',
      data: papers,
      count: papers.length
    });
  } catch (error) {
    console.error('Error fetching popular papers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching popular papers',
      error: error.message,
      data: []
    });
  }
};

// Get papers grouped by year
const getPapersGroupedByYear = async (req, res) => {
  try {
    const { examId, category } = req.query;

    let filter = { isActive: true };
    if (examId) filter.examId = examId;

    const papers = await Paper.find(filter)
      .populate('examId', 'title category subtitle')
      .sort({ year: -1, session: 1, shift: 1 })
      .select('-questions -previousVersions -moderationNotes');

    // Filter by category if specified
    let filteredPapers = papers;
    if (category) {
      filteredPapers = papers.filter(paper => 
        paper.examId && paper.examId.category === category
      );
    }

    // Group by year
    const groupedPapers = filteredPapers.reduce((acc, paper) => {
      const year = paper.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(paper);
      return acc;
    }, {});

    res.json({
      success: true,
      message: 'Grouped papers fetched successfully',
      data: groupedPapers,
      years: Object.keys(groupedPapers).sort((a, b) => b - a),
      totalPapers: filteredPapers.length
    });
  } catch (error) {
    console.error('Error fetching grouped papers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching grouped papers',
      error: error.message,
      data: {},
      years: []
    });
  }
};

// Create new paper (admin only)
const createPaper = async (req, res) => {
  try {
    const paperData = req.body;

    // Validate required fields
    const requiredFields = ['examId', 'title', 'year', 'session', 'shift', 'examDate', 'duration', 'subjects', 'totalQuestions', 'totalMarks'];
    const missingFields = requiredFields.filter(field => !paperData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        data: null
      });
    }

    // Validate exam exists
    const exam = await Exam.findById(paperData.examId);
    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
        data: null
      });
    }

    const paper = new Paper(paperData);
    await paper.save();

    const populatedPaper = await Paper.findById(paper._id)
      .populate('examId', 'title category subtitle');

    res.status(201).json({
      success: true,
      message: 'Paper created successfully',
      data: populatedPaper
    });
  } catch (error) {
    console.error('Error creating paper:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: validationErrors.join(', '),
        data: null
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating paper',
      error: error.message,
      data: null
    });
  }
};

// Update paper statistics
const updatePaperStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, timeSpent, completionRate, subjectStats } = req.body;

    const paper = await Paper.findById(id);
    if (!paper) {
      return res.status(404).json({
        success: false,
        message: 'Paper not found'
      });
    }

    // Update statistics
    paper.statistics.totalAttempts += 1;
    
    if (score !== undefined) {
      const currentAvg = paper.statistics.averageScore;
      const totalAttempts = paper.statistics.totalAttempts;
      paper.statistics.averageScore = ((currentAvg * (totalAttempts - 1)) + score) / totalAttempts;
      
      if (score > paper.statistics.highestScore) {
        paper.statistics.highestScore = score;
      }
      
      if (paper.statistics.lowestScore === 0 || score < paper.statistics.lowestScore) {
        paper.statistics.lowestScore = score;
      }
    }

    if (timeSpent !== undefined) {
      const currentAvgTime = paper.statistics.averageTime;
      const totalAttempts = paper.statistics.totalAttempts;
      paper.statistics.averageTime = ((currentAvgTime * (totalAttempts - 1)) + timeSpent) / totalAttempts;
    }

    if (completionRate !== undefined) {
      const currentCompletionRate = paper.statistics.completionRate;
      const totalAttempts = paper.statistics.totalAttempts;
      paper.statistics.completionRate = ((currentCompletionRate * (totalAttempts - 1)) + completionRate) / totalAttempts;
    }

    // Update subject statistics if provided
    if (subjectStats && Array.isArray(subjectStats)) {
      subjectStats.forEach(stat => {
        const existingSubjectStat = paper.statistics.subjectStats.find(s => s.subject === stat.subject);
        if (existingSubjectStat) {
          const attempts = paper.statistics.totalAttempts;
          existingSubjectStat.averageScore = ((existingSubjectStat.averageScore * (attempts - 1)) + stat.score) / attempts;
          existingSubjectStat.accuracy = ((existingSubjectStat.accuracy * (attempts - 1)) + stat.accuracy) / attempts;
        } else {
          paper.statistics.subjectStats.push({
            subject: stat.subject,
            averageScore: stat.score,
            accuracy: stat.accuracy
          });
        }
      });
    }

    await paper.save();

    res.json({
      success: true,
      message: 'Paper statistics updated successfully',
      data: paper.statistics
    });
  } catch (error) {
    console.error('Error updating paper stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating paper statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllPapers,
  getPapersByExam,
  getPaperById,
  getFeaturedPapers,
  getPopularPapers,
  getPapersGroupedByYear,
  createPaper,
  updatePaperStats
};