const moment = require('moment')

function getTime(date) {
  return moment({h: moment(date).hours(), m: moment(date).minutes()})
}

module.exports = {
  getTime
}
