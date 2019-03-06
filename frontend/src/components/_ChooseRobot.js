import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ChooseRobot extends Component {
  state = {
    robotName: undefined,
    robots: [],
    goHome: false,
    noName:false
  }

  selectRobot = (robot, user_id, robotName) => {
    return (function (e) {
      if (!robotName){
        this.setState({noName:true});
        return
      }
      const body = JSON.stringify({robot, user_id, robotName})
      fetch('/add-robot', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body
      })
        .then(res => res.json())
        .then(res => {
          console.log(this)
          this.props.updateRobotInfo(res.robots)
          this.setState({goHome: true})
        })
        .catch((e) =>{
          console.log(e)
        })
   }).bind(this)
  }
  handleRobotName = (e) =>{
    this.setState({robotName: e.target.value})
  } 

  componentDidMount() {
    fetch('/generate-starter-robots')
    .then(res => res.json())
    .then(robots => {
      console.log(robots)
      this.setState({robots})
    })
    .catch(() => {
      console.log('Robot route not working right now')
    })
    
  }
  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    if (this.state.robots.length === 0) {
      return (<div>
        Loading cool new robots for you to choose from...
      </div>)
    }
    if (this.state.goHome) {
      return (<Redirect to="/" />)
    }
    return (
      <div>
        <div style={{display: 'flex'}}>
          <label htmlFor="robot-name">Select Robot Name:</label>
          <input type="text" name="robot-name" value={this.state.robotName} onChange={this.handleRobotName} required/>
          {this.state.noName && <p style={{color:'red'}}>Please enter a robot name</p>}
        </div>
        {this.state.robots.map( robot => {
          return (
          <div key={robot.strength}>
            <p>Health: {robot.health}</p>
            <p>Strength: {robot.strength}</p>
            <p>Dexterity: {robot.dexterity}</p>
            <p>Armour: {robot.armour}</p>
            <button onClick={this.selectRobot(robot, this.props.userInfo.id, this.state.robotName)}>Select Robot</button>
          </div>)
        })}
      </div>
    )
  }
}

export default ChooseRobot;