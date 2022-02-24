import Cell from './Cell.js';
import Tower from './Tower.js';
import collision from './Collision.js';
import Player from './Player.js';
import Monster from './Monster.js';
import Enemy from './Enemy.js';
import towerStatus from './towerStatus.js';
import assetManager from '../Components/AssetManager.js';
import * as saveScore from '../requests/save-score.js';

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
		this.level = 0;
		this.spawnVelocid = 500;
		this.maxSpawVelocid = 60;

		this.moneyDrop = 20;
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
	canEvolveTowers() {
		this.towers.forEach((tower) => {
			const nextLevel = tower.nextLevel;
			if (
				!tower.hasOwnProperty('nextLevel') ||
				!tower.hasOwnProperty('price') ||
				!towerStatus[nextLevel]
			) {
				tower.canEvolve = false;
			} else if (towerStatus[nextLevel].hasOwnProperty('price')) {
				if (parseInt(towerStatus[nextLevel].price) <= this.player.money) {
					tower.canEvolve = true;
				} else {
					tower.canEvolve = false;
				}
			} else {
				tower.canEvolve = false;
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
			const audio = assetManager.getSound('titanic_flute');
			audio.play();
			setTimeout(() => {
				// alert('Você perdeu');
				saveScore.renderNodes();
			}, 500);
			$('#live_value').html('0');
			$('#level_value').html('');
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
				this.player.live -= 1;
				this.enemys.splice(enemyIndex, 1);
				this.updateLive();
				this.gameIsOver();
			}
		});
	}

	enemyIsDead(enemy, enemyIndex) {
		if (enemy.health <= 0 && !enemy.isDying) {
			this.player.score += 20 * (this.level + 1);
			this.player.money += Math.floor(this.moneyDrop);
			this.updateScore();
			this.updateMoney();
			enemy.setDyingAnimation();
			enemy.line = null;
		}
		if (enemy.isDead) {
			this.enemys.splice(enemyIndex, 1);
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
				if (enemy.isDying) return;
				if (collision.rectRectCollisionDetection(tower, enemy)) {
					let towerHealth = tower.health;
					tower.health -= enemy.health;
					enemy.health -= towerHealth;
					tower.isDamaged = true;
					const audio = assetManager.getSound('explosion');
					audio.volume = 0.3;
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
					if (enemy.isDying) return;
					if (collision.rectRectCollisionDetection(projectile, enemy)) {
						const audio = assetManager.getSound('hit');
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
	changeSpawVelocid() {
		const spawV = (this.spawnVelocid = 500 - 60 * this.level);
		if (spawV <= this.maxSpawVelocid) {
			this.spawnVelocid = this.maxSpawVelocid;
		} else {
			this.spawnVelocid = spawV;
		}
	}
	animation() {
		if (this.runAnimationControll) {
			this.ctx.fillStyle = 'black';
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.canEvolveTowers();
			this.drawGrid();
			this.changeSpawVelocid();
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
		const audio = assetManager.getSound('dropTower');
		audio.volume = 0.3;
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
		const towerIndex = this.towers.indexOf(towerClicked);

		if (!towerClicked || towerClicked.level == 4) return;

		// easter egg!
		// roll the dice and check if the player will get Torres.
		// in case of bad luck the player loses money and
		// the tower gets damaged.
		const jackpot = Math.random() * 100;
		if (towerClicked.level == 3 && jackpot > 5) {
			if (this.player.money >= 3000) {
				this.player.money -= 1000;
				this.updateMoney();
				towerClicked.health *= 0.3;
				towerClicked.health = parseInt(towerClicked.health);
				towerClicked.isDamaged = true;
				// const audio = new Audio('../assets/audios/explosion.mp3');
				const audio = assetManager.getSound('explosion');
				audio.play();
				this.towerWasDestroyed(towerClicked, towerIndex);
			}
			return;
		}
		const evolvedTower = new Tower(
			towerClicked.x + towerClicked.width / 2,
			towerClicked.y + towerClicked.height / 2,
			150,
			towerClicked.nextLevel
		);

		if (evolvedTower.price > this.player.money) return;

		this.player.money -= parseInt(evolvedTower.price);
		this.updateMoney();
		const audio = assetManager.getSound('envolve');
		audio.volume = 0.3;
		audio.play();

		this.towers[towerIndex] = evolvedTower;
		console.log(this.width);
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
		//const positions = [10, 2.5, 1.4];
		const yInitialpositions = [68, 325, 580];
		const yFinalpositions = [235, 493, 743];
		const sorted = Math.floor(Math.random() * 3);
		// let position = this.canvas.height / positions[sorted];
		let position = yInitialpositions[sorted];
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
				new Monster(monster),
				parseInt(this.canvas.width),
				position,
				this.cellSize,
				yFinalpositions[sorted] - yInitialpositions[sorted],
				sorted,
				this.level
			)
		);
	}

	playSoundMonster(monster) {
		if (monster === 'robot') {
			const audio = assetManager.getSound('robot_');
			audio.volume = 0.3;
			audio.play();
		} else if (monster === 'slimePink' || monster === 'slimeGreen') {
			const audio = assetManager.getSound('slimeWalk');
			audio.volume = 0.3;
			audio.play();
		} else if (monster === 'toad') {
			const audio = assetManager.getSound('monsterGreen');
			audio.volume = 0.3;
			audio.play();
		}
	}

	updateLevel() {
		// console.log('Player ======');
		// console.log(this.player.score);

		// console.log('Nec ======');
		// console.log(100 * Math.pow(2, this.level + 1));
		if (this.player.score >= 100 * Math.pow(2, this.level + 1)) {
			this.level++;
			this.moneyDrop *= 1 + 1 / this.level;
			const audio = assetManager.getSound('level_up');
			audio.volume = 0.3;
			audio.play();
			$('#level_value').html(this.level);
		}
	}
}

export default Game;
