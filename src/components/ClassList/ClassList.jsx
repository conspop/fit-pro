import React from 'react'
import ClassListDate from '../ClassListDate/ClassListDate'
import ClassListItem from '../ClassListItem/ClassListItem'
import moment from 'moment'

function ClassList(props) {
  return (
    <div className='component'>
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
                rate={`$${listItem.rate ? listItem.rate : (listItem.base + listItem.perHead * listItem.estimate)}`}
                contract={listItem}
              />
            )}
          </>
        )
      })}
    </div>
  )
}

export default ClassList