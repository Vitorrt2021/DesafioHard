const router = require('express').Router();
const fs = require('fs');

router.post('/', (req, res) => {
	const score = req.body.data;

	if (!score.name || !score.score) {
		res.status(400).send('insufficient data');
		return;
	}

	const date = new Date().getTime();

	score.date = new Date(date).toLocaleString('pt-BR', {
		timeZone: 'America/Sao_Paulo',
	});
	score.score = Number(score.score);

	const ranking = JSON.parse(
		fs.readFileSync('src/database/ranking.json', {
			encoding: 'utf8',
		})
	);

	ranking.push(score);

	fs.writeFile(
		'src/database/ranking.json',
		JSON.stringify(ranking),
		(err) => {
			if (err) {
				return console.log(err);
			}
		}
	);

	res.send({ error: false, ranking: ranking });
});

module.exports = router;
