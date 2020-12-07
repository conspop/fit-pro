import {Component} from 'react'
import './ClassListItem.css'

class ClassListItem extends Component {
  statusColor(status) {
    if (status === 'taught') {
      return {backgroundColor: '#80C080'}
    } else if (status === 'cancelled') {
      return {backgroundColor: '#FF8080'}
    }
  }

  handleTaughtClick = (event) => {
    
    this.props.handleStatusChange(
      event.currentTarget.dataset.dayidx,
      event.currentTarget.dataset.itemidx,
      event.currentTarget.dataset.status
    )
  }
  
  render() {
    const {studio, style, time, classLength, rateType, rate, contract, dayIdx, itemIdx} = this.props
    return (
      <div 
        className='class-list-item'
        style={this.statusColor(contract.status)}
      >
        <div className='style-and-studio'>{style} @ {studio}</div>
        <div className='time'>{time}&nbsp;({classLength})</div>
        <div className='rate'>{rateType} {rate}</div>
        <button
          className='taught'
          data-dayidx={dayIdx}
          data-itemidx={itemIdx}
          data-status='taught'
          onClick={this.handleTaughtClick}
        >
          <i class="far fa-check-circle"></i>
        </button>
        <button
          className='cancel'
          data-dayidx={dayIdx}
          data-itemidx={itemIdx}
          data-status='cancel'
          onClick={this.handleTaughtClick}
        >
          <i class="far fa-times-circle"></i>
        </button>
      </div>
    )
  } 
}

export default ClassListItem