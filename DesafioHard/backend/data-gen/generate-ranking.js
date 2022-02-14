const fs = require('fs');
const names = require('./names.json');

const generateName = (names) => {
	let name = '';
	const nameSize = 2;

	for (let i = 0; i < nameSize; i++) {
		const nameIndex = Math.floor(Math.random() * names.length);
		name += names[nameIndex] + ' ';
	}

	return name.trim();
};

const generateScore = (min, max) => {
	let score = Math.floor(Math.random() * (max - min + 1) + min);

	return score;
};

const generateDate = (min, max) => {
	let date = Math.floor(Math.random() * (max - min + 1) + min);

	date = new Date(date).toLocaleString('pt-BR', {
		timeZone: 'America/Sao_Paulo',
	});

	return date;
};

const genData = (poolSize) => {
	const date = new Date().getTime();

	let ranking = JSON.parse(
		fs.readFileSync('../src/database/ranking.json', {
			encoding: 'utf8',
		})
	);

	for (let i = 0; i <= poolSize; i++) {
		let playerName = generateName(names);
		let score = generateScore(1000, 1000000);
		let date = generateDate(1583956086000, 1645040886000);
		let playerScore = { name: playerName, score: score, date: date };

		ranking.push(playerScore);
	}

	fs.writeFile(
		'../src/database/ranking.json',
		JSON.stringify(ranking),
		(err) => {
			if (err) {
				return console.log(err);
			}
		}
	);
};

genData(1000);
