const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  paperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paper',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: {
    type: Map,
    of: String
  },
  markedForReview: [Number],
  timeTaken: Number, // in seconds
  score: Number,
  totalQuestions: Number,
  submittedAt: {
    type: Date,
    default: Date.now
  },
  // Detailed results
  subjectWiseScores: [{
    subject: String,
    score: Number,
    totalQuestions: Number,
    attempted: Number,
    correct: Number,
    wrong: Number
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema);