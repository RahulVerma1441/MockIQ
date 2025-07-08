const Question = require('../models/Question');
const Paper = require('../models/Paper');
const Exam = require('../models/Exam');

// Get all questions for a specific paper
exports.getQuestionsByPaper = async (req, res) => {
  try {
    const { paperId } = req.params;
    
    // Verify paper exists
    const paper = await Paper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    
    // Get questions for this paper
    const questions = await Question.find({ 
      paperId: paperId, 
      isActive: true 
    }).sort({ questionNumber: 1 });
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a new question
exports.createQuestion = async (req, res) => {
  try {
    const questionData = req.body;
    
    // Verify paper exists
    const paper = await Paper.findById(questionData.paperId);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    
    // Verify exam exists
    const exam = await Exam.findById(questionData.examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    
    const question = new Question(questionData);
    await question.save();
    
    res.status(201).json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a question
exports.updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const updateData = req.body;
    
    const question = await Question.findByIdAndUpdate(
      questionId, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json(question);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a question
exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    
    const question = await Question.findByIdAndUpdate(
      questionId, 
      { isActive: false }, // Soft delete
      { new: true }
    );
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get questions by subject and topic
exports.getQuestionsBySubjectAndTopic = async (req, res) => {
  try {
    const { subject, topic } = req.params;
    
    const questions = await Question.find({ 
      subject: subject, 
      topic: topic, 
      isActive: true 
    }).sort({ difficulty: 1 });
    
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Bulk create questions
exports.bulkCreateQuestions = async (req, res) => {
  try {
    const { questions } = req.body;
    
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Questions array is required' });
    }
    
    const createdQuestions = await Question.insertMany(questions);
    
    res.status(201).json({
      message: `${createdQuestions.length} questions created successfully`,
      questions: createdQuestions
    });
  } catch (error) {
    console.error('Error creating bulk questions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};