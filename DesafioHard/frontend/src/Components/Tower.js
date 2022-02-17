import Projectile from "./Projectile.js";
import towerStatus from "./towerStatus.js";

class Tower {
  constructor(x = 0, y = 0, cellSize = 0, towerType = "cat_tower_level_1") {
    this.x = x - cellSize / 2;
    this.y = y - cellSize / 2;
    this.width = cellSize;
    this.height = cellSize;
    this.health = towerStatus[towerType].health;
    this.damage = towerStatus[towerType].damage;
    this.attackSpeed = towerStatus[towerType].attackSpeed;
    this.projectiles = [];
    this.projectileSrc = towerStatus[towerType].projectile;
    this.price = towerStatus[towerType].price;
    this.isShooting = false;
    this.image = new Image();
    this.image.src = towerStatus[towerType].image;
    this.timer = 0;
    this.level = towerStatus[towerType].level;
    this.nextLevel = towerStatus[towerType].nextLevel;
    this.canEnvolve = false;
  }
  draw(ctx) {
    // CHECK THE TOWER IMAGE RANGE
    // ctx.rect(this.x, this.y, this.height, this.width);
    // ctx.stroke();

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (this.canEnvolve) {
      const image = new Image();
      image.src = "../assets/images/evolve_tower.png";
      ctx.drawImage(
        image,
        this.x + this.width * 0.8,
        this.y,
        this.width / 5,
        this.height / 5
      );
    }
    ctx.font = "30px arial";
    ctx.strokeStyle = "black";
    ctx.fillText(this.health, this.x, this.y);
  }
  update() {
    if (this.isShooting) {
      this.timer++;
      if (this.timer % this.attackSpeed === 0) {
        this.projectiles.push(
          new Projectile(
            this.x + this.width,
            this.y + 30,
            this.projectileSrc,
            this.damage
          )
        );
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

export default Tower;
