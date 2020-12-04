import React from 'react'
import { numToDay } from '../../utils/dateHelpers'

function ContractsListDate({listDay}) {
  return (
    <div className='component'>
      {numToDay(listDay)}
    </div>
  )
}

export default ContractsListDate