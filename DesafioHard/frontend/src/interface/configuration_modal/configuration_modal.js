import renderSoundModal from '../sound_modal/sound_modal.js';

function renderConfigurationModal(game) {
	$('#configuration_modal').css('display', 'flex');

	$('.configuration_modal_sound_button')
		.unbind('click')
		.click(() => {
			$('#configuration_modal').css('display', 'none');
			renderSoundModal(game);
		});

	changeSpeedButtonIfGameAccelerated(game);
	$('.configuration_modal_speed_button')
		.unbind('click')
		.click(() => {
			changeSpeed(game);
		});

	$('.configuration_modal_resume_button')
		.unbind('click')
		.click(() => {
			$('#configuration_modal').css('display', 'none');
			if (game.isAnimationStopped()) {
				game.startAnimation();
			}
		});

	$('.configuration_modal_restart_button')
		.unbind('click')
		.click(() => {
			game.restart();
			game.startAnimation();
			$('#configuration_modal').css('display', 'none');
		});

	$('.configuration_modal_exit_button')
		.unbind('click')
		.click(() => {
			window.history.back();
		});

	// When the user clicks anywhere outside of the modal, closes it
	$(window)
		.unbind('click')
		.click((event) => {
			if (event.originalEvent.target === $('#configuration_modal')[0]) {
				$('#configuration_modal').css('display', 'none');
				if (game.isAnimationStopped()) {
					game.startAnimation();
				}
			}
		});
}

function changeSpeed(game) {
	game.isAccelerated = !game.isAccelerated;
	changeSpeedButtonIfGameAccelerated(game);
}

function changeSpeedButtonIfGameAccelerated(game) {
	if (game.isAccelerated) {
		$('.configuration_modal_speed_button').css(
			'background-image',
			`url('../configuration_modal/images/speed_control_selected.svg')`
		);
	} else {
		$('.configuration_modal_speed_button').css(
			'background-image',
			`url('../configuration_modal/images/speed_control.svg')`
		);
	}
}

export default renderConfigurationModal;
