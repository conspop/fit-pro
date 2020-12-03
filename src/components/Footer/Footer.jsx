import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='component flex-h bottom-nav'>
      <div><Link to='/schedule'>Schedule</Link> / </div>
      <div><Link to='/contracts'>Contracts</Link> / </div>
      <div><Link to='/'>Invoices</Link> / </div>
      <div><Link to='/add'>Quick Add</Link></div>
    </div>
  )
}

export default Footer