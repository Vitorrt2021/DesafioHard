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
		event.originalEvent.dataTransfer.setData(
			'text',
			'cat_tower_level_1'
		);
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
});
