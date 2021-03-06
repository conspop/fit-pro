import React from 'react'
import { DatePicker as DatePickerComponent, Space} from 'antd';
import moment from 'moment'
import ('./DatePicker.css')

class DatePicker extends React.Component {
  state = {
    inputStart: this.props.startDate,
    inputEnd: this.props.endDate,
    showSelector: false
  }
  
  handleInputStartChange = (date) => {
    this.setState({inputStart: date})
  }

  handleInputEndChange = (date) => {
    this.setState({inputEnd: date})
  }

  handleUpdateDates = () => {
    this.props.handleDatesChange([this.state.inputStart, this.state.inputEnd])
    this.setState({showSelector: false})
  }

  handleOpenSelector = () => {
    this.setState(state => ({showSelector: !state.showSelector}))
  }
  
  render(props) {
    return (
      <div className='page-container no-border'>
        <div className='date-display-container'>
          <div className='date-display'>
            {this.props.startDate.format('ll')} to {this.props.endDate.format('ll')}
          </div>
          <div>
            <button onClick={this.handleOpenSelector}><i class="fas fa-chevron-down"></i></button> 
          </div>
        </div> 
        {this.state.showSelector ?
        <>
          <div className="page-container form">
            <div className='datepicker-dates-container form-child'>
              <div className='start'>
                <div>
                  Start Date
                </div>
                <Space direction="vertical" size={12}>
                  <DatePickerComponent 
                    onChange={this.handleInputStartChange}
                    id='inputStart'
                    value={moment(this.state.inputStart)}
                    allowClear={false}
                    inputReadOnly={true}
                  />
                </Space>
              </div>
              <div className='end'>
                <div>
                  End Date
                </div>
                <Space direction="vertical" size={12}>
                  <DatePickerComponent 
                    onChange={this.handleInputEndChange}
                    id='inputEnd'
                    value={moment(this.state.inputEnd)}
                    allowClear={false}
                    inputReadOnly={true}
                  />
                </Space>
              </div>
            </div>
          </div>
            <div className='button-container'>
              <button
                className='add-button'
                onClick={this.handleUpdateDates}
              >
                Update
              </button>
            </div>
        </>
        :
        <>
        </>
        }
        

      </div>
    )
  }
}

export default DatePicker