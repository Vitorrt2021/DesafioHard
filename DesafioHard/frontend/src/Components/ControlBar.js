import Tower from './Tower.js'

class ControlBar{
    constructor(canvasWidth,cellSize){
        this.width = canvasWidth;
        this.height = cellSize;    
        this.towers = [];
        
        const tower = new Tower(100,20,60)
        this.towers.push(tower) 
    }
    draw(ctx){
        ctx.fillStyle = 'blue';
        ctx.fillRect(0,0,this.width, this.height);       
        
        this.towers.forEach((e) =>{
            e.draw(ctx)
        })
    }
    
}

export default ControlBar