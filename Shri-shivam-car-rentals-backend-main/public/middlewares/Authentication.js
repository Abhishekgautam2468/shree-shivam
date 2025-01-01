const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path as per your project structure

// Middleware to verify JWT token and check authentication
const isAuthenticated = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const authToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = isAuthenticated;

module.exports = { isAuthenticated };
