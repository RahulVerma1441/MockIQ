const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Test = require('./models/Test');
const Question = require('./models/Question');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('JEE Mock API running');
});

// Sample route to get all tests
app.get('/tests', async (req, res) => {
  const tests = await Test.find().populate('questions');
  res.json(tests);
});

// Sample route to create dummy data
app.post('/create-dummy-test', async (req, res) => {
  const q1 = new Question({
    questionText: 'What is 2 + 2?',
    options: ['2', '3', '4', '5'],
    correctAnswer: '4',
    subject: 'Math'
  });
  await q1.save();

  const test = new Test({
    title: 'Basic Math Test',
    subject: 'Math',
    questions: [q1._id]
  });
  await test.save();

  res.json(test);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
