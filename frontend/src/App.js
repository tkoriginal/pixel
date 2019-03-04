import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

class App extends Component {
  state = {
    id: undefined,
    name: undefined,
    email: undefined,
    robots: []
  }

  successfulLogin = (userData) => {
    this.setState(userData)
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={(routeProps) => (<Home {...routeProps} userInfo={this.state}/>)}/>
          <Route exact path='/login' render={(routeProps) => (<Login {...routeProps} successfulLogin={this.successfulLogin}/>)}/>
        </Switch>
      </div>
    )
  }
}

export default App;
