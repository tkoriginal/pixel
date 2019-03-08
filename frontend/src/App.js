import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ChooseRobot from './components/_ChooseRobot';
import Combat from './components/_Combat';
class App extends Component {
  state = {
    id: undefined,
    name: undefined,
    email: undefined,
    robots: [],
    battleRobot: undefined,
    hallOfFame: undefined
  }
  updateChosenBattleRobot = (robot) => {
    this.setState({battleRobot:robot})
  }
  successfulLogin = (userData) => {
    this.setState(userData)
  }
  handleLogout = () => {
    this.setState({id: undefined, name:undefined, email: undefined})
  }
  updateRobotInfo = (robots) => {
    console.log(this);
    console.log(robots)
    this.setState({robots: robots})
  }
  
  updateHallOfFame = () => {
    fetch('/hall-of-fame')
      .then(res => res.json())
      .then(res => this.setState({hallOfFame: res}))
  }

  componentDidMount() {
    this.updateHallOfFame();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' 
            render={(routeProps) => (
              <Home {...routeProps} 
                handleLogout={this.handleLogout}
                userInfo={this.state} 
                updateRobotInfo={this.updateRobotInfo}
                updateChosenBattleRobot={this.updateChosenBattleRobot}
                hallOfFame={this.state.hallOfFame}
                updateHallOfFame = {this.updateHallOfFame}
              />
            )}
          />
          <Route 
            exact path='/login' 
            render={(routeProps) => (
              <Login {...routeProps} 
                successfulLogin={this.successfulLogin}
              />
            )}
          />
          <Route 
            exact path='/registration' 
            render={(routeProps) => (
              <Registration {...routeProps} 
                successfulLogin={this.successfulLogin}
              />
            )}
          />
          <Route exact path='/choose-robot' 
            render={(routeProps) => (
              <ChooseRobot {...routeProps} 
                userInfo={this.state} 
                updateRobotInfo={this.updateRobotInfo} 
                successfulLogin={this.successfulLogin}
              />
            )}
          />
          <Route exact path='/combat'
            render={(routeProps) => (
              <Combat {...routeProps}
                userInfo={this.state}
                user_id={this.state.id}
                battleRobot={this.state.battleRobot}
                updateRobotInfo={this.updateRobotInfo}
              />
            )}
          />

        </Switch>
      </div>
    )
  } 
}

export default App;
