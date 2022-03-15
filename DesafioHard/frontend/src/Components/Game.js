import Cell from './Cell.js';
import Tower from './Tower.js';
import collision from './Collision.js';
import Player from './Player.js';
import Enemy from './Enemy.js';
import towerStatus from './TowerData.js';
import assetManager from '../Components/AssetManager.js';
import renderSaveScore from '../requests/save-score.js';
import EnemysController from '../Components/EnemysController.js';

class Game {
	#canvas = document.getElementById('canvas1');
	#ctx = this.#canvas.getContext('2d');
	#player = new Player();
	#frames = 0;
	#runAnimationControl = true;
	#cellSize = 250;
	#cellGap = 5;
	#gameGrid = [];
	#mousePosition = {};
	#towers = [];
	#towersDying = [];
	#enemies = [];
	#enemiesDying = [];
	#boss = ['golem'];
	#bossLevelMultiple = 3;
	#isBossSpawned = false;
	#level = 0;
	#spawnVelocity = 600;
	#maxSpawnVelocity = 60;
	#moneyDrop = 20;
	#backgroundMusic = '';

	constructor() {
		this.#canvas.width = 1600;
		this.#canvas.height = 800;
		this.isQuickness = false;
		this.monsterCout = 0;
	}

	isStop() {
		return !this.#runAnimationControl;
	}

	restart() {
		this.#canvas = document.getElementById('canvas1');
		this.#ctx = this.#canvas.getContext('2d');
		this.#player = new Player();
		this.#frames = 0;
		this.#runAnimationControl = false;
		this.#cellSize = 250;
		this.#cellGap = 5;
		this.#gameGrid = [];
		this.#mousePosition = {};
		this.#towers = [];
		this.#towersDying = [];
		this.#enemies = [];
		this.#enemiesDying = [];
		this.#spawnVelocity = 600;
		this.#maxSpawnVelocity = 60;
		this.#moneyDrop = 20;
		this.#backgroundMusic = '';
		this.#canvas.width = 1600;
		this.#canvas.height = 800;
		this.isQuickness = false;
		this.monsterCout = 0;

		this.start();
	}

	start() {
		this.#updateLive();
		this.#updateScore();
		this.#updateMoney();
		this.#animation();
		this.#createGrid();
		this.#catchMousePosition();
	}

	#haveEnemyInLine() {
		const position = [false, false, false];
		const towerPosition = [
			Math.floor(76.4),
			Math.floor(326.4),
			Math.floor(576.4),
		];
		this.#enemies.forEach((enemy) => {
			position[enemy.line] = true;
		});

		if ((this.#level + 1) % this.#bossLevelMultiple === 0) {
			position[0] = true;
			position[1] = true;
			position[2] = true;
		}

		this.#towers.forEach((tower) => {
			if (towerPosition.indexOf(Math.floor(tower.y)) != -1) {
				if (position[towerPosition.indexOf(Math.floor(tower.y))]) {
					tower.isShooting = true;
				} else {
					tower.isShooting = false;
				}
			}
		});
	}

	#canBuyTowers() {
		$('.rabbit_tower').css('filter', 'brightness(100%)');
		$('.pikachu_tower').css('filter', 'brightness(100%)');
		$('.cat_tower').css('filter', 'brightness(100%)');
		if (
			this.#player.getMoney() < parseInt(towerStatus.rabbit_tower_level_1.price)
		) {
			$('.rabbit_tower').css('filter', 'brightness(55%)');
		}
		if (
			this.#player.getMoney() <
			parseInt(towerStatus.pikachu_tower_level_1.price)
		) {
			$('.pikachu_tower').css('filter', 'brightness(55%)');
		}
		if (
			this.#player.getMoney() < parseInt(towerStatus.cat_tower_level_1.price)
		) {
			$('.cat_tower').css('filter', 'brightness(55%)');
		}
	}

	#canEvolveTowers() {
		this.#towers.forEach((tower) => {
			const nextLevel = tower.nextLevel;
			if (
				!tower.hasOwnProperty('nextLevel') ||
				!tower.hasOwnProperty('price') ||
				!towerStatus[nextLevel]
			) {
				tower.canEvolve = false;
			} else if (towerStatus[nextLevel].hasOwnProperty('price')) {
				if (parseInt(towerStatus[nextLevel].price) <= this.#player.getMoney()) {
					tower.canEvolve = true;
				} else {
					tower.canEvolve = false;
				}
			} else {
				tower.canEvolve = false;
			}
		});
	}

	#handleTowers() {
		this.#towersDying = this.#towersDying.filter(
			(towerDying) => !towerDying.isDead
		);

		this.#towersDying.forEach((towerDying) => {
			towerDying.draw(this.#ctx);
		});

		this.#towers.forEach((tower) => {
			tower.draw(this.#ctx);
			if (tower.isShooting) {
				tower.update();
			}

			tower.handleProjectiles(this.#ctx, this.#canvas.width, this.#cellSize);
		});
	}

	#gameIsOver(enemy) {
		if (this.#player.getLive() <= 0 || enemy.type === 'golem') {
			assetManager.playSound('titanic_flute');

			setTimeout(() => {
				renderSaveScore();
			}, 500);
			$('#live_value').html('0');
			$('#level_value').html('');
			this.stopAnimation();
			assetManager.stopSound(this.#backgroundMusic);
		}
	}

	#updateScore() {
		$('#score_value').html(this.#player.getScore());
	}

	#updateMoney() {
		this.#canBuyTowers();
		$('#money_value').html(this.#player.getMoney());
	}

	#updateLive() {
		$('#live_value').html(this.#player.getLive());
	}

	#checkEnemyAttackedBase() {
		this.#enemies.forEach((enemy, enemyIndex) => {
			if (enemy.collisionX + enemy.collisionWidth < 0) {
				this.#player.deductLive();
				this.#enemies.splice(enemyIndex, 1);
				this.#updateLive();
				this.#gameIsOver(enemy);
			}
		});
	}

	#enemyIsDead(enemy, enemyIndex) {
		if (enemy.health <= 0 && !enemy.isDying) {
			if (enemy.type === 'golem') {
				assetManager.playSound('golem_dying');
				this.#player.addScore(100 * Math.pow(2, EnemysController.horda + 1));
			} else {
				this.#player.addScore(20 * (EnemysController.horda + 1));
			}

			this.#player.addMoney(Math.floor(this.#moneyDrop) + enemy.money);
			this.#updateScore();
			this.#updateMoney();
			enemy.setDyingAnimation();
			this.#enemiesDying.push(enemy);
			this.#enemies.splice(enemyIndex, 1);
			enemy.line = null;
			this.monsterCout++;
		}
	}

	#towerWasDestroyed(tower, towerIndex) {
		if (tower.health <= 0) {
			tower.isDying = true;
			this.#towersDying.push(tower);
			this.#towers.splice(towerIndex, 1);
		}
	}

	#checkTowerCollision() {
		this.#towers.forEach((tower, towerIndex) => {
			this.#enemies.forEach((enemy, enemyIndex) => {
				if (collision.rectRectCollisionDetection(tower, enemy)) {
					let towerHealth = tower.health;
					tower.health -= enemy.health / (1 + EnemysController.horda * 0.5);

					if (tower.health > 0) {
						enemy.health -= towerHealth;
					}

					tower.isDamaged = true;

					this.#enemyIsDead(enemy, enemyIndex);
					this.#towerWasDestroyed(tower, towerIndex);

					if (!tower.isDying) {
						assetManager.playSound('explosion');
					}
				}
			});
		});
	}
	#checkProjectileCollision() {
		this.#towers.forEach((tower) => {
			tower.projectiles.forEach((projectile, index) => {
				this.#enemies.forEach((enemy, enemyIndex) => {
					if (collision.rectRectCollisionDetection(projectile, enemy)) {
						assetManager.playSound('hit');
						tower.projectiles.splice(index, 1);
						enemy.health -= projectile.power;
						this.#enemyIsDead(enemy, enemyIndex);
					}
				});
			});
		});
	}

	#createGrid() {
		for (let y = 0; y < this.#canvas.height; y += this.#cellSize) {
			for (let x = 0; x < this.#canvas.width; x += this.#cellSize) {
				const cell = new Cell(x, y, this.#cellSize);
				this.#gameGrid.push(cell);
			}
		}
	}

	#drawGrid() {
		this.#gameGrid.forEach((cell, index) => {
			//não desenha a ultima coluna
			if (index == 6 || index == 13 || index == 20) return;
			cell.draw(this.#ctx);
		});
	}

	#changeSpawnVelocity() {
		const spawnV = (this.#spawnVelocity = 600 - 60 * EnemysController.horda);
		if (spawnV <= this.#maxSpawnVelocity) {
			this.#spawnVelocity = this.#maxSpawnVelocity;
		} else {
			this.#spawnVelocity = spawnV;
		}
	}
	#animation() {
		if (this.#runAnimationControl) {
			this.#ctx.fillStyle = 'black';
			this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
			this.#canEvolveTowers();
			this.#drawGrid();
			this.#changeSpawnVelocity();

			this.#enemiesDying = this.#enemiesDying.filter(
				(enemyDying) => !enemyDying.isDead
			);

			this.#enemiesDying.forEach((enemyDying) => {
				enemyDying.draw(this.#ctx);
			});

			this.#enemies.forEach((enemy) => {
				enemy.update();
				enemy.draw(this.#ctx);
			});
			if (this.#frames % this.#spawnVelocity === 0) {
				this.#spawnEnemy();
			}
			this.#haveEnemyInLine();
			this.#handleTowers();
			this.#checkProjectileCollision();
			this.#checkTowerCollision();
			this.#checkEnemyAttackedBase();
			this.#frames++;
			this.#updateLevel();
			requestAnimationFrame(() => {
				this.#animation();
			});
		}
	}
	startAnimation() {
		this.#runAnimationControl = true;
		if (this.isQuickness) {
			this.#animation();
			this.#animation();
		} else {
			this.#animation();
		}
	}
	stopAnimation() {
		this.#runAnimationControl = false;
	}
	//FIX-IT TOUCH
	#catchMousePosition() {
		document.querySelector('body').addEventListener('mousemove', (e) => {
			this.#updateMousePosition(e);
		});

		document.getElementById('canvas1').addEventListener('drop', (e) => {
			e.preventDefault();
			let towerType = e.dataTransfer.getData('text');
			this.#updateMousePosition(e);
			const newTower = new Tower(
				this.#mousePosition.x,
				this.#mousePosition.y,
				150,
				towerType
			);
			if (newTower.price > this.#player.getMoney()) {
				return;
			}
			this.#addTowerInCell(newTower);
		});
	}
	//FIX-IT SOBREPOSIÇÃO DE TORRES
	#addTowerInCell(tower) {
		// play background music when player put the first tower in row
		if (!this.#towers[0]) this.#updateBackgroundMusic();

		const gridPositionX =
			this.#mousePosition.x -
			(this.#mousePosition.x % this.#cellSize) +
			this.#cellGap;
		const gridPositionY =
			this.#mousePosition.y -
			(this.#mousePosition.y % this.#cellSize) +
			this.#cellGap;
		//Impedir de colocar a torre na ultima coluna
		if (gridPositionX - 5 === this.#gameGrid[6].x) return;
		//Ver se já tem torre nessa celula
		for (let i = 0; i < this.#towers.length; i++) {
			if (
				this.#towers[i].x === gridPositionX &&
				this.#towers[i].y === gridPositionY + this.#cellSize / 3.5
			) {
				return false;
			}
		}

		//Ver se já tem torre nessa celula, porém ainda rodando animação de destruição.
		for (let i = 0; i < this.#towersDying.length; i++) {
			if (
				this.#towersDying[i].x === gridPositionX &&
				this.#towersDying[i].y === gridPositionY + this.#cellSize / 3.5
			) {
				return false;
			}
		}

		tower.updateTowerPosition(
			gridPositionX,
			gridPositionY + this.#cellSize / 3.5
		);

		assetManager.playSound('dropTower');

		this.#player.buy(parseInt(tower.price));
		this.#updateMoney();
		this.#towers.push(tower);
	}

	evolveTower() {
		const offset = 20;
		const finder = (tower) =>
			this.#mousePosition.x - offset > tower.x &&
			this.#mousePosition.x + offset < tower.x + tower.width &&
			this.#mousePosition.y - offset > tower.y &&
			this.#mousePosition.y + offset < tower.y + tower.height;

		const towerClicked = this.#towers.find(finder);
		const towerIndex = this.#towers.indexOf(towerClicked);
		if (!towerClicked || towerClicked.level == 9) return;
		// easter egg!
		// roll the dice and check if the player will get Torres.
		// in case of bad luck the player loses money and
		// the tower gets damaged.
		const jackpot = Math.random() * 100;
		if (towerClicked.level == 9 && jackpot > 2) {
			if (this.#player.getMoney() >= 3000) {
				this.#player.buy(1000);
				this.updateMoney();
				towerClicked.health *= 0.3;
				towerClicked.health = parseInt(towerClicked.health);
				towerClicked.isDamaged = true;
				assetManager.playSound('explosion');
				this.#towerWasDestroyed(towerClicked, towerIndex);
			}
			return;
		}
		const evolvedTower = new Tower(
			towerClicked.x + towerClicked.width / 2,
			towerClicked.y + towerClicked.height / 2,
			150,
			towerClicked.nextLevel
		);
		if (evolvedTower.price > this.#player.getMoney()) return;
		evolvedTower.damage *= 1 + EnemysController.horda * 0.35;
		this.#player.buy(parseInt(evolvedTower.price));
		this.#updateMoney();
		assetManager.playSound('evolve');
		this.#towers[towerIndex] = evolvedTower;
	}

	#updateMousePosition(e) {
		let rect = this.#canvas.getBoundingClientRect();
		const scaleY = this.#canvas.height / rect.height;
		const scaleX = this.#canvas.width / rect.width;
		this.#mousePosition = {
			x: (e.clientX - rect.left) * scaleX,
			y: (e.clientY - rect.top) * scaleY,
		};
	}

	#spawnEnemy() {
		const yInitialpositions = [68, 325, 580];
		const yFinalpositions = [235, 493, 743];
		let sorted = EnemysController.sortPosition();
		let position = yInitialpositions[sorted];
		let monsterType = EnemysController.sortMonster();

		if ((this.#level + 1) % this.#bossLevelMultiple === 0) {
			if (!this.#isBossSpawned) {
				this.#isBossSpawned = true;

				monsterType = this.#boss[0];

				this.#createEnemy(
					monsterType,
					yInitialpositions[1],
					yFinalpositions[0] - yInitialpositions[0],
					1
				);
			}

			return;
		}

		this.#isBossSpawned = false;
		this.#playSoundMonster(monsterType);
		this.#createEnemy(
			monsterType,
			position,
			yFinalpositions[sorted] - yInitialpositions[sorted],
			sorted
		);
	}

	#createEnemy(monsterType, position, yPositions, sorted) {
		this.#playSoundMonster(monsterType);
		this.#enemies.push(
			new Enemy(
				monsterType,
				parseInt(this.#canvas.width),
				position,
				this.#cellSize,
				yPositions,
				sorted,
				EnemysController.horda
			)
		);
	}

	//FIX-IT TORNAR ADAPTAVEL
	#playSoundMonster(monster) {
		switch (monster) {
			case 'robot':
				assetManager.playSound('robot');
				break;
			case 'slimePink':
			case 'slimeGreen':
				assetManager.playSound('slimeWalk');
				break;
			case 'toad':
				assetManager.playSound('monsterGreen');
				break;
			case 'golem':
				assetManager.playSound('golem');
				break;
			default:
				break;
		}
	}

	#updateLevel() {
		if (
			this.#player.getScore() >=
			100 * Math.pow(2, EnemysController.horda + 1)
		) {
			EnemysController.update();
			this.#moneyDrop *= 1 + 1 / EnemysController.horda;
			assetManager.playSound('level_up');
			$('#level_value').html(EnemysController.horda);

			if (EnemysController.horda % 2 === 0) {
				this.#updateBackgroundMusic();
			}
		}
	}

	#updateBackgroundMusic() {
		assetManager.stopSound(this.#backgroundMusic);
		this.#backgroundMusic = 'bg_music_lvl_' + EnemysController.horda;
		assetManager.playSound(this.#backgroundMusic, 0.175, true);
	}
}

export default Game;
