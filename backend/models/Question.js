const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
  subject: String
});

module.exports = mongoose.model('Question', QuestionSchema);
