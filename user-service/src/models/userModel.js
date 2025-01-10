// Import the Mongoose library
const mongoose = require('mongoose');

/**
 * Mongoose Schema for the User model.
 * 
 * This schema defines the structure of a User document in the MongoDB database.
 * It includes fields for username, email, and password, as well as timestamps for
 * tracking the creation and update times of each document.
 */
const userSchema = new mongoose.Schema(
    {
        // User's username (must be unique)
        username: { 
            type: String, 
            required: true, // This field is mandatory
            unique: true // Ensures no two users have the same username
        },
        // User's email address (must be unique)
        email: { 
            type: String, 
            required: true, // This field is mandatory
            unique: true // Ensures no two users have the same email
        },
        // User's hashed password
        password: { 
            type: String, 
            required: true // This field is mandatory
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

/**
 * User Model
 * 
 * Represents the User collection in the MongoDB database. This model provides
 * an interface to interact with the User documents, such as creating, reading,
 * updating, and deleting user records.
 */
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
