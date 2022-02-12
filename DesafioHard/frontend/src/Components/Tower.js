class Tower{
    constructor(x=0,y=0, cellSize=0){
        this.x =x
        this.y =y
        this.width =cellSize
        this.height = cellSize
    }
    draw(ctx){
        ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.width,this.height);
        ctx.fill(); 
    }
}

export default Tower