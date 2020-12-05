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
  
  render() {
    return (
      <div>
        {this.state.contractsList !== '' ? <ContractsList contractsList={this.state.contractsList} /> : ''}
      </div>
    )
  }
}

export default ContractsPage;