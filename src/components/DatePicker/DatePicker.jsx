import React from 'react'

class DatePicker extends React.Component {
  render() {
    return (
      <div className='component'>
        <div>
          Current / Previous / Custom
        </div>
        <div>
          <input value='12/1/20' /> to <input value='12/31/20' />
        </div>
      </div>
    )
  }
}

export default DatePicker