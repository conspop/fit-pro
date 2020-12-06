const moment = require('moment')
const dateHelpers = require('../expressutils/dateHelpers')

const Contract = require('../models/contract');
const Single = require('../models/single')
const User = require('../models/user');

module.exports = {
  show
};

async function show(req, res) {
  console.log(moment(req.query.startDate))
}

