import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

class App extends Component {
  state = {
    name: undefined,
    email: undefined,

  }

  successfulLogin = (userData) => {
    this.setState(userData)

  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' render={(routeProps) => (<Login {...routeProps} successfulLogin={this.successfulLogin}/>)}/>
        </Switch>
      </div>
    )
  
  }
}

export default App;
