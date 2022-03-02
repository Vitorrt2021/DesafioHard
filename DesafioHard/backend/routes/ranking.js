const router = require('express').Router();
const ErrorHandler = require('../controllers/modules/ErrorHandler.js');
const Ranking = require('../models/ranking.js');

router.get('/', async (req, res) => {
	try {
		const rankingData = await Ranking.find({})
			.sort({ score: 'descending' })
			.limit(20);

		res.send(rankingData);
	} catch (error) {
		const newError = new ErrorHandler(error);

		console.log(newError.digest(new Error()));

		res.send({ error: true });
	}
});

module.exports = router;
