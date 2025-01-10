// Import the Express library for creating the router
const express = require('express');

// Import controller functions for user-related operations
const { registerUser, loginUser } = require('../controllers/userController');

// Create an instance of an Express router
const router = express.Router();

/**
 * @route POST /register
 * @description Register a new user
 * @access Public
 */
router.post('/register', registerUser);

/**
 * @route POST /login
 * @description Log in an existing user and return a JWT token
 * @access Public
 */
router.post('/login', loginUser);

// Placeholder: Add more routes for additional user-related functionalities (e.g., get user, update user)

/**
 * Export the router to make it available for use in the application.
 * This router handles all user-related routes.
 */
module.exports = router;
