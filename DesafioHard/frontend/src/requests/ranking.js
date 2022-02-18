const apiURL = 'http://edtech.dudeful.com:3004';

const renderRanking = async () => {
	try {
		const response = await $.ajax(apiURL + '/ranking');

		renderNodes();

		response.data.slice(0, 20).forEach((score, index) => {
			$('.ranking__cell__container').append(
				`<div class="ranking__cell">
            <span class="ranking__cell__name">
              <span class="ranking__cell__rank">${index + 1}º</span>
              ${score.name}
            </span>
            <span class="ranking__cell__score">${score.score}</span>
        </div>`
			);
			// <span class="ranking__cell__date">${score.date}</span>
		});
	} catch (error) {
		alert('check console for errors');
		console.error(error);
	}
};

const renderNodes = () => {
	$('.modal').html(
		`<div class="modal__content">
				<div class="ranking__container">
						<div class="ranking__cell__container">
						</div>
						<button class="close_modal" type="button">Fechar</button>
				</div>
		</div>`
	);

	$('.modal')[0].style.display = 'block';
};

export default renderRanking;
