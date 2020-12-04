import React from 'react'
import ClassListDate from '../ClassListDate/ClassListDate'
import ClassListItem from '../ClassListItem/ClassListItem'
import ContractsListDate from '../ContractsListDate/ContractsListDate'


function ClassList({contractsList}) {
  const display = Object.keys(contractsList).map(day => {
    <ContractsListDate day={day} />
  })
  
  return (
    <div className='component'>
      {display}
    </div>
  )
}

export default ClassList