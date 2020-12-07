import React from 'react'

function Stats({numClasses, projectedIncome}) {
  return (
    <div className='component flex-h'>
      <div>
        <div>Classes:</div>
        <div>{numClasses}</div>
      </div>
      <div>
        <div>Income:</div>
        <div>${projectedIncome}</div>
      </div>
    </div>
  )
}

export default Stats