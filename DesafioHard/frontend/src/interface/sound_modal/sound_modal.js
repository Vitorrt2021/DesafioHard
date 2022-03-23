import assetManager from '../../game_components/AssetManager.js';

function renderSoundModal(game) {
	$('#sound_modal').css('display', 'flex');
	$('#volume_value').text(`${assetManager.getVolume()}%`);

	$('#volume_slider')
		.unbind('input')
		.on('input', function (e) {
			$('#volume_value').text($('#volume_slider').val() + '%');
			assetManager.changeVolume($('#volume_slider').val());
		});

	$('#sound_button_modal_zero')
		.unbind('click')
		.click(() => {
			updateVolume(0);
		});

	$('#sound_button_modal_100')
		.unbind('click')
		.click(() => {
			updateVolume(100);
		});

	$('#sound_modal_close_button')
		.unbind('click')
		.click(() => {
			$('#sound_modal').css('display', 'none');
			if (game?.isAnimationStopped()) {
				game?.startAnimation();
			}
		});

	// When the user clicks anywhere outside of the modal, closes it
	$(window)
		.unbind('click')
		.click((event) => {
			if (event.originalEvent.target === $('#sound_modal')[0]) {
				$('#sound_modal').css('display', 'none');
				if (game?.isAnimationStopped()) {
					game?.startAnimation();
				}
			}
		});
}

function updateVolume(newVolume) {
	$('#volume_slider').val(newVolume);
	$('#volume_value').text($('#volume_slider').val() + '%');
	assetManager.changeVolume(newVolume);
}

export default renderSoundModal;
