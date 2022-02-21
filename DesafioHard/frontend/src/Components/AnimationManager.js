class AnimationManager {
	#imagesForAnimation = [];
	#animations = {};

	buildAnimations(assetManager) {
		let imagesHeight = [];
		//Explosion animation
		for (let index = 0; index < 8; index++) {
			const image = assetManager.images['Explosion_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['Explosion'] = {
			counterIncrement: 0.2,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 5; index++) {
			const image = assetManager.images['slimePink_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['slimePink'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 5; index++) {
			const image = assetManager.images['slimeGreen_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['slimeGreen'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 5; index++) {
			const image = assetManager.images['robot_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['robot'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 5; index++) {
			const image = assetManager.images['toad_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['toad'] = {
			counterIncrement: 0.1,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 3; index++) {
			const image = assetManager.images['toad_dying_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['toad_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 3; index++) {
			const image = assetManager.images['robot_dying_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['robot_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 2; index++) {
			const image = assetManager.images['slimeGreen_dying_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['slimeGreen_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};

		//Another animation...
		//reset imagesForAnimation
		this.#imagesForAnimation = [];
		imagesHeight = [];

		for (let index = 0; index < 2; index++) {
			const image = assetManager.images['slimePink_dying_' + (index + 1)];
			imagesHeight.push(image.height);
			this.#imagesForAnimation.push(image);
		}

		this.#animations['slimePink_dying'] = {
			counterIncrement: 0.05,
			images: this.#imagesForAnimation,
			maxImageHeight: Math.max(...imagesHeight),
		};
	}

	getNewAnimationInstance(animationName) {
		const anim = this.#animations[animationName];
		return new Animation(
			anim.counterIncrement,
			anim.images,
			anim.maxImageHeight
		);
	}
}

class Animation {
	#animationImages;
	#counterIncrement;
	#animationMaxHeight;
	#frame;

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

const instance = new AnimationManager();
export default instance;
