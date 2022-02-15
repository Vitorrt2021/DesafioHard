const apiURL = 'http://edtech.dudeful.com:3004';

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

export { renderRanking };
