import React from 'react'
import './SignupForm.css'
import userService from '../../utils/userService'

class SignupForm extends React.Component {
  state = {
    username:'',
    password:'',
    passwordRepeat:''
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
      <div className='signup-form'>
        <label>
          Username: 
          <input 
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password: 
          <input 
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label> 
        <button
          onClick={this.handleSubmit}
        >
          Sign Up
        </button>
      </div>
    )
  }
}

export default SignupForm