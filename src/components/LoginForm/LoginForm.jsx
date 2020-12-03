import React from 'react'
import './LoginForm.css'
import userService from '../../utils/userService'

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
      <div className='login-form'>
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
          Login
        </button>
      </div>
    )
  }
}

export default LoginForm