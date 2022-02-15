import Projectile from './Projectile.js';
import towerStatus from './towerStatus.js';

class Tower {
	constructor(
		x = 0,
		y = 0,
		cellSize = 0,
		towerType = 'cat_tower_level_1'
	) {
		this.x = x - cellSize / 2;
		this.y = y - cellSize / 2;
		this.width = cellSize;
		this.height = cellSize;
		this.health = towerStatus[towerType].health;
		this.damage = towerStatus[towerType].damage;
		this.attackSpeed = towerStatus[towerType].attackSpeed;
		this.projectiles = [];
		this.projectileSrc = towerStatus[towerType].projectile;

		this.image = new Image();
		this.image.src = towerStatus[towerType].image;
		this.timer = 0;
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
	update() {
		this.timer++;
		if (this.timer % this.attackSpeed === 0) {
			this.projectiles.push(
				new Projectile(this.x, this.y, this.projectileSrc)
			);
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

export default Tower;
