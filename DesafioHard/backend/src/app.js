const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const gameSave = require('./routes/save-game.js');
const ranking = require('./routes/ranking.js');
const loadAssets = require('./routes/loadAssets.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'https://alphatower.dudeful.com' }));

app.use(express.static(path.join(__dirname, '/src')));

app.use('/load-assets', loadAssets);
app.use('/save-game', gameSave);
app.use('/ranking', ranking);

module.exports = app;
