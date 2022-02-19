class Enemy {
	constructor(monster, x, y, cellSize, line, level) {
		this.x = x;
		this.y = y;
		this.width = cellSize;
		this.height = cellSize / 2;
		this.speed = monster.speed;
		this.health = monster.health + monster.health * level * 0.5;
		this.maxHealth = this.health;
		this.attack = this.health;
		this.monster = monster;
		this.line = line;
	}
	update() {
		this.x -= this.speed;
	}
	draw(ctx) {
		const imageLoaded = this.monster.selectImage();
		if (!imageLoaded) {
			return;
		}
		ctx.drawImage(
			imageLoaded,
			this.x,
			this.y + 30 + this.monster.diferenceHeight()
		);
		this.drawLiveBar(ctx);
	}
	drawLiveBar(ctx) {
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
