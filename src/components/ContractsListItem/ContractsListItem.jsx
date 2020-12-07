import React from 'react'
import './ContractsListItem.css'

function ContractsListItem({studio, style, time, classLength, rateType, rate}) {
  return (
    <div className='class-list-item'>
      <div className='style-and-studio'>{style} @ {studio}</div>
      <div className='time'>{time}&nbsp;({classLength})</div>
      <div className='rate'>{rateType} {rate}</div>
      <div className='taught'>?</div>
      <div className='cancel'>-</div>
    </div>
  )
}

export default ContractsListItem