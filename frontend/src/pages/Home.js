import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import MyRobots from '../components/_MyRobot';
import HallOfFame from '../components/_HallOfFame';
// import { throws } from 'assert';

const Content = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  /* > #my-robots{
    width: 700px;
  } */
`
const TopBar = styled.div`
  width: 100%;
  height: 50px;
  display:flex;
  justify-content: space-between;
  padding: 15px;
`

const HomeScreen = styled.div`
  margin: 0 auto;
  width: 900px;
  display:flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`

class Home extends Component {
  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    return (
      <HomeScreen>
        <TopBar>
          <h1>Welcome {this.props.userInfo.name}!</h1>
          <button onClick={this.props.handleLogout}>Logout</button>
        </TopBar>

        <Content>
          <MyRobots 
            id='my-robots'
            user_id={this.props.userInfo.id}
            robots={this.props.userInfo.robots} 
            updateRobotInfo={this.props.updateRobotInfo}
            updateChosenBattleRobot={this.props.updateChosenBattleRobot}
          />
          <HallOfFame 
            user_id={this.props.userInfo.id}
            hallOfFame={this.props.hallOfFame}
            updateHallOfFame = {this.props.updateHallOfFame}
          />
        </Content> 
      </HomeScreen>
    );
  }
}

export default Home;