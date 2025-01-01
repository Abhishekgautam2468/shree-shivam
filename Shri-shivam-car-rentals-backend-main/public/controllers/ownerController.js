const jwt = require('jsonwebtoken');
require('dotenv').config();

const OwnerLogin = async (req, res) => {
  const { username, password } = req.body;
    
  try {
    // Check the username and password against environment variables
    if (username !== process.env.OWNER_USERNAME || password !== process.env.OWNER_PASSWORD) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { username },
      process.env.OWNER_JWT_SECRET
       // Token expires in 1 hour
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { OwnerLogin };