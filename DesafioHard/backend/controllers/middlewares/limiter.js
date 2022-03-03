const rateLimit = require('express-rate-limit');

const limiter = (win, max) => {
	return rateLimit({
		windowMs: win * 60 * 1000, // 'win' minutes
		max: max, // Limit each IP to 'max' requests per `window`
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	});
};

module.exports = limiter;
