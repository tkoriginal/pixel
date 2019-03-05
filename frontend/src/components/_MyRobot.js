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
         (<div>

            <p>{robot.id}</p>
            <p>{robot.name}</p>
            <p>{robot.str}</p>
            <p>{robot.dex}</p>
            <p>{robot.hp}</p>
            <p>{robot.arm}</p>
              <button type="submit" onClick={this.retireRobot(robot)}>Retire</button>

          </div>)
        )}
        Test
      </div>
    )
  }
}

export default MyRobots;

