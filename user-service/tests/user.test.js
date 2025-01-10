// Import necessary libraries and modules
const request = require('supertest'); // Supertest library for testing HTTP requests
const app = require('../src/app'); // Express app to test
const mongoose = require('mongoose'); // Mongoose for database connection
const User = require('../src/models/userModel'); // User model for database operations

/**
 * Setup before running tests.
 * Connects to the database before running the test suite.
 */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true, // Use the new connection string parser
        useUnifiedTopology: true, // Use the new unified topology engine
    });
});

/**
 * Cleanup after running tests.
 * Deletes all users and closes the database connection after tests are completed.
 */
afterAll(async () => {
    await User.deleteMany({}); // Remove all users created during the tests
    await mongoose.connection.close(); // Close the database connection
});

/**
 * Test suite for the User service.
 */
describe('User Service', () => {
    /**
     * Test for user registration.
     * Ensures a new user can be successfully registered.
     */
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register') // Endpoint for user registration
            .send({
                username: 'testuser', // Sample username
                email: 'test@example.com', // Sample email
                password: 'password123', // Sample password
            });

        // Assertions
        expect(response.statusCode).toBe(201); // Expect HTTP 201 Created status
        expect(response.body.message).toBe('User created successfully'); // Expect success message
    });

    /**
     * Test for user login.
     * Ensures an existing user can log in and receive a JWT token.
     */
    it('should login an existing user', async () => {
        // Register the user first
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser', // Sample username
                email: 'test@example.com', // Sample email
                password: 'password123', // Sample password
            });

        // Attempt to log in
        const response = await request(app)
            .post('/api/users/login') // Endpoint for user login
            .send({
                email: 'test@example.com', // Email for login
                password: 'password123', // Password for login
            });

        // Assertions
        expect(response.statusCode).toBe(200); // Expect HTTP 200 OK status
        expect(response.body.token).toBeDefined(); // Expect a JWT token in the response
    });
});
