const express = require('express');
const router = express.Router();
const schedulesCtrl = require('../../controllers/schedules');

router.get('/', schedulesCtrl.show)

module.exports = router;