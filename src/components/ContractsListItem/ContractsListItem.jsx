import {Component} from 'react'
import './ContractsListItem.css'
import moment from 'moment'

class ContractsListItem extends Component {
 
  render() {
    const {studio, style, time, classLength, rateType, rate, contract} = this.props
    return (
      <div className='contract-list-item'>
        <div className='timeframe'>{moment(contract.startDate).format('l')} to {moment(contract.endDate).format('l') === 'Invalid date' ? '∞' : moment(contract.endDate).format('l')}</div>
        <div className='style-and-studio'>{style} @ {studio}</div>
        <div className='time'>{time}&nbsp;({classLength})</div>
        <div className='rate'>{rateType} {rate}</div>
        <div className='options'>
          <button 
            className='delete'
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default ContractsListItem