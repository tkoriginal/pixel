import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

class Combat extends Component {
  state = {
    opponents: undefined,
    battleLog: undefined
  }
  componentDidMount() {
    fetch('/generate-combat-robots', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.props.battleRobot)
    })
    .then(res => res.json())
    .then(opponents => {
      this.setState({opponents})
    })
    .catch(() => {
      console.log('Robot route not working right now')
    })
  }

  handleGoHome = () => {
    this.setState({goHome: true})
  }
  launchBattle = (userRobot, opponentRobot) => {
    return (function (e) {
      console.log(userRobot, opponentRobot);
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
          {this.state.battleLog.log.map((turn, i) => {
            return(<p key={i}>{JSON.stringify(turn)}</p>)
          })}
        <Link to='/'><button>Go Back</button></Link>
        </div>
      )
    }
    return (
      <div>
        <Link to='/'><button>Go Back</button></Link>
        {this.state.opponents.map((robot, i) => 
         (<div key={i}>
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