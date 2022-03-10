const rateLimit = require('express-rate-limit');

const limiter = (win, max) => {
	try {
		return rateLimit({
			windowMs: win * 60 * 1000, // 'win' minutes
			max: max, // Limit each IP to 'max' requests per `window`
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
			legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		});
	} catch (error) {
		console.error(error);
		res.status(error.code).send(error);
	}
};

module.exports = limiter;
