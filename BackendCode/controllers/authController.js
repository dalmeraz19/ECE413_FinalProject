// Importing necessary modules and schemas
const jwt = require('jsonwebtoken');
const { signupSchema, signinSchema } = require("../middlewares/validator");
const User = require("../models/userModel");
const { doHash, doHashValidation } = require("../utils/hashing");
const Physician = require('../models/physicianModel');
const { psignupSchema, psigninSchema } = require('../middlewares/physicianValidator');

// Sign-up function for user registration
exports.signup = async (req, res) => {
    const { name, email, password } = req.body; // Get name, email, and password from request body
    try {
        // Validate input using the signupSchema, including the name
        const { error } = signupSchema.validate({ name, email, password });

        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message, // Note: `details` should be plural
            });
        }

        const existingUser = await User.findOne({ email }); // Check if user already exists

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "User already exists!",
            });
        }

        const hashedPassword = await doHash(password, 12); // Hash the password

        const newUser = new User({
            name, // Save the name
            email,
            password: hashedPassword,
        });

        const result = await newUser.save(); // Save the user
        result.password = undefined; // Remove password from the response

        res.status(201).json({
            success: true,
            message: "Your account has been successfully created",
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Sign-in function for user login
exports.signin = async (req, res) => {
	const { email, password } = req.body; // Get email and password from request body
	try {
		const { error, value } = signinSchema.validate({ email, password }); // Validate input
		if (error) {
			return res
				.status(401)
				.json({ success: false, message: error.details[0].message });
		}

		const existingUser = await User.findOne({ email }).select('+password'); // Check if user exists
		if (!existingUser) {
			return res
				.status(401)
				.json({ success: false, message: 'User does not exists!' });
		}

		const result = await doHashValidation(password, existingUser.password); // Validate password
		if (!result) {
			return res
				.status(401)
				.json({ success: false, message: 'Invalid credentials!' });
		}

		const token = jwt.sign(
			{
				userId: existingUser._id,
				email: existingUser.email,
				verified: existingUser.verified,
			},
			process.env.TOKEN_SECRET,
			{
				expiresIn: '8h',
			}
		);

		res
			.cookie('Authorization', 'Bearer ' + token, {
				expires: new Date(Date.now() + 8 * 3600000),
				httpOnly: process.env.NODE_ENV === 'production',
				secure: process.env.NODE_ENV === 'production',
			})
			.json({
				success: true,
				token,
				message: 'logged in successfully',
			});
	} catch (error) {
		console.log(error);
	}
};

// Sign-out function for logging out user
exports.signout = async (req, res) => {
	res
		.clearCookie('Authorization')
		.status(200)
		.json({ success: true, message: 'logged out successfully' });
};

// Physician sign-up function for registration
exports.physicianSignup = async (req, res) => {
    const { name, email, password, experience } = req.body; // Get input data from the request body
    try {
        const { error } = psignupSchema.validate({ name, email, password, experience }); // Validate input

        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message, // Validation error message
            });
        }

        const existingPhysician = await Physician.findOne({ email }); // Check if physician already exists

        if (existingPhysician) {
            return res.status(401).json({
                success: false,
                message: "Physician already exists!",
            });
        }

        const hashedPassword = await doHash(password, 12); // Hash the password

        const newPhysician = new Physician({
            name,
            email,
            password: hashedPassword,
            experience,
        });

        const result = await newPhysician.save(); // Save the physician
        result.password = undefined; // Remove password from the response

        res.status(201).json({
            success: true,
            message: "Physician account has been successfully created",
            result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Physician sign-in function for login
exports.physicianSignin = async (req, res) => {
    const { email, password } = req.body; // Get input data from the request body
    try {
        const { error, value } = signinSchema.validate({ email, password }); // Validate input
        if (error) {
            return res
                .status(401)
                .json({ success: false, message: error.details[0].message });
        }

        const existingPhysician = await Physician.findOne({ email }).select('+password'); // Check if physician exists
        if (!existingPhysician) {
            return res
                .status(401)
                .json({ success: false, message: 'Physician does not exist!' });
        }

        const isPasswordValid = await doHashValidation(password, existingPhysician.password); // Validate password
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ success: false, message: 'Invalid credentials!' });
        }

        const token = jwt.sign(
            {
                physicianId: existingPhysician._id,
                email: existingPhysician.email,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '8h' }
        );

        res
            .cookie('Authorization', 'Bearer ' + token, {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: process.env.NODE_ENV === 'production',
                secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict'
            })
            .json({
                success: true,
                token,
                message: 'Physician logged in successfully',
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Physician sign-out function for logging out
exports.physiciansignout = async (req, res) => {
	res
		.clearCookie('Authorization')
		.status(200)
		.json({ success: true, message: 'logged out successfully' });
};