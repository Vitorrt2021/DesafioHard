class Enemy {
	constructor(monster, x, y, width, height, line, level) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = monster.speed;
		this.setHealth(level, monster);
		this.maxHealth = this.health;
		this.monster = monster;
		this.line = line;
		this.isDying = false;
		this.isDead = false;
	}
	//FIX-IT BALANCEAMENTO
	setHealth(level, monster) {
		if (level == 0) {
			this.health = monster.health;
		} else {
			this.health = monster.health + monster.health * Math.pow(1.8, level - 1);
		}
	}
	update() {
		this.x -= this.speed;
	}

	setDyingAnimation() {
		this.isDying = true;
		this.speed = 0;
		this.monster.changeAnimation(this.monster.type + '_dying');
	}

	draw(ctx) {
		const monsterImage = this.monster.selectImage();
		const animationMaxHeight = this.monster.animationMaxHeight;

		let delta_y = animationMaxHeight - monsterImage.height; //Evitar pulos dos slimes
		delta_y += (this.height - monsterImage.height) / 2; //centralizar no caminho das torres.

		if (this.monster.animation.isAnimationFinished() && this.isDying) {
			this.isDead = true;
		}

		if (!this.isDying) {
			this.drawLifeBar(ctx);
		}

		if (!this.isDead) {
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
