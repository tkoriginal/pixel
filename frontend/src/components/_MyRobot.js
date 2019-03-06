import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

//Styles of the component
const Robots = styled.div`
  width: 1140px;
  margin: 0 auto;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const RobotFront = styled.div`
  display:flex;
  /* justify-content: center; */
  align-items: flex-end;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: all .8s ease;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-shadow: 0 1.5rem 4rem rgba(#111, .15);
`
const RobotBack = styled.div`
  position: absolute;
  background-color: #F5F3F5;
  height: 100%;
  width: 100%;
  top:0;
  left:0;
  overflow: hidden;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(180deg);
  transition: all .8s ease;
  border-radius: 6px;
  box-shadow: 0 1.5rem 4rem rgba(#111, .15);
  color: #444;

`

const Robot = styled.div`
  width:300px;
  height:420px;
  perspective: 150rem;
  position: relative;
  -moz-perspective: 150rem;
  border-radius: 5px;
  &:hover ${RobotFront}{
    transform: rotateY(-180deg)
  }
  &:hover ${RobotBack}{
    transform: rotateY(0deg);
  }
`
const RobotName = styled.p`
  flex: 1;
  margin-bottom: 3rem;
  background-color: #999;
  height: 3rem;
  text-align: center;
`
const Stats = styled.div`

`

//Styles End


class MyRobots extends Component {
  state = {
    battle: false,
    newRobot: false
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
          (<Robot >
            <RobotFront key={robot.id} style={{backgroundImage: 'url("https://media.giphy.com/media/eFxMqx03XEhBS/giphy.gif")'}}>
              <RobotName>{robot.name}</RobotName>
            </RobotFront>
            <RobotBack>
              <Stats>
                <p>Str: {robot.strength}</p>
                <p>Dex: {robot.dexterity}</p>
                <p>HP: {robot.health}</p>
                <p>ARM: {robot.armor}</p>
                <p>Active: {robot.active ? 'Active':'Retired'}</p>
                <p>RS: {robot.remainingStats}</p>
              </Stats>
              <div>
                <button onClick={this.retireRobot(robot)}>Retire</button>
                <button onClick={this.launchBattle(robot)}>Battle</button>
              </div>
            </RobotBack>
          </Robot>
          )
        )}
      </Robots>
    )
  }
}

export default MyRobots;

