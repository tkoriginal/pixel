import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class MyRobots extends Component {
  state = {
    battle: false
  }
  retireRobot = (robot) => {
    return function (e) {
      e.preventDefault();
      console.log(robot)
      fetch ('/retire', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(robot)
      })
      .then(res => res.json())
      .then(res => console.log(res))
    }
  }
  launchBattle = (robot) => {
    return (function (e) {
      e.preventDefault();
      this.setState({battle:true});
      this.props.updateChosenBattleRobot(robot);
    }).bind(this)
  }
  render() {
    if (this.state.battle) {
      return <Redirect to='/combat' />
    }
    return (
      <div>
        {this.props.robots.map(robot => 
         (<div key={robot.id}>
            <p>ID: {robot.id}</p>
            <p>Name: {robot.name}</p>
            <p>Str: {robot.strength}</p>
            <p>Dex: {robot.dexterity}</p>
            <p>HP: {robot.health}</p>
            <p>ARM: {robot.armor}</p>
            <p>Active: {robot.active ? 'Active':'Retired'}</p>
            <p>RS: {robot.remainingStats}</p>
              <button onClick={this.retireRobot(robot)}>Retire</button>
              <button onClick={this.launchBattle(robot)}>Battle</button>
          </div>)
        )}
      </div>
    )
  }
}

export default MyRobots;

