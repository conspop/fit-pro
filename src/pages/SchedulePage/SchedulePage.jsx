import { Component } from 'react'
import DatePicker from '../../components/DatePicker/DatePicker'
import Stats from '../../components/Stats/Stats'
import ClassList from '../../components/ClassList/ClassList'
import apiService from '../../utils/apiService'
import moment from 'moment'

class  SchedulePage extends Component {
  state = {
    startDate: moment('12-1-20'),
    endDate: moment('12-31-20'),
    schedule: '',
    numClasses: '',
    projectedIncome: ''
  }

  handleDatesChange = async (dates) => {
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      schedule: await apiService.getSchedule(dates[0], dates[1])
    })
  }

  componentDidMount = async () => {
    const {schedule, numClasses, projectedIncome} = await apiService.getSchedule(this.state.startDate, this.state.endDate)
    this.setState({schedule, numClasses, projectedIncome})
  }

  render() {
    return (
      <div>
        <DatePicker 
          handleDatesChange={this.handleDatesChange} 
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
        <Stats 
          numClasses={this.state.numClasses}
          projectedIncome={this.state.projectedIncome}
        />
        {this.state.schedule !== '' ? <ClassList schedule={this.state.schedule} /> : ''}
      </div>
    )
  }
}

export default SchedulePage