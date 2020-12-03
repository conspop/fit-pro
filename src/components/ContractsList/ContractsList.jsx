import React from 'react'
import ContractsListDate from '../ContractsListDate/ContractsListDate'
import ContractsListItem from '../ContractsListItem/ContractsListItem'


function ContractsList() {
  return (
    <div className='component'>
      <ContractsListDate />
      <ContractsListItem />
      <ContractsListItem />
      <ContractsListItem />
    </div>
  )
}

export default ContractsList