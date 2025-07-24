const Submission = require('../models/Submission');
const Paper = require('../models/Paper');
const mongoose = require('mongoose');

// Get performance analysis data
exports.getPerformanceAnalysis = async (req, res) => {
  try {
    const userId = req.user._id;
    const { exam, timeRange } = req.query;

    console.log('Performance analysis for user:', userId);

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 3);
    }

    // Build query
    const query = {
      userId: userId,
      submittedAt: { $gte: startDate }
    };

    // Add exam filter if specified
    if (exam && exam !== 'all') {
      const papers = await Paper.find({ examType: exam }).select('_id');
      query.paperId = { $in: papers.map(p => p._id) };
    }

    // Get submissions with paper details
    const submissions = await Submission.find(query)
      .populate('paperId', 'title examType totalMarks')
      .sort({ submittedAt: 1 });

    console.log('Found submissions:', submissions.length);

    // Calculate performance data
    const performanceData = submissions.map((sub, index) => {
      const percentage = sub.paperId && sub.paperId.totalMarks > 0
        ? ((sub.score / sub.paperId.totalMarks) * 100).toFixed(1)
        : '0';
      
      return {
        test: `Test ${index + 1}`,
        date: sub.submittedAt,
        marks: sub.score || 0,
        totalMarks: sub.paperId ? sub.paperId.totalMarks : 0,
        percentage: parseFloat(percentage),
        exam: sub.paperId ? sub.paperId.examType : 'Unknown'
      };
    });

    res.json({
      success: true,
      data: performanceData
    });
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching performance data',
      error: error.message
    });
  }
};

// Get subject-wise analysis
exports.getSubjectWiseAnalysis = async (req, res) => {
  try {
    const userId = req.user._id;
    const { exam, timeRange } = req.query;

    console.log('Subject-wise analysis for user:', userId);

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 3);
    }

    const query = {
      userId: userId,
      submittedAt: { $gte: startDate }
    };

    if (exam && exam !== 'all') {
      const papers = await Paper.find({ examType: exam }).select('_id');
      query.paperId = { $in: papers.map(p => p._id) };
    }

    const submissions = await Submission.find(query);

    console.log('Found submissions for subject analysis:', submissions.length);

    // Aggregate subject-wise data
    const subjectStats = {};

    submissions.forEach(sub => {
      if (sub.subjectWiseScores && Array.isArray(sub.subjectWiseScores)) {
        sub.subjectWiseScores.forEach(score => {
          if (!subjectStats[score.subject]) {
            subjectStats[score.subject] = {
              subject: score.subject,
              correct: 0,
              incorrect: 0,
              unattempted: 0,
              totalQuestions: 0,
              totalTime: 0,
              testCount: 0
            };
          }

          const stats = subjectStats[score.subject];
          stats.correct += score.correct || 0;
          stats.incorrect += score.wrong || 0;
          stats.unattempted += (score.totalQuestions || 0) - (score.attempted || 0);
          stats.totalQuestions += score.totalQuestions || 0;
          stats.testCount += 1;
        });
      }
    });

    // Calculate accuracy and average time
    const subjectWiseData = Object.values(subjectStats).map(stats => {
      const accuracy = (stats.correct + stats.incorrect) > 0 
        ? ((stats.correct / (stats.correct + stats.incorrect)) * 100).toFixed(1) 
        : '0';
      
      return {
        subject: stats.subject,
        correct: stats.correct,
        incorrect: stats.incorrect,
        unattempted: stats.unattempted,
        accuracy: parseFloat(accuracy),
        averageTime: 2.5 // This would need to be calculated from actual question-wise time data
      };
    });

    res.json({
      success: true,
      data: subjectWiseData
    });
  } catch (error) {
    console.error('Error fetching subject-wise data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subject-wise data',
      error: error.message
    });
  }
};

// Get analysis statistics
exports.getAnalysisStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const { exam, timeRange } = req.query;

    console.log('Analysis stats for user:', userId);

    // Calculate date ranges
    const now = new Date();
    let startDate = new Date();
    let previousStartDate = new Date();
    
    switch (timeRange) {
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        previousStartDate.setMonth(now.getMonth() - 2);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        previousStartDate.setMonth(now.getMonth() - 6);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        previousStartDate.setMonth(now.getMonth() - 12);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        previousStartDate.setFullYear(now.getFullYear() - 2);
        break;
      default:
        startDate.setMonth(now.getMonth() - 3);
        previousStartDate.setMonth(now.getMonth() - 6);
    }

    // Build queries
    const currentQuery = {
      userId: userId,
      submittedAt: { $gte: startDate }
    };

    const previousQuery = {
      userId: userId,
      submittedAt: { $gte: previousStartDate, $lt: startDate }
    };

    if (exam && exam !== 'all') {
      const papers = await Paper.find({ examType: exam }).select('_id');
      const paperIds = papers.map(p => p._id);
      currentQuery.paperId = { $in: paperIds };
      previousQuery.paperId = { $in: paperIds };
    }

    // Get current period submissions
    const currentSubmissions = await Submission.find(currentQuery)
      .populate('paperId', 'totalMarks');

    // Get previous period submissions
    const previousSubmissions = await Submission.find(previousQuery)
      .populate('paperId', 'totalMarks');

    console.log('Current submissions:', currentSubmissions.length);
    console.log('Previous submissions:', previousSubmissions.length);

    // Calculate statistics
    const totalTests = currentSubmissions.length;
    const previousTests = previousSubmissions.length;

    const averageScore = currentSubmissions.length > 0
      ? currentSubmissions.reduce((sum, sub) => {
          if (sub.paperId && sub.paperId.totalMarks > 0) {
            return sum + (sub.score / sub.paperId.totalMarks) * 100;
          }
          return sum;
        }, 0) / currentSubmissions.length
      : 0;

    const previousAverageScore = previousSubmissions.length > 0
      ? previousSubmissions.reduce((sum, sub) => {
          if (sub.paperId && sub.paperId.totalMarks > 0) {
            return sum + (sub.score / sub.paperId.totalMarks) * 100;
          }
          return sum;
        }, 0) / previousSubmissions.length
      : 0;

    // Find best rank (would need actual rank calculation)
    const bestRank = totalTests > 0 ? 892 : 0;

    // Calculate study time (in hours)
    const studyTime = currentSubmissions.reduce((sum, sub) => sum + (sub.timeTaken || 0), 0) / 3600;
    const previousStudyTime = previousSubmissions.reduce((sum, sub) => sum + (sub.timeTaken || 0), 0) / 3600;

    res.json({
      success: true,
      data: {
        totalTests,
        testsChange: previousTests > 0 ? parseFloat(((totalTests - previousTests) / previousTests * 100).toFixed(1)) : 0,
        averageScore: parseFloat(averageScore.toFixed(1)),
        scoreImprovement: parseFloat((averageScore - previousAverageScore).toFixed(1)),
        bestRank,
        rankImprovement: 1200,
        studyTime: Math.round(studyTime),
        studyTimeChange: Math.round(studyTime - previousStudyTime)
      }
    });
  } catch (error) {
    console.error('Error fetching analysis stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analysis statistics',
      error: error.message
    });
  }
};

// Get recent test history
exports.getRecentTests = async (req, res) => {
  try {
    const userId = req.user._id;
    const { exam, limit = 10 } = req.query;

    console.log('Recent tests for user:', userId);

    const query = { userId: userId };

    if (exam && exam !== 'all') {
      const papers = await Paper.find({ examType: exam }).select('_id');
      query.paperId = { $in: papers.map(p => p._id) };
    }

    const submissions = await Submission.find(query)
      .populate('paperId', 'title examType totalMarks')
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit));

    console.log('Found recent submissions:', submissions.length);

    const recentTests = submissions.map((sub) => ({
      id: sub._id,
      name: sub.paperId ? sub.paperId.title : 'Unknown Test',
      date: sub.submittedAt,
      exam: sub.paperId ? sub.paperId.examType : 'Unknown',
      score: sub.score || 0,
      totalMarks: sub.paperId ? sub.paperId.totalMarks : 100,
      percentage: sub.paperId && sub.paperId.totalMarks > 0 
        ? parseFloat(((sub.score / sub.paperId.totalMarks) * 100).toFixed(1))
        : 0,
      rank: 1000 + Math.floor(Math.random() * 3000),
      duration: formatDuration(sub.timeTaken || 0),
      status: 'completed'
    }));

    res.json({
      success: true,
      data: recentTests
    });
  } catch (error) {
    console.error('Error fetching recent tests:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recent tests',
      error: error.message
    });
  }
};

// Get strength analysis (radar chart data)
exports.getStrengthAnalysis = async (req, res) => {
  try {
    const userId = req.user._id;
    const { exam, timeRange } = req.query;

    console.log('Strength analysis for user:', userId);

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 3);
    }

    const query = {
      userId: userId,
      submittedAt: { $gte: startDate }
    };

    if (exam && exam !== 'all') {
      const papers = await Paper.find({ examType: exam }).select('_id');
      query.paperId = { $in: papers.map(p => p._id) };
    }

    const submissions = await Submission.find(query)
      .populate('paperId', 'totalMarks');

    console.log('Found submissions for strength analysis:', submissions.length);

    // Calculate strengths
    const subjects = ['Physics', 'Chemistry', 'Mathematics'];
    const strengths = subjects.map(subject => {
      const subjectData = submissions.reduce((acc, sub) => {
        if (sub.subjectWiseScores && Array.isArray(sub.subjectWiseScores)) {
          const subjectScore = sub.subjectWiseScores.find(s => s.subject === subject);
          if (subjectScore) {
            acc.correct += subjectScore.correct || 0;
            acc.total += subjectScore.attempted || 0;
          }
        }
        return acc;
      }, { correct: 0, total: 0 });

      return {
        subject,
        strength: subjectData.total > 0 ? Math.round((subjectData.correct / subjectData.total) * 100) : 0,
        fullMark: 100
      };
    });

    // Add speed and accuracy metrics
    const avgTime = submissions.reduce((sum, sub) => sum + (sub.timeTaken || 0), 0) / (submissions.length || 1);
    const maxTime = 10800; // 3 hours in seconds
    const speedScore = Math.round((1 - Math.min(avgTime / maxTime, 1)) * 100);

    const overallAccuracy = submissions.reduce((sum, sub) => {
      if (sub.paperId && sub.paperId.totalMarks > 0) {
        return sum + (sub.score / sub.paperId.totalMarks);
      }
      return sum;
    }, 0) / (submissions.length || 1) * 100;

    strengths.push(
      { subject: 'Speed', strength: Math.max(speedScore, 0), fullMark: 100 },
      { subject: 'Accuracy', strength: Math.round(overallAccuracy), fullMark: 100 }
    );

    res.json({
      success: true,
      data: strengths
    });
  } catch (error) {
    console.error('Error fetching strength analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching strength analysis',
      error: error.message
    });
  }
};

// Helper function to format duration
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}