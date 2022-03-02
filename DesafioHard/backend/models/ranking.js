const { Schema, model } = require('mongoose');

const rankingSchema = new Schema(
	{
		name: String,
		score: Number,
		date: String,
	},
	{ timestamps: true }
);

const Ranking = model('Ranking', rankingSchema);

module.exports = Ranking;
