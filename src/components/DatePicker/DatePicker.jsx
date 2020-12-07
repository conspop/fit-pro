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
      <div className='page-container datepicker-container'>
        <div className='datepicker-quick-dates-container'>
          Current / Previous / Custom
        </div>
        <div className='datepicker-dates-container'>
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