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
	'..\\assets\\explosions\\Explosion_A.png',
	'..\\assets\\explosions\\Explosion_B.png',
	'..\\assets\\explosions\\Explosion_C.png',
	'..\\assets\\explosions\\Explosion_D.png',
	'..\\assets\\explosions\\Explosion_E.png',
	'..\\assets\\explosions\\Explosion_F.png',
	'..\\assets\\explosions\\Explosion_G.png',
	'..\\assets\\explosions\\Explosion_H.png',
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
	console.log(imagePath);
	const image = new Image();
	image.src = imagePath;
	console.log(image);
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
			const lastElement = split[split.length - 1];
			const fileExtension = lastElement.slice(-3);

			if (fileExtension === 'mp3') {
				this.sounds[lastElement] = {}; //TODO, verificar depois os sons.
			} else {
				this.images[lastElement] = buildImageObject(filePath);
			}
		}
	}
}

export default AssetManager;
