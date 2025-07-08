const express = require('express');
const router = express.Router();
const {
  getAllPapers,
  getPapersByExam,
  getPaperById,
  getFeaturedPapers,
  getPopularPapers,
  getPapersGroupedByYear,
  createPaper,
  updatePaper,
  partialUpdatePaper,
  togglePaperStatus,
  updateModerationStatus,
  updatePaperStats
} = require('../controllers/paperController');

// Public routes
router.get('/', getAllPapers);
router.get('/featured', getFeaturedPapers);
router.get('/popular', getPopularPapers);
router.get('/grouped', getPapersGroupedByYear);
router.get('/exam/:examId', getPapersByExam);
router.get('/:id', getPaperById);

// Protected routes (add authentication middleware as needed)
// Create paper
router.post('/', createPaper);

// Update paper routes
router.put('/:id', updatePaper);              // Complete update
router.patch('/:id', partialUpdatePaper);     // Partial update
router.patch('/:id/toggle-status', togglePaperStatus);  // Toggle active status
router.patch('/:id/moderation', updateModerationStatus); // Update moderation status
router.put('/:id/stats', updatePaperStats);   // Update statistics

module.exports = router;