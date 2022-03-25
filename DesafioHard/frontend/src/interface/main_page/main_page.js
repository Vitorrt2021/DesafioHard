import renderRankingModal from '../ranking_modal/ranking_modal.js';
import renderSoundModal from '../sound_modal/sound_modal.js';
import assetManager from '../../game_components/AssetManager.js';

$(document).ready(() => {
	$('#welcome_container').hover(() => {
		assetManager.playSound('bg_music', undefined, true, true);
	});

	$('#play_button').click(() => {
		window.location = `interface/gameplay_page`;
	});

	$('#ranking_button').click(() => {
		renderRankingModal();
	});

	$('#sound_button').click(() => {
		renderSoundModal();
	});
});
