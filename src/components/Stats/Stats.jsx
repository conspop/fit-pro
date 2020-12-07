import React from 'react'
import './Stats.css'

function Stats({numClasses, projectedIncome}) {
  return (
    <div className='page-container stats-grid'>
      <div>Classes: {numClasses}</div>
      <div>Income: ${projectedIncome}</div>
    </div>
  )
}

export default Stats