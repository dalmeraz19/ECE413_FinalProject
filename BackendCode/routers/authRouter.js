// Importing required modules
const express = require('express'); // Express framework for routing
const authController = require('../controllers/authController'); // Authentication controller with handler functions
const { identifier } = require('../middlewares/identification'); // Middleware for user identification

// Creating a new router instance
const router = express.Router();

// Route for user signup
// Calls the signup function in the authentication controller
router.post('/signup', authController.signup);

// Route for user signin (login)
// Calls the signin function in the authentication controller
router.post('/signin', authController.signin);

// Route for user signout (logout)
// Uses the identifier middleware for authentication before calling the signout function
router.post('/signout', identifier, authController.signout);

// Route for physician signup
// Calls the physicianSignup function in the authentication controller
router.post('/physicianSignup', authController.physicianSignup);

// Route for physician signin (login)
// Calls the physicianSignin function in the authentication controller
router.post('/physiciansignin', authController.physicianSignin);

// Route for physician signout (logout)
// Calls the physiciansignout function in the authentication controller
router.post('/physiciansignout', authController.physiciansignout);

// Exporting the router to be used in other parts of the application
module.exports = router;
