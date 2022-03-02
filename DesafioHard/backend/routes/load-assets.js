const router = require('express').Router();
const assets = require('../controllers/modules/AssetLoader.js');

//FIX-IT: ADD AssetLoader HERE
router.get('/', (req, res) => {
	res.send(assets);
});

module.exports = router;
