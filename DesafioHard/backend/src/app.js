const express = require('express');
// const cors = require('cors');
const app = express();
const saveScore = require('./routes/save-score.js');
const ranking = require('./routes/ranking.js');
const loadAssets = require('./routes/load-assets.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: 'https://alphatower.dudeful.com' }));

app.use(express.static('../frontend/src/'));

app.use('/load-assets', loadAssets);
app.use('/save-score', saveScore);
app.use('/ranking', ranking);

module.exports = app;
