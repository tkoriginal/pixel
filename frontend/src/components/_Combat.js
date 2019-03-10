import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import styled from 'styled-components';
import Battle from './_Battle';


const Chart = require("chart.js");


const RobotCard = styled.div`
  width:600px;
  height:200px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`

const RobotBio = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow:2;
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
  height:100%;
  display: flex;
  flex-direction: row;
  flex-grow:2;
`

class Combat extends Component {
  state = {
    opponents: undefined,
    battleLog: undefined,
    opponentRobot: undefined,
  }
  componentDidMount() {
    fetch('/generate-combat-robots', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.props.battleRobot)
    })
    .then(res => res.json())
    .then(opponents => {
      let fixedOpponents = opponents.map((opponent,i) => {
        return {...opponent,opponentId: i}
      })
      this.setState({opponents:fixedOpponents})
      return fixedOpponents
    })
    .then(fixedOpponents => {
      console.log(fixedOpponents)

      fixedOpponents.forEach(robot => {
        
        new Chart(document.getElementById(`stats-chart-${robot.opponentId}`), {
          type: 'radar',
          data: {
            responsive:true,
            labels: ['STR', 'DEX', 'ARM', 'HP'],
            datasets: [
              {
                label: "Your Stats",
                fill: true,
                backgroundColor: "rgba(255,151,26,0.3)",
                borderColor: "#ff971a",
                borderWidth: 1,
                pointRadius: 0,
                pointBorderColor: "#fff",
                pointBackgroundColor: "#ff9900",
                data: [(this.props.battleRobot.strength), (this.props.battleRobot.dexterity), (this.props.battleRobot.armour), ((this.props.battleRobot.health - 50) /5)]
              },
              {
                label: "Opponents Stats",
                fill: true,
                backgroundColor: "rgba(255,105,97,0.3)",
                borderColor: "#ff6961",
                borderWidth: 1,
                pointRadius: 0,
                pointBorderColor: "#fff",
                pointBackgroundColor: "#ff6961",
                data: [robot.strength, robot.dexterity, robot.armour, ((robot.health - 50) /5)]
              }   
            ]
          },
            options: {
              legend: {
                display: true,
              },
              scale: {
                ticks: {
                  min: 0,
                  max: 20
                }
              },
              title: {
                display: true,
                // text: 'Robot Stats'
              }
            }
        });
        
      });
      
    })
    .catch(() => {
      console.log('Robot route not working right now')
    })
  }

  handleGoHome = () => {
    this.setState({goHome: true})
  }
  launchBattle = (userRobot, opponentRobot) => {
    return (function (e) {
      this.setState({opponentRobot})
      console.log(userRobot, opponentRobot);
      const robots = JSON.stringify([userRobot, opponentRobot])
      e.preventDefault();
      fetch('/robots-fight', {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: robots
      })
      .then(res => res.json())
      .then(res => {
        this.setState({battleLog: res})
      })
      .catch((e) => console.log(e, 'Did not get battle info back from server') )
    }).bind(this);
  };

  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    if(!this.state.opponents) {
      return (
        <div>
          Your Opponents are loading...chill buddy
        </div>
      )
    }
    if (this.state.battleLog) {
      return (
        <React.Fragment>
          <Battle />
          <div>
              {this.state.battleLog.log.map((turn, i) => {
                return(<p key={i}>{JSON.stringify(turn)}</p>)
              })}
          </div>
        </React.Fragment>
      )
    }
    return (
      <div>
        <Link to='/'><button>Go Back</button></Link>
        {this.state.opponents.map((robot, i) => 
         (<div key={i}>
          <RobotCard>
              <RobotBio>
                <RobotName>{robot.name}</RobotName>
                <img src={robot.img_url} alt="Battle Bot" height="150" width="150"></img>
                <button onClick={this.launchBattle(this.props.battleRobot, robot)}>Battle</button>
              </RobotBio>
              <Stats>
                <Stat>
                  <StatDescription>Health: {robot.health}</StatDescription>
                </Stat>
                <Stat>
                  <StatDescription>strength: {robot.strength}</StatDescription>
                </Stat>
                <Stat>
                  <StatDescription>Dexterity: {robot.dexterity}</StatDescription>
                </Stat>
                <Stat>
                  <StatDescription>Armour: {robot.armour}</StatDescription>
                </Stat>
              </Stats>
              
              <GraphArea>
                <canvas id={`stats-chart-${robot.opponentId}`}></canvas>
              </GraphArea>

          </RobotCard>
          </div>)
        )}
      </div>
    )
  }
}

export default Combat;


