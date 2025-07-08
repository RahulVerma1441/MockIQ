const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  paperId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paper',
    required: true,
    index: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
    index: true
  },
  
  // Test session details
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Performance metrics
  performance: {
    totalScore: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      required: true
    },
    percentile: {
      type: Number,
      required: true
    },
    rank: {
      type: Number,
      default: null
    },
    predictedRank: {
      type: Number,
      default: null
    }
  },
  
  // Time analysis
  timeAnalysis: {
    totalTime: {
      type: Number, // in seconds
      required: true
    },
    timePerQuestion: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      },
      questionNumber: Number,
      timeSpent: Number, // in seconds
      visits: Number,
      firstVisitTime: Date,
      lastVisitTime: Date
    }],
    timePerSubject: [{
      subject: String,
      timeSpent: Number,
      averageTimePerQuestion: Number
    }],
    timeDistribution: {
      fast: Number, // questions solved in < 1 minute
      normal: Number, // questions solved in 1-3 minutes
      slow: Number, // questions solved in > 3 minutes
      veryLong: Number // questions solved in > 5 minutes
    }
  },
  
  // Subject-wise detailed analysis
  subjectAnalysis: [{
    subject: {
      type: String,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    attempted: {
      type: Number,
      required: true
    },
    correct: {
      type: Number,
      required: true
    },
    wrong: {
      type: Number,
      required: true
    },
    skipped: {
      type: Number,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type: Number,
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    timeSpent: {
      type: Number,
      required: true
    },
    averageTimePerQuestion: {
      type: Number,
      required: true
    },
    
    // Topic-wise breakdown
    topicPerformance: [{
      topic: String,
      totalQuestions: Number,
      correct: Number,
      wrong: Number,
      skipped: Number,
      accuracy: Number,
      timeSpent: Number,
      difficulty: String,
      strength: {
        type: String,
        enum: ['Strong', 'Average', 'Weak']
      }
    }],
    
    // Difficulty-wise performance
    difficultyPerformance: [{
      difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
      },
      totalQuestions: Number,
      correct: Number,
      wrong: Number,
      skipped: Number,
      accuracy: Number,
      timeSpent: Number
    }]
  }],
  
  // Question-wise detailed analysis
  questionAnalysis: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    questionNumber: {
      type: Number,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      required: true
    },
    userAnswer: {
      type: String,
      default: ''
    },
    correctAnswer: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    status: {
      type: String,
      enum: ['correct', 'wrong', 'skipped', 'marked_for_review'],
      required: true
    },
    timeSpent: {
      type: Number,
      required: true
    },
    visits: {
      type: Number,
      default: 1
    },
    marksAwarded: {
      type: Number,
      required: true
    },
    
    // Behavioral data
    behavior: {
      changedAnswer: {
        type: Boolean,
        default: false
      },
      previousAnswers: [String],
      markedForReview: {
        type: Boolean,
        default: false
      },
      reviewTime: {
        type: Number,
        default: 0
      },
      hesitationTime: {
        type: Number,
        default: 0
      }
    },
    
    // Comparative analysis
    comparison: {
      averageTime: Number,
      averageAccuracy: Number,
      yourPerformance: {
        type: String,
        enum: ['Above Average', 'Average', 'Below Average']
      }
    }
  }],
  
  // Strengths and weaknesses
  strengths: [{
    category: {
      type: String,
      enum: ['Subject', 'Topic', 'Difficulty', 'Question Type']
    },
    name: String,
    score: Number,
    accuracy: Number,
    description: String
  }],
  
  weaknesses: [{
    category: {
      type: String,
      enum: ['Subject', 'Topic', 'Difficulty', 'Question Type']
    },
    name: String,
    score: Number,
    accuracy: Number,
    description: String,
    suggestions: [String]
  }],
  
  // Behavioral insights
  behaviorInsights: {
    testTakingStyle: {
      type: String,
      enum: ['Methodical', 'Quick', 'Thorough', 'Cautious', 'Rushed']
    },
    confidenceLevel: {
      type: String,
      enum: ['High', 'Medium', 'Low']
    },
    timeManagement: {
      type: String,
      enum: ['Excellent', 'Good', 'Average', 'Poor']
    },
    accuracyVsSpeed: {
      type: String,
      enum: ['Accuracy Focused', 'Speed Focused', 'Balanced']
    },
    
    // Specific behaviors
    behaviors: [{
      type: String,
      description: String,
      impact: String,
      suggestion: String
    }],
    
    // Patterns identified
    patterns: [{
      pattern: String,
      frequency: Number,
      description: String,
      recommendation: String
    }]
  },
  
  // Comparison with previous attempts
  progressTracking: {
    previousAttempts: [{
      attemptDate: Date,
      score: Number,
      percentage: Number,
      percentile: Number,
      rank: Number,
      timeSpent: Number,
      accuracy: Number
    }],
    
    improvement: {
      scoreChange: Number,
      percentageChange: Number,
      percentileChange: Number,
      rankChange: Number,
      accuracyChange: Number,
      timeEfficiencyChange: Number
    },
    
    trends: [{
      metric: String,
      trend: {
        type: String,
        enum: ['Improving', 'Declining', 'Stable']
      },
      changePercent: Number,
      description: String
    }]
  },
  
  // Test completion date (for activity tracking)
  testCompletionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Rank prediction data
  rankPrediction: {
    actualMarks: Number,
    predictedRank: Number,
    confidenceInterval: {
      lower: Number,
      upper: Number
    },
    regressionModel: {
      modelType: {
        type: String,
        enum: ['linear', 'polynomial', 'exponential'],
        default: 'polynomial'
      },
      coefficients: [Number],
      rSquared: Number,
      standardError: Number
    },
    benchmarkData: [{
      marks: Number,
      rank: Number,
      percentile: Number
    }]
  },
  
  // Detailed feedback and recommendations
  feedback: {
    overallPerformance: {
      rating: {
        type: String,
        enum: ['Excellent', 'Good', 'Average', 'Below Average', 'Poor']
      },
      summary: String,
      keyPoints: [String]
    },
    
    subjectWiseFeedback: [{
      subject: String,
      performance: String,
      feedback: String,
      recommendations: [String],
      studyPlan: [String]
    }],
    
    strategicRecommendations: [{
      category: String,
      recommendation: String,
      priority: {
        type: String,
        enum: ['High', 'Medium', 'Low']
      },
      timeframe: String,
      expectedImpact: String
    }],
    
    nextSteps: [{
      step: String,
      description: String,
      resources: [String],
      timeline: String
    }]
  },
  
  // Error analysis
  errorAnalysis: {
    errorTypes: [{
      type: {
        type: String,
        enum: ['Conceptual', 'Calculation', 'Careless', 'Time Management', 'Misread Question']
      },
      count: Number,
      percentage: Number,
      impact: String,
      examples: [String]
    }],
    
    commonMistakes: [{
      mistake: String,
      frequency: Number,
      subject: String,
      topic: String,
      solution: String
    }],
    
    improvementAreas: [{
      area: String,
      currentLevel: String,
      targetLevel: String,
      actionItems: [String]
    }]
  },
  
  // Competitive analysis
  competitiveAnalysis: {
    peerComparison: {
      betterThan: Number, // percentage of peers
      worseThan: Number, // percentage of peers
      averageScore: Number,
      topScore: Number,
      yourPosition: String
    },
    
    subjectRanking: [{
      subject: String,
      rank: Number,
      percentile: Number,
      averageScore: Number,
      yourScore: Number
    }],
    
    benchmarkComparison: [{
      benchmark: String,
      requiredScore: Number,
      yourScore: Number,
      gap: Number,
      probability: Number
    }]
  },
  
  // Test completion details
  testCompletion: {
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    submissionType: {
      type: String,
      enum: ['auto_submit', 'manual_submit', 'time_up'],
      default: 'manual_submit'
    },
    pauseCount: {
      type: Number,
      default: 0
    },
    totalPauseTime: {
      type: Number,
      default: 0
    },
    browserEvents: [{
      event: String,
      timestamp: Date,
      duration: Number
    }],
    isCompleted: {
      type: Boolean,
      default: true
    },
    completionPercentage: {
      type: Number,
      default: 100
    }
  },
  
  // Additional metadata
  metadata: {
    deviceInfo: {
      type: String,
      default: 'unknown'
    },
    browserInfo: {
      type: String,
      default: 'unknown'
    },
    ipAddress: {
      type: String,
      default: null
    },
    location: {
      type: String,
      default: null
    },
    testEnvironment: {
      type: String,
      enum: ['normal', 'proctored', 'practice'],
      default: 'normal'
    }
  },
  
  // Flags for special cases
  flags: {
    suspiciousActivity: {
      type: Boolean,
      default: false
    },
    technicalIssues: {
      type: Boolean,
      default: false
    },
    incompleteData: {
      type: Boolean,
      default: false
    },
    reviewRequired: {
      type: Boolean,
      default: false
    }
  },
  
  // Status tracking
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed', 'under_review'],
    default: 'processing'
  },
  
  processedAt: {
    type: Date,
    default: Date.now
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound indexes for efficient queries
analyticsSchema.index({ userId: 1, examId: 1 });
analyticsSchema.index({ userId: 1, paperId: 1 });
analyticsSchema.index({ userId: 1, createdAt: -1 });
analyticsSchema.index({ examId: 1, createdAt: -1 });
analyticsSchema.index({ paperId: 1, createdAt: -1 });
analyticsSchema.index({ sessionId: 1 });
analyticsSchema.index({ 'performance.percentile': -1 });
analyticsSchema.index({ 'performance.rank': 1 });
analyticsSchema.index({ 'testCompletionDate': 1, userId: 1 });
analyticsSchema.index({ status: 1, createdAt: -1 });

// Text index for search functionality
analyticsSchema.index({
  'feedback.overallPerformance.summary': 'text',
  'strengths.description': 'text',
  'weaknesses.description': 'text'
});

// Virtual for calculating efficiency
analyticsSchema.virtual('efficiency').get(function() {
  const timeRatio = this.timeAnalysis.totalTime / (this.performance.maxScore * 60); // expected 1 min per mark
  const accuracyRatio = this.performance.percentage / 100;
  return (accuracyRatio / timeRatio) * 100;
});

// Virtual for overall rating
analyticsSchema.virtual('overallRating').get(function() {
  const percentile = this.performance.percentile;
  if (percentile >= 90) return 'Excellent';
  if (percentile >= 75) return 'Good';
  if (percentile >= 50) return 'Average';
  if (percentile >= 25) return 'Below Average';
  return 'Poor';
});

// Instance method to get summary
analyticsSchema.methods.getSummary = function() {
  return {
    sessionId: this.sessionId,
    score: this.performance.totalScore,
    percentage: this.performance.percentage,
    percentile: this.performance.percentile,
    rank: this.performance.rank || this.performance.predictedRank,
    timeSpent: this.timeAnalysis.totalTime,
    accuracy: this.performance.percentage,
    testDate: this.testCompletionDate,
    overallRating: this.overallRating
  };
};

// Instance method to check if analysis is complete
analyticsSchema.methods.isComplete = function() {
  return this.status === 'completed' && 
         this.testCompletion.isCompleted && 
         !this.flags.incompleteData;
};

// Static method to get user's test history
analyticsSchema.statics.getUserHistory = function(userId, limit = 10) {
  return this.find({ userId: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('examId', 'title category')
    .populate('paperId', 'title year session');
};

// Static method to get user's performance over time
analyticsSchema.statics.getPerformanceTimeline = function(userId, limit = 20) {
  return this.find({ userId: userId })
    .sort({ testCompletionDate: -1 })
    .limit(limit)
    .select('testCompletionDate performance.percentage performance.percentile examId paperId')
    .populate('examId', 'title')
    .populate('paperId', 'title year session');
};

// Static method to get leaderboard
analyticsSchema.statics.getLeaderboard = function(paperId, limit = 100) {
  return this.find({ 
    paperId: paperId,
    status: 'completed'
  })
  .sort({ 'performance.totalScore': -1, 'timeAnalysis.totalTime': 1 })
  .limit(limit)
  .populate('userId', 'name profile.avatar')
  .select('userId performance.totalScore performance.percentage timeAnalysis.totalTime');
};

// Pre-save middleware to update timestamps
analyticsSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

// Pre-save middleware to calculate derived fields
analyticsSchema.pre('save', function(next) {
  // Calculate improvement metrics if previous attempts exist
  if (this.progressTracking.previousAttempts.length > 0) {
    const latest = this.progressTracking.previousAttempts[this.progressTracking.previousAttempts.length - 1];
    this.progressTracking.improvement.scoreChange = this.performance.totalScore - latest.score;
    this.progressTracking.improvement.percentageChange = this.performance.percentage - latest.percentage;
    this.progressTracking.improvement.percentileChange = this.performance.percentile - latest.percentile;
  }
  
  next();
});

module.exports = mongoose.model('Analytics', analyticsSchema);