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
            <p>{robot.id}</p>
            <p>{robot.name}</p>
            <p>{robot.strength}</p>
            <p>{robot.dexterity}</p>
            <p>{robot.health}</p>
            <p>{robot.armor}</p>
            <p>{robot.active}</p>
            <p>{robot.remainingStats}</p>
              <button type="submit" onClick={this.retireRobot(robot)}>Retire</button>
          </div>)
        )}
      </div>
    )
  }
}

export default MyRobots;

