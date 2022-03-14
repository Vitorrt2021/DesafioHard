import monsterStatus from './monsterStatus.js';
import assetManager from './AssetManager.js';

class Enemy {
	constructor(type, x, y, width, height, line, level) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.setHealth(level, monsterStatus[type].health);
		this.maxHealth = this.health;
		this.line = line;
		this.isDying = false;
		this.isDead = false;
		this.speed = monsterStatus[type].speed * 1.15;
		this.money = monsterStatus[type].money;
		this.animation = assetManager.getAnimationInstance(type);
		this.type = type;
		this.#updateMaxHeight();
	}
	//FIX-IT BALANCEAMENTO
	setHealth(level, health) {
		if (level == 0) {
			this.health = parseInt(health);
		} else {
			this.health =
				parseInt(health) + parseInt(health) * Math.pow(1.8, level - 1);
		}
	}
	update() {
		this.x -= this.speed;
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
	setDyingAnimation() {
		this.isDying = true;
		this.speed = 0;
		this.changeAnimation(this.type + '_dying');
	}

	draw(ctx) {
		const monsterImage = this.selectImage();
		const animationMaxHeight = this.animationMaxHeight;

		let delta_y = animationMaxHeight - monsterImage.height; //Evitar pulos dos slimes
		delta_y += (this.height - monsterImage.height) / 2; //centralizar no caminho das torres.

		if (this.animation.isAnimationFinished() && this.isDying) {
			this.isDead = true;
		}

		if (!this.isDying) {
			this.drawLifeBar(ctx);
		}

		if (!this.isDead) {
			ctx.strokeStyle = 'red';
			ctx.strokeRect(this.x, this.y, this.width, this.height);
			ctx.drawImage(monsterImage, this.x, this.y + delta_y);
		}
	}

	drawLifeBar(ctx) {
		ctx.fillStyle = '#000';
		ctx.fillRect(this.x, this.y, 100, this.width / 10);
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(
			this.x + 5,
			this.y + 5,
			90 * (this.health / this.maxHealth),
			this.width / 10 - 10
		);
	}
}

export default Enemy;
