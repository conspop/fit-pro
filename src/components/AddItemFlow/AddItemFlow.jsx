import { Component } from 'react'
import Studio from './flow/Studio'

const flow = [
  <Studio />
]

class AddItemFlow extends Component {
  render() {
    return (
      <div>
        {flow[0]}
      </div>
    )
  }
}

export default AddItemFlow