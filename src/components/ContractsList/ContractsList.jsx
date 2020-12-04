import React from 'react'
import ContractsListDate from '../ContractsListDate/ContractsListDate'
import ContractsListItem from '../ContractsListItem/ContractsListItem'


function ContractsList(props) {  
    
  return (
    <div className='component'>
      {props.contractsList.map(listDay => {
        return (
          <>
            <ContractsListDate listDay={listDay[0]} />
            {listDay[1].map(listItem =>
              <ContractsListItem
                studio={listItem.studio}
                style={listItem.style}
                time={listItem.time}
                classLength={listItem.classLength}
                rateType={listItem.rateType}
                rate={listItem.rate}
              />
            )}
          </>
        )
      })}
    </div>
  )
}

export default ContractsList