const express = require('express');
const router = express.Router();
const {
  getAllExams,
  getExamsByCategory,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
  seedExamsData,
  getCategories
} = require('../controllers/examController');

// Public routes
router.get('/', getAllExams); // GET /api/exams?category=Engineering
router.get('/categories', getCategories); // GET /api/exams/categories
router.get('/category/:category', getExamsByCategory); // GET /api/exams/category/Engineering
router.get('/:id', getExamById);

// Admin routes (add authentication middleware when ready)
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

// Seed data route (for initial setup)
router.post('/seed', seedExamsData);

module.exports = router;