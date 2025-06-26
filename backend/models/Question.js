const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology']
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  subtopic: {
    type: String,
    trim: true
  },
  questionText: {
    type: String,
    required: true
  },
  questionImage: {
    type: String, // URL to image
    default: null
  },
  questionType: {
    type: String,
    enum: ['MCQ', 'Numerical', 'Multiple Correct', 'Assertion-Reason'],
    default: 'MCQ'
  },
  options: [{
    optionId: {
      type: String,
      required: true // A, B, C, D or 1, 2, 3, 4
    },
    optionText: {
      type: String,
      required: true
    },
    optionImage: {
      type: String,
      default: null
    }
  }],
  correctAnswer: {
    type: String,
    required: true // For single correct: "A", for multiple: "A,C", for numerical: "5.6"
  },
  explanation: {
    type: String,
    required: true
  },
  explanationImage: {
    type: String,
    default: null
  },
  solution: {
    steps: [String],
    formula: String,
    concept: String
  },
  marks: {
    positive: {
      type: Number,
      default: 4
    },
    negative: {
      type: Number,
      default: -1
    }
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  averageTime: {
    type: Number, // in seconds
    default: 120
  },
  tags: [String],
  statistics: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    correctAttempts: {
      type: Number,
      default: 0
    },
    accuracy: {
      type: Number,
      default: 0
    },
    averageTimeTaken: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound indexes
questionSchema.index({ examId: 1, subject: 1 });
questionSchema.index({ testId: 1, questionNumber: 1 });
questionSchema.index({ subject: 1, topic: 1 });
questionSchema.index({ difficulty: 1, isActive: 1 });

module.exports = mongoose.model('Question', questionSchema);