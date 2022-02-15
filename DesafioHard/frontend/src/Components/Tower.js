import Projectile from "./Projectile.js"

class Tower{
    constructor(x=0,y=0, cellSize=0){
        this.x =x
        this.y =y
        this.width =cellSize
        this.height = cellSize
        this.health = 100;
        this.projectiles = [];
        this.projectileSrc = './assets/projectiles/carrot.svg'
        this.timer = 0;
    }
    draw(ctx){
        ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill(); 
    }
    update(){
        this.timer++
        if(this.timer % 100 === 0){
            this.projectiles.push(new Projectile(this.x , this.y,this.projectileSrc))
        }
    }
    handleProjectiles(ctx,canvasWidth,cellSize){
        this.projectiles.forEach((projectile,index)=>{
            projectile.update();
            projectile.draw(ctx);  
            if(projectile && projectile.x > canvasWidth + cellSize){
                this.projectiles.splice(index,1)
            }
        })
    }
}

export default Tower