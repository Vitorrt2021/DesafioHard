import Projectile from './Projectile.js';
import towerStatus from './TowerData.js';
import assetManager from './AssetManager.js';

function getRandomNumber(min, max) {
	return Math.random() * (max - min) + min;
}

class Tower {
	constructor(x = 0, y = 0, cellSize = 0, towerType, level = false) {
		this.x = x - cellSize / 2;
		this.y = y - cellSize / 2;
		this.width = cellSize;
		this.height = cellSize;
		this.collisionX = this.x;
		this.collisionY = this.y;
		this.collisionWidth = cellSize;
		this.collisionHeight = cellSize;

		if (typeof level === 'number') {
			if (level >= 9) {
				this.towerType = `${towerType.slice(0, towerType.length - 1)}9`;
				this.isBarrier = towerStatus[this.towerType].barrier || false;

				this.health = towerStatus[this.towerType].health;
				this.projectileImage = assetManager.getImage(
					towerStatus[this.towerType].projectile
				);
				this.damage = towerStatus[this.towerType].damage;
				this.attackSpeed = towerStatus[this.towerType].attackSpeed;
				this.price = towerStatus[this.towerType].price;
				this.image = assetManager.getImage(this.towerType);
			} else {
				this.towerType = `${towerType.slice(0, towerType.length - 1)}${
					level + 1
				}`;
				this.isBarrier = towerStatus[this.towerType].barrier || false;

				this.health = towerStatus[this.towerType].health;
				this.projectileImage = assetManager.getImage(
					towerStatus[this.towerType].projectile
				);
				this.damage = towerStatus[this.towerType].damage;
				this.attackSpeed = towerStatus[this.towerType].attackSpeed;
				this.price = towerStatus[this.towerType].price;
				this.image = assetManager.getImage(this.towerType);
			}
		} else {
			this.towerType = towerType;
			this.health = towerStatus[towerType].health;
			this.projectileImage = assetManager.getImage(
				towerStatus[towerType].projectile
			);
			this.damage = towerStatus[towerType].damage;
			this.attackSpeed = towerStatus[towerType].attackSpeed;
			this.price = towerStatus[towerType].price;
			this.level = towerStatus[towerType].level;
			this.nextLevel = towerStatus[towerType].nextLevel;
			this.image = assetManager.getImage(towerType);
		}

		this.projectiles = [];
		this.maxHealth = this.health;

		this.isShooting = true;
		this.isDamaged = false;

		this.alphaRedRectangle = 0;
		this.maxAlphaRectangle = 0.5;
		this.redRectDimensionModifier = 0;

		this.evolveTowerAnimation =
			assetManager.getAnimationInstance('evolve_tower_arrow');
		this.imageBrightness = 100;
		this.imageBrightnessRatioChange = 0.32;

		this.timer = this.attackSpeed;

		this.isDying = false;
		this.isDead = false;

		this.isBigExplosionPlayed = false;
		this.piecesTimeCounter = 100;

		this.#buildExplosionsAnimation();
		this.#buildPiecesAnimation();
	}

	updateTowerPosition(newX, newY) {
		this.x = newX;
		this.y = newY;
		this.collisionX = this.x;
		this.collisionY = this.y;

		this.#buildExplosionsAnimation();
		this.#buildPiecesAnimation();
	}

	#buildExplosionsAnimation() {
		this.explosionAnimations = [];
		const numberOfExplosions = 3;

		for (let index = 0; index < numberOfExplosions; index++) {
			this.explosionAnimations.push(
				new DyingExplosion(
					assetManager.getAnimationInstance('explosion'),
					this.x,
					this.y,
					this.width,
					this.height
				)
			);
		}
	}

	#buildPiecesAnimation() {
		this.pieces = [];
		const numberOfPieces = 9; //must be a number who has an integer square root: 4, 9, 16, 25...
		const squareRootNumberPieces = Math.sqrt(numberOfPieces);
		let namePieces = this.towerType.slice(0, this.towerType.length - 1);

		let imageIndex = 1;

		for (let index_Y = 0; index_Y < squareRootNumberPieces; index_Y++) {
			let matrix_Y = this.y;
			matrix_Y += (index_Y * this.height) / squareRootNumberPieces;

			for (let index_X = 0; index_X < squareRootNumberPieces; index_X++) {
				let matrix_X = this.x;
				matrix_X += (index_X * this.width) / squareRootNumberPieces;
				if (
					towerStatus[this.towerType].level > 0 &&
					towerStatus[this.towerType].level < 4
				) {
					this.pieces.push(
						new PieceAnimation(
							assetManager.getImage(namePieces + '1_frag_' + imageIndex++),
							matrix_X,
							matrix_Y,
							this.width / squareRootNumberPieces,
							this.height / squareRootNumberPieces
						)
					);
				} else if (
					towerStatus[this.towerType].level >= 4 &&
					towerStatus[this.towerType].level < 7
				) {
					this.pieces.push(
						new PieceAnimation(
							assetManager.getImage(namePieces + '2_frag_' + imageIndex++),
							matrix_X,
							matrix_Y,
							this.width / squareRootNumberPieces,
							this.height / squareRootNumberPieces
						)
					);
				} else {
					this.pieces.push(
						new PieceAnimation(
							assetManager.getImage(namePieces + '3_frag_' + imageIndex++),
							matrix_X,
							matrix_Y,
							this.width / squareRootNumberPieces,
							this.height / squareRootNumberPieces
						)
					);
				}
			}
		}
	}

	setDyingAnimation() {
		this.isDying = true;
	}

	draw(ctx) {
		if (this.isDead) return;

		if (this.isDying) {
			this.#drawDyingAnimation(ctx);
		} else {
			// ctx.strokeRect(
			// 	this.collisionX,
			// 	this.collisionY,
			// 	this.collisionWidth,
			// 	this.collisionHeight
			// );
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

		this.piecesTimeCounter -= 1; //Timer to count falling pieces animation ending...

		if (this.piecesTimeCounter <= 0) {
			this.isDead = true;
		}
	}

	#drawEvolveIcon(ctx) {
		if (this.canEvolve) {
			ctx.drawImage(
				this.evolveTowerAnimation.selectImage(),
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
		if (!this.isBarrier) {
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
	#towerX;
	#towerY;
	#towerWidth;
	#towerHeight;

	constructor(explosionAnimation, towerX, towerY, towerWidth, towerHeight) {
		this.#towerX = towerX;
		this.#towerY = towerY;
		this.#towerWidth = towerWidth / 2;
		this.#towerHeight = towerHeight / 2;
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
			this.#towerWidth,
			this.#towerHeight
		);
	}

	#calculateExplosionsArea() {
		return {
			x: this.#towerX + Math.random() * this.#towerWidth,
			y: this.#towerY + Math.random() * this.#towerHeight,
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
			(Math.random() < 0.5 ? -1 : 1) * getRandomNumber(2.5, 10);
		this.towerPieceSpeedY = getRandomNumber(-5, -20);
		this.towerPieceSpeedYChangeRatio = getRandomNumber(1, 0.1);
		this.#x = x;
		this.#y = y;
		this.#width = width;
		this.#height = height;
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
