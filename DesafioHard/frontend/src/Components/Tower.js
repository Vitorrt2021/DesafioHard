import Projectile from './Projectile.js';
import towerStatus from './towerStatus.js';
import assetManager from './AssetManager.js';
import animationManager from './AnimationManager.js';

class Tower {
	constructor(x = 0, y = 0, cellSize = 0, towerType = 'cat_tower_level_1') {
		this.x = x - cellSize / 2;
		this.y = y - cellSize / 2;
		this.width = cellSize;
		this.height = cellSize;
		this.health = towerStatus[towerType].health;
		this.maxHealth = this.health;
		this.damage = towerStatus[towerType].damage;
		this.attackSpeed = towerStatus[towerType].attackSpeed;
		this.projectiles = [];
		this.projectileImage =
			assetManager.images[towerStatus[towerType].projectile];
		this.price = towerStatus[towerType].price;
		this.isShooting = true;
		this.isDamaged = false;
		this.explosionAnimation =
			animationManager.getNewAnimationInstance('Explosion');
		this.alphaRedRectangle = 0;
		this.maxAlphaRectangle = 1.0;
		this.redRectDimensionModifier = 0;
		this.image = assetManager.images[towerType];
		this.timer = this.attackSpeed;
		this.level = towerStatus[towerType].level;
		this.nextLevel = towerStatus[towerType].nextLevel;
	}

	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

		if (this.canEvolve) {
			ctx.drawImage(
				assetManager.images['evolve_tower'],
				this.x + this.width * 0.8,
				this.y,
				this.width / 5,
				this.height / 5
			);
		}
		this.drawLiveBar(ctx);

		if (this.explosionAnimation.isAnimationFinished()) {
			this.alphaRedRectangle = 0;
			this.redRectDimensionModifier = 0;
			this.isDamaged = false;
		}

		if (this.isDamaged) {
			this.#drawRedCircle(
				this.explosionAnimation.getCurrentFrame(false),
				this.explosionAnimation.getAnimationLength(),
				ctx
			);

			ctx.drawImage(
				this.explosionAnimation.selectImage(),
				this.x,
				this.y,
				this.width,
				this.height
			);
		}
	}

	#drawRedCircle(frame, animationLength, ctx) {
		if (frame.toFixed(1).match(/[0-9]\.0/) !== null) {
			const halfLengthExplosions = animationLength / 2;

			if (frame <= halfLengthExplosions) {
				this.alphaRedRectangle += this.maxAlphaRectangle / halfLengthExplosions;
			} else {
				this.alphaRedRectangle -= this.maxAlphaRectangle / halfLengthExplosions;
			}
		}

		ctx.fillStyle = `rgba(255, 0, 0, ${this.alphaRedRectangle})`;
		ctx.beginPath();
		ctx.arc(
			this.x + this.width / 2,
			this.y + this.height / 2,
			this.width / 2,
			0,
			2 * Math.PI
		);
		ctx.closePath();
		ctx.fill();
	}

	update() {
		if (this.isShooting) {
			if (this.timer % this.attackSpeed === 0) {
				this.projectiles.push(
					new Projectile(
						this.x + this.width,
						this.y + 30,
						this.projectileImage,
						this.damage
					)
				);
				const audio = new Audio('../assets/audios/shooting.mp3');
				audio.volume = 0.5;
				audio.play();
			}
			this.timer++;
		}
	}
	drawLiveBar(ctx) {
		ctx.fillStyle = '#000';
		ctx.fillRect(
			this.x + this.width * 0.1 + 10,
			this.y - 10 + this.width,
			100,
			this.width / 7
		);
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(
			this.x + this.width * 0.1 + 15,
			this.y - 10 + 5 + this.width,
			90 * (this.health / this.maxHealth),
			this.width / 7 - 10
		);
	}
	handleProjectiles(ctx, canvasWidth, cellSize) {
		this.projectiles.forEach((projectile, index) => {
			projectile.update();
			projectile.draw(ctx);
			if (projectile && projectile.x > canvasWidth + cellSize) {
				this.projectiles.splice(index, 1);
			}
		});
	}
}

export default Tower;
