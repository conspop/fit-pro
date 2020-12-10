import React from 'react'
import './LoginForm.css'
import userService from '../../utils/userService'
import { Input } from 'antd'

class LoginForm extends React.Component {
  state = {
    username:'',
    password:'',
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async () => {
      await userService.login(this.state)
      this.props.handleSignupOrLogin();
      this.props.history.push('/schedule')
    }

  render() {
    return (
      <div className='page-container form'>
        <div className='login-form form-child'>
          <label>
            Username
            <Input 
              name='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password 
            <Input 
              name='password'
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
            />
          </label> 
        </div>
        <div className="button-container">
          <button
            className='add-button'
            onClick={this.handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default LoginForm