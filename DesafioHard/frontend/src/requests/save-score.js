// const apiURL = 'https://data.dudeful.com';
const apiURL = 'http://localhost:5000';

const saveScore = async () => {
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
};

const renderSaveScore = () => {
	window.onbeforeunload = () => {
		return;
	};
	//FIXME	improve layout
	$('.modal').html(
		`<div class="app__container">
				<div class="save__container">
					<div class="input__container">
						<input type="text" placeholder="NOME" id="save__name__input">
						<button type="button" class="blue__button save_score_button" id='button_save'>SALVAR</button>
					</div>
				</div>
		</div>`
	);

	$('.save_score_button').click(() => saveScore());

	$('.modal')[0].style.display = 'block';
};

export default renderSaveScore;
