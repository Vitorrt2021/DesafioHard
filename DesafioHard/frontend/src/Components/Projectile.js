class Projectile{
    constructor(x,y,imageSrc){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.radio
        this.power = 20;
        this.speed = 5;
        this.image = new Image()
        this.image.src = ''+imageSrc
    }
    update(){
        this.x += this.speed;
    }
    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y)
    }
}

export default Projectile