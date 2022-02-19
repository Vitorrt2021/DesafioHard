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
	'..\\assets\\monsters\\robo\\image1.svg',
	'..\\assets\\monsters\\robo\\image2.svg',
	'..\\assets\\monsters\\robo\\image3.svg',
	'..\\assets\\monsters\\robo\\image4.svg',
	'..\\assets\\monsters\\robo\\image5.svg',
	'..\\assets\\monsters\\sapo\\sapo1.svg',
	'..\\assets\\monsters\\sapo\\sapo2.svg',
	'..\\assets\\monsters\\sapo\\sapo3.svg',
	'..\\assets\\monsters\\sapo\\sapo4.svg',
	'..\\assets\\monsters\\sapo\\sapo5.svg',
	'..\\assets\\monsters\\slimeGreen\\image1.svg',
	'..\\assets\\monsters\\slimeGreen\\image2.svg',
	'..\\assets\\monsters\\slimeGreen\\image3.svg',
	'..\\assets\\monsters\\slimeGreen\\image4.svg',
	'..\\assets\\monsters\\slimeGreen\\image5.svg',
	'..\\assets\\monsters\\slimePink\\image1.svg',
	'..\\assets\\monsters\\slimePink\\image2.svg',
	'..\\assets\\monsters\\slimePink\\image3.svg',
	'..\\assets\\monsters\\slimePink\\image4.svg',
	'..\\assets\\monsters\\slimePink\\image5.svg',
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

function getFilesInsideDirectory(directory) {
	const filesArray = [];

	function readPath(directory) {
		const dirRead = fs.readdirSync(directory);

		for (const file of dirRead) {
			const absolutePath = path.join(directory, file);

			if (fs.statSync(absolutePath).isDirectory()) {
				readPath(absolutePath);
			} else {
				filesArray.push(absolutePath);
			}
		}
	}

	readPath(directory);

	console.log(filesArray);
}

function buildImageObject(imagePath) {
	const image = new Image();
	image.src = imagePath;

	return image;
}

class AssetManager {
	constructor() {
		this.images = {};
		this.sounds = {};
		// this.files = getFilesInsideDirectory('../assets');
		this.files = mainArray; //temporario, mandar funcao de ler diretorios para o servidor.

		for (const filePath of this.files) {
			const split = filePath.split('\\');
			const fileName = split[split.length - 1];
			const fileExtension = fileName.slice(-3);

			if (fileExtension === 'mp3') {
				this.sounds[fileName.slice(0, -4)] = {}; //TODO, verificar depois os sons.
			} else {
				this.images[fileName.slice(0, -4)] = buildImageObject(filePath);
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
