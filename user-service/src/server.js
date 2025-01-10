// Import the Express application instance
const app = require('./app');

// Define the server port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

/**
 * Start the server.
 * 
 * The server listens on the specified port and logs a message to the console
 * once it is successfully running.
 */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
