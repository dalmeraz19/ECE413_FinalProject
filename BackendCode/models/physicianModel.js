// Importing mongoose library for database modeling
const mongoose = require('mongoose');

// Defining the physician schema
const physicianSchema = mongoose.Schema({
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
    // Experience field for the physician's years of experience
    experience: {
        type: Number, // Experience is measured in years
        required: [true, 'Experience is required'],
        min: [0, "Experience cannot be negative"], // Ensures non-negative values
    },
}, {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true
});

// Exporting the physician schema as a model named "physician"
module.exports = mongoose.model("physician", physicianSchema);