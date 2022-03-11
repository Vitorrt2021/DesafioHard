import Game from '../Components/Game.js';
import renderRanking from '../requests/ranking.js';
import assetManager from '../Components/AssetManager.js';
import renderSoundMenu from '../index.js';
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

	$('.close__modal').click(() => {
		$('.modal')[0].style.display = 'none';
		$('#level_value').html('');
	});

	$('.restart_level').click(() => {
		window.location.reload();
	});

	$('.cat_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'cat_tower_level_1');
	});

	$('.pikachu_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'pikachu_tower_level_1');
	});

	$('.rabbit_tower').on('dragstart', function (event) {
		event.originalEvent.dataTransfer.setData('text', 'rabbit_tower_level_1');
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

		eventCloseConfiguration(game);
		$('.configuration_button').click(() => {
			game.stopAnimation();
			renderConfigurationModal(game);
		});

		createTooltip('.pikachu_tower', 750, 75, Math.floor(10000 / 170));
		createTooltip('.rabbit_tower', 500, 100, Math.floor(10000 / 120));
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

const renderConfigurationModal = (game) => {
	$('.configuration_modal')[0].style.display = 'flex';
	$('.configuration_modal').html(
		`
		<div class='modal_blur'></div>
		<div class="configuration_modal_content">
			<div class='buttons_container'>
				<button class='configuration_sound_button '></button>
				<button class='configuration_buttons configuration_modal_speed_button'></button>
			</div>
			<button class='configuration_buttons configuration_modal_restart_button'></button>
			<button class='configuration_buttons configuration_modal_exit_button'></button>
		</div>
		`
	);
	if (game.isQuickness) {
		$('.configuration_modal_speed_button').css(
			'background-image',
			`url('../assets/images/speed_control_selected.svg')`
		);
	}
	$('.configuration_modal_content')[0].style.display = 'flex';

	$('.configuration_modal_restart_button').click(() => {
		location.reload();
	});
	$('.configuration_modal_speed_button').click(() => {
		changeSpeed(game);
	});
	$('.configuration_sound_button').click(() => {
		$('.configuration_modal')[0].style.display = 'none';
		renderSoundMenu();
		$('.close_modal').click(() => {
			if (game.isStop()) {
				game.startAnimation();
			}
		});
	});
};
function changeSpeed(game) {
	game.isQuickness = !game.isQuickness;
	if (game.isQuickness) {
		$('.configuration_modal_speed_button').css(
			'background-image',
			`url('../assets/images/speed_control_selected.svg')`
		);
	} else {
		$('.configuration_modal_speed_button').css(
			'background-image',
			`url('../assets/images/speed_control.svg')`
		);
	}
}
function eventCloseConfiguration(game) {
	// When the user clicks anywhere outside of the modal, closes it

	$(window).mousedown((event) => {
		if (
			event.originalEvent.target !== $('.configuration_modal')[0] &&
			event.originalEvent.target !== $('.configuration_modal_content')[0] &&
			event.originalEvent.target !==
				$('.configuration_modal_speed_button')[0] &&
			event.originalEvent.target !== $('.configuration_sound_button')[0] &&
			event.originalEvent.target !==
				$('.configuration_modal_restart_button')[0] &&
			event.originalEvent.target !== $('.volumeSlider')[0] &&
			event.originalEvent.target !== $('.volumeInfo_container')[0] &&
			event.originalEvent.target !== $('.sound_button_modal_empty')[0] &&
			event.originalEvent.target !== $('.sound_button_modal_full')[0] &&
			event.originalEvent.target !== $('.sound__menu')[0]
		) {
			closeModal();
		}

		function closeModal() {
			$('.configuration_modal')[0].style.display = 'none';

			if (game.isStop()) {
				game.startAnimation();
			}
		}
	});
}
