import monsterStatus from './monsterStatus';

class spawnEnemy {
	constructor(inicialPositions, finalPositions) {
		this.horda = 0;
		this.monsters;
		this.monstersDye = 0;
		this.inicialPositions = inicialPositions;
		this.finalPositions = finalPositions;
	}
	setMonters() {
		this.monsters = Object.entries(monsterStatus).slice(0, this.horda);
	}
	updateHorda() {
		this.horda++;
	}
	sortPosition() {
		return Math.floor(Math.random() * 3);
	}
	sortMonster() {
		return Math.floor(Math.random() * this.monsters.length);
	}
	spawn() {
		return;
	}
	update() {}
}
