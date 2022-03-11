const router = require('express').Router();
const Ranking = require('../models/ranking.js');
const ErrorHandler = require('../controllers/modules/ErrorHandler.js');

router.get('/', async (req, res) => {
	try {
		const rankingData = await Ranking.find({})
			.sort({ score: 'descending' })
			.limit(20);

		if (!rankingData[0]) {
			throw new ErrorHandler.NotFound(
				'No data has been found in our database regarding your request'
			);
		}

		res.send(rankingData);
	} catch (error) {
		console.error(error);
		res.status(error.code).send(error);
	}
});

module.exports = router;
