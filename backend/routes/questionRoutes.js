const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Get all questions for a specific paper
router.get('/paper/:paperId', questionController.getQuestionsByPaper);

// Get a specific question by ID
router.get('/:questionId', questionController.getQuestionById);

// Create a new question (for admin)
router.post('/', questionController.createQuestion);

// Update a question (for admin)
router.put('/:questionId', questionController.updateQuestion);

// Delete a question (for admin)
router.delete('/:questionId', questionController.deleteQuestion);

// Get questions by subject and topic
router.get('/subject/:subject/topic/:topic', questionController.getQuestionsBySubjectAndTopic);

// Bulk create questions (for admin)
router.post('/bulk', questionController.bulkCreateQuestions);

module.exports = router;