import { Component } from 'react'
import './AddItemModal.css'
import apiService from '../../utils/apiService'
import { DatePicker, Space, TimePicker, Input } from 'antd';

class AddItemModal extends Component {
  state = {
    isContract: false,
    isFlatRate: true,
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
    if (choice === 'Contract') {
      this.setState({isContract:true})
    } else if (choice === 'Single') {
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
        <div>Studio:</div>
        <div><Input id='studio' value={studio} onChange={this.handleChange} /></div>
        <div>Style:</div>
        <div><input id='style' value={style} onChange={this.handleChange} /></div>
        
        <div className='contract-single-toggle'>
          <div onClick={this.handleToggle}>Contract</div>
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <div onClick={this.handleToggle}>Single</div>
        </div>
        {isContract ?
        <>
          <div>
            Start date:
          </div>
          <div> 
            <Space direction="vertical">
              <DatePicker
                onChange={this.handleStartDateChange} 
                value={startDate}
              />
            </Space>
          </div>
          <div>
            End date:
          </div>
          <div>
            <Space direction="vertical">
              <DatePicker 
                onChange={this.handleEndDateChange} 
                value={endDate}
              />
            </Space>
          </div>
        </>
        :
        <>
          Date:
          <Space direction="vertical">
            <DatePicker 
              onChange={this.handleDateChange} 
              value={date}
            />
          </Space>
        </>
        }
        <>
          Time:
          <TimePicker 
            use12hours
            format="h:mm a"
            minuteStep={15}
            onChange={this.handleTimeChange}
            value={time}
          />
        </>
        <div>Length:</div>
        <div><input id='classLength' value={classLength} onChange={this.handleChange} /></div>


        <div className='contract-single-toggle'>
          <div onClick={this.handleToggle}>Flat Rate</div>
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <div onClick={this.handleToggle}>Per Head</div>
        </div>
        {isFlatRate ?
        <>
          <div>Rate:</div>
          <div><input id='rate' value={rate} onChange={this.handleChange} /></div>
        </>
        :
        <>
          <div>Base:</div>
          <div><input id='base' value={base} onChange={this.handleChange} /></div>
          <div>Per Head:</div>
          <div><input id='perHead' value={perHead} onChange={this.handleChange} /></div>
          <div>Estimate:</div>
          <div><input id='estimate' value={estimate} onChange={this.handleChange} /></div>
        </>
        }

        <button onClick={this.handleSubmit}>Add Contract</button>

      </div>
    )
  }
}

export default AddItemModal