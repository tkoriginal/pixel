import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import MyRobots from '../components/_MyRobot';
import HallOfFame from '../components/_HallOfFame';
import loadingWrapper from '../components/_HOCLoading'

const Content = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`
const TopBar = styled.div`
  width: 100%;
  height: 75px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  margin-bottom: 25px;
`

const WelcomeTxt = styled.h1`
  color: white;
  font-size: 5rem;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: black;
`

const LogoutBtn = styled.button`
  width: 175px;
  height: 50px;
  font-size: 1.5rem;
  font-family: "Press Start 2P", cursive;
  background: rgb(255,255,255, 1);
  border: 1px solid #ddd;
  color: #000;
  border-radius: 5px;
  margin-top: 10px;
  padding: 1.2rem 0;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    background: rgb(235, 235, 235, 1);
  }
`;

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
          <WelcomeTxt>Welcome {this.props.userInfo.name}!</WelcomeTxt>
          <LogoutBtn onClick={this.props.handleLogout}>Logout</LogoutBtn>
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