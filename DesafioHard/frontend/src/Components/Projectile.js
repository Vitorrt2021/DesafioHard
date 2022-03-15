class Projectile {
	constructor(x, y, image, damage) {
		this.x = x;
		this.y = y;
		this.width = image.width;
		this.height = image.height;
		this.collisionX = x;
		this.collisionY = y;
		this.collisionWidth = this.width;
		this.collisionHeight = this.height;
		this.power = parseInt(damage);
		this.speed = 5;
		this.image = image;
	}
	update() {
		this.x += this.speed;
		this.collisionX = this.x;
	}
	draw(ctx) {
		ctx.strokeRect(
			this.collisionX,
			this.collisionY,
			this.collisionWidth,
			this.collisionHeight
		);
		ctx.drawImage(this.image, this.x, this.y);
	}
}

export default Projectile;
