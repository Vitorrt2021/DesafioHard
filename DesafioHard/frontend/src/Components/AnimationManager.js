import assetManager from './AssetManager.js';

class AnimationManager {
	#imagesForAnimation = [];
	#animations;

	constructor() {
		this.#animations = {};

		//Explosion animation
		for (let index = 0; index < 8; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['Explosion_' + (index + 1)]
			);
		}

		this.#animations['Explosion'] = {
			counterIncrement: 0.2,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		// this.#imagesForAnimation = [];
	}

	getNewAnimationInstance(animationName) {
		const anim = this.#animations[animationName];
		return new Animation(anim.counterIncrement, anim.images);
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
