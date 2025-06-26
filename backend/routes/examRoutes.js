const express = require('express');
const router = express.Router();
const {
  getAllExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  seedExamsData
} = require('../controllers/examController');

// Public routes
router.get('/', getAllExams);
router.get('/:id', getExamById);

// Admin routes (add authentication middleware when ready)
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

// Seed data route (for initial setup)
router.post('/seed', seedExamsData);

module.exports = router;