import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bottom-nav'>
      <div className='bottom-nav-item'><Link to='/schedule'>Schedule</Link></div>
      <div className='bottom-nav-item'><Link to='/contracts'>Contracts</Link></div>
      <div className='bottom-nav-item'><Link to='/'>Invoices</Link></div>
      <div className='bottom-nav-item'><Link to='/add'>Add</Link></div>
    </div>
  )
}

export default Footer