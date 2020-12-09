import {Component} from 'react'
import './ContractsListItem.css'
import moment from 'moment'
import {DatePicker, Space, Input} from 'antd'

const dateFormat = 'M/D/YY'

class ContractsListItem extends Component {
  state = {
    message: '',
    showOptions: true,
    showUpdateEndDate: false,
    newEndDate:'',
    openCalendar: false,
    showUpdateEstimate: false,
    newEstimate:'',
    showConfirmDelete: false
  }

  handleClick = (event) => {
    const buttonClicked = event.currentTarget.className 
    if (buttonClicked === 'undo') {
      this.setState({
        message: '',
        showOptions: true,
        showUpdateEndDate: false,
        newEndDate: '',
        openCalendar: false,
        showUpdateEstimate: false,
        showConfirmDelete: false,
      })
    } else if (buttonClicked === 'end-date') {
      this.setState({
        showOptions: false,
        showUpdateEndDate: true,
        openCalendar: true,
        message: 'Choose a new end date for this contract'
      })
    } else if (buttonClicked === 'estimate') {
      this.setState({
        message: 'Choose a new estimated number of heads',
        showOptions: false,
        showUpdateEstimate: true,
      })
    } else if (buttonClicked === 'delete') {
      this.setState({
        message: 'Deleting a contract is permanent. If this contracts is ending, change the end date instead of deleting the contract entirely.',
        showOptions: false,
        showConfirmDelete: true,
      })
    } else if (buttonClicked === 'confirm-end-date') {
      console.log('process started')
      this.props.handleUpdateContract(
        this.props.contract._id, 
        'confirm-end-date', 
        this.state.newEndDate, 
        this.props.dayIdx, 
        this.props.itemIdx 
      )
    } else if (buttonClicked === 'confirm-estimate') {
      this.props.handleUpdateContract(
        this.props.contract._id, 
        'confirm-estimate', 
        this.state.newEstimate, 
        this.props.dayIdx, 
        this.props.itemIdx 
      )
    }
  }

  handleNewEndDateChange = (date) => {
    this.setState({
      newEndDate: date,
      openCalendar: false
    })
  }

  handleEstimateChange = (event) => {
    this.setState({
      newEstimate: event.currentTarget.value
    })
  }

  handleClickDateField = () => {
    this.setState({openCalendar:true})
  }
  
  render() {
    const {studio, style, time, classLength, rateType, rate, contract} = this.props
    return (
      <div className='contract-list-item'>
        {
          this.state.message ?
          <div className='message'>{this.state.message}</div> :
          ''
        }
        <div className='timeframe'>{moment(contract.startDate).format('l')} to {moment(contract.endDate).format('l') === 'Invalid date' ? '∞' : moment(contract.endDate).format('l')}</div>
        <div className='style-and-studio'>{style} @ {studio}</div>
        <div className='time'>{time}&nbsp;({classLength})</div>
        <div className='rate'>{rateType} {rate}</div>
        <div className='options'>
          {
            this.state.showOptions ?
            <>
              <button 
                className='end-date'
                onClick={this.handleClick}
              >
                End Date
              </button>
              <button 
                className='estimate'
                onClick={this.handleClick}
              >
                Estimate
              </button>
              <button 
                className='delete'
                onClick={this.handleClick}
              >
                Delete
              </button>
            </>
            :
            ''
          }
          {
            this.state.showUpdateEndDate ?
            <>
              <button 
                className='undo'
                onClick={this.handleClick}
              >
                Back
              </button>
              <Space direction="vertical" size={12}>
                <DatePicker
                  onChange={this.handleNewEndDateChange}
                  onClick={this.handleClickDateField}
                  value={this.state.newEndDate}
                  allowClear={false}
                  placeholder={''}
                  suffixIcon={''}
                  open={this.state.openCalendar}
                  format={dateFormat}
                />
              </Space>
              <button 
                className='confirm-end-date'
                onClick={this.handleClick}
              >
                Confirm
              </button>
            </>
            :
            ''
          }
          {
            this.state.showUpdateEstimate ?
            <>
              <button 
                className='undo'
                onClick={this.handleClick}
              >
                Back
              </button>
              <Input 
                className='heads-input'
                onChange={this.handleEstimateChange}
                value={this.state.newEstimate}
                autoFocus={true}
              />
              <button 
                className='confirm-estimate'
                onClick={this.handleClick}
              >
                Confirm
              </button>
            </>
            :
            ''
          }
          {
            this.state.showConfirmDelete ?
            <>
              <button 
                className='undo'
                onClick={this.handleClick}
              >
                Back
              </button>
              <button 
                className='confirm-delete'
                onClick={this.handleClick}
              >
                Confirm Delete
              </button>
            </>
            :
            ''
          }
        </div>
      </div>
    )
  }
}

export default ContractsListItem