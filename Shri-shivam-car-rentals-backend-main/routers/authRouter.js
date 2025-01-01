
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../public/controllers/userController');
const {isAuthenticated} = require('../public/middlewares/Authentication'); // Import authentication middleware if needed

// Route to register a new user
router.post('/register', registerUser);

// Route to authenticate a user
router.post('/login', loginUser);

// Route to get user profile (requires authentication)
router.get('/profile', isAuthenticated, getUserProfile);

module.exports = router;