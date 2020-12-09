import { Component } from 'react'
import ContractsList from '../../components/ContractsList/ContractsList'
import apiService from '../../utils/apiService'

class ContractsPage extends Component {
  state = {
    contractsList:''
  }
  
  componentDidMount = async () => {
    const contractsList = await apiService.getContracts();
    this.setState({contractsList: contractsList})
  }

  handleUpdateContract = (contractId, type, value, dayIdx, itemIdx) => {
    let contractsListCopy = [...this.state.contractsList]
    let contractsListOriginal = [...contractsListCopy]
    let contractsListDayCopy = [...contractsListCopy[dayIdx]]
    let contractsListDayItemCopy = [...contractsListDayCopy[1]]
    
    console.log(value)

    if (type === 'confirm-end-date') {
      contractsListDayItemCopy[itemIdx].endDate = value
    } else if (type === 'confirm-estimate') {
      contractsListDayItemCopy[itemIdx].estimate = value
    }

    contractsListDayCopy[1] = contractsListDayItemCopy
    contractsListCopy[dayIdx] = contractsListDayCopy

    this.setState({contractsList: contractsListCopy}, apiService.updateContract(contractId, type, value, contractsListOriginal))
  }

  handleDeleteContract = (contractId, dayIdx, itemIdx) => {
    let contractsListCopy = [...this.state.contractsList]
    let contractsListOriginal = [...contractsListCopy]
    let contractsListDayCopy = [...contractsListCopy[dayIdx]]
    let contractsListDayItemCopy = [...contractsListDayCopy[1]]
    
    contractsListDayItemCopy.splice(itemIdx,1)

    contractsListDayCopy[1] = contractsListDayItemCopy
    contractsListCopy[dayIdx] = contractsListDayCopy

    this.setState({contractsList: contractsListCopy}, apiService.deleteContract(contractId, contractsListOriginal))

  }
  
  render() {
    return (
      <>
        <div className='page-container'>Active, Inactive, All contracts</div>
        <div>
          {this.state.contractsList !== '' ? 
          <ContractsList 
            contractsList={this.state.contractsList} 
            handleUpdateContract={this.handleUpdateContract}
            handleDeleteContract={this.handleDeleteContract}
          /> : ''
           }
        </div>
      </>
    )
  }
}

export default ContractsPage;