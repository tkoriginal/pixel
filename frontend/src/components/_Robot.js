import React from 'react';
import styled from 'styled-components';
const Chart = require("chart.js");

const RobotCard = styled.div`
  max-width:100%;
  height:200px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  z-index: -1;
`

const RobotInfo = styled.div`
  display: flex;
  flex-direction: row;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 2rem
`
const Stats = styled.div`
  width:200px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  flex-grow:1;

`
const Stat = styled.div`
  margin-right: 1rem;
`
const StatDescription = styled.p`
  display: inline-block;
  margin-right: 5px;
  font-size: 1.2rem;
`
const GraphArea = styled.div`
  z-index: -1;
  width: 350px;
  margin-left: -10rem;
`


let red = '#f0776c';
let blue = '#0066ff';
let yellow = '#ff971a';

const ActionBtn = styled.button`
  padding: 1rem 4rem;
  font-size: 1.5rem;
  color: #fff;
  background: ${props => props.color === 'red' ?  red : props.color === 'blue' ? blue : yellow};
  border: 0;
  border-radius: 5px;
  outline:none;
`
const StatChangeContainer = styled.div`
  width: 72px;
  display:flex;
  margin-bottom: .5rem;
  border: 1px solid #c4c4c4;
`
const StatNumber = styled.p`
  font-size: 1.5rem;
  align-self: center;
  width: 3rem;
  text-align: center;
`
const StatButton = styled.button`
  background:none;
  font-size: 1.3rem;
  border: none;
  padding: .7rem;
`
const Canvas = styled.canvas`
  
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
  componentDidUpdate(){
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
            data: [(this.state.strength), (this.state.dexterity), (this.state.armour), ((this.state.health - 50) /5)]
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
              <StatDescription>Health</StatDescription>
              <StatChangeContainer>
                <StatButton onClick={this.handleStat('health', this.state.health, 'minus').bind(this)}>-</StatButton>
                <StatNumber>{this.state.health}</StatNumber>
                <StatButton onClick={this.handleStat('health', this.state.health, 'plus').bind(this)}>+</StatButton>
              </StatChangeContainer>
            </Stat>
            <Stat>
              <StatDescription>Strength</StatDescription>
              <StatChangeContainer>
                <StatButton onClick={this.handleStat('strength', this.state.strength, 'minus').bind(this)}>-</StatButton>
                <StatNumber>{this.state.strength}</StatNumber>
                <StatButton onClick={this.handleStat('strength', this.state.strength, 'plus').bind(this)}>+</StatButton>
              </StatChangeContainer>
            </Stat>
            <Stat>
              <StatDescription>Dexterity</StatDescription>
              <StatChangeContainer>
                <StatButton onClick={this.handleStat('dexterity', this.state.dexterity, 'minus').bind(this)}>-</StatButton>
                <StatNumber>{this.state.dexterity}</StatNumber>
                <StatButton onClick={this.handleStat('dexterity', this.state.dexterity, 'plus').bind(this)}>+</StatButton>
              </StatChangeContainer>
            </Stat>
            <Stat>
              <StatDescription>Armour</StatDescription>
              <StatChangeContainer>
                <StatButton onClick={this.handleStat('armour', this.state.armour, 'minus').bind(this)}>-</StatButton>
                <StatNumber>{this.state.armour}</StatNumber>
                <StatButton onClick={this.handleStat('armour', this.state.armour, 'plus').bind(this)}>+</StatButton>
              </StatChangeContainer>
            </Stat>
            <Stat>
              <StatDescription>Trait: {this.state.traits[4]}</StatDescription>
            </Stat>
            <Stat>
              <StatDescription>RS: {this.state.remainingStats}</StatDescription>
            </Stat>
          </Stats>
          <GraphArea>
            <Canvas key={this.state.id} id={`stats-chart-${this.state.id}`} ></Canvas>
          </GraphArea>
          <Actions>
          {this.state.active && (
            <React.Fragment>
              <ActionBtn color='red' onClick={this.props.retireRobot(this.state)}>Retire</ActionBtn>
              <ActionBtn color='blue' onClick={this.handleUpdateState}>Update</ActionBtn>
              <ActionBtn color='yellow' onClick={this.props.launchBattle(this.state)}>Battle</ActionBtn>
            </React.Fragment>
          )}
        </Actions>
        </RobotInfo>

      </RobotCard>
    )}
}

export default Robot;