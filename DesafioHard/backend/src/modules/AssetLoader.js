const fs = require('fs');
const path = require('path');

//FIX-IT: ADAPT FOR ERROR HANDLING (try catch)
function loadFiles(directory) {
	function readPath(directory) {
		const dirRead = fs.readdirSync(directory);

		for (const file of dirRead) {
			const filePath = path.join(directory, file);

			if (fs.statSync(filePath).isDirectory()) {
				readPath(filePath);
			} else {
				instance.loadAssets(filePath);
			}
		}
	}

	readPath(directory);
}

//FIX-IT: ADAPT FOR ERROR HANDLING (try catch)
class AssetLoader {
	constructor() {
		this.images = {};
		this.sounds = {};
	}

	loadAssets(filePath) {
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
	}
}

const instance = new AssetLoader();
loadFiles(__dirname + '/../assets');

module.exports = instance;
