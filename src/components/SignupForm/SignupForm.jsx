import React from 'react'
import './SignupForm.css'
import userService from '../../utils/userService'
import {Input} from 'antd'

class SignupForm extends React.Component {
  state = {
    username:'',
    password:'',
    confirmPassword:''
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async () => {
      await userService.signup(this.state)
      this.props.handleSignupOrLogin();
      this.props.history.push('/schedule')
    }

  render() {
    return (
      <div className='page-container form'>
        <div className='signup-form form-child'>
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
          <label>
            Confirm Password
            <Input 
              name='confirmPassword'
              value={this.state.confirmPassword}
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
            Sign Up
          </button>
        </div>
      </div>
    )
  }
}

export default SignupForm