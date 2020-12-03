import React from 'react'
import { Link } from 'react-router-dom'

function Header({user, handleLogout}) {
  const auth = user ?
    <div>
      {user.username}
      <Link to='' onClick={handleLogout}>LOG OUT</Link>
    </div>
    :
    <div>
      <Link to='/login'>LOG IN</Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to='/signup'>SIGN UP</Link>
    </div>;

  return (
    <div className='component'>
      {auth}
    </div>
  )
}

export default Header