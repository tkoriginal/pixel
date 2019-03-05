import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import ChooseRobot from './components/_ChooseRobot';
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

  updateRobotInfo = (robots) => {
    console.log(this);
    console.log(robots)
    this.setState({robots: robots})
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={(routeProps) => (<Home {...routeProps} userInfo={this.state} updateRobotInfo={this.updateRobotInfo}/>)}/>
          <Route exact path='/login' render={(routeProps) => (<Login {...routeProps} successfulLogin={this.successfulLogin}/>)}/>
          <Route exact path='/choose-robot' 
            render={(routeProps) => (<ChooseRobot {...routeProps} 
            userInfo={this.state} updateRobotInfo={this.updateRobotInfo} 
            successfulLogin={this.successfulLogin}/>)}/>
        </Switch>
      </div>
    )
  } 
}

export default App;
