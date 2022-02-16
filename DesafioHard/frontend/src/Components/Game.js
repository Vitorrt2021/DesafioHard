import Cell from "./Cell.js";
import Tower from "./Tower.js";
import collision from "./Collision.js";
import Player from "./Player.js";
import Monster from "./Monster.js";
import Enemy from "./Enemy.js";
import MonsterStatus from "./monsterStatus.js";

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas1");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 1600;
    this.canvas.height = 800;

    this.player = new Player();
    this.frames = 0;
    this.spawnVelocid = 1000;
    this.cellOver = null;
    this.runAnimationControll = true;
    this.cellSize = 250;
    this.cellGap = 5;
    this.gameGrid = [];
    this.draggingElement = null;
    this.mousePosition = {};
    this.towers = [];
    this.enemys = [];
    this.monster = ["slimePink", "slimeGreen", "toad", "robot"];
    this.monsterStatus = new MonsterStatus();
  }
  start() {
    this.updateScore();
    this.updateMoney();

    this.animation();
    this.createGrid();
    this.catchMousePosition();
  }
  handleTowers() {
    this.towers.forEach(tower => {
      tower.draw(this.ctx);
      tower.update();
      tower.handleProjectiles(this.ctx, this.canvas.width, this.cellSize);
    });
  }
  gameIsOver() {
    if (this.player.live <= 0) {
      alert("Você perdeu");
      this.stopAnimation();
    }
  }
  updateScore() {
    $("#score_value").html(this.player.score);
  }
  updateMoney() {
    $("#money_value").html(this.player.money);
  }
  checkEnemyAttackedBase() {
    this.enemys.forEach((enemy, enemyIndex) => {
      if (enemy.x + this.cellSize / 3 < 0) {
        this.player.live -= enemy.health;
        this.enemys.splice(enemyIndex, 1);
        this.gameIsOver();
      }
    });
  }

  enemyIsDead(enemy, enemyIndex) {
    if (enemy.health <= 0) {
      this.enemys.splice(enemyIndex, 1);
      this.player.score += 20;
      this.player.money += 20;
      this.updateScore();
      this.updateMoney();
    }
  }
  towerWasDestroyed(tower, towerIndex) {
    if (tower.health <= 0) {
      this.towers.splice(towerIndex, 1);
    }
  }
  checkTowerCollision() {
    this.towers.forEach((tower, towerIndex) => {
      this.enemys.forEach((enemy, enemyIndex) => {
        if (collision.rectRectCollisionDetection(tower, enemy)) {
          let towerHealth = tower.health;
          if (towerHealth >= enemy.health) {
            tower.health -= enemy.health;
            enemy.health -= enemy.health;
            this.enemyIsDead(enemy, enemyIndex);
          } else {
            tower.health -= enemy.health;
            enemy.health -= towerHealth;
          }
        }
      });
    });
  }
  checkProjectileCollision() {
    this.towers.forEach(tower => {
      tower.projectiles.forEach((projectile, index) => {
        this.enemys.forEach((enemy, enemyIndex) => {
          if (collision.rectRectCollisionDetection(projectile, enemy)) {
            tower.projectiles.splice(index, 1);
            enemy.health -= projectile.power;
            this.enemyIsDead(enemy, enemyIndex);
          }
        });
      });
    });
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
      this.enemys.forEach(enemy => {
        enemy.update();
        enemy.draw(this.ctx);
      });
      if (this.draggingElement) {
        this.draggingElement.draw(this.ctx);
      }
      if (this.frames % this.spawnVelocid === 0) {
        this.spawnEnemy();
      }
      this.checkProjectileCollision();
      this.checkTowerCollision();
      this.checkEnemyAttackedBase();
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
      const newTower = new Tower(this.mousePosition.x, this.mousePosition.y, 150, towerType);

      if (newTower.price > this.player.money) return;
      this.player.money -= parseInt(newTower.price);
      this.updateMoney();
      this.towers.push(newTower);
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
    const positions = [2.5, 10, 1.4];
    let position = this.canvas.height / positions[Math.floor(Math.random() * 3)];
    this.enemys.push(
      new Enemy(new Monster(this.monster[Math.floor(Math.random() * 4)], this.monsterStatus), parseInt(this.canvas.width), position, this.cellSize)
    );
  }
}

export default Game;
