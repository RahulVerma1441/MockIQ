// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token:', token ? 'Present' : 'Missing');

    if (!token) {
      console.log('No token found');
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded);

    // Use 'id' from the old token format
    const user = await User.findById(decoded.userId).select('-password');
    console.log('User:', user ? user.email : 'Not found');

    if (!user) {
      console.log('User not found');
      throw new Error();
    }

    req.user = user;
    req.userId = user._id;
    req.token = token;

    next();
  } catch (error) {
    console.log('Auth error:', error.message || error);
    res.status(401).json({
      success: false,
      message: 'Please authenticate'
    });
  }
};

module.exports = auth;