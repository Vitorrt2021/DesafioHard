import Projectile from './Projectile.js';
import towerStatus from './towerStatus.js';
import assetManager from './AssetManager.js';

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

class Tower {
	constructor(x = 0, y = 0, cellSize = 0, towerType) {
		this.x = x - cellSize / 2;
		this.y = y - cellSize / 2;
		this.width = cellSize;
		this.height = cellSize;

		this.health = towerStatus[towerType].health;
		this.maxHealth = this.health;
		this.damage = towerStatus[towerType].damage;
		this.attackSpeed = towerStatus[towerType].attackSpeed;
		this.projectiles = [];
		this.projectileImage = assetManager.getImage(
			towerStatus[towerType].projectile
		);
		this.price = towerStatus[towerType].price;
		this.isShooting = true;
		this.isDamaged = false;

		this.explosionAnimations = [
			new DyingExplosion(
				assetManager.getAnimationInstance('explosion'),
				this.x,
				this.y,
				this.width,
				this.height
			),
			new DyingExplosion(
				assetManager.getAnimationInstance('explosion'),
				this.x,
				this.y,
				this.width,
				this.height
			),
			new DyingExplosion(
				assetManager.getAnimationInstance('explosion'),
				this.x,
				this.y,
				this.width,
				this.height
			),
		];

		this.alphaRedRectangle = 0;
		this.maxAlphaRectangle = 0.5;
		this.redRectDimensionModifier = 0;

		this.image = assetManager.getImage(towerType);
		this.imageBrightness = 100;
		this.imageBrightnessRatioChange = 0.5;

		this.timer = this.attackSpeed;
		this.level = towerStatus[towerType].level;
		this.nextLevel = towerStatus[towerType].nextLevel;
		this.isDying = false;
		this.isDead = false;

		this.isBigExplosionPlayed = false;
		this.piecesTimeCounter = 80;

		const fragments = [];

		for (let i = 1; i < 10; i++) {
			// set the offset for each one of the 9 fragments
			let offsetX =
				i === 1 || i === 4 || i === 7
					? 0
					: i === 2 || i === 5 || i === 8
					? 1
					: 2;
			let offsetY = i <= 3 ? 0 : i >= 4 && i <= 6 ? 1 : 2;

			let pieceAnimation = new PieceAnimation(
				assetManager.getImage(towerType + '_frag_' + i),
				this.x + this.width * offsetX,
				this.y + this.height * offsetY,
				this.width,
				this.height
			);

			fragments.push(pieceAnimation);
		}
		this.pieces = fragments;
	}

	setDyingAnimation() {
		this.isDying = true;
	}

	draw(ctx) {
		if (this.isDead) return;

		if (this.isDying) {
			this.#drawDyingAnimation(ctx);
		} else {
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
			this.#drawEvolveIcon(ctx);
			this.#drawLifeBar(ctx);
			this.#drawDamageAnimation(ctx);
		}
	}

	#drawDyingAnimation(ctx) {
		ctx.filter = `brightness(${this.imageBrightness}%)`;
		if (this.imageBrightness <= 50) {
			if (!this.isBigExplosionPlayed) {
				assetManager.playSound('tower_dead_explosion', 0.5);
				this.isBigExplosionPlayed = true;
			}

			this.#drawFallingPieces(ctx);

			this.piecesTimeCounter -= 2; //Timer to count falling pieces animation ending...

			if (this.piecesTimeCounter <= 0) {
				this.isDead = true;
			}
		} else {
			assetManager.playSound('explosion', 0.2, false);
			this.#drawBrightnessChangeAnimation(ctx);
		}
		ctx.filter = 'none'; //reset filter to not affect other images
	}

	#drawBrightnessChangeAnimation(ctx) {
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

		this.explosionAnimations.forEach((element) => {
			element.drawExplosionsWhenDying(ctx);
		});

		this.imageBrightness -= this.imageBrightnessRatioChange;
	}

	#drawFallingPieces(ctx) {
		this.pieces.forEach((piece) => {
			piece.drawPiece(ctx);
		});
	}

	#drawEvolveIcon(ctx) {
		if (this.canEvolve) {
			ctx.drawImage(
				assetManager.getImage('evolve_tower'),
				this.x + this.width * 0.8,
				this.y,
				this.width / 5,
				this.height / 5
			);
		}
	}

	#drawLifeBar(ctx) {
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
			this.y - 5 + this.width,
			90 * (this.health / this.maxHealth),
			this.width / 7 - 10
		);
	}

	#drawDamageAnimation(ctx) {
		if (this.explosionAnimations[0].explosionAnimation.isAnimationFinished()) {
			this.alphaRedRectangle = 0;
			this.redRectDimensionModifier = 0;
			this.isDamaged = false;
		}

		if (this.isDamaged) {
			this.#drawRedCircle(
				this.explosionAnimations[0].explosionAnimation.getCurrentFrame(false),
				this.explosionAnimations[0].explosionAnimation.getAnimationLength(),
				ctx
			);
			ctx.drawImage(
				this.explosionAnimations[0].explosionAnimation.selectImage(),
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
		if (this.isShooting && !this.isDying) {
			if (this.timer % this.attackSpeed === 0) {
				this.projectiles.push(
					new Projectile(
						this.x + this.width,
						this.y + 30,
						this.projectileImage,
						this.damage
					)
				);

				assetManager.playSound('shooting');
			}
			this.timer++;
		}
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

class DyingExplosion {
	#explosionArea;
	explosionAnimation;
	#towerX;
	#towerY;
	#towerWidth;
	#towerHeight;

	constructor(explosionAnimation, towerX, towerY, towerWidth, towerHeight) {
		this.#towerX = towerX;
		this.#towerY = towerY;
		this.#towerWidth = towerWidth;
		this.#towerHeight = towerHeight;
		this.explosionAnimation = explosionAnimation;
		this.#explosionArea = this.#calculateExplosionsArea();
	}

	drawExplosionsWhenDying(ctx) {
		if (this.explosionAnimation.isAnimationFinished()) {
			this.#explosionArea = this.#calculateExplosionsArea();
		}

		ctx.drawImage(
			this.explosionAnimation.selectImage(),
			this.#explosionArea.x,
			this.#explosionArea.y,
			getRandomNumber(this.#towerWidth / 3, this.#towerWidth),
			getRandomNumber(this.#towerHeight / 3, this.#towerHeight)
		);
	}

	#calculateExplosionsArea() {
		return {
			x: this.#towerX + Math.random() * this.#towerWidth - this.#towerWidth / 3,
			y:
				this.#towerY +
				Math.random() * this.#towerHeight -
				this.#towerHeight / 3,
		};
	}
}

class PieceAnimation {
	#x;
	#y;
	#image;
	#width;
	#height;
	#angle;
	#angleChangeRatio;

	constructor(image, x, y, width, height) {
		this.towerPieceSpeedX =
			(Math.random() < 0.5 ? -1 : 1) * getRandomNumber(5, 20);
		this.towerPieceSpeedY = getRandomNumber(5, -20);
		this.towerPieceSpeedYChangeRatio = getRandomNumber(1, 0.5);
		this.#x = x;
		this.#y = y;
		this.#width = width / 2;
		this.#height = height / 2;
		this.#image = image;
		this.#angle = Math.PI / 360;
		this.#angleChangeRatio = getRandomNumber(0.05, 0.3);
	}

	drawPiece(ctx) {
		ctx.save();
		ctx.translate(this.#x + this.#width / 2, this.#y + this.#height / 2);
		ctx.rotate((this.#angle += this.#angleChangeRatio));
		ctx.translate(-(this.#x + this.#width / 2), -(this.#y + this.#height / 2));
		ctx.drawImage(this.#image, this.#x, this.#y, this.#width, this.#height);
		ctx.restore();

		this.#x += this.towerPieceSpeedX;
		this.#y += this.towerPieceSpeedY;

		this.towerPieceSpeedY += this.towerPieceSpeedYChangeRatio;
	}
}

export default Tower;
