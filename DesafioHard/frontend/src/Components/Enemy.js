class Enemy {
  constructor(monster, x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize / 2;
    this.speed = monster.speed;
    this.health = monster.health;
    this.maxHealth = this.health;
    this.attack = monster.attack;
    this.monster = monster;
  }
  update() {
    this.x -= this.speed;
  }
  draw(ctx) {
    const imageSapo = new Image();
    imageSapo.src = this.monster.selectImage();
    ctx.drawImage(
      imageSapo,
      this.x,
      this.y + 30 + this.monster.diferenceHeight()
    );
    ctx.font = "30px arial";
    ctx.strokeStyle = "black";
    ctx.fillText(this.health, this.x, this.y);
  }
}

export default Enemy;
