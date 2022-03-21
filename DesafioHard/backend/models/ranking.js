const { Schema, model } = require('mongoose');

// FIXME add required field
const rankingSchema = new Schema(
	{
		name: { type: String, required: true },
		score: { type: Number, required: true },
		date: String,
	},
	{ timestamps: true }
);

const Ranking = model('Ranking', rankingSchema);

module.exports = Ranking;
