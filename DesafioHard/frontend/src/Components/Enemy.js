class Enemy{
    constructor(monster, x, y, cellSize){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.speed = monster.speed;
        this.health = monster.health;
        this.maxHealth = this.health;
        this.attack = monster.attack
        this.monster = monster;
    }
    update(ctx){
        this.x -= this.speed;
    }
    draw(ctx){
        const imageSapo = new Image();
        imageSapo.src = this.monster.selectImage();
        ctx.drawImage(imageSapo, this.x, this.y + 30)
    }
}

export default Enemy;