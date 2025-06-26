const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  session: {
    type: String,
    required: true,
    trim: true
  },
  shift: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  totalQuestions: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  questions: [{
    questionNumber: {
      type: Number,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    questionText: {
      type: String,
      required: true
    },
    questionImage: {
      type: String, // URL to image if any
      default: null
    },
    options: [{
      optionId: {
        type: String,
        required: true // A, B, C, D
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
      required: true // A, B, C, D
    },
    explanation: {
      type: String,
      default: null
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
    topic: {
      type: String,
      trim: true
    }
  }],
  instructions: {
    generalInstructions: [String],
    markingScheme: {
      correctAnswer: Number,
      wrongAnswer: Number,
      unattempted: Number
    },
    timeLimit: String,
    allowedLanguages: [String]
  },
  statistics: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    highestScore: {
      type: Number,
      default: 0
    },
    averageTime: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better performance
testSchema.index({ examId: 1, year: -1 });
testSchema.index({ year: -1, session: 1 });
testSchema.index({ isActive: 1, isPremium: 1 });

module.exports = mongoose.model('Test', testSchema);