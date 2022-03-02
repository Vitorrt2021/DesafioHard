const ErrorHandler = require('../controllers/modules/ErrorHandler.js');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'config/.env' });

const dbConnection = (db) => {
	mongoose
		.connect(process.env.MONGODB_EDTECH + db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('MongoDB Connected Successfully');
		})
		.catch((error) => {
			const errorHandler = new ErrorHandler(error);
			errorHandler.digest(new Error());
		});
};

module.exports = dbConnection;
