// Import required dependencies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Import the authentication router
const authRouter = require('./routers/authRouter');

// Initialize the Express application
const app = express();

// Middleware to enable CORS, secure HTTP headers, and parse cookies
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({extended:true})); // Middleware to parse URL-encoded data

// Connect to MongoDB database
mongoose.connect("mongodb+srv://anandr:armdARMD@cluster0.6njdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Database connected"); // Log successful database connection
    })
    .catch(err => {
        console.log(err); // Log any database connection errors
    });

// Set up routes
app.use('/api/auth', authRouter); // Use authentication router for '/api/auth' route
app.get('/', (req, res) => {
    res.json({message: "Hello from the server"}); // Respond with a welcome message at the root route
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('listening...'); // Log server start message
});