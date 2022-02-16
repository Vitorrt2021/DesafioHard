class Enemy {
  constructor(monster, x, y, cellSize, line) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize / 2;
    this.speed = monster.speed;
    this.health = monster.health;
    this.maxHealth = this.health;
    this.attack = monster.attack;
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
    ctx.drawImage(imageLoaded, this.x, this.y + 30 + this.monster.diferenceHeight());
    ctx.font = "30px arial";
    ctx.strokeStyle = "black";
    ctx.fillText(this.health, this.x, this.y);
  }
}
export default Enemy;
