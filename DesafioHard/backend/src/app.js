const express = require('express');
const cors = require('cors');
const app = express();
const login = require('./routes/login.js');
const gameSave = require('./routes/save-game.js');
const ranking = require('./routes/ranking.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//tests only
app.use(express.static(__dirname + '/public'));
//tests only

app.use('/login', login);
app.use('/save-game', gameSave);
app.use('/ranking', ranking);

module.exports = app;
