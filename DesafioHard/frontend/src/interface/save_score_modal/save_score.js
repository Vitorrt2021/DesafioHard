// const apiURL = 'https://data.dudeful.com';
const apiURL = 'http://localhost:5000';

function renderSaveScoreModal(game) {
	$('#save_score_modal').css('display', 'flex');

	window.onbeforeunload = () => {
		return;
	};

	$('#save_score_modal_save_button')
		.unbind('click')
		.click(() => {
			saveScore();
			$('#save_score_modal').css('display', 'none');
		});

	$('#save_score_modal_restart_button')
		.unbind('click')
		.click(() => {
			game.restart();
			game.startAnimation();
			$('#save_score_modal').css('display', 'none');
		});

	$('#save_score_modal_exit_button')
		.unbind('click')
		.click(() => {
			window.location = '/';
		});
}

async function saveScore() {
	const name = $('#save_score_modal_input').val();
	const score = $('#score_value').html();
	const data = { data: { name, score } };

	try {
		const response = await $.post(apiURL + '/save-score', data);
		console.log(response);
	} catch (error) {
		// FIXME: add message above "save" button
		alert('check the console for errors');
		console.error(error.responseJSON || error);
	}
}

export default renderSaveScoreModal;
