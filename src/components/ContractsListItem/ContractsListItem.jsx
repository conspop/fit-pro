import {Component} from 'react'
import {Link} from 'react-router-dom'
import './ContractsListItem.css'

class ContractsListItem extends Component {
 
  render() {
    const {studio, style, time, classLength, rateType, rate, contract} = this.props
    return (
      <div className='contract-list-item'>
        <div className='style-and-studio'>{style} @ {studio}</div>
        <div className='time'>{time}&nbsp;({classLength})</div>
        <div className='rate'>{rateType} {rate}</div>
        <Link
          className='edit'
          to='/edit'
          state={contract}
          // className='edit'
          // data-contract={contract}
          // onClick={handleEdit}
        >
          <i class="far fa-edit"></i>
        </Link>
        <button 
          className='cancel'
        >
          <i class="far fa-times-circle"></i>
        </button>
      </div>
    )
  }
}

export default ContractsListItem