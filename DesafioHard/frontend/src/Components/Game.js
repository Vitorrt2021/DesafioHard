import Cell from "./Cell.js";
import Collision from "./Collision.js";
import Tower from "./Tower.js";
import collision from "./Collision.js";
import Player from "./Player.js";
import Monster from "./Monster.js";
import Enemy from "./Enemy.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas1");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 1600;
    this.canvas.height = 800;

    this.player = new Player();
    this.frames = 0;
    this.spawnVelocid = 200;
    this.cellOver = null;
    this.runAnimationControll = true;
    this.cellSize = 250;
    this.cellGap = 5;
    this.gameGrid = [];
    this.draggingElement = null;
    this.mousePosition = {};
    this.towers = [];
    this.enemys = [];
  }
  start() {
    this.animation();
    this.createGrid();
    this.catchMousePosition();
  }
  handleTowers() {
    this.towers.forEach((tower) => {
      tower.draw(this.ctx);
      tower.update();
      tower.handleProjectiles(this.ctx, this.canvas.width, this.cellSize);
    });
  }
  resize() {
    let width = window.innerWidth;
    let ratio = this.canvas.height / this.canvas.width;
    let height = width * ratio;
    if (height > window.innerHeight) {
      height = window.innerHeight;
      ratio = this.canvas.width / this.canvas.height;
      width = height * ratio;
    }
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
  }
  createGrid() {
    for (let y = 0; y < this.canvas.height; y += this.cellSize) {
      for (let x = 0; x < this.canvas.width; x += this.cellSize) {
        const cell = new Cell(x, y, this.cellSize);
        this.gameGrid.push(cell);
      }
    }
  }

  animation() {
    if (this.runAnimationControll) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.handleTowers();

      this.enemys.forEach((enemy) => {
        enemy.update();
        enemy.draw(this.ctx);
      });
      if (this.draggingElement) {
        this.draggingElement.draw(this.ctx);
      }
      if (this.frames % this.spawnVelocid === 0) {
        this.spawnEnemy();
      }
      this.frames++;
      requestAnimationFrame(() => {
        this.animation();
      });
    }
  }
  startAnimation() {
    this.runAnimationControll = true;
  }
  stopAnimation() {
    this.runAnimationControll = false;
  }
  catchMousePosition() {
    document.querySelector("body").addEventListener("mousemove", (e) => {
      this.updateMousePosition(e);
    });

    document.getElementById("canvas1").addEventListener("drop", (e) => {
      e.preventDefault();

      let towerType = e.dataTransfer.getData("text");
      this.updateMousePosition(e);
      this.towers.push(
        new Tower(this.mousePosition.x, this.mousePosition.y, 150, towerType)
      );
    });
  }

  updateMousePosition(e) {
    let rect = this.canvas.getBoundingClientRect();

    const scaleY = this.canvas.height / rect.height;
    const scaleX = this.canvas.width / rect.width;

    this.mousePosition = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }
  spawnEnemy() {
    // let position = Math.floor(Math.random() * 3) * this.cellSize;
    const postions = [2.5, 10, 1.4];
    let position = this.canvas.height / postions[Math.floor(Math.random() * 3)];
    this.enemys.push(
      new Enemy(
        new Monster("robo"),
        parseInt(this.canvas.width),
        position,
        this.cellSize
      )
    );
  }
}

export default Game;
