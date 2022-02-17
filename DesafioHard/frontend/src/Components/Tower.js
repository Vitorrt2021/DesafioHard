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
    this.isDamaged = false;
    this.explosionFrame = 0;
    this.alphaRedRectangle = 0;
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
    this.timer = 0;
    this.level = towerStatus[towerType].level;
    this.nextLevel = towerStatus[towerType].nextLevel;
  }
  draw(ctx) {
    // CHECK THE TOWER IMAGE RANGE
    // ctx.rect(this.x, this.y, this.height, this.width);
    // ctx.stroke();

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.font = "30px arial";
    ctx.strokeStyle = "black";
    ctx.fillText(this.health, this.x, this.y);

    if (this.isDamaged) {
      if (Number.isInteger(this.explosionFrame)) {
        if (this.explosionFrame <= this.explosionImages.length / 2) {
          this.alphaRedRectangle += 0.0625; //O alpha deve chegar no máximo até 0.25 no meio da animação da explosão
        } else {
          this.alphaRedRectangle -= 0.0625;
        }
        // console.log(this.alphaRedRectangle, this.explosionFrame);
      }
      console.log(this.alphaRedRectangle, this.explosionFrame);
      ctx.fillStyle = `rgba(255, 0, 0, ${this.alphaRedRectangle})`;
      // ctx.fillRect(this.x, this.y, this.width * this.redRectDimensionModifier, this.height * this.redRectDimensionModifier);
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.drawImage(this.explosionImages[parseInt(this.explosionFrame)], this.x, this.y, this.width, this.height);

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
      this.timer++;
      if (this.timer % this.attackSpeed === 0) {
        this.projectiles.push(new Projectile(this.x + this.width, this.y + 30, this.projectileSrc, this.damage));
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
