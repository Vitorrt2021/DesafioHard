const apiURL = 'https://datalab.dudeful.com';

async function renderRankingModal() {
	try {
		const response = await $.ajax(`${apiURL}/ranking`);

		$('#ranking_modal').css('display', 'flex');

		$('#ranking_modal_close_button').click(() => {
			$('#ranking_modal').css('display', 'none');
		});

		// When the user clicks anywhere outside of the modal, closes it
		$(window).click((event) => {
			if (event.originalEvent.target === $('#ranking_modal')[0]) {
				$('#ranking_modal').css('display', 'none');
			}
		});

		$('#ranking_cell_container').html('');
		renderCells(response);
	} catch (error) {
		alert('check the console for errors');
		console.error(error.responseJSON || error);
	}
}

function renderCells(ajaxResponse) {
	let index;

	for (index = 0; index < 3; index++) {
		const userData = ajaxResponse[index];

		$('#ranking_cell_container').append(
			`<div id="ranking_cell_${index + 1}">
					<div class="ranking_cell_rank"></div>
					${renderCellData(userData)}
			 </div>`
		);
	}

	for (index = 3; index < ajaxResponse.length; index++) {
		const userData = ajaxResponse[index];

		$('#ranking_cell_container').append(
			`<div class="ranking_cell">
					<div class="ranking_cell_rank">
						<p>${index + 1}º</p>
					</div>
					${renderCellData(userData)}
			 </div>`
		);
	}
}

function renderCellData(userData) {
	return `<div class="ranking_cell_data_container">
						<div class="ranking_cell_score_date_container">
							<div class="ranking_cell_score">${userData.score}</div>
							<div class="ranking_cell_date">${userData.date}</div>
						</div>
						<div class="ranking_cell_name">${userData.name}</div>
					</div>`;
}

export default renderRankingModal;
