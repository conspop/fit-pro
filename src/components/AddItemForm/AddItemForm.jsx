import { Component } from 'react'
import './AddItemForm.css'
import apiService from '../../utils/apiService'
import { DatePicker, Space, TimePicker, Input } from 'antd';

class AddItemForm extends Component {
  state = {
    isContract: false,
    isFlatRate: true,
    isEndDate: false,
    studio:'',
    style:'',
    startDate:'',
    endDate:'',
    date:'',
    time:'',
    classLength:'',
    rate:'',
    base:'',
    perHead:'',
    estimate:''
  }

  clearState() {
    this.setState({
      isContract: false,
      isFlatRate: true,
      isEndDate: false,
      studio:'',
      style:'',
      startDate:'',
      endDate:'',
      date:'',
      time:'',
      classLength:'',
      rate:'',
      base:'',
      perHead:'',
      estimate:''
    })
  }

  handleToggle = (event) => {
    const choice = event.target.textContent
    if (choice === 'Weekly') {
      this.setState({isContract:true})
    } else if (choice === 'One-Time') {
      this.setState({isContract:false})
    } else if (choice === 'Flat Rate') {
      this.setState({isFlatRate:true})
    } else if (choice === 'Per Head') {
      this.setState({isFlatRate:false})
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.id]:event.target.value})
  }

  handleSubmit = async () => {
    const details = {...this.state}
    console.log('before augment:', details)
    // if flat rate, remove variable rate fields. if not, remove flat rate.
    if (details.isFlatRate) {
      delete details.base
      delete details.perHead
      delete details.estimate
    } else {
      delete details.rate
    }
    // if contract, delete single date and post to db. if single, delete start and end date and post to db.
    if (details.isContract) {
      delete details.date
      await apiService.addContract(details);
    } else {
      console.log('single!')
      delete details.startDate
      delete details.endDate
      console.log('before single: ',details)
      await apiService.addSingle(details);
    }
    this.clearState();
  }

  handleDateChange = (date) => {
    this.setState({date:date})
  }

  handleStartDateChange = (date) => {
    this.setState({startDate:date})
  }

  handleEndDateChange = (date) => {
    this.setState({endDate:date})
  }

  handleTimeChange = (time) => {
    this.setState({time:time})
  }
  
  render() {
    const {isContract, isFlatRate, studio, style, classLength, rate, base, perHead, estimate, time, date, startDate, endDate} = this.state
    return (
      <div className='add-item-form'>

        <div className='page-container'>
          <div>Studio</div>
          <div><Input id='studio' value={studio} onChange={this.handleChange} /></div>
          <div>Style</div>
          <div><Input id='style' value={style} onChange={this.handleChange} /></div>
        </div>

        <div className='page-container'>

          <div className='contract-single-toggle'>
            <div 
              onClick={this.handleToggle}
              style={!this.state.isContract ? {fontWeight:700} : {}}
            >
              One-Time
            </div>
            &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <div 
              onClick={this.handleToggle}
              style={this.state.isContract ? {fontWeight:700} : {}}
            > 
              Weekly
            </div>
          </div>

          {isContract ?
          
          <div className='date-selector'>
            <div className='start-date'>
              <div>
                Start date
              </div>
              <div> 
                <Space direction="vertical">
                  <DatePicker
                    onChange={this.handleStartDateChange} 
                    value={startDate}
                  />
                </Space>
              </div>
            </div>  
            <div className='end-date'>
              <div>
                End date?
              </div>
              <div>
                <Space direction="vertical">
                  <DatePicker 
                    onChange={this.handleEndDateChange} 
                    value={endDate}
                  />
                </Space>
              </div>
            </div>
          </div>
          :
          <div className='date-selector'>
            <div className='start-date'>
              <div>
                Date
              </div>
              <div>
                <Space direction="vertical">
                  <DatePicker 
                    onChange={this.handleDateChange} 
                    value={date}
                  />
                </Space>
              </div>
            </div>
          </div>
          }
          <div className='time-selector'>
            <div className='time'>
              <div>
                Time
              </div>
              <TimePicker 
                use12hours
                format="h:mm a"
                minuteStep={15}
                onChange={this.handleTimeChange}
                value={time}
              />
            </div>
            <div className='class-length'>
              <div>Length:</div>
              <div><Input id='classLength' value={classLength} onChange={this.handleChange} /></div>
            </div>
          </div>
        </div>

        <div className='page-container'>
          <div className='contract-single-toggle'>
            <div 
              onClick={this.handleToggle}
              style={this.state.isFlatRate ? {fontWeight:700} : {}}
            >
              Flat Rate
            </div>
            &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <div 
              onClick={this.handleToggle}
              style={!this.state.isFlatRate ? {fontWeight:700} : {}}
            >
              Per Head
            </div>
          </div>
          {isFlatRate ?
          <div className='rate-selector'>
            <div>
              <div>Rate</div>
              <div><Input id='rate' value={rate} onChange={this.handleChange} /></div>
            </div>
          </div>
          :
          <div className='rate-selector'>
            <div>
              <div>Base</div>
              <div><Input id='base' value={base} onChange={this.handleChange} /></div>
            </div>
            <div> 
              <div>Per Head</div>
              <div><Input id='perHead' value={perHead} onChange={this.handleChange} /></div>
            </div>
            <div>   
              <div>Estimate</div>
              <div><Input id='estimate' value={estimate} onChange={this.handleChange} /></div>
            </div>
          </div>
          }
        </div>
        <div className='button-container'>
          <button className='add-button' onClick={this.handleSubmit}>Add Contract</button>
        </div>

      </div>
    )
  }
}

export default AddItemForm