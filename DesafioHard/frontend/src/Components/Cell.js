import assetManager from './AssetManager.js';

class Cell {
	constructor(x, y, cellSize) {
		this.x = x;
		this.y = y;
		this.width = cellSize;
		this.height = cellSize;
	}
	draw(ctx) {
		ctx.drawImage(
			assetManager.getImage('tower_symbol'),
			this.x + this.width / 3,
			this.y + this.height / 2,
			this.width / 5,
			this.height / 5
		);
	}
}

export default Cell;
