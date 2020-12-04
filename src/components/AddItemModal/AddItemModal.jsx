import { Component } from 'react'
import './AddItemModal.css'
import apiService from '../../utils/apiService'

class AddItemModal extends Component {
  state = {
    isContract: true,
    isFlatRate: true,
    studio:'',
    style:'',
    startDate:'',
    endDate:'',
    date:'',
    rate:'',
    base:'',
    perHead:'',
    estimate:''
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
    const contract = {...this.state}
    
    if (contract.isContract) {
      delete contract.date
    } else {
      delete contract.startDate
      delete contract.endDate
    }
    
    if (contract.isFlatRate) {
      delete contract.base
      delete contract.perHead
      delete contract.estimate
    } else {
      delete contract.rate
    }
    
    await apiService.addContract(contract);
  }
  
  render() {
    const {isContract, isFlatRate, studio, style, startDate, endDate, date, rate, base, perHead, estimate} = this.state
    return (
      <div className='add-item-form'>
        <div>Studio:</div>
        <div><input id='studio' value={studio} onChange={this.handleChange} /></div>
        <div>Style:</div>
        <div><input id='style' value={style} onChange={this.handleChange} /></div>
        
        <div className='contract-single-toggle'>
          <div onClick={this.handleToggle}>Contract</div>
          &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <div onClick={this.handleToggle}>Single</div>
        </div>
        {isContract ?
        <>
          <div>Start date:</div>
          <div><input id='startDate' value={startDate} onChange={this.handleChange}/></div>
          <div>End date:</div>
          <div><input id='endDate' value={endDate} onChange={this.handleChange} /></div>
        </>
        :
        <>
          <div>Date:</div>
          <div><input id='date' value={date} onChange={this.handleChange} /></div>
        </>
        }

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