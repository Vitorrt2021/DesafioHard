import * as ranking from './ranking.js';

const apiURL = 'http://edtech.dudeful.com:3004';

const saveScore = () => {
	const name = $('#player_name').val();
	const score = $('#player_score').val();
	const data = { data: { name, score } };

	$.post(apiURL + '/save-game', data)
		.done((res) => {
			console.log(res);
			//CUIDADO!!!
			//SE O PM2 ESTIVER COM A FLAG "--watch" ou A CONFIG "watch: true" O SERVIDOR
			//SERÁ REINICIADO DURANTE O SALVAMENTO DO NOVO SCORE NO ARQUIVO JSON
			//E PORTANTO, AO TENTAR CHAMAR A FUNÇÃO ABAIXO HAVERÁ UM ERRO, POIS
			//A REQUISIÇÃO ACONTECERÁ NO MOMENTO EM QUE O SERVIDOR ESTÁ SENDO REINICIADO!
			ranking.renderRanking();
		})
		.fail((error) => console.error(error));
};

export { saveScore };
