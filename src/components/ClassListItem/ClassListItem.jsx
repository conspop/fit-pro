import React from 'react'


function ClassListItem() {
  return (
    <div className='component'>
      <table>
        <tbody>
          <tr>
            <td>ALIVE</td>
            <td>Flow</td>
            <td>10-11am</td>
            <td>$50</td>
            <td><button>Taught</button></td>
            <td><button>Cancelled</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ClassListItem