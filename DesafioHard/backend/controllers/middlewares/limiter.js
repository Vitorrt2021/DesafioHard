const rateLimit = require('express-rate-limit');
const ErrorHandler = require('../modules/ErrorHandler.js');

const limiter = (win, max) => {
	try {
		return rateLimit({
			windowMs: win * 60 * 1000, // 'win' minutes
			max: max, // Limit each IP to 'max' requests per `window`
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
			legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		});
	} catch (error) {
		const errorHandler = new ErrorHandler.InternalServerError(
			'Failure while limiting requests',
			error
		);

		console.error(errorHandler);

		res.status(errorHandler.code).send(errorHandler);
	}
};

module.exports = limiter;
