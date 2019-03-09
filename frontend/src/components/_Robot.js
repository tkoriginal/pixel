import React from 'react';
import styled from 'styled-components';
const Chart = require("chart.js");

const RobotCard = styled.div`
  width:100%;
  height:200px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`

const RobotInfo = styled.div`
  display: flex;
  flex-direction: row;
`

const Actions = styled.div`
  height:25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const RobotBio = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow:1;
  height:200px;
`

const RobotName = styled.p`
  text-align: center;
`
const Stats = styled.div`
  height:200px;
  display: flex;
  flex-direction: column;
  flex-grow:1;

`
const Stat = styled.div`

`
const StatDescription = styled.p`
  display: inline-block;
  margin-right: 5px;
`
const GraphArea = styled.div`
  height:50px;
  display: flex;
  flex-direction: row;
  flex-grow:2;
`

const StatButton = styled.button`
`

const RetireBtn = styled.button`
  width: 50px;
  height: 20px;
  padding: 0;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background: #f0776c;
  border: 0;
  border-radius: 5px;
  outline:0;
`

const UpdateBtn = styled.button`
  width: 50px;
  height: 20px;
  padding: 0;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background: #0066ff;
  border: 0;
  border-radius: 5px;
  outline:0;
`

const BattleBtn = styled.button`
  width: 50px;
  height: 20px;
  padding: 0;
  font-size: 15px;
  color: #fff;
  text-align: center;
  background: #ff971a;
  border: 0;
  border-radius: 5px;
  outline:0;
`

class Robot extends React.Component{
  state = {
    user_id:this.props.user_id,
    id : this.props.robot.id,
    name: this.props.robot.name,
    strength: this.props.robot.strength,
    dexterity: this.props.robot.dexterity,
    health: this.props.robot.health,
    armour: this.props.robot.armour,
    active: this.props.robot.active, 
    traits: this.props.robot.traits,
    remainingStats: this.props.robot.remainingStats,
    updateStat: false,
  }
  fixedState = {
    id : this.props.robot.id,
    name: this.props.robot.name,
    strength: this.props.robot.strength,
    dexterity: this.props.robot.dexterity,
    health: this.props.robot.health,
    armour: this.props.robot.armour,
    active: this.props.robot.active, 
    traits: this.props.robot.traits,
    remainingStats: this.props.robot.remainingStats
  }

  componentDidMount(){
    new Chart(document.getElementById(`stats-chart-${this.state.id}`), {
      type: 'radar',
      data: {
        labels: ['STR', 'DEX', 'ARM', 'HP'],
        datasets: [
          {
            fill: true,
            backgroundColor: "#ffb347",
            borderColor: "#ff971a",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#ff9900",
            data: [(this.props.robot.strength), (this.props.robot.dexterity), (this.props.robot.armour), ((this.props.robot.health - 50) /5)]
          }  
        ]
      },
        options: {
          legend: {
            display: false
          },
          scale: {
            ticks: {
              min: 0
            }
          },
          title: {
            display: true,
            text: 'Robot Stats'
          }
        }
    });

  }

  handleStat = (attribute, value, operation) => {
    return function (e){
      const obj = {};
      let points = this.state.remainingStats;
      if (operation === 'minus' && value > this.fixedState[attribute]){
        value--;
        points++;
        this.setState({remainingStats: points})
      } else if(operation === 'plus' && this.state.remainingStats > 0) {
        value++;
        points--
        this.setState({remainingStats: points})
      }
      obj[attribute] = value;
      this.setState(obj);
    }
  }
  handleUpdateState = () => {
    if (this.state.remainingStats === this.fixedState.remainingStats) {
      console.log(this.state)
      return
    }
    fetch('/robots/update', {
      method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(res => this.props.updateRobotInfo(res.robots))
    }

  render(){
    return (
      <RobotCard>

        <RobotInfo>
            
          <RobotBio>
            <RobotName>{this.state.name}</RobotName>
            <img src="https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif" alt="Battle Bot" height="150" width="150"></img>
          </RobotBio>

         <Stats>
            <Stat>
              <StatDescription>HP: {this.state.health}</StatDescription>
              <StatButton onClick={this.handleStat('health', this.state.health, 'minus').bind(this)}>-</StatButton>
              <StatButton onClick={this.handleStat('health', this.state.health, 'plus').bind(this)}>+</StatButton>
            </Stat>
            <Stat>
              <StatDescription>Str: {this.state.strength}</StatDescription>
              <StatButton onClick={this.handleStat('strength', this.state.strength, 'minus').bind(this)}>-</StatButton>
              <StatButton onClick={this.handleStat('strength', this.state.strength, 'plus').bind(this)}>+</StatButton>
            </Stat>
            <Stat>
              <StatDescription>Dex: {this.state.dexterity}</StatDescription>
              <StatButton onClick={this.handleStat('dexterity', this.state.dexterity, 'minus').bind(this)}>-</StatButton>
              <StatButton onClick={this.handleStat('dexterity', this.state.dexterity, 'plus').bind(this)}>+</StatButton>
            </Stat>
            <Stat>
              <StatDescription>ARM: {this.state.armour}</StatDescription>
              <StatButton onClick={this.handleStat('armour', this.state.armour, 'minus').bind(this)}>-</StatButton>
              <StatButton onClick={this.handleStat('armour', this.state.armour, 'plus').bind(this)}>+</StatButton>
            </Stat>
            <Stat>
              <StatDescription>Active: {this.state.active ? 'Active':'Retired'}</StatDescription>
            </Stat>
            <Stat>
              <StatDescription>RS: {this.state.remainingStats}</StatDescription>
            </Stat>
          </Stats>
          
          <GraphArea>
            <canvas key={this.state.id} id={`stats-chart-${this.state.id}`} width="40" height="40"></canvas>
          </GraphArea>

        </RobotInfo>
        
          
        <Actions>
          {this.state.active && (
            <React.Fragment>
              <RetireBtn onClick={this.props.retireRobot(this.state)}>Retire</RetireBtn>
              <UpdateBtn onClick={this.handleUpdateState}>Update</UpdateBtn>
              <BattleBtn onClick={this.props.launchBattle(this.state)}>Battle</BattleBtn>
            </React.Fragment>
          )}
        </Actions>

      </RobotCard>
    )}
}

export default Robot;