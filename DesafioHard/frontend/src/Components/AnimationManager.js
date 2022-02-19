import assetManager from './AssetManager.js';

class AnimationManager {
	#imagesForAnimation = [];

	constructor() {
		this.animations = {};

		//Explosion animation
		for (let index = 0; index < 8; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['Explosion_' + (index + 1)]
			);
		}

		this.animations['Explosion'] = new Animation(0.2, this.#imagesForAnimation);
	}
}

class Animation {
	#animationImages;
	#counterIncrement;

	constructor(counterIncrement, images) {
		this.frame = 0;
		this.#animationImages = images;
		this.#counterIncrement = counterIncrement;
	}

	selectImage() {
		this.isAnimationFinished();

		const selectedImage = this.#animationImages[parseInt(this.frame)];
		this.frame += this.#counterIncrement;

		return selectedImage;
	}

	isAnimationFinished() {
		const checkFrameAndLength = this.frame >= this.getAnimationLength();

		if (checkFrameAndLength) {
			this.frame = 0;
		}
		return checkFrameAndLength;
	}

	getAnimationLength() {
		return this.#animationImages.length;
	}
}

const animationManager = new AnimationManager();
export default animationManager;
