const apiURL = 'https://datalab.dudeful.com';

function renderSaveScoreModal(game, score) {
	$('#save_score_modal').css('display', 'flex');
	$('#save_score_modal_input').focus();
	$('#save_score_error_display').text('  ');

	window.onbeforeunload = () => {
		return;
	};

	$('#save_score_modal_save_button')
		.unbind('click')
		.click(() => {
			saveScore(score);
		});

	$('#save_score_modal_restart_button')
		.unbind('click')
		.click(() => {
			$('#save_score_modal').css('display', 'none');
			window.location.reload();
		});

	$('#save_score_modal_exit_button')
		.unbind('click')
		.click(() => {
			restartGame();
		});

	// When the user clicks anywhere outside of the modal, closes it
	$(window)
		.unbind('click')
		.click((event) => {
			if (event.originalEvent.target === $('#save_score_modal')[0]) {
				restartGame();
			}
		});
}

function restartGame() {
	window.location = '/';
}

async function saveScore(score) {
	const name = $('#save_score_modal_input').val();
	const data = { data: { name, score } };

	try {
		await $.post(apiURL + '/save-score', data);
		$('#save_score_error_display').css('color', 'green');
		$('#save_score_error_display').text('SAVED, CHECK RANKING!');
		setTimeout(() => {
			restartGame();
		}, 3000);
	} catch (error) {
		$('#save_score_error_display').text(`${error.responseJSON.message}`);
	}
}

export default renderSaveScoreModal;
