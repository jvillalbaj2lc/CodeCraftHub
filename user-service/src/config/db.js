// Import required modules
const mongoose = require('mongoose'); // Mongoose library for MongoDB connection and schema management
const dotenv = require('dotenv'); // dotenv library for loading environment variables

// Load environment variables from .env file
dotenv.config();

/**
 * Connects to MongoDB using Mongoose.
 * 
 * This function establishes a connection to the MongoDB database specified
 * in the `MONGODB_URI` environment variable. It uses modern connection options
 * to ensure compatibility and reliability.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves if the connection is successful; exits the process on failure.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB with specified options
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true, // Use the new MongoDB connection string parser
            useUnifiedTopology: true, // Use the new unified topology engine
        });

        // Log successful connection
        console.log('MongoDB connected');
    } catch (error) {
        // Log connection error and terminate the application
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure code
    }
};

// Export the function to allow usage in other parts of the application
module.exports = connectDB;
