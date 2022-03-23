import enemyData from './EnemyData.js';

class EnemiesController {
	constructor() {
		this.horda = 0;
		this.monsters = Object.entries(enemyData).slice(0, this.horda + 1);
	}

	setMonsters() {
		if (this.horda > Object.entries(enemyData).length) {
			return;
		}

		this.monsters = Object.entries(enemyData).slice(0, this.horda + 1);
		return;
	}

	updateHorda() {
		this.horda++;
	}

	sortPosition() {
		return Math.floor(Math.random() * 3);
	}

	sortMonster() {
		return this.monsters[Math.floor(Math.random() * this.monsters.length)][0];
	}

	getBoss() {
		const random = Math.random();

		if (random <= 0.2) {
			return 'golem';
		} else if (random <= 0.4) {
			return 'gorilla';
		} else if (random <= 0.6) {
			return 'goblin';
		} else {
			return 'iceman';
		}
	}

	update() {
		this.updateHorda();
		this.setMonsters();
	}
}

const enemy = new EnemiesController();
export default enemy;
