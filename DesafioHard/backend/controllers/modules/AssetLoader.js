const fs = require('fs');
const path = require('path');
const ErrorHandler = require('./ErrorHandler.js');

class AssetLoader {
	constructor() {
		this.images = {};
		this.sounds = {};
	}

	//FIX-IT: Find a way to use the ErrorHandler class in here
	loadAssets(filePath) {
		try {
			let changedFilePath = filePath.replaceAll('\\', '/').split('/');

			const fileNameComplete = changedFilePath[changedFilePath.length - 1];

			const fileName = fileNameComplete.split('.')[0];
			const fileExtension = fileNameComplete.split('.')[1];

			changedFilePath = changedFilePath.join('/');

			const fileAsBase64 = fs.readFileSync(changedFilePath, 'base64');

			if (fileExtension === 'mp3') {
				this.sounds[fileName] = `data:audio/mpeg;base64,${fileAsBase64}`;
			} else {
				this.images[fileName] = `data:image/png;base64,${fileAsBase64}`;
			}
		} catch (error) {
			console.error(error);
			res.status(error.code).send(error);
		}
	}
}

function loadFiles(directory) {
	//FIX-IT: Find a way to use the ErrorHandler class in here
	function readPath(directory) {
		try {
			const dirRead = fs.readdirSync(directory);

			for (const file of dirRead) {
				const filePath = path.join(directory, file);

				if (fs.statSync(filePath).isDirectory()) {
					readPath(filePath);
				} else {
					assets.loadAssets(filePath);
				}
			}
		} catch (error) {
			console.error(error);
			res.status(error.code).send(error);
		}
	}

	readPath(directory);
}

const assets = new AssetLoader();
loadFiles(__dirname + '/../../assets');

module.exports = assets;
