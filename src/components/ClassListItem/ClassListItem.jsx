import {Component} from 'react'
import './ClassListItem.css'

class ClassListItem extends Component {
  statusColor(status) {
    if (status === 'taught') {
      return {backgroundColor: '#80C080'}
    } else if (status === 'cancel') {
      return {backgroundColor: '#FF8080'}
    }
  }

  handleTaughtClick = async (event) => {
    await this.props.handleStatusChange(
      event.currentTarget.dataset.dayidx,
      event.currentTarget.dataset.itemidx,
      event.currentTarget.dataset.type,
      event.currentTarget.dataset.id,
      event.currentTarget.dataset.status,
      event.currentTarget.dataset.date,
      event.currentTarget.dataset.rate
    )
  }
  
  render() {
    const {studio, style, time, classLength, rateType, rate, contract, dayIdx, itemIdx, type, id, status} = this.props
    return (
      <div 
        className='class-list-item'
        style={this.statusColor(status)}
      >
        <div className='style-and-studio'>{style} @ {studio}</div>
        <div className='time'>{time}&nbsp;({classLength})</div>
        <div className='rate'>{rateType} {rate}</div>
        <div className='options'>
          {
            status === 'taught' || status === 'cancel' ?
            <button
                className='nostatus'
                data-dayidx={dayIdx}
                data-itemidx={itemIdx}
                data-type={type}
                data-id={id}
                data-status='nostatus'
                data-date={contract.date}
                data-rate={rate}
                onClick={this.handleTaughtClick}
              >
                Undo
            </button>
            :
            <>  
              <button
                className='taught'
                data-dayidx={dayIdx}
                data-itemidx={itemIdx}
                data-type={type}
                data-id={id}
                data-status='taught'
                data-date={contract.date}
                onClick={this.handleTaughtClick}
              >
                Taught
              </button>
              <button
                className='cancel'
                data-dayidx={dayIdx}
                data-itemidx={itemIdx}
                data-type={type}
                data-id={id}
                data-status='cancel'
                data-date={contract.date}
                onClick={this.handleTaughtClick}
              >
                Cancelled
              </button>
            </>
          }
        </div>
        
      </div>
    )
  } 
}

export default ClassListItem