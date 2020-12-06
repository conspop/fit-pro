import React from 'react'
import { DatePicker as DatePickerComponent, Space} from 'antd';
import ('./DatePicker.css')

const { RangePicker } = DatePickerComponent;

class DatePicker extends React.Component {
  onChange = (dates) => {
    this.props.handleDatesChange(dates)
  }
  
  render(props) {
    return (
      <div className='component'>
        <div>
          Current / Previous / Custom
        </div>
        <div>
        <Space direction="vertical" size={12}>
          <RangePicker 
            onChange={this.onChange}
            value={[this.props.startDate, this.props.endDate]}
          />
        </Space>
        </div>
      </div>
    )
  }
}

export default DatePicker