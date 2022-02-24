import Game from '../Components/Game.js';
import assetManager from '../Components/AssetManager.js';
import renderRanking from '../requests/ranking.js';

const apiURL = 'https://data.dudeful.com';
// const apiURL = 'http://localhost:5000';

$(document).ready(() => {
	// Prevent user from unloading the page by accident
	window.addEventListener('beforeunload', function (e) {
		const score = $('#score_value').html();

		if (score >= 100) {
			e.preventDefault();
			// In Mozilla Firefox prompt will always be shown
			// Chrome requires returnValue to be set
			e.returnValue = '';
		}
	});

	$('.close_modal').click(() => {
		$('.modal')[0].style.display = 'none';
		$('#level_value').html('');
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

	const canvas = document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');

	$.get(`${apiURL}/load-assets`, async (assetLoaderInstance) => {
		await assetManager.prepareAssets(assetLoaderInstance);

		const game = new Game();
		game.start();

		$('#canvas1').click(() => {
			game.evolveTower();
		});

		createTooltip('.blue_rabbit_tower', 750, 75, Math.floor(10000 / 170));
		createTooltip('.red_rabbit_tower', 500, 100, Math.floor(10000 / 120));
		createTooltip('.cat_tower', 500, 50, Math.floor(10000 / 200));
	});
});

function createTooltip(element, live, strenght, speed) {
	const lifeSymbol = assetManager.getImage('live_icon_tooltip');
	const strenghtSymbol = assetManager.getImage('strenght_icon_tooltip');
	const speedSymbol = assetManager.getImage('speed_icon_tooltip');

	$(element).tooltip({
		classes: {
			'ui-tooltip': 'tooltip1',
			'ui-tooltip-content': 'tooltip1',
		},
		content: `
			<div class="tooltip1">
				<div>
					${lifeSymbol.outerHTML}
					<label id="live_value_">${live}</label>
				</div>
				<div>
					${strenghtSymbol.outerHTML}
					<label id='strength_value_'>${strenght}</label>
				</div>
				<div>
					${speedSymbol.outerHTML}
					<label id="live_value_">${speed}</label>
				</div>
			</div>`,
	});
}
