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
  updatePaperStats
} = require('../controllers/paperController');

// Public routes
router.get('/', getAllPapers);
router.get('/featured', getFeaturedPapers);
router.get('/popular', getPopularPapers);
router.get('/grouped', getPapersGroupedByYear);
router.get('/exam/:examId', getPapersByExam);
router.get('/:id', getPaperById);

// Protected routes (you can add authentication middleware here)
router.post('/', createPaper);
router.put('/:id/stats', updatePaperStats);

module.exports = router;