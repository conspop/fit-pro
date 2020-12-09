import React from 'react'
import ContractsListDate from '../ContractsListDate/ContractsListDate'
import ContractsListItem from '../ContractsListItem/ContractsListItem'
import moment from 'moment'


function ContractsList(props) {  
    
  return (
    <div className='page-container list'>
      {props.contractsList.map((listDay,dayIdx) => {
        return (
          <>
            <ContractsListDate listDay={listDay[0]} />
            {listDay[1].map((listItem,itemIdx) =>
              <ContractsListItem
                dayIdx={dayIdx}
                itemIdx={itemIdx}
                studio={listItem.studio}
                style={listItem.style}
                time={moment(listItem.time).format('h:mma')}
                classLength={`${listItem.classLength} min`}
                rateType={`${listItem.rate ? 'Flat Rate' : 'Per Head'}`}
                rate={
                  listItem.rate ?
                  `($${listItem.rate})` :
                  `($${listItem.base}+$${listItem.perHead}x${listItem.estimate}=$${listItem.base+listItem.perHead*listItem.estimate})`
                }
                contract={listItem}
                handleUpdateContract={props.handleUpdateContract}
                handleDeleteContract={props.handleDeleteContract}
              />
            )}
          </>
        )
      })}
    </div>
  )
}

export default ContractsList