import React from 'react'
import { numToDay } from '../../utils/dateHelpers'
import './ContractsListDate.css'

function ContractsListDate({listDay}) {
  return (
    <div className='contractslist-date'>
      {numToDay(listDay)}s
    </div>
  )
}

export default ContractsListDate