import monsterStatus from './monsterStatus.js';
import animationManager from './AnimationManager.js';

class Monster {
	constructor(type) {
		// this.cont = 0;
		// this.speed = monsterStatus[type].speed;
		this.type = type;
		this.speed = monsterStatus[type].speed;
		this.health = monsterStatus[type].health;
		// this.attack;
		// this.image = monsterStatus[type].image;
		this.animation = animationManager.getNewAnimationInstance(type);
		this.imageHeight = monsterStatus[type].imageHeight;
		this.imageMaxHeight = monsterStatus[type].imageMaxHeight;
		// this.index = null;
	}

	// getMonsterImageHeight(type) {
	//   return monsterStatus[type].imageHeight;
	// }

	// getMonsterImageMaxHeight(type) {
	//   return monsterStatus[type].imageMaxHeight;
	// }
	// loadImage(imagePath, key) {
	//   const canvasImage = new Image();
	//   canvasImage.src = imagePath;
	//   canvasImage.onload = () => key.imagesLoaded.push(canvasImage);
	// }

	// getMonsterInitialSpeed(type) {
	//   return monsterStatus[type].speed;
	// }

	// getMonsterInitialHealth(type) {
	//   return monsterStatus[type].health;
	// }

	// getMonsterImage(type, index) {
	//   return monsterStatus[type].image[index];
	// }
	attack() {
		return this.health;
	}

	changeAnimation(animationName) {
		this.animation = animationManager.getNewAnimationInstance(animationName);
	}

	selectImage() {
		// const imageResult = this.animation[parseInt(this.cont)];
		// this.index = this.animation.indexOf(imageResult);

		// if (this.cont >= 4.5) {
		// 	this.cont = 0;
		// } else {
		// 	this.cont += 0.1;
		// }

		// return imageResult;
		return this.animation.selectImage();
	}
}

export default Monster;
