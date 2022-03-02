const router = require('express').Router();
const ErrorHandler = require('../controllers/modules/ErrorHandler.js');
const Ranking = require('../models/ranking.js');

router.post('/', async (req, res) => {
	try {
		const { data } = req.body;

		const playerScore = { name: data.name, score: Number(data.score) };

		const date = new Date().getTime();

		playerScore.date = new Date(date).toLocaleString('pt-BR', {
			timeZone: 'America/Sao_Paulo',
		});

		const response = await Ranking.create(playerScore);

		console.log(response);

		res.send(response);
	} catch (error) {
		const newError = new ErrorHandler(error);

		console.log(newError.digest(new Error()));

		res.send({ error: true });
	}
});

module.exports = router;
