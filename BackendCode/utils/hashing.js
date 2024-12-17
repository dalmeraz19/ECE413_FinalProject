// Importing required modules
const { createHmac } = require('crypto'); // For generating HMAC
const { hash, compare } = require("bcryptjs"); // For hashing and comparing values

// Function to hash a value with a salt
exports.doHash = (value, saltValue) => {
    const result = hash(value, saltValue); // Hash the value using bcrypt
    return result;
};

// Function to validate a value against a hashed value
exports.doHashValidation = (value, hashedValue) => {
    const result = compare(value, hashedValue); // Compare the plain value with the hash
    return result;
};

// Function to generate an HMAC using SHA-256
exports.hmacProcess = (value, key) => {
    const result = createHmac('sha256', key) // Create HMAC with SHA-256 algorithm
        .update(value) // Update with the input value
        .digest('hex'); // Generate the HMAC in hexadecimal format
    return result;
};