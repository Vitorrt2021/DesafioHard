import Game from '../../game_components/Game.js';
import assetManager from '../../game_components/AssetManager.js';
import renderConfigurationModal from '../configuration_modal/configuration_modal.js';

// const apiURL = 'https://data.dudeful.com';
const apiURL = 'http://localhost:5000';

$(document).ready(() => {
	// Prevent user from unloading the page by accident
	window.onbeforeunload = (e) => {
		const score = $('#score_value').html();

		if (score >= 100) {
			e.preventDefault();
			// In Mozilla Firefox prompt will always be shown
			// Chrome requires returnValue to be set
			e.returnValue = '';
		}
	};

	$('.cat_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'cat_tower_level_1');
	});

	$('.pikachu_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'pikachu_tower_level_1');
	});

	$('.stone_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'stone_tower_level_1');
	});

	$('.rabbit_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'rabbit_tower_level_1');
	});

	$('#canvas').on('dragover', function (event) {
		event.originalEvent.preventDefault();
	});

	$.get(`${apiURL}/load-assets`, async (assetLoaderInstance) => {
		await assetManager.prepareAssets(assetLoaderInstance);

		const game = new Game();
		game.start();

		// $('#canvas').mousemove(() => {
		// 	game.darkenTower();
		// });
		$('#canvas').click(() => {
			game.removeTower();
			game.evolveTower();
		});
		$('#martelo_button').click(() => {
			game.setRemoveTower();
			alert('Coisa');
		});
		$('#configuration_button').click(() => {
			game.stopAnimation();
			renderConfigurationModal(game);
		});

		createTooltip('cat_tower', 500, 50, Math.floor(10000 / 200));
		createTooltip('pikachu_tower', 750, 75, Math.floor(10000 / 170));
		createTooltip('stone_tower', 1000, 0, 0);
		createTooltip('rabbit_tower', 500, 100, Math.floor(10000 / 120));
	});
});

function createTooltip(element, live, strength, speed) {
	const lifeSymbol = assetManager.getImage('live_icon_tooltip');
	const strenghtSymbol = assetManager.getImage('strength_icon_tooltip');
	const speedSymbol = assetManager.getImage('speed_icon_tooltip');

	$(`#live_icon_${element}`).prepend(lifeSymbol.outerHTML);
	$(`#strength_icon_${element}`).prepend(strenghtSymbol.outerHTML);
	$(`#speed_icon_${element}`).prepend(speedSymbol.outerHTML);

	$(`#live_value_${element}`).html(live);
	$(`#strength_value_${element}`).html(strength);
	$(`#speed_value_${element}`).html(speed);

	$(`.${element}`)
		.unbind('mouseenter')
		.on('mouseenter', () => {
			$(`.tooltip_${element}`).css('display', 'flex');
		});

	$(`.${element}`)
		.unbind('mouseleave')
		.on('mouseleave', () => {
			$(`.tooltip_${element}`).css('display', 'none');
		});
}
