import moment from 'moment'

export function numToDay(dayNum) {
  const weekdays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  }

  return weekdays[dayNum]
}

export function getTime(date) {
  return moment({h: date.hours(), m: date.minutes()})
}
