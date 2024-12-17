// Importing Joi for data validation
const Joi = require('joi');

// Schema for user signup validation
exports.signupSchema = Joi.object({
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
    // Email validation: must be a valid email within the specified length range and domain
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net', 'edu'] }, // Allowed top-level domains
        }),
    // Password validation: must match pattern (at least 8 characters, one lowercase, one uppercase, one digit)
    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
});

// Schema for user signin validation
exports.signinSchema = Joi.object({
    // Email validation (same as signup schema)
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net', 'edu'] },
        }),
    // Password validation (same as signup schema)
    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
});

// Schema for validating code acceptance
exports.acceptCodeSchema = Joi.object({
    // Email validation (same as signin schema)
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] }, // Allowed top-level domains for code acceptance
        }),
    // Provided code must be a number and required
    providedCode: Joi.number().required(),
});

// Schema for validating password change (both new and old passwords)
exports.changePasswordSchema = Joi.object({
    // New password validation (same pattern as above)
    newPassword: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
    // Old password validation (same pattern as new password)
    oldPassword: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*d).{8,}$')),
});