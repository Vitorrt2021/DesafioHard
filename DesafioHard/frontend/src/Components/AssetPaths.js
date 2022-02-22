class AssetPaths {
	constructor() {
		this.paths = [];
	}

	loadDoc(directory) {
		$.get(directory)
			.done((res) => this.parsePaths(res, directory))
			.fail((error) => console.error(error));
	}

	parsePaths(xml, directory) {
		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(xml, 'text/html');
		const preList = htmlDoc
			.getElementsByTagName('pre')[0]
			.getElementsByTagName('a');

		for (let i = 1; i < preList.length; i++) {
			this.paths.push(directory + preList[i].innerHTML);
		}
	}

	getAssetPaths() {
		return this.paths;
	}
}

const paths = () => {
	const assetPaths = new AssetPaths();

	assetPaths.loadDoc('/assets/audios/');
	assetPaths.loadDoc('/assets/explosions/');
	assetPaths.loadDoc('/assets/images/');
	assetPaths.loadDoc('/assets/monsters/robot/');
	assetPaths.loadDoc('/assets/monsters/slimeGreen/');
	assetPaths.loadDoc('/assets/monsters/slimePink/');
	assetPaths.loadDoc('/assets/monsters/toad/');
	assetPaths.loadDoc('/assets/projectiles/');
	assetPaths.loadDoc('/assets/towers/');

	return assetPaths.getAssetPaths();
};

export default paths();
