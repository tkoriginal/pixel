import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ChooseRobot from './components/_ChooseRobot';
import Combat from './components/_Combat';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before{
    padding: 0;
    margin:0;
    box-sizing: inherit;
  }
  html{
    font-size: 62.5%;
    font-family: 'Press Start 2P', cursive;
  }
  body{
    box-sizing: border-box;
    background: url('img/wallpaper.gif');
    background-attachment:fixed;
    background-size: cover;
    background-repeat:no-repeat
  }
  .retire-enter {
    opacity: .01;
	  transform: scaleX(0) translateX(-300px);
  }

  .retire-enter.retire-enter-active {
    opacity: 1;
    transform: scaleX(1) translateX(0);
    transition: all 500ms ease-in-out;
  }

  .retire-leave {
    opacity: 1;
	  transform: scaleX(1) translateX(0);
  }

  .retire-leave.retire-leave-active {
    opacity: .01;
    transform: translateX(-300px);
    transition: all 500ms ease-in-out
  }
  #modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
`

class App extends Component {
  state = {
    id: undefined,
    name: undefined,
    email: undefined,
    robots: [],
    battleRobot: undefined,
    hallOfFame: undefined,
    loading: true,
    loggedIn: false
  }
  updateChosenBattleRobot = (robot) => {
    this.setState({battleRobot:robot})
  }
  successfulLogin = (userData) => {
    this.setState(userData)
    this.setState({loggedIn: true})
  }
  handleLogout = () => {
    this.setState({id: undefined, name:undefined, email: undefined, loggedIn: undefined})
  }
  updateRobotInfo = (robots) => {
    console.log(this);
    console.log(robots)
    this.setState({robots: robots})
  }

  setLoading = () => {
    this.setState({loading: false})
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
        <GlobalStyle />
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
                loading={this.state.loading}
                setLoading={this.setLoading}
              />
            )}
          />
          <Route 
            exact path='/login' 
            render={(routeProps) => (
              <Login {...routeProps} 
                successfulLogin={this.successfulLogin}
                loggedIn={this.state.loggedIn}
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
