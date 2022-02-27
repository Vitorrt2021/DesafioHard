// const apiURL = 'https://data.dudeful.com';
const apiURL = 'http://localhost:5000';

const renderRanking = async () => {
	//FIX-IT: IMPROVE ERROR HANDLING
	// renderRankingModal();
	// return;
	try {
		const response = await $.ajax(apiURL + '/ranking');

		renderRankingModal();

		response.data.slice(0, 63).forEach((score, index) => {
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

const renderRankingModal = () => {
	$('.modal').html(
		`<div class="modal__content">
				<div class="ranking__container">
						<div class="ranking__cell__container">
						</div>
						<button class="close_modal" type="button">Fechar</button>
				</div>
		</div>`
	);

	$('.close_modal').click(() => {
		$('.modal')[0].style.display = 'none';
	});

	$('.modal')[0].style.display = 'block';

	// When the user clicks anywhere outside of the modal, closes it
	$(window).click((event) => {
		if (
			event.originalEvent.target === $('.modal')[0] ||
			event.originalEvent.target === $('.modal__content')[0]
		) {
			$('.modal')[0].style.display = 'none';
		}
	});
};

export default renderRanking;
