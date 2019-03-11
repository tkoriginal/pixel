import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Robot from './_Robot';
import { CSSTransitionGroup } from 'react-transition-group';

//Styles of the component

const Robots = styled.div`
  /* max-width:800px; */
  display: flex;
  width: 700px;
  margin-right: 10px;
  flex-direction: column;
`
const AddRobot = styled.button`
  font-size: 4rem;
  font-family: 'Press Start 2P', cursive;
  background: #77dd77;
  /* border: 2px solid #000; */
  color: #fff;
  border-radius: 5px;
  border: 0;
  margin-top: 10px;
  padding: 1.2rem 0;
  -moz-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -webkit-transition: all .2s ease-in;
    transition: all .2s ease-in;

  :hover {
    cursor: pointer;
    background: #66d166;
  }
`

//Styles End
class MyRobots extends Component {
  state = {
    battle: false,
    newRobot: false,
    updateRobot:false
  }
  componentDidMount() {
    console.log('component Did Mount')
    fetch('/user/active-robots',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({user_id: this.props.user_id})
    })
    .then(res => res.json())
    .then(res => {
      this.props.updateRobotInfo(res.robots)
    })
    .catch(e => {
      console.log('Error', e , 'Didn\'t go through')
    })
  }

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
      <CSSTransitionGroup
        transitionName='retire'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {this.props.robots.map((robot)=> 
            <Robot 
              key={robot.id}
              robot={robot} 
              updateRobotInfo={this.props.updateRobotInfo} 
              retireRobot={this.retireRobot} 
              user_id={this.props.user_id} 
              launchBattle={this.launchBattle}
            />
        )}
      </CSSTransitionGroup>
        <AddRobot type="submit" onClick={this.chooseRobot}>Add New Robot</AddRobot>
       
      </Robots>
    )
  }
}

export default MyRobots;

