const router = require('express').Router();
const assets = require('../controllers/modules/AssetLoader.js');

router.get('/', (req, res) => {
	res.send(assets);
});

module.exports = router;
