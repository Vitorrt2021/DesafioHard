import Projectile from './Projectile.js';
import towerStatus from './towerStatus.js';

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
		this.projectileSrc = towerStatus[towerType].projectile;
		this.price = towerStatus[towerType].price;
		this.isShooting = true;
		this.isDamaged = false;
		this.explosionFrame = 0;
		this.alphaRedRectangle = 0;
		this.maxAlphaRectangle = 0.5;
		this.redRectDimensionModifier = 0;

		this.explosionImages = Array(8)
			.fill()
			.map((_, i) => {
				const explosionImage = new Image();
				explosionImage.src = towerStatus[towerType].explosions[i];
				return explosionImage;
			});

		this.image = new Image();
		this.image.src = towerStatus[towerType].image;
		this.timer = this.attackSpeed;
		this.level = towerStatus[towerType].level;
		this.nextLevel = towerStatus[towerType].nextLevel;
	}
	draw(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

		if (this.canEnvolve) {
			const image = new Image();
			image.src = '../assets/images/evolve_tower.png';
			ctx.drawImage(
				image,
				this.x + this.width * 0.8,
				this.y,
				this.width / 5,
				this.height / 5
			);
		}
		this.drawLiveBar(ctx);

		if (this.isDamaged) {
			if (this.explosionFrame.toFixed(1).match(/[0-9]\.0/) !== null) {
				const halfLengthExplosions = this.explosionImages.length / 2;

				if (this.explosionFrame <= halfLengthExplosions) {
					this.alphaRedRectangle +=
						this.maxAlphaRectangle / halfLengthExplosions;
				} else {
					this.alphaRedRectangle -=
						this.maxAlphaRectangle / halfLengthExplosions;
				}
			}

			console.log(this.alphaRedRectangle, this.explosionFrame.toFixed(1));
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

			ctx.drawImage(
				this.explosionImages[parseInt(this.explosionFrame)],
				this.x,
				this.y,
				this.width,
				this.height
			);

			this.explosionFrame += 0.2;
		}

		if (this.explosionFrame >= this.explosionImages.length) {
			this.explosionFrame = 0;
			this.alphaRedRectangle = 0;
			this.redRectDimensionModifier = 0;
			this.isDamaged = false;
		}
	}
	update() {
		if (this.isShooting) {
			if (this.timer % this.attackSpeed === 0) {
				this.projectiles.push(
					new Projectile(
						this.x + this.width,
						this.y + 30,
						this.projectileSrc,
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
		ctx.fillRect(this.x * 1.05, this.y - 10, 100, this.width / 7);
		ctx.fillStyle = '#FF0000';
		ctx.fillRect(
			this.x * 1.05 + 5,
			this.y - 10 + 5,
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
