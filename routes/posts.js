const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.send('THIS WORKS');
});

module.exports = router;
