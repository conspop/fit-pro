import {Component} from 'react'
import ContractsListDate from '../ContractsListDate/ContractsListDate'
import ContractsListItem from '../ContractsListItem/ContractsListItem'
import moment from 'moment'
import './ContractsList.css'


class ContractsList extends Component {  
  state = {
    contractToggle: 'active'
  }

  handleToggle = (event) => {
    this.setState({contractToggle: event.currentTarget.className})
  }

  includeThisDay = (items, toggle) => {
    const currentDate = new Date()
    let result = false
    console.log(items)
    items.forEach(item => {
      if (this.includeThisContract(item.endDate, toggle)) {
        result = true
      }
    })
    return result
  }

  includeThisContract = (endDate, toggle) => {
    const currentDate = new Date()
    if (toggle === 'active') {
      if (endDate) {
        return !moment(endDate).isBefore(moment(currentDate))
      } else {
        return true
      }
    }
    if (toggle === 'inactive') {
      if (endDate) {
        return moment(endDate).isBefore(moment(currentDate))
      } else {
        return false
      }
    } else {
      return true
    }
  }
  
  render() {
    return (
      <>
        <div className='page-container no-border'>
          <div className='contract-single-toggle'>
            <div 
              className='active'
              onClick={this.handleToggle}
              style={this.state.contractToggle === 'active' ? {fontWeight:700} : {}}
            >
              Active
            </div>
            &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <div 
              className='inactive'
              onClick={this.handleToggle}
              style={this.state.contractToggle === 'inactive' ? {fontWeight:700} : {}}
            > 
              Inactive
            </div>
          </div>
        </div>
        <div className='page-container list'>
          {this.props.contractsList.map((listDay,dayIdx) => {
            return (
              this.includeThisDay(listDay[1], this.state.contractToggle) ?
              <>
                <ContractsListDate listDay={listDay[0]} />
                {listDay[1].map((listItem,itemIdx) => {
                  return (
                    this.includeThisContract(listItem.endDate, this.state.contractToggle) ?
                    <ContractsListItem
                      contractToggle={this.state.contractToggle}
                      dayIdx={dayIdx}
                      itemIdx={itemIdx}
                      studio={listItem.studio}
                      style={listItem.style}
                      time={moment(listItem.time).format('h:mma')}
                      classLength={`${listItem.classLength} min`}
                      rateType={`${listItem.rate ? 'Flat Rate' : 'Per Head'}`}
                      rate={
                        listItem.rate ?
                        `($${listItem.rate})` :
                        `($${listItem.base}+$${listItem.perHead}x${listItem.estimate}=$${listItem.base+listItem.perHead*listItem.estimate})`
                      }
                      contract={listItem}
                      handleUpdateContract={this.props.handleUpdateContract}
                      handleDeleteContract={this.props.handleDeleteContract}
                    />
                    :
                    ''
                )})}
              </>
              :
              ''
            )
          })}
        </div>
      </>
    )
  }
}

export default ContractsList