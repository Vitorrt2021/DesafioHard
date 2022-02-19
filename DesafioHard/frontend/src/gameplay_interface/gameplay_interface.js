import Game from '../Components/Game.js';

$(document).ready(function () {
	// // Prevent user from reloading page by accident
	// window.addEventListener('beforeunload', function (e) {
	// 	e.preventDefault();
	// 	// In Mozilla Firefox prompt will always be shown
	// 	// Chrome requires returnValue to be set
	// 	e.returnValue = '';
	// });

	$('.cat_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'cat_tower_level_1');
	});

	$('.blue_rabbit_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData(
			'text',
			'blue_rabbit_tower_level_1'
		);
	});

	$('.red_rabbit_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData(
			'text',
			'red_rabbit_tower_level_1'
		);
	});

	$('#canvas1').on('dragover', function (event) {
		event.originalEvent.preventDefault();
	});

	const game = new Game();
	game.start();

	$('canvas').click(() => {
		game.evolveTower();
	});

	createTooltip('.blue_rabbit_tower', 750, 75, Math.floor(10000 / 170));
	createTooltip('.red_rabbit_tower', 500, 100, Math.floor(10000 / 120));
	createTooltip('.cat_tower', 500, 50, Math.floor(10000 / 200));
});

function createTooltip(element, live, strenght, speed) {
	$(element).tooltip({
		classes: {
			'ui-tooltip': 'tooltip1',
			'ui-tooltip-content': 'tooltip1',
		},
		content: `
			<div class="tooltip1">
				<img src="./images/strenght_icon.png" alt="Força">
				<label id='strength_value'>${strenght}</label>
				<img src="./images/live_icon.png" alt="Live">
				<label id="live_value">${live}</label>
				<img src="./images/speed_icon.png" alt="spped">
				<label id="live_value">${speed}</label>
			</div>`,
	});
}
