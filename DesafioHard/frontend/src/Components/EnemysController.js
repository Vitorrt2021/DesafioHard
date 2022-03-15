import monsterStatus from './monsterStatus.js';

class EnemysController {
	constructor() {
		this.horda = 0;
		this.monsters = Object.entries(monsterStatus).slice(0, this.horda + 1);
	}
	setMonters() {
		if (this.horda > Object.entries(monsterStatus).length) {
			return;
		}
		this.monsters = Object.entries(monsterStatus).slice(0, this.horda + 1);
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
	update() {
		this.updateHorda();
		this.setMonters();
	}
}
const enemy = new EnemysController();
export default enemy;
