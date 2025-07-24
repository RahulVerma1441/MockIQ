const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middleware/auth'); 

// All routes require authentication
router.use(auth);

// Get performance trend data
router.get('/performance', submissionController.getPerformanceAnalysis);

// Get subject-wise analysis
router.get('/subject-wise', submissionController.getSubjectWiseAnalysis);

// Get analysis statistics (cards data)
router.get('/stats', submissionController.getAnalysisStats);

// Get recent test history
router.get('/recent-tests', submissionController.getRecentTests);

// Get strength analysis (radar chart)
router.get('/strength', submissionController.getStrengthAnalysis);

module.exports = router;