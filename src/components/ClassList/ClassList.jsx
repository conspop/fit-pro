import React from 'react'
import ClassListDate from '../ClassListDate/ClassListDate'
import ClassListItem from '../ClassListItem/ClassListItem'
import moment from 'moment'
import './ClassList.css'

function ClassList(props) {
  return (
    <div className='page-container list'>
      {props.schedule.map((listDay,dayIdx) => {
        return (
          <>
            <ClassListDate listDay={listDay[0]} />
            {listDay[1].map((listItem,itemIdx) =>
              <ClassListItem
                studio={listItem.studio}
                style={listItem.style}
                time={moment(listItem.time).format('h:mma')}
                classLength={`${listItem.classLength} min`}
                rateType={`${listItem.rate ? 'Flat Rate' : 'Per Head'}`}
                heads={listItem.heads}
                rate={
                  listItem.rate ?
                  `($${listItem.rate})` :
                  `($${listItem.base}+$${listItem.perHead}x${listItem.heads}=$${listItem.base+listItem.perHead*listItem.heads})`
                }
                contract={listItem}
                status={listItem.status}
                itemIdx={itemIdx}
                dayIdx={dayIdx}
                type={listItem.contractId ? 'contract' : 'single' }
                id={listItem.contractId ? listItem.contractId : listItem._id}
                handleStatusChange={props.handleStatusChange}
              />
            )}
          </>
        )
      })}
    </div>
  )
}

export default ClassList