const ErrorHandler = require('../controllers/modules/ErrorHandler.js');
const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });

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
			const errorHandler = new ErrorHandler.InternalServerError(
				'The server could not establish a connection with MongoDB',
				error
			);

			console.error(errorHandler);
		});
};

module.exports = dbConnection;
