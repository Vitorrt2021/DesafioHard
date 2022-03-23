const router = require('express').Router();
const Ranking = require('../models/ranking.js');
const validation = require('../controllers/middlewares/validation.js');

router.post('/', validation, async (req, res) => {
	try {
		const { data } = req.body;

		const playerScore = { name: data.name, score: data.score };

		const date = new Date().getTime();

		playerScore.date = new Date(date).toLocaleString('pt-BR', {
			timeZone: 'America/Sao_Paulo',
		});

		const response = await Ranking.create(playerScore);

		console.log(response);

		res.send(response);
	} catch (error) {
		console.error(error);
		// FIXME remove database error from client-side (do not send raw error)
		res.status(503).send(error);
	}
});

module.exports = router;
