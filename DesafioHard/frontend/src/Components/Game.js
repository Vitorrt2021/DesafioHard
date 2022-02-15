import ControlBar from "./ControlBar.js";
import Cell from "./Cell.js";
import Collision from "./Collision.js";
import Tower from "./Tower.js";
import collision from "./Collision.js";
import Player from "./Player.js";
import Monster from "./Monster.js";
import Enemy from "./Enemy.js";

function cloneTower(tower) {
  const clone = new Tower();
  for (let attr in tower) {
    if (tower.hasOwnProperty(attr)) {
      clone[attr] = tower[attr];
    }
  }
  return clone;
}

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas1");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 1600;
    this.canvas.height = 800;

    this.player = new Player();
    this.frames = 0;

    this.cellOver = null;
    this.runAnimationControll = true;
    this.cellSize = 1950;
    this.cellGap = 5;
    this.gameGrid = [];
    this.draggingElement = null;
    this.mousePosition = {};
    this.towers = [];
    this.enemys = [];
    // this.backgroundImage = new Image();
    // this.backgroundImage.src = "../assets/images/backgroundGame.png";
  }
  start() {
    // window.addEventListener(
    //   "load",
    //   () => {
    //     this.resize();
    //   },
    //   false
    // );
    // window.addEventListener(
    //   "resize",
    //   () => {
    //     this.resize();
    //   },
    //   false
    // );

    this.animation();
    // this.grapControlBarTower();
    this.createGrid();
    this.catchMousePosition();
    this.spawnEnemy();
  }
  handleTowers() {
    this.towers.forEach(tower => {
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
    for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
      for (let x = 0; x < this.canvas.width; x += this.cellSize) {
        const cell = new Cell(x, y, this.cellSize);
        this.gameGrid.push(cell);
        console.log(cell);
      }
    }
  }
  // addTowerInCell() {
  //   const gridPositionX =
  //     this.mousePosition.x -
  //     (this.mousePosition.x % this.cellSize) +
  //     this.cellGap;
  //   const gridPositionY =
  //     this.mousePosition.y -
  //     (this.mousePosition.y % this.cellSize) +
  //     this.cellGap;
  //   //Ve se a posição escolhida esta na controlBar
  //   if (gridPositionY < this.cellSize) {
  //     this.towers.pop();
  //     return false;
  //   }
  //   //Ver já tem torre nessa celula
  //   for (let i = 0; i < this.towers.length; i++) {
  //     if (
  //       this.towers[i].x === gridPositionX &&
  //       this.towers[i].y === gridPositionY
  //     ) {
  //       this.towers.pop();
  //       return false;
  //     }
  //   }
  //   let towerCost = 100;
  //   //Ve se tem dinheiro suficiente
  //   if (this.player.money >= towerCost) {
  //     //pega a torre que acabou de colocar
  //     this.towers[this.towers.length - 1].x = gridPositionX;
  //     this.towers[this.towers.length - 1].y = gridPositionY;
  //     this.player.money -= towerCost;
  //   } else {
  //     this.towers.pop();
  //   }
  // }

  animation() {
    if (this.runAnimationControll) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.ctx.drawImage(this.backgroundImage, 0, 0);
      this.handleTowers();
      this.gameGrid.forEach(e => {
        console.log(e);
        e.draw(this.ctx);
      });
      this.enemys.forEach(enemy => {
        enemy.update();
        enemy.draw(this.ctx);
      });
      if (this.draggingElement) {
        this.draggingElement.draw(this.ctx);
      }
      if (this.cellOver) {
        this.cellOver.draw(this.ctx);
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
    document.querySelector("body").addEventListener("mousemove", e => {
      this.updateMousePosition(e);
    });

    document.getElementById("canvas1").addEventListener("drop", e => {
      e.preventDefault();

      let towerType = e.dataTransfer.getData("text");
      this.updateMousePosition(e);
      console.log(this.mousePosition);
      this.towers.push(new Tower(this.mousePosition.x, this.mousePosition.y, 150, towerType));
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
  // grapControlBarTower() {
  //   //Cria o grap e drop das torres para comprar
  //   document.querySelector("body").addEventListener("mousedown", (e) => {
  //     this.controlBar.towers.forEach((tower) => {
  //       if (Collision.pointRectCollisionDetection(this.mousePosition, tower)) {
  //         const newTower = cloneTower(tower);
  //         this.towers.push(newTower);
  //         this.draggingElement = newTower;

  //         document
  //           .querySelector("body")
  //           .addEventListener("mousemove", onMouseMove);
  //         document.querySelector("body").addEventListener("mouseup", onMouseUp);
  //       }
  //     });
  //   });
  //   const onMouseMove = (e) => {
  //     //Desenha a celula que está por cima
  //     this.gameGrid.forEach((e) => {
  //       if (collision.pointRectCollisionDetection(this.mousePosition, e)) {
  //         this.cellOver = e;
  //       }
  //     });
  //     this.draggingElement.x = this.mousePosition.x;
  //     this.draggingElement.y = this.mousePosition.y;
  //   };
  //   const onMouseUp = (e) => {
  //     this.addTowerInCell();
  //     this.cellOver = null;
  //     this.draggingElement = null;
  //     document
  //       .querySelector("body")
  //       .removeEventListener("mousemove", onMouseMove);
  //     document.querySelector("body").removeEventListener("mouseup", onMouseUp);
  //   };
  // }
  spawnEnemy() {
    let position = Math.floor(Math.random() * 3) * this.cellSize;
    this.enemys.push(new Enemy(new Monster("robo"), parseInt(this.canvas.width), position, this.cellSize));
  }
}

export default Game;
