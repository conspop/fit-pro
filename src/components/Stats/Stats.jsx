import React from 'react'
import './Stats.css'

function getClassesAndIncome(schedule) {
  let classes = 0
  let income = 0
  console.log(schedule)
  schedule.forEach(day => {
    day[1].forEach(item => {
      if (item.status !== 'cancel') {
        classes ++
        if (item.rate) {
          income += item.rate
        } else {
          income += (item.base + item.perHead * item.heads)
        }
      }
    })
  })
  
  return (
    <>
      <div className="stats-box">
        <div>{classes} classes</div>
      </div>  
      <div className="stats-box">
        <div>${income}</div>
      </div>
    </>
  )
}

function Stats({schedule}) {
  return (
    <div className='page-container stats-grid'>
      {schedule ? getClassesAndIncome(schedule) : ''}
    </div>
  )
}

export default Stats