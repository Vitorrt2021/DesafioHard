// const apiURL = 'https://data.dudeful.com';
const apiURL = 'http://localhost:5000';

const saveScore = () => {
	const name = $('#save__name__input').val();
	const score = $('#score_value').html();
	const data = { data: { name, score } };

	$.post(apiURL + '/save-score', data)
		.done((res) => {
			console.log(res);
			//CUIDADO!!!
			//SE O PM2 ESTIVER COM A FLAG "--watch" ou A CONFIG "watch: true" O SERVIDOR
			//SERÁ REINICIADO DURANTE O SALVAMENTO DO NOVO SCORE NO ARQUIVO JSON
			//E PORTANTO, AO TENTAR CHAMAR A FUNÇÃO ABAIXO HAVERÁ UM ERRO, POIS
			//A REQUISIÇÃO ACONTECERÁ NO MOMENTO EM QUE O SERVIDOR ESTÁ SENDO REINICIADO!
			window.location = '/';
		})
		.fail((error) => {
			console.error(error);
			alert(error.responseText);
		});
};

const renderSaveScore = () => {
	window.onbeforeunload = () => {
		return;
	};

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
