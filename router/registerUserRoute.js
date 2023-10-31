const express = require('express');
const router = express.Router();
const userController = require('../controller/registerUser');
const { authenticateToken } = require('../middleware/auth'); // Create a middleware for token authentication

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get user details (requires authentication)
router.get('/details', authenticateToken, userController.getUserDetails);

module.exports = router;
