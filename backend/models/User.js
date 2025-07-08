const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['student', 'admin', 'moderator'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Premium subscription
  isPremium: {
    type: Boolean,
    default: false
  },
  
  premiumExpiryDate: {
    type: Date,
    default: null
  },
  
  // User profile
  profile: {
    avatar: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    dateOfBirth: {
      type: Date
    },
    class: {
      type: String,
      enum: ['11', '12', 'dropper', 'graduate'],
      default: '12'
    },
    targetExam: {
      type: String,
      enum: ['JEE Main', 'JEE Advanced', 'NEET', 'WBJEE', 'BITSAT', 'VITEEE', 'Other'],
      default: 'JEE Main'
    },
    location: {
      city: String,
      state: String,
      country: {
        type: String,
        default: 'India'
      }
    },
    bio: {
      type: String,
      maxlength: 500
    }
  },
  
  // Activity tracking for heatmap
  activityCalendar: [{
    date: {
      type: Date,
      required: true
    },
    testsAttempted: {
      type: Number,
      default: 0
    },
    questionsAttempted: {
      type: Number,
      default: 0
    },
    timeSpent: {
      type: Number, // in minutes
      default: 0
    },
    score: {
      type: Number,
      default: 0
    }
  }],
  
  // Test attempts and results
  testAttempts: [{
    paperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper',
      required: true
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true
    },
    attemptNumber: {
      type: Number,
      default: 1
    },
    
    // Test timing
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date
    },
    duration: {
      type: Number // in minutes
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    
    // Scores and performance
    totalScore: {
      type: Number,
      default: 0
    },
    maxScore: {
      type: Number,
      required: true
    },
    percentage: {
      type: Number,
      default: 0
    },
    percentile: {
      type: Number,
      default: 0
    },
    predictedRank: {
      type: Number,
      default: null
    },
    
    // Subject-wise performance
    subjectPerformance: [{
      subject: {
        type: String,
        required: true
      },
      attempted: {
        type: Number,
        default: 0
      },
      correct: {
        type: Number,
        default: 0
      },
      wrong: {
        type: Number,
        default: 0
      },
      skipped: {
        type: Number,
        default: 0
      },
      score: {
        type: Number,
        default: 0
      },
      accuracy: {
        type: Number,
        default: 0
      },
      timeSpent: {
        type: Number,
        default: 0
      }
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
        default: false
      },
      status: {
        type: String,
        enum: ['correct', 'wrong', 'skipped', 'marked_for_review'],
        default: 'skipped'
      },
      timeSpent: {
        type: Number, // in seconds
        default: 0
      },
      marksAwarded: {
        type: Number,
        default: 0
      },
      difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
      },
      subject: {
        type: String
      },
      topic: {
        type: String
      },
      // Track when question was visited, answered, etc.
      timestamps: {
        firstVisit: Date,
        lastVisit: Date,
        answered: Date,
        reviewed: Date
      }
    }],
    
    // Test behavior analytics
    testBehavior: {
      totalTimeSpent: {
        type: Number,
        default: 0
      },
      timePerSection: [{
        subject: String,
        timeSpent: Number
      }],
      questionSwitches: {
        type: Number,
        default: 0
      },
      reviewsUsed: {
        type: Number,
        default: 0
      },
      lastMinuteChanges: {
        type: Number,
        default: 0
      }
    },
    
    // Rank and comparison
    rank: {
      overallRank: {
        type: Number,
        default: null
      },
      categoryRank: {
        type: Number,
        default: null
      },
      stateRank: {
        type: Number,
        default: null
      }
    },
    
    // Attempt metadata
    deviceInfo: {
      type: String,
      default: ''
    },
    browserInfo: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    }
  }],
  
  // Overall user statistics
  statistics: {
    totalTestsAttempted: {
      type: Number,
      default: 0
    },
    totalQuestionsAttempted: {
      type: Number,
      default: 0
    },
    totalTimeSpent: {
      type: Number, // in minutes
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    bestScore: {
      type: Number,
      default: 0
    },
    averagePercentile: {
      type: Number,
      default: 0
    },
    bestPercentile: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    
    // Subject-wise overall stats
    subjectStats: [{
      subject: String,
      totalQuestions: {
        type: Number,
        default: 0
      },
      correctAnswers: {
        type: Number,
        default: 0
      },
      accuracy: {
        type: Number,
        default: 0
      },
      averageTime: {
        type: Number,
        default: 0
      },
      strongTopics: [String],
      weakTopics: [String]
    }],
    
    // Performance trends
    performanceTrend: [{
      date: Date,
      score: Number,
      percentile: Number,
      testCount: Number
    }]
  },
  
  // User preferences
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'light'
    },
    language: {
      type: String,
      enum: ['English', 'Hindi'],
      default: 'English'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      sms: {
        type: Boolean,
        default: false
      },
      push: {
        type: Boolean,
        default: true
      }
    },
    testPreferences: {
      autoSubmit: {
        type: Boolean,
        default: true
      },
      showTimer: {
        type: Boolean,
        default: true
      },
      confirmBeforeSubmit: {
        type: Boolean,
        default: true
      }
    }
  },
  
  // Achievements and badges
  achievements: [{
    badgeId: {
      type: String,
      required: true
    },
    badgeName: {
      type: String,
      required: true
    },
    earnedDate: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      enum: ['performance', 'consistency', 'improvement', 'milestone'],
      default: 'performance'
    }
  }],
  
  // Favorites and bookmarks
  favorites: {
    papers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Paper'
    }],
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }]
  },
  
  // Account status
  accountStatus: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'banned'],
    default: 'active'
  },
  
  // Last activity
  lastLoginDate: {
    type: Date,
    default: Date.now
  },
  
  lastActivityDate: {
    type: Date,
    default: Date.now
  },
  
  // Referral system
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  referralCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate referral code before saving
userSchema.pre('save', function(next) {
  if (!this.referralCode && this.isNew) {
    this.referralCode = this.generateReferralCode();
  }
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to generate referral code
userSchema.methods.generateReferralCode = function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Instance method to check if user is premium
userSchema.methods.isPremiumActive = function() {
  if (!this.isPremium) return false;
  if (!this.premiumExpiryDate) return true;
  return new Date() < this.premiumExpiryDate;
};

// Instance method to update activity calendar
userSchema.methods.updateActivityCalendar = function(testsAttempted = 0, questionsAttempted = 0, timeSpent = 0, score = 0) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const existingEntry = this.activityCalendar.find(entry => 
    entry.date.getTime() === today.getTime()
  );
  
  if (existingEntry) {
    existingEntry.testsAttempted += testsAttempted;
    existingEntry.questionsAttempted += questionsAttempted;
    existingEntry.timeSpent += timeSpent;
    existingEntry.score += score;
  } else {
    this.activityCalendar.push({
      date: today,
      testsAttempted,
      questionsAttempted,
      timeSpent,
      score
    });
  }
  
  // Keep only last 365 days
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 365);
  this.activityCalendar = this.activityCalendar.filter(entry => entry.date >= cutoffDate);
};

// Instance method to get activity heatmap data
userSchema.methods.getActivityHeatmap = function(days = 365) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return this.activityCalendar
    .filter(entry => entry.date >= cutoffDate)
    .map(entry => ({
      date: entry.date,
      count: entry.testsAttempted + Math.floor(entry.questionsAttempted / 10),
      testsAttempted: entry.testsAttempted,
      questionsAttempted: entry.questionsAttempted,
      timeSpent: entry.timeSpent,
      score: entry.score
    }));
};

// Instance method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.email;
  delete userObject.testAttempts;
  delete userObject.ipAddress;
  return userObject;
};

// Instance method to get dashboard summary
userSchema.methods.getDashboardSummary = function() {
  return {
    name: this.name,
    email: this.email,
    isPremium: this.isPremiumActive(),
    totalTests: this.statistics.totalTestsAttempted,
    averageScore: this.statistics.averageScore,
    bestScore: this.statistics.bestScore,
    currentStreak: this.statistics.currentStreak,
    recentActivity: this.activityCalendar.slice(-7),
    achievements: this.achievements.slice(-5)
  };
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to get leaderboard
userSchema.statics.getLeaderboard = function(limit = 50) {
  return this.find({ 
    accountStatus: 'active',
    'statistics.totalTestsAttempted': { $gt: 0 }
  })
  .select('name profile.avatar statistics.averageScore statistics.totalTestsAttempted')
  .sort({ 'statistics.averageScore': -1 })
  .limit(limit);
};

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ referralCode: 1 });
userSchema.index({ accountStatus: 1 });
userSchema.index({ isPremium: 1 });
userSchema.index({ lastActivityDate: -1 });
userSchema.index({ 'statistics.averageScore': -1 });
userSchema.index({ 'testAttempts.paperId': 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;