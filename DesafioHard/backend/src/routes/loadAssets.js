const assetLoader = require('../AssetLoader.js');
const router = require('express').Router();

router.get('/', (req, res) => {
	res.send(assetLoader);
});

module.exports = router;
