const mainArray = [
	'..\\assets\\audios\\dropTower.mp3',
	'..\\assets\\audios\\envolve.mp3',
	'..\\assets\\audios\\explosion.mp3',
	'..\\assets\\audios\\hit.mp3',
	'..\\assets\\audios\\monsterGreen.mp3',
	'..\\assets\\audios\\robot_.mp3',
	'..\\assets\\audios\\shooting.mp3',
	'..\\assets\\audios\\slimeWalk.mp3',
	'..\\assets\\audios\\titanic_flute.mp3',
	'..\\assets\\explosions\\Explosion_1.png',
	'..\\assets\\explosions\\Explosion_2.png',
	'..\\assets\\explosions\\Explosion_3.png',
	'..\\assets\\explosions\\Explosion_4.png',
	'..\\assets\\explosions\\Explosion_5.png',
	'..\\assets\\explosions\\Explosion_6.png',
	'..\\assets\\explosions\\Explosion_7.png',
	'..\\assets\\explosions\\Explosion_8.png',
	'..\\assets\\images\\backgroundGame.png',
	'..\\assets\\images\\evolve_tower.png',
	'..\\assets\\images\\star_path.svg',
	'..\\assets\\images\\tower_symbol.svg',
	'..\\assets\\monsters\\robot\\robot_1.svg',
	'..\\assets\\monsters\\robot\\robot_2.svg',
	'..\\assets\\monsters\\robot\\robot_3.svg',
	'..\\assets\\monsters\\robot\\robot_4.svg',
	'..\\assets\\monsters\\robot\\robot_5.svg',
	'..\\assets\\monsters\\robot\\robot_dying_1.svg',
	'..\\assets\\monsters\\robot\\robot_dying_2.svg',
	'..\\assets\\monsters\\robot\\robot_dying_3.svg',
	'..\\assets\\monsters\\toad\\toad_1.svg',
	'..\\assets\\monsters\\toad\\toad_2.svg',
	'..\\assets\\monsters\\toad\\toad_3.svg',
	'..\\assets\\monsters\\toad\\toad_4.svg',
	'..\\assets\\monsters\\toad\\toad_5.svg',
	'..\\assets\\monsters\\toad\\toad_dying_1.svg',
	'..\\assets\\monsters\\toad\\toad_dying_2.svg',
	'..\\assets\\monsters\\toad\\toad_dying_3.svg',
	'..\\assets\\monsters\\slimeGreen\\slimeGreen_1.svg',
	'..\\assets\\monsters\\slimeGreen\\slimeGreen_2.svg',
	'..\\assets\\monsters\\slimeGreen\\slimeGreen_3.svg',
	'..\\assets\\monsters\\slimeGreen\\slimeGreen_4.svg',
	'..\\assets\\monsters\\slimeGreen\\slimeGreen_5.svg',
	'..\\assets\\monsters\\slimeGreen\\slimeGreen_dying_1.svg',
	'..\\assets\\monsters\\slimeGreen\\slimeGreen_dying_2.svg',
	'..\\assets\\monsters\\slimePink\\slimePink_1.svg',
	'..\\assets\\monsters\\slimePink\\slimePink_2.svg',
	'..\\assets\\monsters\\slimePink\\slimePink_3.svg',
	'..\\assets\\monsters\\slimePink\\slimePink_4.svg',
	'..\\assets\\monsters\\slimePink\\slimePink_5.svg',
	'..\\assets\\monsters\\slimePink\\slimePink_dying_1.svg',
	'..\\assets\\monsters\\slimePink\\slimePink_dying_2.svg',
	'..\\assets\\projectiles\\carrot.png',
	'..\\assets\\projectiles\\lightning.svg',
	'..\\assets\\projectiles\\wool_ball.png',
	'..\\assets\\projectiles\\football_ball.png',
	'..\\assets\\towers\\blue_rabbit_tower_base.png',
	'..\\assets\\towers\\blue_rabbit_tower_level_1.png',
	'..\\assets\\towers\\blue_rabbit_tower_level_2.png',
	'..\\assets\\towers\\blue_rabbit_tower_level_3.png',
	'..\\assets\\towers\\cat_tower_base.png',
	'..\\assets\\towers\\cat_tower_level_1.png',
	'..\\assets\\towers\\cat_tower_level_2.png',
	'..\\assets\\towers\\cat_tower_level_3.png',
	'..\\assets\\towers\\red_rabbit_tower_base.png',
	'..\\assets\\towers\\red_rabbit_tower_level_1.png',
	'..\\assets\\towers\\red_rabbit_tower_level_2.png',
	'..\\assets\\towers\\red_rabbit_tower_level_3.png',
	'..\\assets\\towers\\fernando_torres.png',
];

class AssetManager {
	constructor() {
		this.images = {};
		this.sounds = {};
		// this.files = getFilesInsideDirectory('../assets');
		// this.#files = mainArray; //temporario, mandar funcao de ler diretorios para o servidor.

		$.get('/get-assets', (res) => {
			this.#buildAssets(res);
		});
	}

	#buildImageObject(filePath) {
		const image = new Image();
		image.src = filePath;
		console.log('buildImage: ' + filePath);
		return image;
	}

	#buildAssets(files) {
		for (const filePath of files) {
			let changedFilePath = filePath.split('\\');
			changedFilePath[0] = '..';

			const fileName = changedFilePath[changedFilePath.length - 1];
			const fileExtension = fileName.slice(-3);

			changedFilePath = changedFilePath.join('\\');
			// console.log(
			// 	filePath,
			// 	fileName,
			// 	fileName.slice(0, -4),
			// 	fileExtension,
			// 	changedFilePath,
			// 	typeof changedFilePath
			// );
			if (fileExtension === 'mp3') {
				// sounds[fileName.slice(0, -4)] = {}; //TODO, verificar depois os sons.
			} else {
				const im = this.#buildImageObject(changedFilePath);
				const name = fileName.slice(0, -4);
				console.log(im + ' -> ' + name);
				console.log(typeof im, typeof name);
				console.log(this.images);
				console.log(typeof this.images);
			}
		}
	}

	isImagesLoadCompleted() {
		for (const imageName in this.images) {
			if (!this.images[imageName].complete) {
				return false;
			}
		}

		return true;
	}
}

const assetManager = new AssetManager();
export default assetManager;
