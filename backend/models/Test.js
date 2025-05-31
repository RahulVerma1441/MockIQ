const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  title: String,
  subject: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Test', TestSchema);
