const moment = require('moment')
const dateHelpers = require('../expressutils/dateHelpers')

const User = require('../models/user');

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
    while (!dateInstance.isAfter(timeframeEndDate)) {
      const {studio, style, time, classLength, rate, base, perHead, estimate, _id, specificDates} = contract
      const foundDate = specificDates.find(specificDate => {
        return moment(specificDate.date).isSame(moment(dateInstance))
      }) 
      const status = foundDate ? foundDate.status : 'nostatus'
      const heads = foundDate ? foundDate.heads : estimate
      const contractInstance = {
        studio,
        style,
        time,
        classLength,
        rate,
        base,
        perHead,
        heads,
        status,
        date: dateInstance.clone(),
        contractId: _id
      }
      scheduleArray.push(contractInstance)
      dateInstance.add(7, 'days')
    }
  })

  // sort scheduleArray by date
  scheduleArray.sort((a, b) => {
    const aHours = moment(a.time).hours()
    const aMinutes = moment(a.time).minutes()
    const bHours = moment(b.time).hours()
    const bMinutes = moment(b.time).minutes()
    const aDateTime = moment(a.date).hours(aHours).minutes(aMinutes)
    const bDateTime = moment(b.date).hours(bHours).minutes(bMinutes)
    return moment(aDateTime).isBefore(moment(bDateTime)) ? -1 : 1
  })

  const numClasses = scheduleArray.length
  const projectedIncome = scheduleArray.reduce((sum, classInstance) => {
    if (classInstance.status !== 'cancel') {
      if (classInstance.rate) {
        return sum + classInstance.rate
      } else {
        return sum + (classInstance.base + classInstance.perHead * classInstance.heads)
      }
    } else {
      return sum
    }
  }, 0)

  // summarize schedule into dates
  let schedule = {}
  scheduleArray.forEach(scheduleItem => {
    const date = moment(scheduleItem.date).format('dddd MMMM Do, YYYY')
    if (schedule[date]) {
      schedule[date].push(scheduleItem)
    } else {
      schedule[date] = [scheduleItem]
    }
  })

  schedule = Object.entries(schedule)

  res.json({schedule, numClasses, projectedIncome})
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





