import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header({user, handleLogout}) {
  const auth = user ?
    <div className='header-auth'>
        Hi {user.username}!&nbsp;&nbsp;&nbsp;
        <Link to='' onClick={handleLogout}>Log Out</Link>
    </div>
    :
    <div className='header-auth'>
      <Link to='/login'>Log In</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup'>Sign Up</Link>
    </div>;

  return (
    <div className='header-container'>
      <div className='header-logo'>
        FITPRO
      </div>
      {auth}
    </div>
  )
}

export default Header