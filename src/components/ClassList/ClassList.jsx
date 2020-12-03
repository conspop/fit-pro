import React from 'react'
import ClassListDate from '../ClassListDate/ClassListDate'
import ClassListItem from '../ClassListItem/ClassListItem'


function ClassList() {
  return (
    <div className='component'>
      <ClassListDate />
      <ClassListItem />
      <ClassListItem />
      <ClassListItem />
    </div>
  )
}

export default ClassList