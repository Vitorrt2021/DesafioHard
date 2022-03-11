const badwords = require('../../json/badwords.json');
const ErrorHandler = require('../modules/ErrorHandler.js');

// Separated as a middleware because in the future it will
// have more validations
const validation = (req, res, next) => {
	try {
		const { name, score } = req.body.data;

		if (badwords.includes(name.toLowerCase())) {
			throw new ErrorHandler.BadRequest(
				"You can't use bad language to save your name!"
			);
		}

		next();
	} catch (error) {
		console.error(error);
		res.status(error.code).send(error);
	}
};

module.exports = validation;
