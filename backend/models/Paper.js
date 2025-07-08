const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  // Reference to the parent exam
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
    index: true
  },

  // Basic paper information
  title: {
    type: String,
    required: true,
    trim: true
  },

  // Paper identification
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: new Date().getFullYear() + 1
  },

  session: {
    type: String,
    required: true,
    trim: true,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 
           'July', 'August', 'September', 'October', 'November', 'December']
  },

  shift: {
    type: String,
    required: true,
    trim: true
  },

  // Exam date information
  examDate: {
    type: String,
    required: true
  },

  // Paper timing
  duration: {
    type: Number, // Duration in minutes for easier calculations
    required: true
  },

  startTime: {
    type: String,
    default: null
  },

  endTime: {
    type: String,
    default: null
  },

  // Paper structure
  subject: [
    {
      name: {
        type: String,
        required: true,
        enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Aptitude', 'Engineering Mathematics']
      },
      range: {
        type: [Number],
        required: true,
        validate: {
          validator: function(arr) {
            return arr.length === 2 && arr[0] <= arr[1];
          },
          message: 'Range must be an array of exactly 2 numbers [start, end] where start <= end'
        }
      }
    }
  ],

  totalQuestions: {
    type: Number,
    required: true,
    min: 1
  },

  totalMarks: {
    type: Number,
    required: true,
    min: 1
  },

  // Question distribution by subject
  questionDistribution: [{
    subject: {
      type: String,
      required: true
    },
    questionCount: {
      type: Number,
      required: true,
      min: 0
    },
    marks: {
      type: Number,
      required: true,
      min: 0
    }
  }],

  // Paper difficulty and type
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Hard', 'Very Hard'],
    default: 'Moderate'
  },

  paperType: {
    type: String,
    enum: ['Previous Year', 'Mock Test', 'Sample Paper', 'Practice Test'],
    default: 'Previous Year'
  },

  // Language options
  languages: [{
    type: String,
    default: ['English']
  }],

  // Instructions and rules
  instructions: {
    generalInstructions: [{
      type: String
    }],
    
    markingScheme: {
      correctAnswer: {
        type: Number,
        default: 4
      },
      wrongAnswer: {
        type: Number,
        default: -1
      },
      unattempted: {
        type: Number,
        default: 0
      }
    },

    allowedItems: [{
      type: String
    }],

    prohibitedItems: [{
      type: String
    }]
  },

  // Paper content and files
  paperContent: {
    questionPaperUrl: {
      type: String,
      default: null
    },
    
    answerKeyUrl: {
      type: String,
      default: null
    },
    
    solutionUrl: {
      type: String,
      default: null
    },

    analysisUrl: {
      type: String,
      default: null
    }
  },

  // Paper statistics and analytics
  statistics: {
    totalAttempts: {
      type: Number,
      default: 0
    },

    averageScore: {
      type: Number,
      default: 0,
      min: 0
    },

    averagePercentile: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    highestScore: {
      type: Number,
      default: 0,
      min: 0
    },

    lowestScore: {
      type: Number,
      default: 0,
      min: 0
    },

    averageTime: {
      type: Number,
      default: 0
    },

    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    // Subject-wise performance
    subjectStats: [{
      subject: String,
      averageScore: {
        type: Number,
        default: 0
      },
      accuracy: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },
      averageTime: {
        type: Number,
        default: 0
      }
    }],

    // Difficulty-wise stats
    difficultyStats: [{
      difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
      },
      totalQuestions: Number,
      averageAccuracy: Number,
      averageTime: Number
    }]
  },

  // Leaderboard configuration
  leaderboard: {
    isEnabled: {
      type: Boolean,
      default: true
    },
    maxEntries: {
      type: Number,
      default: 100
    },
    showRealNames: {
      type: Boolean,
      default: false
    }
  },

  // Paper metadata
  tags: [{
    type: String,
    trim: true
  }],

  // Premium and access control
  isPremium: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  isFeatured: {
    type: Boolean,
    default: false
  },

  // Release and expiry dates
  releaseDate: {
    type: Date,
    default: Date.now
  },

  expiryDate: {
    type: Date,
    default: null
  },

  // SEO and display
  metaData: {
    description: {
      type: String,
      trim: true
    },
    
    keywords: [{
      type: String,
      trim: true
    }],

    thumbnail: {
      type: String,
      default: null
    }
  },

  // Related papers and recommendations
  relatedPapers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paper'
  }],

  // Admin and moderation
  moderationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'under_review'],
    default: 'approved'
  },

  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  moderationNotes: {
    type: String,
    trim: true,
    default: null
  },

  // Questions reference
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],

  // Paper versions
  version: {
    type: Number,
    default: 1,
    min: 1
  },

  previousVersions: [{
    version: Number,
    createdAt: Date,
    changes: String
  }]

}, {
  timestamps: true
});

// Compound indexes for efficient queries
paperSchema.index({ examId: 1, year: -1 });
paperSchema.index({ year: -1, session: 1 });
paperSchema.index({ examId: 1, year: -1, session: 1 });
paperSchema.index({ isActive: 1, isPremium: 1 });
paperSchema.index({ isFeatured: 1, isActive: 1 });
paperSchema.index({ paperType: 1, isActive: 1 });
paperSchema.index({ subjects: 1, year: -1 });
paperSchema.index({ tags: 1, isActive: 1 });

// Text index for search functionality
paperSchema.index({
  title: 'text',
  'metaData.description': 'text',
  'metaData.keywords': 'text',
  tags: 'text'
});

// Virtual for formatted title
paperSchema.virtual('formattedTitle').get(function() {
  return `${this.session} ${this.shift} ${this.year}`;
});

// Virtual for duration in hours and minutes
paperSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.duration / 60);
  const minutes = this.duration % 60;
  if (hours > 0) {
    return minutes > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}` : `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
});

// Instance method to check if paper is accessible
paperSchema.methods.isAccessible = function(user) {
  if (!this.isActive) return false;
  if (this.isPremium && (!user || !user.isPremium)) return false;
  if (this.expiryDate && new Date() > this.expiryDate) return false;
  return true;
};

// Instance method to get paper summary
paperSchema.methods.getSummary = function() {
  return {
    id: this._id,
    title: this.formattedTitle,
    year: this.year,
    session: this.session,
    shift: this.shift,
    examDate: this.examDate,
    duration: this.duration,
    formattedDuration: this.formattedDuration,
    subjects: this.subjects,
    totalQuestions: this.totalQuestions,
    totalMarks: this.totalMarks,
    difficulty: this.difficulty,
    isPremium: this.isPremium,
    totalAttempts: this.statistics.totalAttempts,
    averageScore: this.statistics.averageScore
  };
};

// Static method to get papers by exam and year
paperSchema.statics.findByExamAndYear = function(examId, year) {
  return this.find({ 
    examId: examId, 
    year: year, 
    isActive: true 
  }).sort({ session: 1, shift: 1 });
};

// Static method to get featured papers
paperSchema.statics.getFeaturedPapers = function(limit = 10) {
  return this.find({ 
    isFeatured: true, 
    isActive: true 
  })
  .populate('examId', 'title category')
  .sort({ createdAt: -1 })
  .limit(limit);
};

// Static method to get popular papers
paperSchema.statics.getPopularPapers = function(limit = 10) {
  return this.find({ isActive: true })
    .populate('examId', 'title category')
    .sort({ 'statistics.totalAttempts': -1 })
    .limit(limit);
};

// Pre-save middleware to update version
paperSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.version += 1;
  }
  next();
});

// Pre-save middleware to generate title if not provided
paperSchema.pre('save', function(next) {
  if (!this.title) {
    this.title = `${this.session} ${this.shift} ${this.year}`;
  }
  next();
});

module.exports = mongoose.model('Paper', paperSchema);