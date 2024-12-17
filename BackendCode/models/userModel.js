// Importing the mongoose library for database modeling
const mongoose = require('mongoose');

// Defining the user schema
const userSchema = mongoose.Schema({
    // Name field with validation rules
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [3, "Name must have at least 3 characters"],
        maxLength: [50, "Name cannot exceed 50 characters"],
    },
    // Email field with unique constraint and validation rules
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, "Email must be Unique!"],
        minLength: [5, "Email must have 5 characters"],
        lowercase: true,
    },
    // Password field with additional security configuration
    password: {
        type: String,
        required: [true, "Password must be provided"],
        trim: true,
        select: false, // Excludes the password from query results by default
    },
}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

// Exporting the user schema as a model named "User"
module.exports = mongoose.model("User", userSchema);