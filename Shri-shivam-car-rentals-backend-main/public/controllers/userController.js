const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Function to register a new user
const registerUser = async (req, res) => {
  // Extract fields from request body
  const { name, email, password } = req.body;
  console.log(req.body)

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password // In production, should be hashed before saving
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Return success message
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET,  (error, token) => {
      if (error) throw error;
      res.json({ token: token , user: {name : user.name, email: user.email  }});
    });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Function to authenticate user and generate JWT token
const loginUser = async (req, res) => {
  // Extract fields from request body
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email }).populate("Address");

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) throw error;
      res.json({ token: token ,  user_name : user.name, user_email: user.email, user_profile: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1716529770~exp=1716533370~hmac=75cdbffda8b401f617295a6d17241fb7d551535d20c3de19ed4563a1dd767dd4&w=740"  });
    });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Function to get user profile
const getUserProfile = async (req, res) => {
  try {
    // Fetch user from database
    const user = await User.findById(req.user.id).select('-password'); // Excluding password from response

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
      if (error) throw error;
      res.json({ token: token ,  user_name : user.name, user_email: user.email, user_profile: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1716529770~exp=1716533370~hmac=75cdbffda8b401f617295a6d17241fb7d551535d20c3de19ed4563a1dd767dd4&w=740"  });
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};