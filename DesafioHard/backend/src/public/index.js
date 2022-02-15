import * as saveGame from './exports/save-game.js';
import * as ranking from './exports/ranking.js';

const preventReload = () => {
	window.addEventListener('beforeunload', function (e) {
		e.preventDefault();
		// In Mozilla Firefox prompt will always be shown
		// Chrome requires returnValue to be set
		e.returnValue = '';
	});
};

$(document).ready(() => {
	$('#save_score').click(saveGame.saveScore);
	$('#player_score').on('input', preventReload);

	ranking.renderRanking();
});
