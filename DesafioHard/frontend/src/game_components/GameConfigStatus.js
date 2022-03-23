import TowerData from './TowerData.js';
import BossData from './BossData.js';
import EnemyData from './EnemyData.js';

class GameConfigStatus {
	constructor() {}
	setStatus() {
		if (this.type === 'monster') {
			this.setStatusMonster();
		} else if (this.type === 'tower') {
			this.setStatusTower();
		} else if (this.type === 'player') {
			this.setStatusPlayer();
		} else {
			return;
		}
	}
	setStatusMonster() {}
	setStatusTower(type) {}
}
