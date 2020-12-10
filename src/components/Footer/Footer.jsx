import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const currentNavTextStyle = {
  fontWeight: 700,
}

const currentNavBoxStyle = {
  borderWidth: '4px',
  borderTopStyle: 'solid',
  borderColor: '#FDFAEC'

}

function Footer(props) {
  return (
    <div className='bottom-nav'>
      <div className='bottom-nav-item' style={props.location.pathname === '/schedule' ? currentNavBoxStyle : {}}>
        <Link 
          to='/schedule'
          style={props.location.pathname === '/schedule' ? currentNavTextStyle : {}}
        >
          View Schedule
        </Link>
      </div>
      <div className='bottom-nav-item' style={props.location.pathname === '/contracts' ? currentNavBoxStyle : {}}>
        <Link 
          to='/contracts'
          style={props.location.pathname === '/contracts' ? currentNavTextStyle : {}}
        >
          Weekly Classes
        </Link>
      </div>
      <div className='bottom-nav-item' style={props.location.pathname === '/add' ? currentNavBoxStyle : {}}>
        <Link 
          to='/add'
          style={props.location.pathname === '/add' ? currentNavTextStyle : {}}
        >
          Add Classes
        </Link>
      </div>
      <div className='bottom-nav-item' style={props.location.pathname === '/invoice' ? currentNavBoxStyle : {}}>
        <Link 
          to='/invoice'
          style={props.location.pathname === '/invoice' ? currentNavTextStyle : {}}
        >
          Create Invoices
        </Link>
      </div>
    </div>
  )
}

export default Footer