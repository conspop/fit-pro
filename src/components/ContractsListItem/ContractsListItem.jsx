import React from 'react'

function ContractsListItem({studio, style, time, classLength, rateType, rate}) {
  return (
    <div className='component'>
      <table>
        <tbody>
          <tr>
            <td>{studio}</td>
            <td>{style}</td>
            <td>{time}</td>
            <td>{classLength}</td>
            <td>{rateType}</td>
            <td>{rate}</td>
            <td><button>Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ContractsListItem