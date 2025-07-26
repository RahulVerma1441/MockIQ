const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
    index: true
  },
  paperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paper',
    required: true,
    index: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  subject: {
    type: String,
    required: true,
    enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Aptitude', 'Engineering Mathematics']
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
  chapter: {
    type: String,
    trim: true
  },
  
  // Question content
  questionText: {
    type: String,
    required: true
  },
  questionImage: {
    type: String,
    default: null
  },
  
  // Question type with more options
  questionType: {
    type: String,
    enum: ['Single Correct', 'Multiple Correct', 'Numerical', 'Integer', 'Assertion-Reason', 'Match the Following', 'Decimal'],
    default: 'Single Correct'
  },
  
  // Options for MCQ type questions
  options: [{
    optionId: {
      type: String,
      required: true
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
  
  // Correct answer handling different question types
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
    // Examples:
    // Single Correct: "A" or "B"
    // Multiple Correct: "A,C,D" or "1,3,4"
    // Numerical: "5.6" or "12.34"
    // Integer: "15"
    // Decimal: "3.14"
  },
  
  // For numerical questions - range of acceptable answers
  numericalRange: {
    min: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    tolerance: {
      type: Number,
      default: 0 // Percentage tolerance
    }
  },
  
  // Solution and explanation
  explanation: {
    type: String,
    required: true
  },
  explanationImage: {
    type: String,
    default: null
  },
  
  // Detailed solution
  solution: {
    steps: [{
      stepNumber: Number,
      description: String,
      image: String,
      formula: String
    }],
    keyFormulas: [String],
    concept: String,
    approach: String,
    timeComplexity: String,
    difficulty: String
  },
  
  // Marking scheme - can override exam defaults
  marks: {
    positive: {
      type: Number,
      default: 4
    },
    negative: {
      type: Number,
      default: -1
    },
    partialMarking: {
      enabled: {
        type: Boolean,
        default: false
      },
      criteria: [{
        condition: String,
        marks: Number
      }]
    }
  },
  
  // Question metadata
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  
  // Expected time to solve (in seconds)
  expectedTime: {
    type: Number,
    default: 120
  },
  
  // Bloom's taxonomy level
  cognitiveLevel: {
    type: String,
    enum: ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'],
    default: 'Apply'
  },
  
  // Tags for categorization
  tags: [{
    type: String,
    trim: true
  }],
  
  // Question statistics
  statistics: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    correctAttempts: {
      type: Number,
      default: 0
    },
    wrongAttempts: {
      type: Number,
      default: 0
    },
    skippedAttempts: {
      type: Number,
      default: 0
    },
    accuracy: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    averageTimeTaken: {
      type: Number,
      default: 0
    },
    difficultyIndex: {
      type: Number,
      default: 0,
      min: 0,
      max: 1
    },
    discriminationIndex: {
      type: Number,
      default: 0,
      min: -1,
      max: 1
    }
  },
  
  // Option-wise statistics for MCQ questions
  optionStatistics: [{
    optionId: String,
    selectionCount: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0
    }
  }],
  
  // Common wrong answers analysis
  commonMistakes: [{
    mistake: String,
    frequency: Number,
    explanation: String
  }],
  
  // Question source and references
  source: {
    type: String,
    enum: ['Previous Year', 'Mock Test', 'Practice', 'Custom'],
    default: 'Custom'
  },
  
  references: [{
    type: String,
    trim: true
  }],
  
  // Version control for questions
  version: {
    type: Number,
    default: 1
  },
  
  // Review and moderation
  reviewStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'needs_revision'],
    default: 'pending'
  },
  
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  reviewNotes: {
    type: String,
    trim: true
  },
  
  // Activity status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Featured question
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  // Last modified by
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
questionSchema.index({ examId: 1, subject: 1 });
questionSchema.index({ paperId: 1, questionNumber: 1 });
questionSchema.index({ subject: 1, topic: 1 });
questionSchema.index({ difficulty: 1, isActive: 1 });
questionSchema.index({ questionType: 1, isActive: 1 });
questionSchema.index({ tags: 1, isActive: 1 });
questionSchema.index({ reviewStatus: 1, isActive: 1 });

// Text index for search functionality
questionSchema.index({
  questionText: 'text',
  topic: 'text',
  subtopic: 'text',
  tags: 'text'
});

// Virtual for formatted question number
questionSchema.virtual('formattedQuestionNumber').get(function() {
  return `Q${this.questionNumber}`;
});

// Virtual for accuracy percentage
questionSchema.virtual('accuracyPercentage').get(function() {
  if (this.statistics.totalAttempts === 0) return 0;
  return ((this.statistics.correctAttempts / this.statistics.totalAttempts) * 100).toFixed(2);
});

// Instance method to check if answer is correct
questionSchema.methods.checkAnswer = function(userAnswer) {
  const correctAnswer = this.correctAnswer;
  const questionType = this.questionType;
  
  // Handle null, undefined, or empty values
  if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
    return { isCorrect: false, type: 'unattempted' };
  }
  
  // Convert userAnswer to string if it's not already
  const userAnswerStr = String(userAnswer);
  
  // Check if the string version is empty after trimming
  if (userAnswerStr.trim() === '') {
    return { isCorrect: false, type: 'unattempted' };
  }
  
  switch (questionType) {
    case 'Single Correct':
      return { 
        isCorrect: userAnswerStr.toUpperCase() === String(correctAnswer).toUpperCase(),
        type: userAnswerStr.toUpperCase() === String(correctAnswer).toUpperCase() ? 'correct' : 'wrong'
      };
    
    case 'Multiple Correct':
      // Handle arrays directly or convert string to array
      let userAnswers;
      if (Array.isArray(userAnswer)) {
        userAnswers = userAnswer.map(ans => String(ans).trim().toUpperCase()).sort();
      } else {
        userAnswers = userAnswerStr.split(',').map(ans => ans.trim().toUpperCase()).sort();
      }
      
      const correctAnswers = String(correctAnswer).split(',').map(ans => ans.trim().toUpperCase()).sort();
      const isCorrect = JSON.stringify(userAnswers) === JSON.stringify(correctAnswers);
      return { isCorrect, type: isCorrect ? 'correct' : 'wrong' };
    
    case 'Numerical':
    case 'Integer':
    case 'Decimal':
      const userNum = parseFloat(userAnswerStr);
      const correctNum = parseFloat(String(correctAnswer));
      
      if (isNaN(userNum) || isNaN(correctNum)) {
        return { isCorrect: false, type: 'wrong' };
      }
      
      // Check if within tolerance range
      if (this.numericalRange && (this.numericalRange.min !== null || this.numericalRange.max !== null)) {
        const tolerance = this.numericalRange.tolerance || 0;
        const diff = Math.abs(userNum - correctNum);
        const maxDiff = correctNum * (tolerance / 100);
        return { 
          isCorrect: diff <= maxDiff,
          type: diff <= maxDiff ? 'correct' : 'wrong'
        };
      }
      
      return { 
        isCorrect: userNum === correctNum,
        type: userNum === correctNum ? 'correct' : 'wrong'
      };
    
    default:
      return { isCorrect: false, type: 'wrong' };
  }
};

// Instance method to get question summary
questionSchema.methods.getSummary = function() {
  return {
    id: this._id,
    questionNumber: this.questionNumber,
    subject: this.subject,
    topic: this.topic,
    difficulty: this.difficulty,
    questionType: this.questionType,
    marks: this.marks,
    expectedTime: this.expectedTime,
    accuracy: this.accuracyPercentage,
    totalAttempts: this.statistics.totalAttempts
  };
};

// Static method to get questions by paper
questionSchema.statics.findByPaper = function(paperId) {
  return this.find({ 
    paperId: paperId, 
    isActive: true 
  }).sort({ questionNumber: 1 });
};

// Static method to get questions by subject and topic
questionSchema.statics.findBySubjectAndTopic = function(subject, topic) {
  return this.find({ 
    subject: subject, 
    topic: topic, 
    isActive: true 
  }).sort({ difficulty: 1 });
};

// Pre-save middleware to update statistics
questionSchema.pre('save', function(next) {
  if (this.statistics.totalAttempts > 0) {
    this.statistics.accuracy = (this.statistics.correctAttempts / this.statistics.totalAttempts) * 100;
  }
  next();
});

// Pre-save middleware to update version
questionSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.version += 1;
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);