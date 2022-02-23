import monsterStatus from './monsterStatus.js';
import assetManager from './AssetManager.js';

class Monster {
	constructor(type) {
		this.type = type;
		this.speed = monsterStatus[type].speed;
		this.health = monsterStatus[type].health;
		this.animation = assetManager.getAnimationInstance(type);
		this.#updateMaxHeight();
	}

	changeAnimation(animationName) {
		this.animation = assetManager.getAnimationInstance(animationName);
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
