import Game from '../Components/Game.js';
import * as saveScore from '../requests/save-score.js';
import renderRanking from '../requests/ranking.js';

$(document).ready(() => {
	// Prevent user from reloading page by accident
	window.addEventListener('beforeunload', function (e) {
		const score = $('#score_value').html();

		if (score >= 100) {
			e.preventDefault();
			// In Mozilla Firefox prompt will always be shown
			// Chrome requires returnValue to be set
			e.returnValue = '';
		}
	});

	// When the user clicks anywhere outside of the modal, closes it
	$(window).click((event) => {
		if (event.target === $('.save_score_button')[0]) {
			saveScore.saveScore();
		}
		if (event.target === $('.close_modal')[0]) {
			$('.modal')[0].style.display = 'none';
			game.startAnimation();
		}
	});

	$('.save_ranking').click(() => {
		const score = $('#score_value').html();
		if (score >= 100) {
			game.stopAnimation();
			saveScore.renderNodes();
		} else {
			alert('Pontuação mínima para registrar ranking: 100 pontos');
		}
	});

	$('.restart_level').click(() => {
		window.location.reload();
	});

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
});
