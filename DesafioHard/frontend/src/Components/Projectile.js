class Projectile {
	constructor(x, y, image, damage) {
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.power = parseInt(damage);
		this.speed = 5;
		this.image = image;
	}
	update() {
		this.x += this.speed;
	}
	draw(ctx) {
		// ctx.strokeStyle = 'red';
		// ctx.strokeRect(this.x, this.y, this.image.width, this.image.height);
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(this.image, this.x, this.y);
	}
}

export default Projectile;
