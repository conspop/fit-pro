import {Component} from 'react'
import './ClassListItem.css'
import {Input} from 'antd'

class ClassListItem extends Component {
  state={
    showHeads: false,
    heads: ''
  }
  
  statusColor(status) {
    if (status === 'taught') {
      return {color: 'green'}
    } else if (status === 'cancel') {
      return {color: 'red'}
    }
  }

  handleClick = async (event) => {
    if (event.currentTarget.dataset.status === 'taught' && !this.state.showHeads && this.props.rateType !== 'Flat Rate') {
      this.setState({showHeads:true})
    } else if (event.currentTarget.id === 'undo') {
      this.setState({showHeads:false, heads:''})
    } else {
      this.setState({showHeads:false})
      await this.props.handleStatusChange(
        event.currentTarget.dataset.dayidx,
        event.currentTarget.dataset.itemidx,
        event.currentTarget.dataset.type,
        event.currentTarget.dataset.id,
        event.currentTarget.dataset.status,
        event.currentTarget.dataset.date,
        this.state.heads
      )
    }
  }

  handleStudentsChange = (event) => {
    this.setState({heads: event.target.value})
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
                onClick={this.handleClick}
              >
                Undo
            </button>
            :
            <>
              {
                this.state.showHeads ?
                <>
                  <button
                    className='taught'
                    data-dayidx={dayIdx}
                    data-itemidx={itemIdx}
                    data-type={type}
                    data-id={id}
                    data-status='taught'
                    data-date={contract.date}
                    onClick={this.handleClick}
                  >
                    Confirm
                  </button>
                  <Input 
                    className='students-input' 
                    onChange={this.handleStudentsChange}
                  />
                  <button 
                    onClick={this.handleClick}
                    id='undo'
                  >
                    Undo
                  </button>
                </>
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
                    onClick={this.handleClick}
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
                  onClick={this.handleClick}
                  >
                    Cancelled
                  </button>
                </>
              }  
            </>
          }
        </div>
        
      </div>
    )
  } 
}

export default ClassListItem