const express = require('express');
const cors = require('cors');
const app = express();
const dbConnection = require('../config/dbConnection.js');
const limiter = require('./middlewares/limiter.js');
const loadAssets = require('../routes/load-assets.js');
const ranking = require('../routes/ranking.js');
const saveScore = require('../routes/save-score.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: [
			'https://alphatower.dudeful.com',
			'http://edtech.dudeful.com:3000',
			'http://localhost:5000',
			'http://localhost:3000',
		],
	})
);

dbConnection('/alphatower');

app.use('/load-assets', limiter(10, 30), loadAssets);
app.use('/ranking', limiter(10, 60), ranking);
app.use('/save-score', limiter(10, 20), saveScore);

module.exports = app;
