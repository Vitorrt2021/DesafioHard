import fs from 'fs';
import path from 'path';

function getFilesInsideDirectory(directory) {
	const filesArray = [];
	const files = fs.readdirSync(directory);

	for (const file of files) {
		const absolutePath = path.join(directory, file);

		if (fs.statSync(absolutePath).isDirectory()) {
			getFilesInsideDirectory(absolutePath);
		} else {
			filesArray.push(absolutePath);
		}
	}
}

class AssetManager {
	constructor() {
		this.files = getFilesInsideDirectory('../assets');
		console.log(this.files);
	}
}

export default AssetManager;
