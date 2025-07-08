const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  // Category to separate engineering and medical exams
  category: {
    type: String,
    enum: ['Engineering', 'Medical'],
    required: true,
    default: 'Engineering'
  },
  examDate: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  totalQuestions: {
    type: Number, // Changed from String to Number for calculations
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Hard', 'Very Hard'], // Fixed 'Very High' to 'Very Hard'
    required: true
  },
  attempts: {
    type: String,
    required: true
  },
  
  // UI styling properties
  gradient: {
    type: String,
    required: true
  },
  bgColor: {
    type: String,
    required: true
  },
  iconColor: {
    type: String,
    required: true
  },
  borderColor: {
    type: String,
    required: true
  },
  
  // Default marking scheme for this exam (can be overridden at question level)
  defaultMarkingScheme: {
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
  
  // Section-wise marking schemes (for exams with different marking for different sections)
  sectionMarkingSchemes: [{
    section: {
      type: String,
      required: true
    },
    subjects: [String], // Which subjects this applies to
    correctAnswer: {
      type: Number,
      required: true
    },
    wrongAnswer: {
      type: Number,
      required: true
    },
    unattempted: {
      type: Number,
      default: 0
    }
  }],
  
  // Rank prediction data (for calculating predicted ranks)
  rankPredictionData: [{
    marks: {
      type: Number,
      required: true
    },
    rank: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  }],
  
  stats: {
    mockTests: {
      type: Number,
      default: 0
    },
    students: {
      type: String,
      default: '0'
    },
    successRate: {
      type: String,
      default: '0%'
    }
  },
  
  // Exam configuration
  configuration: {
    allowReview: {
      type: Boolean,
      default: true
    },
    allowSkip: {
      type: Boolean,
      default: true
    },
    showTimer: {
      type: Boolean,
      default: true
    },
    autoSubmit: {
      type: Boolean,
      default: true
    },
    showQuestionPalette: {
      type: Boolean,
      default: true
    }
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for faster queries
examSchema.index({ title: 1 });
examSchema.index({ isActive: 1 });
examSchema.index({ category: 1 });
examSchema.index({ category: 1, isActive: 1 });

// Static method to get active exams by category
examSchema.statics.getActiveExamsByCategory = function(category) {
  return this.find({ category: category, isActive: true })
    .sort({ createdAt: -1 });
};

// Method to get predicted rank based on marks
examSchema.methods.getPredictedRank = function(marks) {
  if (!this.rankPredictionData || this.rankPredictionData.length === 0) {
    return null;
  }
  
  // Simple polynomial regression implementation
  // In production, you might want to use a more sophisticated approach
  const data = this.rankPredictionData.sort((a, b) => a.marks - b.marks);
  
  // Find the closest data points
  let lower = null, upper = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].marks <= marks) {
      lower = data[i];
    }
    if (data[i].marks >= marks && !upper) {
      upper = data[i];
      break;
    }
  }
  
  if (!lower && !upper) return null;
  if (!lower) return upper.rank;
  if (!upper) return lower.rank;
  if (lower.marks === upper.marks) return lower.rank;
  
  // Linear interpolation
  const ratio = (marks - lower.marks) / (upper.marks - lower.marks);
  return Math.round(lower.rank + ratio * (upper.rank - lower.rank));
};

module.exports = mongoose.model('Exam', examSchema);