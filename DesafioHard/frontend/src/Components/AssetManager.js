const apiURL = 'http://edtech.dudeful.com:3004';

class AssetManager {
	constructor() {
		this.images = {};
		this.sounds = {};

		// $.get(apiURL + '/get-assets', (res) => {
		$.get('/get-assets', (res) => {
			this.#buildAssets(res);
		});
	}

	#buildImageObject(filePath) {
		const image = new Image();
		image.src = filePath;
		return image;
	}

	#buildAssets(files) {
		for (const filePath of files) {
			let changedFilePath = filePath.split('\\'); //Windows
			// let changedFilePath = filePath.split('/'); //Linux

			const fileNameComplete = changedFilePath[changedFilePath.length - 1];

			const fileName = fileNameComplete.split('.')[0];
			const fileExtension = fileNameComplete.split('.')[1];

			changedFilePath[0] = '..';
			changedFilePath = changedFilePath.join('/');

			if (fileExtension === 'mp3') {
				// sounds[fileName.slice(0, -4)] = {}; //TODO, verificar depois os sons.
			} else {
				this.images[fileName] = this.#buildImageObject(changedFilePath);
			}
		}
	}

	isImagesLoadCompleted() {
		if (
			Object.keys(this.images).length === 0 &&
			this.images.constructor === Object
		) {
			return false;
		}

		for (const imageName in this.images) {
			if (!this.images[imageName].complete) {
				return false;
			}
		}

		return true;
	}
}

const instance = new AssetManager();
export default instance;
