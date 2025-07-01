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
  // NEW FIELD: Category to separate engineering and medical exams
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
    type: String,
    required: true
  },
  subjects: [{
    type: String,
    required: true
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Hard', 'Very High'],
    required: true
  },
  attempts: {
    type: String,
    required: true
  },
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
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
examSchema.index({ title: 1 });
examSchema.index({ isActive: 1 });
examSchema.index({ category: 1 }); // NEW INDEX for category-based queries

module.exports = mongoose.model('Exam', examSchema);