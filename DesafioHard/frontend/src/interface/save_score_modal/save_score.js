// const apiURL = 'https://data.dudeful.com';
const apiURL = 'http://localhost:5000';

function renderSaveScoreModal() {
	$('#save_score_modal').css('display', 'flex');

	window.onbeforeunload = () => {
		return;
	};

	// $('.save_score_button')
	// 	.unbind('click')
	// 	.click(() => saveScore());
}

async function saveScore() {
	const name = $('#save__name__input').val();
	const score = $('#score_value').html();
	const data = { data: { name, score } };

	try {
		const response = await $.post(apiURL + '/save-score', data);

		window.location = '/';
	} catch (error) {
		// FIXME: add message above "save" button
		alert('check the console for errors');

		console.error(error.responseJSON || error);
	}
}

export default renderSaveScoreModal;
