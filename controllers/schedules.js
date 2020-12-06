const moment = require('moment')
const dateHelpers = require('../expressutils/dateHelpers')

const User = require('../models/user');
const Single = require('../models/single')

module.exports = {
  show
};

async function show(req, res) {
  const timeframeStartDate = moment(req.query.startDate);
  const timeframeEndDate = moment(req.query.endDate);
  const id = req.user._id;

  const schedule = [];
  
  // get array of singles within timeframe
  const {singles} = await getSingles(timeframeStartDate, timeframeEndDate, id)
  // get array of contracts whose start date is before the timeframe's end date
  const {contracts} = await getContracts(timeframeStartDate, timeframeEndDate, id)

  //push singles to schedule array
  singles.forEach(single => schedule.push(single))

  //loop through contracts and push instances of contract to schedule array
  contracts.forEach(contract => {
    console.log(contract)
    console.log(contract._id)
    const dateInstance = moment(contract.startDate)
    while (dateInstance.isBefore(timeframeStartDate)) {
      dateInstance.add(7, 'days')
    }
    while (dateInstance.isBefore(timeframeEndDate)) {
      const {studio, style, time, classLength, rate, base, perHead, estimate, _id} = contract
      const contractInstance = {
        studio,
        style,
        time,
        classLength,
        rate,
        base,
        perHead,
        estimate,
        date: dateInstance,
        contractId: _id
      }
      schedule.push(contractInstance)
      dateInstance.add(7, 'days')
    }
  })

  console.log(schedule)

  res.json(schedule)

}

function getSingles(startDate, endDate, id) {
  return User.
    findById(id).
    populate({
      path: 'singles',
      match: {date: {$gte: startDate, $lte: endDate}}
    })
}

function getContracts(startDate, endDate, id) {
  return User.
    findById(id).
    populate({
      path: 'contracts',
      match: {startDate: {$lte: endDate}}
    })
}



