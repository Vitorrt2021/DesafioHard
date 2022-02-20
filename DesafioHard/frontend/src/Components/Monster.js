import monsterStatus from './monsterStatus.js';
import animationManager from './AnimationManager.js';

class Monster {
	constructor(type) {
		this.type = type;
		this.speed = monsterStatus[type].speed;
		this.health = monsterStatus[type].health;
		this.animation = animationManager.getNewAnimationInstance(type);
	}

	attack() {
		return this.health;
	}

	changeAnimation(animationName) {
		this.animation = animationManager.getNewAnimationInstance(animationName);
	}

	selectImage() {
		return this.animation.selectImage();
	}
}

export default Monster;
