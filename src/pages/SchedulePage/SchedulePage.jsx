import React from 'react'
import DatePicker from '../../components/DatePicker/DatePicker'
import Stats from '../../components/Stats/Stats'
import ClassList from '../../components/ClassList/ClassList'

function SchedulePage () {
  return (
    <div className='component'>
      <DatePicker />
      <Stats />
      <ClassList />
    </div>
  )
}

export default SchedulePage