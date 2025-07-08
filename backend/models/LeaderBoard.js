const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
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
  
  // Leaderboard entries
  entries: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userAvatar: {
      type: String,
      default: ''
    },
    
    // Performance metrics
    score: {
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
      required: true
    },
    
    // Timing
    timeTaken: {
      type: Number, // in minutes
      required: true
    },
    
    // Attempt details
    attemptDate: {
      type: Date,
      required: true
    },
    attemptNumber: {
      type: Number,
      default: 1
    },
    
    // Subject-wise performance
    subjectPerformance: [{
      subject: String,
      score: Number,
      maxScore: Number,
      accuracy: Number
    }],
    
    // Additional stats
    totalCorrect: {
      type: Number,
      default: 0
    },
    totalWrong: {
      type: Number,
      default: 0
    },
    totalSkipped: {
      type: Number,
      default: 0
    },
    
    // Badges or achievements for this attempt
    badges: [{
      type: String
    }]
  }],
  
  // Leaderboard metadata
  totalParticipants: {
    type: Number,
    default: 0
  },
  
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  
  // Statistics
  statistics: {
    averageScore: {
      type: Number,
      default: 0
    },
    highestScore: {
      type: Number,
      default: 0
    },
    lowestScore: {
      type: Number,
      default: 0
    },
    averageTime: {
      type: Number,
      default: 0
    },
    participationRate: {
      type: Number,
      default: 0
    }
  },
  
  // Settings
  settings: {
    maxEntries: {
      type: Number,
      default: 1000
    },
    showRealNames: {
      type: Boolean,
      default: true
    },
    showAvatars: {
      type: Boolean,
      default: true
    },
    allowMultipleAttempts: {
      type: Boolean,
      default: true
    },
    showOnlyBestAttempt: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
leaderboardSchema.index({ paperId: 1, 'entries.rank': 1 });
leaderboardSchema.index({ examId: 1, 'entries.score': -1 });
leaderboardSchema.index({ 'entries.userId': 1, paperId: 1 });
leaderboardSchema.index({ 'entries.percentile': -1 });

// Instance method to add or update user entry
leaderboardSchema.methods.addOrUpdateEntry = function(userEntry) {
  const existingEntryIndex = this.entries.findIndex(
    entry => entry.userId.toString() === userEntry.userId.toString()
  );
  
  if (existingEntryIndex !== -1) {
    // Update existing entry if new score is better
    if (this.settings.showOnlyBestAttempt) {
      if (userEntry.score > this.entries[existingEntryIndex].score) {
        this.entries[existingEntryIndex] = userEntry;
      }
    } else {
      // Add new attempt
      this.entries.push(userEntry);
    }
  } else {
    // Add new entry
    this.entries.push(userEntry);
  }
  
  // Sort entries by score (descending) and time (ascending for tie-breaking)
  this.entries.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.timeTaken - b.timeTaken;
  });
  
  // Update ranks
  this.entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });
  
  // Limit entries if needed
  if (this.entries.length > this.settings.maxEntries) {
    this.entries = this.entries.slice(0, this.settings.maxEntries);
  }
  
  this.totalParticipants = this.entries.length;
  this.lastUpdated = new Date();
  
  // Update statistics
  this.updateStatistics();
};

// Instance method to update statistics
leaderboardSchema.methods.updateStatistics = function() {
  if (this.entries.length === 0) return;
  
  const scores = this.entries.map(entry => entry.score);
  const times = this.entries.map(entry => entry.timeTaken);
  
  this.statistics.averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  this.statistics.highestScore = Math.max(...scores);
  this.statistics.lowestScore = Math.min(...scores);
  this.statistics.averageTime = times.reduce((a, b) => a + b, 0) / times.length;
};

// Instance method to get user rank
leaderboardSchema.methods.getUserRank = function(userId) {
  const entry = this.entries.find(entry => entry.userId.toString() === userId.toString());
  return entry ? entry.rank : null;
};

// Instance method to get top performers
leaderboardSchema.methods.getTopPerformers = function(limit = 10) {
  return this.entries.slice(0, limit);
};

// Static method to get or create leaderboard
leaderboardSchema.statics.getOrCreate = async function(paperId, examId) {
  let leaderboard = await this.findOne({ paperId, examId });
  
  if (!leaderboard) {
    leaderboard = new this({
      paperId,
      examId,
      entries: []
    });
    await leaderboard.save();
  }
  
  return leaderboard;
};

module.exports = mongoose.model('Leaderboard', leaderboardSchema);