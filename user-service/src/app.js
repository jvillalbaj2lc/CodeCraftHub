// Import required modules and dependencies
const express = require('express'); // Express framework for building the server
const connectDB = require('./config/db'); // MongoDB connection configuration
const userRoutes = require('./routes/userRoutes'); // User-related routes
const dotenv = require('dotenv'); // dotenv library to manage environment variables

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Connect to MongoDB
connectDB();

/**
 * Mount user-related routes under the `/api/users` path.
 * These routes handle user registration, login, and more.
 */
app.use('/api/users', userRoutes);

// Export the Express application for use in other files (e.g., server.js)
module.exports = app;
