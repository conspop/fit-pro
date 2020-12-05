import React from 'react'
import { DatePicker as DatePickerComponent, Space} from 'antd';
import ('./DatePicker.css')

const { RangePicker } = DatePickerComponent;

class DatePicker extends React.Component {
  state = {
    startDate: '',
    endDate: ''
  }

  onChange = (dates) => {
    console.log(dates)
    this.setState({
      startDate: dates[0],
      endDate: dates[1]
    })
  }
  
  render() {
    return (
      <div className='component'>
        <div>
          Current / Previous / Custom
        </div>
        <div>
        <Space direction="vertical" size={12}>
          <RangePicker 
            onChange={this.onChange}
            value={[this.state.startDate, this.state.endDate]}
          />
        </Space>
        </div>
      </div>
    )
  }
}

export default DatePicker