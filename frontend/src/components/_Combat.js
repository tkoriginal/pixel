import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Combat extends Component {
  state = {
    opponents: undefined
  }
  componentDidMount() {
    fetch('/generate-starter-robots')
    .then(res => res.json())
    .then(opponents => {
      console.log(opponents)
      this.setState({opponents})
    })
    .catch(() => {
      console.log('Robot route not working right now')
    })
  }
  launchBattle = (userRobot, opponentRobot) => {
    const robots = [userRobot, opponentRobot]
    return function (e) {
      e.preventDefault();
      fetch('/robots-fight', {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(robots)
      })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch((e) => console.log(e, 'Did not get battle info back from server') )
    }
  }
  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    if(!this.state.opponents) {
      return (
        <div>
          Your Opponents are loading...chill buddy
        </div>
      )
    }
    return (
      <div>
        {this.state.opponents.map(robot => 
         (<div key={robot.id}>
            <p>ID: {robot.id}</p>
            <p>Name: {robot.name}</p>
            <p>Str: {robot.strength}</p>
            <p>Dex: {robot.dexterity}</p>
            <p>HP: {robot.health}</p>
            <p>ARM: {robot.armor}</p>
            <p>RS: {robot.remainingStats}</p>
              <button onClick={this.launchBattle(this.props.battleRobot, robot)}>Battle</button>
          </div>)
        )}
      </div>
    )
  }
}

export default Combat;