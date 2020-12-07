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

  const scheduleArray = [];
  
  // get array of singles within timeframe
  const {singles} = await getSingles(timeframeStartDate, timeframeEndDate, id)
  // get array of contracts whose start date is before the timeframe's end date
  const {contracts} = await getContracts(timeframeStartDate, timeframeEndDate, id)

  //push singles to scheduleArray array
  singles.forEach(single => {
    const momentDate = moment(single.date).format()
    single.date = moment(single.date.toISOString())
    scheduleArray.push(single)
  })

  // loop through contracts and push instances of contract to scheduleArray array
  contracts.forEach(contract => {
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
        date: dateInstance.clone(),
        contractId: _id
      }
      scheduleArray.push(contractInstance)
      dateInstance.add(7, 'days')
    }
  })

  // sort scheduleArray by date
  scheduleArray.sort((a, b) => {
    return moment(a.date).isBefore(moment(b.date)) ? -1 : 1
  })

  // summarize schedule into dates
  const schedule = {}
  scheduleArray.forEach(scheduleItem => {
    const date = moment(scheduleItem.date).format('dddd MMMM Do, YYYY')
    if (schedule[date]) {
      schedule[date].push(scheduleItem)
    } else {
      schedule[date] = [scheduleItem]
    }
  })

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



