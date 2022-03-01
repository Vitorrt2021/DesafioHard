import Cell from './Cell.js';
import Tower from './Tower.js';
import collision from './Collision.js';
import Player from './Player.js';
import Monster from './Monster.js';
import Enemy from './Enemy.js';
import towerStatus from './towerStatus.js';
import assetManager from '../Components/AssetManager.js';
import renderSaveScore from '../requests/save-score.js';

class Game {
	constructor() {
		this.canvas = document.getElementById('canvas1');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1600;
		this.canvas.height = 800;
		this.player = new Player();
		this.frames = 0;
		this.runAnimationControll = true;
		this.cellSize = 250;
		this.cellGap = 5;
		this.gameGrid = [];
		this.mousePosition = {};
		this.towers = [];
		this.enemys = [];
		this.monster = ['slimePink', 'slimeGreen', 'toad', 'robot'];
		this.level = 0;
		this.spawnVelocity = 500;
		this.maxSpawnVelocity = 60;
		this.moneyDrop = 20;
		this.bgMusic = new Audio();
		this.bgMusic.id = 'bg_music';
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
			if (towerPosition.indexOf(Math.floor(tower.y)) != -1) {
				if (position[towerPosition.indexOf(Math.floor(tower.y))]) {
					tower.isShooting = true;
				} else {
					tower.isShooting = false;
				}
			}
		});
	}

	canBuyTowers() {
		$('.rabbit_tower').css('filter', 'brightness(100%)');
		$('.pikachu_tower').css('filter', 'brightness(100%)');
		$('.cat_tower').css('filter', 'brightness(100%)');
		if (this.player.money < parseInt(towerStatus.rabbit_tower_level_1.price)) {
			$('.rabbit_tower').css('filter', 'brightness(55%)');
		}
		if (this.player.money < parseInt(towerStatus.pikachu_tower_level_1.price)) {
			$('.pikachu_tower').css('filter', 'brightness(55%)');
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
			assetManager.playSound('titanic_flute');

			setTimeout(() => {
				renderSaveScore();
			}, 500);
			$('#live_value').html('0');
			$('#level_value').html('');
			this.stopAnimation();
			this.bgMusic.pause();
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
			tower.isDying = true;
		}

		if (tower.isDead) {
			this.towers.splice(towerIndex, 1);
		}
	}

	checkTowerCollision() {
		this.towers.forEach((tower, towerIndex) => {
			this.enemys.forEach((enemy, enemyIndex) => {
				if (enemy.isDying) return;
				if (collision.rectRectCollisionDetection(tower, enemy)) {
					let towerHealth = tower.health;
					tower.health -= enemy.health / (1 + this.level * 0.5);

					if (tower.health > 0) {
						enemy.health -= towerHealth;
					}

					tower.isDamaged = true;

					this.enemyIsDead(enemy, enemyIndex);
					this.towerWasDestroyed(tower, towerIndex);

					if (!tower.isDying) {
						assetManager.playSound('explosion');
					}
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
						assetManager.playSound('hit');
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

	changeSpawnVelocity() {
		const spawnV = (this.spawnVelocity = 500 - 60 * this.level);
		if (spawnV <= this.maxSpawnVelocity) {
			this.spawnVelocity = this.maxSpawnVelocity;
		} else {
			this.spawnVelocity = spawnV;
		}
	}
	animation() {
		if (this.runAnimationControll) {
			this.ctx.fillStyle = 'black';
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.canEvolveTowers();
			this.drawGrid();
			this.changeSpawnVelocity();
			this.enemys.forEach((enemy) => {
				enemy.update();
				enemy.draw(this.ctx);
			});
			if (this.frames % this.spawnVelocity === 0) {
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
	//FIX-IT TOUCH
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
	//FIX-IT SOBREPOSIÇÃO DE TORRES
	addTowerInCell(tower) {
		// play background music when player put the first tower in row
		if (!this.towers[0]) this.updateBackgroundMusic();

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

		assetManager.playSound('dropTower');

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
		if (!towerClicked || towerClicked.level == 9) return;
		// easter egg!
		// roll the dice and check if the player will get Torres.
		// in case of bad luck the player loses money and
		// the tower gets damaged.
		const jackpot = Math.random() * 100;
		if (towerClicked.level == 9 && jackpot > 2) {
			if (this.player.money >= 3000) {
				this.player.money -= 1000;
				this.updateMoney();
				towerClicked.health *= 0.3;
				towerClicked.health = parseInt(towerClicked.health);
				towerClicked.isDamaged = true;
				assetManager.playSound('explosion');
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
		evolvedTower.damage *= 1 + this.level * 0.35;
		this.player.money -= parseInt(evolvedTower.price);
		this.updateMoney();
		assetManager.playSound('evolve');
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
		const yInitialpositions = [68, 325, 580];
		const yFinalpositions = [235, 493, 743];
		const sorted = Math.floor(Math.random() * 3);
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
			//FIX-IT JUNTAR CLASS ENEMY COM MONSTER
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
	//FIX-IT TORNAR ADAPTAVEL
	playSoundMonster(monster) {
		if (monster === 'robot') {
			assetManager.playSound('robot');
		} else if (monster === 'slimePink' || monster === 'slimeGreen') {
			assetManager.playSound('slimeWalk');
		} else if (monster === 'toad') {
			assetManager.playSound('monsterGreen');
		}
	}
	updateLevel() {
		if (this.player.score >= 100 * Math.pow(2, this.level + 1)) {
			this.level++;
			this.moneyDrop *= 1 + 1 / this.level;
			assetManager.playSound('level_up');
			$('#level_value').html(this.level);

			if (this.level % 2 === 0) {
				this.updateBackgroundMusic();
			}
		}
	}

	updateBackgroundMusic() {
		$(this.bgMusic).attr(
			'src',
			'../assets/audios/bg_music/bg_music_lvl_' + this.level + '.mp3'
		);
		this.bgMusic.play();
		this.bgMusic.loop = true;
		this.bgMusic.volume = 0.1;
	}
}

export default Game;
