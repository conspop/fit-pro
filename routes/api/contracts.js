const express = require('express');
const router = express.Router();
const contractsCtrl = require('../../controllers/contracts');

router.get('/', contractsCtrl.index)

router.post('/', contractsCtrl.create);

router.put('/changestatus', contractsCtrl.changeStatus)
router.put('/updatecontract', contractsCtrl.updateContract)

module.exports = router;