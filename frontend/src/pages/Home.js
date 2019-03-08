import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import MyRobots from '../components/_MyRobot';
import HallOfFame from '../components/_HallOfFame';
// import { throws } from 'assert';

const Content = styled.div`
  display:flex;
  
`
class Home extends Component {
  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    return (
      <div>
        <h1>Welcome {this.props.userInfo.name}!</h1>
        <button onClick={this.props.handleLogout}>Logout</button>
        <Content>
          <MyRobots 
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
      </div>
    );
  }
}

export default Home;