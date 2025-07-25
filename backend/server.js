const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();

const app = express();

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Import auth middleware
const auth = require('./middleware/auth');

// Routes
const examRoutes = require('./routes/examRoutes');
const paperRoutes = require('./routes/paperRoutes'); 
const questionRoutes = require('./routes/questionRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

// API Routes
app.use('/api/exams', examRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MockIQ API is running successfully',
    timestamp: new Date().toISOString()
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('MockIQ API running');
});

// Signup - FIXED: Use consistent userId in JWT
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Generate JWT token - FIXED: Use userId instead of id
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Changed from 'id' to 'userId'
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(201).json({ 
      message: 'User created successfully',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email 
      }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login - Already correct
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Get user data without password
    const userData = user.getPublicProfile();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        profile: userData.profile
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Verify token route - FIXED: Use consistent userId
app.get('/verify', auth, async (req, res) => {
  try {
    // User is already attached by auth middleware
    const user = req.user;
    res.json({ 
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(401).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});