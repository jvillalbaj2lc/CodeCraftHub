// Import required modules and dependencies
const User = require('../models/userModel'); // User model for database operations
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for generating JSON Web Tokens (JWT)

/**
 * Registers a new user.
 * 
 * This function creates a new user account with a hashed password if the email is not already registered.
 * 
 * @async
 * @function registerUser
 * @param {Object} req - Express request object containing `username`, `email`, and `password` in the body.
 * @param {Object} res - Express response object used to send back HTTP responses.
 * @returns {void}
 */
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if a user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with server error
    }
};

/**
 * Logs in an existing user.
 * 
 * This function authenticates a user by verifying the email and password, then returns a JWT token if successful.
 * 
 * @async
 * @function loginUser
 * @param {Object} req - Express request object containing `email` and `password` in the body.
 * @param {Object} res - Express response object used to send back HTTP responses.
 * @returns {void}
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token for the user
        const token = jwt.sign(
            { id: user._id }, // Payload containing user ID
            process.env.JWT_SECRET, // Secret key from environment variables
            { expiresIn: '1h' } // Token expiration time
        );

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Respond with server error
    }
};

// Placeholder for additional user-related functions (e.g., get user, update user, etc.)

// Export the functions for use in routes
module.exports = { registerUser, loginUser };
