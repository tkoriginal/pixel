import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Combat extends Component {
  state = {
    opponents: undefined,
    battleLog: undefined,
    goHome: false
  }
  componentDidMount() {
    fetch('/generate-starter-robots')
    .then(res => res.json())
    .then(opponents => {
      this.setState({opponents})
    })
    .catch(() => {
      console.log('Robot route not working right now')
    })
  }
  componentWillUnmount() {
    console.log('component will unmount')
    fetch('/user/active-robots')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      // this.props.updateRobotInfo(res.robots)
    })
    .catch(e => {
      console.log('Error', e , 'Didn\'t go through')
    })
  }
  handleGoHome = () => {
    this.setState({goHome: true})
  }
  launchBattle = (userRobot, opponentRobot) => {
    return (function (e) {
      const robots = JSON.stringify([userRobot, opponentRobot])
      e.preventDefault();
      fetch('/robots-fight', {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: robots
      })
      .then(res => res.json())
      .then(res => {
        this.setState({battleLog: res})
      })
      .catch((e) => console.log(e, 'Did not get battle info back from server') )
    }).bind(this);
  }
  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    if (this.state.goHome) {
      return (<Redirect to="/" />)
    }
    if(!this.state.opponents) {
      return (
        <div>
          Your Opponents are loading...chill buddy
        </div>
      )
    }
    if (this.state.battleLog) {
      return (
        <div>
        <button onClick={this.handleGoHome}>Go Back</button>
          {this.state.battleLog.log.map(turn => {
            return(<p>{JSON.stringify(turn)}</p>)
          })}
        </div>
      )
    }
    return (
      
      <div>
      <button onClick={this.handleGoHome}>Go Back</button>
        {this.state.opponents.map(robot => 
         (<div key={robot.id}>
            <p>ID: {robot.id}</p>
            <p>Name: {robot.name}</p>
            <p>Str: {robot.strength}</p>
            <p>Dex: {robot.dexterity}</p>
            <p>HP: {robot.health}</p>
            <p>ARM: {robot.armour}</p>
            <p>RS: {robot.remainingStats}</p>
              <button onClick={this.launchBattle(this.props.battleRobot, robot)}>Battle</button>
          </div>)
        )}
      </div>
    )
  }
}

export default Combat;