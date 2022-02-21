import monsterStatus from './monsterStatus.js';
import animationManager from './AnimationManager.js';

class Monster {
	constructor(type) {
		this.type = type;
		this.speed = monsterStatus[type].speed;
		this.health = monsterStatus[type].health;
		this.animation = animationManager.getNewAnimationInstance(type);
		this.#updateMaxHeight();
	}

	attack() {
		return this.health;
	}

	changeAnimation(animationName) {
		this.animation = animationManager.getNewAnimationInstance(animationName);
		this.#updateMaxHeight();
	}

	selectImage() {
		return this.animation.selectImage();
	}

	#updateMaxHeight() {
		this.animationMaxHeight = this.animation.getAnimationMaxHeight();
	}
}

export default Monster;
