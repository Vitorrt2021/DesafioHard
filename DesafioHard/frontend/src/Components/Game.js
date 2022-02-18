import Cell from './Cell.js';
import Tower from './Tower.js';
import collision from './Collision.js';
import Player from './Player.js';
import Monster from './Monster.js';
import Enemy from './Enemy.js';
import MonsterStatus from './monsterStatus.js';
import towerStatus from './towerStatus.js';

class Game {
	constructor() {
		this.canvas = document.getElementById('canvas1');
		this.ctx = this.canvas.getContext('2d');

		this.canvas.width = 1600;
		this.canvas.height = 800;

		this.player = new Player();
		this.frames = 0;

		this.cellOver = null;
		this.runAnimationControll = true;
		this.cellSize = 250;
		this.cellGap = 5;
		this.gameGrid = [];
		this.draggingElement = null;
		this.mousePosition = {};
		this.towers = [];
		this.enemys = [];
		this.monster = ['slimePink', 'slimeGreen', 'toad', 'robot'];
		this.monsterStatus = new MonsterStatus();
		this.level = 0;
		this.spawnVelocid = 500 - 10 * this.level;
	}
	start() {
		this.updateLive();
		this.updateScore();
		this.updateMoney();

		this.animation();
		this.createGrid();
		this.catchMousePosition();
	}
	haveEnemyInLine() {
		const position = [false, false, false];
		const towerPosition = [
			Math.floor(76.4),
			Math.floor(326.4),
			Math.floor(576.4),
		];
		this.enemys.forEach((enemy) => {
			position[enemy.line] = true;
		});
		this.towers.forEach((tower) => {
			// console.log(tower.y);
			// console.log(towerPosition.indexOf(Math.floor(tower.y)));
			if (towerPosition.indexOf(Math.floor(tower.y)) != -1) {
				// console.log('Outro');
				if (position[towerPosition.indexOf(Math.floor(tower.y))]) {
					tower.isShooting = true;
					// console.log('Verda');
				} else {
					tower.isShooting = false;
				}
			}
		});
	}
	canBuyTowers() {
		$('.red_rabbit_tower').css('filter', 'brightness(100%)');
		$('.blue_rabbit_tower').css('filter', 'brightness(100%)');
		$('.cat_tower').css('filter', 'brightness(100%)');
		if (
			this.player.money < parseInt(towerStatus.red_rabbit_tower_level_1.price)
		) {
			$('.red_rabbit_tower').css('filter', 'brightness(55%)');
		}
		if (
			this.player.money < parseInt(towerStatus.blue_rabbit_tower_level_1.price)
		) {
			$('.blue_rabbit_tower').css('filter', 'brightness(55%)');
		}
		if (this.player.money < parseInt(towerStatus.cat_tower_level_1.price)) {
			$('.cat_tower').css('filter', 'brightness(55%)');
		}
	}
	canEnvolveTowers() {
		this.towers.forEach((tower) => {
			const nextLevel = tower.nextLevel;
			if (
				!tower.hasOwnProperty('nextLevel') ||
				!tower.hasOwnProperty('price') ||
				!towerStatus[nextLevel]
			) {
				tower.canEnvolve = false;
			} else if (towerStatus[nextLevel].hasOwnProperty('price')) {
				if (parseInt(towerStatus[nextLevel].price) <= this.player.money) {
					tower.canEnvolve = true;
				} else {
					tower.canEnvolve = false;
				}
			} else {
				tower.canEnvolve = false;
			}
		});
	}
	handleTowers() {
		this.towers.forEach((tower) => {
			tower.draw(this.ctx);

			if (tower.isShooting) {
				tower.update();
			}
			tower.handleProjectiles(this.ctx, this.canvas.width, this.cellSize);
		});
	}
	gameIsOver() {
		if (this.player.live <= 0) {
			alert('Você perdeu');
			this.stopAnimation();
		}
	}
	updateScore() {
		$('#score_value').html(this.player.score);
	}
	updateMoney() {
		this.canBuyTowers();
		$('#money_value').html(this.player.money);
	}
	updateLive() {
		$('#live_value').html(this.player.live);
	}
	checkEnemyAttackedBase() {
		this.enemys.forEach((enemy, enemyIndex) => {
			if (enemy.x + this.cellSize / 3 < 0) {
				this.player.live -= enemy.health;
				this.enemys.splice(enemyIndex, 1);
				this.updateLive();
				this.gameIsOver();
			}
		});
	}

	enemyIsDead(enemy, enemyIndex) {
		if (enemy.health <= 0) {
			this.enemys.splice(enemyIndex, 1);
			this.player.score += 20 * (this.level + 1);
			this.player.money += 20 * (this.level + 1);
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
					tower.health -= enemy.health;
					enemy.health -= towerHealth;
					tower.isDamaged = true;
					const audio = new Audio('../assets/audios/explosion.mp3');
					audio.volume = 0.5;
					audio.play();
					this.enemyIsDead(enemy, enemyIndex);
					this.towerWasDestroyed(tower, towerIndex);
				}
			});
		});
	}

	checkProjectileCollision() {
		this.towers.forEach((tower) => {
			tower.projectiles.forEach((projectile, index) => {
				this.enemys.forEach((enemy, enemyIndex) => {
					if (collision.rectRectCollisionDetection(projectile, enemy)) {
						const audio = new Audio('../assets/audios/hit.mp3');
						audio.volume = 0.3;
						audio.play();
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
	drawGrid() {
		this.gameGrid.forEach((cell, index) => {
			//não desenha a ultima coluna
			if (index == 6 || index == 13 || index == 20) return;
			cell.draw(this.ctx);
		});
	}
	animation() {
		if (this.runAnimationControll) {
			this.ctx.fillStyle = 'black';
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.canEnvolveTowers();
			this.drawGrid();
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
			this.haveEnemyInLine();
			this.handleTowers();
			this.checkProjectileCollision();
			this.checkTowerCollision();
			this.checkEnemyAttackedBase();
			this.frames++;
			this.updateLevel();

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
		document.querySelector('body').addEventListener('mousemove', (e) => {
			this.updateMousePosition(e);
		});

		document.getElementById('canvas1').addEventListener('drop', (e) => {
			e.preventDefault();

			let towerType = e.dataTransfer.getData('text');
			this.updateMousePosition(e);
			const newTower = new Tower(
				this.mousePosition.x,
				this.mousePosition.y,
				150,
				towerType
			);
			if (newTower.price > this.player.money) {
				return;
			}
			this.addTowerInCell(newTower);
		});
	}
	addTowerInCell(tower) {
		const gridPositionX =
			this.mousePosition.x -
			(this.mousePosition.x % this.cellSize) +
			this.cellGap;
		const gridPositionY =
			this.mousePosition.y -
			(this.mousePosition.y % this.cellSize) +
			this.cellGap;
		//Impedir de colocar a torre na ultima coluna
		if (gridPositionX - 5 === this.gameGrid[6].x) return;
		//Ver já tem torre nessa celula
		for (let i = 0; i < this.towers.length; i++) {
			if (
				this.towers[i].x === gridPositionX &&
				this.towers[i].y === gridPositionY + this.cellSize / 3.5
			) {
				return false;
			}
		}
		tower.x = gridPositionX;
		tower.y = gridPositionY + this.cellSize / 3.5;
		const audio = new Audio('../assets/audios/dropTower.mp3');
		audio.volume = 0.5;
		audio.play();
		this.player.money -= parseInt(tower.price);
		this.updateMoney();
		this.towers.push(tower);
	}

	evolveTower() {
		const offset = 20;

		const finder = (tower) =>
			this.mousePosition.x - offset > tower.x &&
			this.mousePosition.x + offset < tower.x + tower.width &&
			this.mousePosition.y - offset > tower.y &&
			this.mousePosition.y + offset < tower.y + tower.height;

		const towerClicked = this.towers.find(finder);

		if (!towerClicked || towerClicked.level == 3) return;

		const evolvedTower = new Tower(
			towerClicked.x + towerClicked.width / 2,
			towerClicked.y + towerClicked.height / 2,
			150,
			towerClicked.nextLevel
		);

		if (evolvedTower.price > this.player.money) return;

		this.player.money -= parseInt(evolvedTower.price);
		this.updateMoney();
		const audio = new Audio('../assets/audios/envolve.mp3');
		audio.volume = 0.5;
		audio.play();

		const towerIndex = this.towers.indexOf(towerClicked);
		this.towers[towerIndex] = evolvedTower;
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
		const positions = [10, 2.5, 1.4];
		const sorted = Math.floor(Math.random() * 3);
		let position = this.canvas.height / positions[sorted];
		let monster = Math.ceil(Math.random() * 100);
		if (monster < 40) {
			monster = this.monster[0];
		} else if (monster >= 40 && monster < 75) {
			monster = this.monster[1];
		} else if (monster >= 75 && monster < 95) {
			monster = this.monster[2];
		} else {
			monster = this.monster[3];
		}
		this.playSoundMonster(monster);
		this.enemys.push(
			new Enemy(
				new Monster(monster, this.monsterStatus),
				parseInt(this.canvas.width),
				position,
				this.cellSize,
				sorted,
				this.level
			)
		);
	}
	playSoundMonster(monster) {
		if (monster === 'robot') {
			const audio = new Audio('../assets/audios/robot_.mp3');
			audio.volume = 0.5;
			audio.play();
		} else if (monster === 'slimePink' || monster === 'slimeGreen') {
			const audio = new Audio('../assets/audios/slimeWalk.mp3');
			audio.volume = 0.5;
			audio.play();
		} else if (monster === 'toad') {
			const audio = new Audio('../assets/audios/monsterGreen.mp3');
			audio.volume = 0.5;
			audio.play();
		}
	}
	updateLevel() {
		if (this.player.score >= 200 * (this.level + 1)) {
			this.level++;
		}
	}
}

export default Game;
