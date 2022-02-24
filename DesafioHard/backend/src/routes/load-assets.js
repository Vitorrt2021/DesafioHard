const assetLoader = require('../modules/AssetLoader.js');
const router = require('express').Router();

//FIX-IT: ADD AssetLoader HERE
router.get('/', (req, res) => {
	res.send(assetLoader);
});

module.exports = router;
