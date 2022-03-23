class Player {
	#score;
	#live;
	#money;
	constructor() {
		this.#score = 0;
		this.#live = 3;
		this.#money = 10999900;
	}

	deductLive() {
		this.#live -= 1;
	}
	addScore(number) {
		this.#score += number;
	}
	addMoney(number) {
		this.#money += number;
	}
	getMoney() {
		return this.#money;
	}
	getLive() {
		return this.#live;
	}
	getScore() {
		return this.#score;
	}
	buy(price) {
		this.#money -= price;
	}
}

export default Player;
