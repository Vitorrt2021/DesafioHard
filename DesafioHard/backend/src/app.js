const express = require('express');
const cors = require('cors');
const app = express();
const gameSave = require('./routes/save-game.js');
const ranking = require('./routes/ranking.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://alphatower.dudeful.com' }));

// app.use('/get-assets', getAssets);
app.use('/save-game', gameSave);
app.use('/ranking', ranking);

module.exports = app;
