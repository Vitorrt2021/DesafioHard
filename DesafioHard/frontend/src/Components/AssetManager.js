// import paths from './AssetPaths.js';
import animationData from './animationData.js';

class AssetManager {
	#animations = {};
	#images = {};
	#sounds = {};

	async prepareAssets(assetLoaderInstance) {
		await this.#makeImagesObject(assetLoaderInstance);
		this.#makeAudiosObject(assetLoaderInstance);

		//FIX-IT Dá pra melhorar ainda mais fazendo ler uma pasta animations, mas por questão de tempo, deixar pra depois.
		this.#buildAnimation('explosion');
		this.#buildAnimation('slimePink');
		this.#buildAnimation('slimeGreen');
		this.#buildAnimation('toad');
		this.#buildAnimation('robot');
		this.#buildAnimation('toad_dying');
		this.#buildAnimation('robot_dying');
		this.#buildAnimation('slimeGreen_dying');
		this.#buildAnimation('slimePink_dying');
	}

	#buildAnimation(animationName) {
		const imagesHeight = [];
		const imagesForAnimation = [];
		for (
			let index = 0;
			index < animationData[animationName].animationQtyFrames;
			index++
		) {
			const image = this.getImage(`${animationName}_${index + 1}`);
			imagesHeight.push(image.height);
			imagesForAnimation.push(image);
		}

		this.#animations[animationName] = {
			counterIncrement: animationData[animationName].counterIncrement,
			images: imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};
	}

	// #buildAssets(files) {
	// 	for (const filePath of files) {
	// 		// let changedFilePath = filePath.split('\\'); //Windows
	// 		let changedFilePath = filePath.split('/'); //Linux
	// 	}
	// }

	getAnimationInstance(animationName) {
		const anim = this.#animations[animationName];
		return new Animation(
			anim.counterIncrement,
			anim.images,
			anim.maxImageHeight
		);
	}

	getImage(image_name) {
		return this.#images[image_name];
	}

	getSound(sound_name) {
		return this.#sounds[sound_name];
	}

	async #makeImagesObject(assetLoaderInstance) {
		for (const image in assetLoaderInstance.images) {
			const imageObj = new Image();
			imageObj.src = assetLoaderInstance.images[image];

			this.#images[image] = imageObj;
		}

		//Esperando carregar as imagens antes de continuar...
		while (!this.#isImagesLoadCompleted()) {
			await new Promise((resolve) => setTimeout(resolve, 200)); //sleep
		}
	}

	#makeAudiosObject(assetLoaderInstance) {
		for (const sound in assetLoaderInstance.sounds) {
			const soundObj = new Audio(assetLoaderInstance.sounds[sound]);

			this.#sounds[sound] = soundObj;
		}
	}
	#isImagesLoadCompleted() {
		if (
			Object.keys(this.#images).length === 0 &&
			this.#images.constructor === Object
		) {
			return false;
		}

		for (const image in this.#images) {
			if (!this.#images[image].complete) {
				return false;
			}
		}

		return true;
	}
}

class Animation {
	#frame;
	#animationImages;
	#counterIncrement;
	#animationMaxHeight;

	constructor(counterIncrement, images, animationMax) {
		this.#frame = 0;
		this.#animationImages = images;
		this.#counterIncrement = counterIncrement;
		this.#animationMaxHeight = animationMax;
	}

	selectImage() {
		this.isAnimationFinished();

		const selectedImage = this.#animationImages[this.getCurrentFrame(true)];
		this.#frame += this.#counterIncrement;

		return selectedImage;
	}

	isAnimationFinished() {
		const checkFrameAndLength = this.#frame >= this.getAnimationLength();

		if (checkFrameAndLength) {
			this.#frame = 0;
		}
		return checkFrameAndLength;
	}

	getCurrentFrame(parsed) {
		this.isAnimationFinished();
		return parsed ? parseInt(this.#frame) : this.#frame;
	}

	getAnimationLength() {
		return this.#animationImages.length;
	}

	getAnimationMaxHeight() {
		return this.#animationMaxHeight;
	}
}

const instance = new AssetManager();
export default instance;
