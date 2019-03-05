import React, { Component } from 'react';

class MyRobots extends Component {

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

  render() {
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
              <button type="submit" onClick={this.retireRobot(robot)}>Retire</button>
          </div>)
        )}
      </div>
    )
  }
}

export default MyRobots;

