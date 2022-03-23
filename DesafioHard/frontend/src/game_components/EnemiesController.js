import enemyData from './EnemyData.js';

class EnemysController {
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

		if (random <= 0.3333) {
			return 'golem';
		} else if (random <= 0.6666) {
			return 'gorilla';
		} else {
			return 'goblin';
		}
	}

	update() {
		this.updateHorda();
		this.setMonsters();
	}
}

const enemy = new EnemysController();
export default enemy;
