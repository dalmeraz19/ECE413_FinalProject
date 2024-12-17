// Importing Joi for data validation
const Joi = require('joi');

// Schema for physician signup validation
const psignupSchema = Joi.object({
    // Name validation: must be between 3 and 50 characters, required
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must have at least 3 characters',
            'string.max': 'Name cannot exceed 50 characters',
        }),
    // Email validation: must be a valid email, required, converted to lowercase
    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
        }),
    // Password validation: must be at least 8 characters, required
    password: Joi.string()
        .trim()
        .min(8)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must have at least 8 characters',
        }),
    // Experience validation: must be a non-negative integer, required
    experience: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            'number.base': 'Experience must be a valid number',
            'number.min': 'Experience cannot be negative',
            'any.required': 'Experience is required',
        }),
});

// Schema for physician signin validation
const psigninSchema = Joi.object({
    // Email validation: must be a valid email, required, converted to lowercase
    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
        }),
    // Password validation: must be at least 8 characters, required
    password: Joi.string()
        .trim()
        .min(8)
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must have at least 8 characters',
        }),
});

// Exporting the schemas for use in other parts of the application
module.exports = { psignupSchema, psigninSchema };