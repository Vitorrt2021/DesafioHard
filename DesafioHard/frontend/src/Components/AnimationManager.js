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
		this.#imagesForAnimation = [];

		for (let index = 0; index < 5; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['slimePink_' + (index + 1)]
			);
		}

		this.#animations['slimePink'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];

		for (let index = 0; index < 5; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['slimeGreen_' + (index + 1)]
			);
		}

		this.#animations['slimeGreen'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];

		for (let index = 0; index < 5; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['robot_' + (index + 1)]
			);
		}

		this.#animations['robot'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];

		for (let index = 0; index < 5; index++) {
			this.#imagesForAnimation.push(assetManager.images['toad_' + (index + 1)]);
		}

		this.#animations['toad'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];

		for (let index = 0; index < 3; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['toad_dying_' + (index + 1)]
			);
		}

		this.#animations['toad_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];

		for (let index = 0; index < 3; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['robot_dying_' + (index + 1)]
			);
		}

		this.#animations['robot_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];

		for (let index = 0; index < 2; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['slimeGreen_dying_' + (index + 1)]
			);
		}

		this.#animations['slimeGreen_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];

		for (let index = 0; index < 2; index++) {
			this.#imagesForAnimation.push(
				assetManager.images['slimePink_dying_' + (index + 1)]
			);
		}

		this.#animations['slimePink_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
		};
	}

	getNewAnimationInstance(animationName) {
		const anim = this.#animations[animationName];
		return new Animation(anim.counterIncrement, anim.images);
	}
}

class Animation {
	#animationImages;
	#counterIncrement;
	#frame;

	constructor(counterIncrement, images) {
		this.#frame = 0;
		this.#animationImages = images;
		this.#counterIncrement = counterIncrement;
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
}

const animationManager = new AnimationManager();
export default animationManager;
