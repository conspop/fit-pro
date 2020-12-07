import './App.css';
import { Component } from 'react'
import { Switch, Route} from 'react-router-dom'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ContractsPage from './pages/ContractsPage/ContractsPage';
import AddItemForm from './components/AddItemForm/AddItemForm'
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

import userService from './utils/userService'

class App extends Component {
  state = {
    user: userService.getUser(),
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }
  
  render() {
    const {user} = this.state

    return (
      <Switch>
        <div className='app-body'>
          <Header 
            user={user} 
            handleLogout={this.handleLogout}
          />
          <Route exact path='/login' render={({history}) =>
            <div>
              <LoginPage
                handleSignupOrLogin={this.handleSignupOrLogin} 
                history={history}
              />
            </div>
          } />
          <Route exact path='/signup' render={({history}) =>
            <div>
              <SignupPage
                handleSignupOrLogin={this.handleSignupOrLogin} 
                history={history}
              />
            </div>
          } />
          <Route exact path='/schedule'>
            <div>
              <SchedulePage />
            </div>
          </Route>
          <Route exact path='/contracts'>
            <div>
              <ContractsPage />
            </div>
          </Route>
          <Route exact path='/add'>
            <div>
              <AddItemForm />
            </div>
          </Route>
          <Footer />
        </div>
      </Switch>
    )
  }
}

export default App;
