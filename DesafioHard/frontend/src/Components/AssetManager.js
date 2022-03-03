import animationData from './animationData.js';

const sleep = 200;

class AssetManager {
	#images = {};
	#sounds = {};
	#volume = 0.2;
	#animations = {};

	async prepareAssets(assetLoaderInstance) {
		await this.#makeImagesObject(assetLoaderInstance);
		await this.#makeAudiosObject(assetLoaderInstance);

		const animDataKeys = Object.keys(animationData);
		for (const animationName of animDataKeys) {
			this.#buildAnimation(animationName);
		}
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

	async playSound(sound_name, volume = this.#volume, loop = false) {
		if (!this.#sounds[sound_name]) {
			await this.#makeAudioObjectFromFrontEnd(sound_name);
		}

		const soundObject = this.#sounds[sound_name];
		soundObject.volume = volume;

		if (loop) {
			soundObject.loop = loop;
		}

		soundObject.play();

		//just in case the programmer wants to do more complex things
		return soundObject;
	}

	pauseSound(sound_name) {
		this.#sounds[sound_name]?.pause();
	}

	stopSound(sound_name) {
		this.pauseSound(sound_name);

		if (this.#sounds[sound_name]) {
			this.#sounds[sound_name].currentTime = 0;
		}
	}

	async #makeImagesObject(assetLoaderInstance) {
		for (const image in assetLoaderInstance.images) {
			const imageObj = new Image();
			imageObj.src = assetLoaderInstance.images[image];

			this.#images[image] = imageObj;
		}

		//Esperando carregar as imagens antes de continuar...
		while (!this.#isImagesLoadCompleted()) {
			await new Promise((resolve) => setTimeout(resolve, sleep)); //sleep
		}
	}

	async #makeAudiosObject(assetLoaderInstance) {
		for (const sound in assetLoaderInstance.sounds) {
			const soundObj = new Audio(assetLoaderInstance.sounds[sound]);

			this.#sounds[sound] = soundObj;
		}

		//Esperando carregar os sons antes de continuar...
		while (!this.#isAudiosLoadCompleted()) {
			await new Promise((resolve) => setTimeout(resolve, sleep)); //sleep
		}
	}

	async #makeAudioObjectFromFrontEnd(sound_name) {
		const frontendSound = new Audio(
			'../assets/audios/bg_music/' + sound_name + '.mp3'
		);

		this.#sounds[sound_name] = frontendSound;

		while (!this.#isAudiosLoadCompleted()) {
			await new Promise((resolve) => setTimeout(resolve, sleep)); //sleep
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

	#isAudiosLoadCompleted() {
		if (
			Object.keys(this.#sounds).length === 0 &&
			this.#sounds.constructor === Object
		) {
			return false;
		}

		for (const sound in this.#sounds) {
			if (this.#sounds[sound].readyState === 0) {
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
