import enemyData from './EnemyData.js';
import bossData from './BossData.js';
import assetManager from './AssetManager.js';

class Enemy {
	constructor(type, x, y, width, height, line, level) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.collisionX = x;
		this.collisionY = y;
		this.collisionWidth = 0;
		this.collisionHeight = 0;
		this.isBlocked = false;
		this.type = type;

		if (
			type === 'golem' ||
			type === 'goblin' ||
			type === 'gorilla' ||
			type === 'iceman'
		) {
			this.setHealth(level, bossData[type].health);
			this.speed = bossData[type].speed * 1.15;
			this.money = bossData[type].money;
		} else {
			this.setHealth(level, enemyData[type].health);
			this.speed = enemyData[type].speed * 1.15;
			this.money = enemyData[type].money;
		}

		this.maxHealth = this.health;
		this.line = line;
		this.isDying = false;
		this.isDead = false;
		this.animation = assetManager.getAnimationInstance(type);

		this.#updateMaxHeight();
	}
	//FIX-IT BALANCEAMENTO
	setHealth(level, health) {
		if (
			this.type === 'golem' ||
			this.type === 'goblin' ||
			this.type === 'gorilla'
		) {
			console.log(`${level - bossData[this.type].level} | ${this.type}`);
			console.log(bossData[this.type]);
			if (bossData[this.type].level >= level) {
				this.health = parseInt(health);
			} else {
				this.health =
					parseInt(health) +
					parseInt(health) *
						Math.pow(1.8, level + 1 - bossData[this.type].level);
			}
		} else {
			console.log(`${level - enemyData[this.type].level} | ${this.type}`);
			console.log(enemyData[this.type]);
			if (enemyData[this.type].level >= level) {
				this.health = parseInt(health);
			} else {
				this.health =
					parseInt(health) +
					parseInt(health) * Math.pow(1.8, level - enemyData[this.type].level);
			}
		}
	}
	update() {
		if (!this.isBlocked) {
			this.x -= this.speed;
			this.collisionX = this.x;
		}
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

		//atualizar dados de colisão
		this.collisionWidth = monsterImage.width;
		this.collisionHeight = monsterImage.height;
		this.collisionY = this.y + delta_y;

		if (this.animation.isAnimationFinished() && this.isDying) {
			this.isDead = true;
		}

		if (!this.isDying) {
			this.drawLifeBar(ctx);
		}

		if (!this.isDead) {
			// ctx.strokeStyle = 'red';
			// ctx.strokeRect(
			// 	this.collisionX,
			// 	this.collisionY,
			// 	this.collisionWidth,
			// 	this.collisionHeight
			// );
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
