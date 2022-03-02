class ErrorHandler {
	constructor(error) {
		this.error = error;
	}

	digest(context) {
		const errorPlace = context.stack.split(' at ')[1].trim();
		console.log(errorPlace);
		console.log(this.error);
	}
}

module.exports = ErrorHandler;
