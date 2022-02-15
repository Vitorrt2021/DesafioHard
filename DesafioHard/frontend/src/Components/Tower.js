import Projectile from "./Projectile.js";

class Tower {
  constructor(x = 0, y = 0, cellSize = 0) {
    this.x = x - cellSize / 2;
    this.y = y - cellSize / 2;
    this.width = cellSize;
    this.height = cellSize;
    this.health = 100;
    this.projectiles = [];
    this.projectileSrc = "../assets/projectiles/carrot.svg";
    this.image = new Image();
    this.image.src = "../assets/towers/cat_tower_level_1.png";
    this.timer = 0;
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.timer++;
    if (this.timer % 100 === 0) {
      this.projectiles.push(new Projectile(this.x, this.y, this.projectileSrc));
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
