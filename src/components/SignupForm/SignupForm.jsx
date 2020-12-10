import React from 'react'
import './SignupForm.css'
import userService from '../../utils/userService'
import {Input} from 'antd'

class SignupForm extends React.Component {
  state = {
    username:'',
    password:'',
    confirmPassword:'',
    message:''
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async () => {
      try {
        await userService.signup(this.state)
        this.props.handleSignupOrLogin();
        this.props.history.push('/schedule')
      } catch (err) {
        this.setState({
          password:'',
          confirmPassword:'',
          message: err.message
        })
      }
    }
  
  isFormValid = () => {
    return (this.state.username && this.state.password !== '' && this.state.password === this.state.confirmPassword)
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
          {
            this.state.message !== '' ?
            <div className='signup-message'>{this.state.message}</div> :
            ''
          }
        </div>
        <div className="button-container">
          <button
            className='add-button'
            onClick={this.handleSubmit}
            style={this.isFormValid() ? {} : {opacity:.5}}
            disabled={
              (!this.isFormValid())
            }
          >
            Sign Up
          </button>
        </div>
      </div>
    )
  }
}

export default SignupForm