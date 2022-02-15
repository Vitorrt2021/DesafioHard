const apiURL = 'http://edtech.dudeful.com:3004';

$(document).ready(() => {
	window.addEventListener('beforeunload', function (e) {
		e.preventDefault();
		// In Mozilla Firefox prompt will always be shown
		// Chrome requires returnValue to be set
		e.returnValue = '';
	});

	$('#save_score').click(saveScore);

	renderRanking();
});

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
			renderRanking();
		})
		.fail((error) => console.error(error));
};

const renderRanking = async () => {
	if ($('#ranking')) $('#ranking').remove();

	$('#root').append(`
    <table id="ranking">
      <tr>
        <th>Jogador</th>
        <th>Pontuação</th>
        <th>Data</th>
      </tr>
    </table>
  `);

	try {
		const response = await $.ajax(apiURL + '/ranking');

		response.data.forEach((score) => {
			$('#ranking').append(`
        <tr>
          <td>${score.name}</td>
          <td>${score.score}</td>
          <td>${score.date}</td>
        </tr>
      `);
		});
	} catch (error) {
		alert('check console for errors');
		console.error(error);
	}
};
