const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('hellofriend, this endpoint is under development');
});

module.exports = router;
