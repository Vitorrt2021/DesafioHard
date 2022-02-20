const express = require('express');
const cors = require('cors');
const app = express();
// const getAssets = require('../../frontend/get-assets.js');
const gameSave = require('./routes/save-game.js');
const ranking = require('./routes/ranking.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use('/get-assets', getAssets);
app.use('/save-game', gameSave);
app.use('/ranking', ranking);

app.get('/get-assets', (req, res) => {
	const data = getFilesInsideDirectory('../frontend/src/assets');
	res.send(data);
});

function getFilesInsideDirectory(directory) {
	const filesArray = [];

	function readPath(directory) {
		const dirRead = fs.readdirSync(directory);

		for (const file of dirRead) {
			const absolutePath = path.join(directory, file);

			if (fs.statSync(absolutePath).isDirectory()) {
				readPath(absolutePath);
			} else {
				filesArray.push(absolutePath);
			}
		}
	}

	readPath(directory);

	return filesArray;
}

module.exports = app;
