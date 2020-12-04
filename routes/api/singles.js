const express = require('express');
const router = express.Router();
const singlesCtrl = require('../../controllers/singles');

router.post('/', singlesCtrl.create);

module.exports = router;