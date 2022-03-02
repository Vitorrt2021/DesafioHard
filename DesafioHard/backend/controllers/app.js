const express = require('express');
const cors = require('cors');
const app = express();
const dbConnection = require('../config/dbConnection.js');
const loadAssets = require('../routes/load-assets.js');
const ranking = require('../routes/ranking.js');
const saveScore = require('../routes/save-score.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
// 	cors({
// 		origin: [
// 			'https://alphatower.dudeful.com',
// 			'http://edtech.dudeful.com:3000',
// 		],
// 	})
// );
app.use(cors());
dbConnection('/alphatower');

app.use('/load-assets', loadAssets);
app.use('/ranking', ranking);
app.use('/save-score', saveScore);

module.exports = app;
