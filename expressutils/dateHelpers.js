const moment = require('moment')

function getTime(date) {
  return moment({h: moment(date).hours(), m: moment(date).minutes()})
}

function dateIsIncluded(date, arrayOfDates) {
  const index = arrayOfDates.findIndex(dateInArray => {
    return moment(dateInArray).isSame(moment(date))
  })
  return index >= 0 ? true : false
}

module.exports = {
  getTime,
  dateIsIncluded
}
