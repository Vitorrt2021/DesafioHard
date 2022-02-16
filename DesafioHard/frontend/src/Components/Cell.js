class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw(ctx) {
    const image = new Image();
    image.src = "../assets/images/star_path.svg";
    ctx.drawImage(
      image,
      this.x + this.width / 3,
      this.y + this.height / 2,
      this.width / 5,
      this.height / 5
    );
  }
}

export default Cell;
