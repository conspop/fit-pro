import { Component } from 'react'
import DatePicker from '../../components/DatePicker/DatePicker'
import Stats from '../../components/Stats/Stats'
import ClassList from '../../components/ClassList/ClassList'
import apiService from '../../utils/apiService'

class  SchedulePage extends Component {
  state = {
    startDate:'',
    endDate:'',
  }

  handleDatesChange = (dates) => {
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      schedule: ''
    })
  }

  componentDidUpdate = async () => {
    const schedule = await apiService.getSchedule(this.state.startDate, this.state.endDate)
    this.setState({schedule: schedule})
  }

  render() {
    return (
      <div className='component'>
        <DatePicker 
          handleDatesChange={this.handleDatesChange} 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
        <Stats />
        <ClassList />
      </div>
    )
  }
}

export default SchedulePage