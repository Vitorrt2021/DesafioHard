// const apiURL = 'https://data.dudeful.com';
const apiURL = 'http://localhost:5000';

const renderRanking = async () => {
	//FIX-IT: IMPROVE ERROR HANDLING

	try {
		const response = await $.ajax(apiURL + '/ranking');

		renderRankingModal();

		response.data.slice(0, 63).forEach((userData, index) => {
			$('.ranking__cell__container').append(
				`<div class="ranking__cell">
						<div class="ranking__cell__rank">${index + 1}º</div>
						<div class="ranking__cell__name_score_date_container">
							<div class="ranking__cell__only_score_date_container">
								<div class="ranking__cell__score">${userData.score}</div>
								<div class="ranking__cell__date">${userData.date}</div>
							</div>
							<div class="ranking__cell__name">${userData.name}</div>
						</div>
				 </div>`
			);
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
						<button class="close_modal" type="button">FECHAR</button>
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
			event.originalEvent.target === $('.modal__content')[0] ||
			event.originalEvent.target === $('.ranking__container')[0]
		) {
			$('.modal')[0].style.display = 'none';
		}
	});
};

export default renderRanking;
