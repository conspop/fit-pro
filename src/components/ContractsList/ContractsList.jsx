import React from 'react'
import ContractsListDate from '../ContractsListDate/ContractsListDate'
import ContractsListItem from '../ContractsListItem/ContractsListItem'
import moment from 'moment'


function ContractsList(props) {  
    
  return (
    <div className='component'>
      {props.contractsList.map((listDay,dayIdx) => {
        return (
          <>
            <ContractsListDate listDay={listDay[0]} />
            {listDay[1].map((listItem,itemIdx) =>
              <ContractsListItem
                studio={listItem.studio}
                style={listItem.style}
                time={moment(listItem.time).format('h:ma')}
                classLength={`${listItem.classLength} min`}
                rateType={`${listItem.rate ? 'Flat Rate' : 'Per Head'}`}
                rate={`$${listItem.rate}`}
                contract={listItem}
              />
            )}
          </>
        )
      })}
    </div>
  )
}

export default ContractsList