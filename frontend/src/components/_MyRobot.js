import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Robot from './_Robot';
//Styles of the component
const Robots = styled.div`
  width: 1140px;
  margin: 0 auto;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
`


//Styles End


class MyRobots extends Component {
  state = {
    battle: false,
    newRobot: false,
    updateRobot:false
  }
  // componentDidMount() {
  //   console.log('component Did Mount')
  //   fetch('/user/active-robots',{
  //     method: 'POST',
  //     headers: {'Content-Type':'application/json'},
  //     body: JSON.stringify({user_id: this.props.user_id})
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log('Didmount',res)
  //     this.props.updateRobotInfo(res.robots)
  //   })
  //   .then(res => this.setState({updateRobot:!this.state.updateRobot}))
  //   .catch(e => {
  //     console.log('Error', e , 'Didn\'t go through')
  //   })
  // }

  retireRobot = (robot) => {
    return (function (e) {
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
      .then(res => {
        this.props.updateRobotInfo(res.robots)
        this.setState({updateRobot:!this.state.updateRobot})
      })
    }).bind(this)
  }
  chooseRobot = () => {
    this.setState({newRobot:true})
  }
  launchBattle = (robot) => {
    return (function (e) {
      e.preventDefault();
      this.setState({battle:true});
      this.props.updateChosenBattleRobot(robot);
    }).bind(this)
  }
  render() {
    if (this.state.newRobot === true) {
      return (<Redirect to="/choose-robot" />)
    }
    if (this.state.battle) {
      return <Redirect to='/combat' />
    }
    return (
      <Robots>
        <div>
          <button type="submit" onClick={this.chooseRobot}>Add robot</button>
        </div>
        {this.props.robots.map(robot => 
          <Robot 
            robot={robot} 
            updateRobotInfo={this.props.updateRobotInfo} 
            retireRobot={this.retireRobot} 
            user_id={this.props.user_id} 
            launchBattle={this.launchBattle}/>
        )}
      </Robots>
    )
  }
}

export default MyRobots;

