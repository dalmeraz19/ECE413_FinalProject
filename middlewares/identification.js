// Importing jwt for token verification
const jwt = require('jsonwebtoken');

// Middleware to identify and verify JWT token from request
exports.identifier = (req, res, next) => {
	// Determine token source based on client type (browser or non-browser)
	let token;
	if (req.headers.client === 'not-browser') {
		// If not browser, get token from authorization header
		token = req.headers.authorization;
	} else {
		// If browser, get token from cookies
		token = req.cookies['Authorization'];
	}

	// If token is not provided, respond with unauthorized status
	if (!token) {
		return res.status(403).json({ success: false, message: 'Unauthorized' });
	}

	try {
		// Extract the token part and verify using jwt
		const userToken = token.split(' ')[1];
		const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);
		if (jwtVerified) {
			// Attach verified user data to the request and proceed
			req.user = jwtVerified;
			next();
		} else {
			// Throw error if token is not verified
			throw new Error('error in the token');
		}
	} catch (error) {
		// Log error if token verification fails
		console.log(error);
	}
};