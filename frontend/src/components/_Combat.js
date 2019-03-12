import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import Battle from "./_Battle";

const Chart = require("chart.js");

const Content = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
`

const Instuctions = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 600px;
  height: 75px;
  padding: 10px;
  background: rgb(255,255,255, 0.8);
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  padding-top:20px;
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 2rem;
`;

const RobotCard = styled.div`
  width: 600px;
  height: 250px;
  padding: 10px;
  background: rgb(255,255,255, 0.8);
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RobotBio = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 160px; */
  height: 200px;
`;

const RobotInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const RobotName = styled.p`
  /* width: 150px; */
  flex-wrap: warp;
  text-align: center;
  font-size: 2rem;
  word-wrap: break-word;
`;

const Stats = styled.div`
  width: 160px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;
const Stat = styled.div``;

const StatDescription = styled.p`
  display: inline-block;
  margin-right: 5px;
`
const GraphArea = styled.div`
  /* width: 350px; */
  margin-left: -5rem;
  margin-right: -2.5rem;
`

const Canvas = styled.canvas`
  width: 315px;
  /* height: 150px; */
`

const FightBtn = styled.button`
  padding: 1rem 1rem;
  font-size: 1.5rem;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  background: #ff971a;
  border: 0;
  border-radius: 5px;
  outline:none;
  -moz-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -webkit-transition: all .2s ease-in;
    transition: all .2s ease-in;

  :hover {
    cursor: pointer;
    background: #d67604;
  }
`


const BackBtn = styled.button`
  width:600px;
  font-size: 2rem;
  font-family: 'Press Start 2P', cursive;
  background: rgb(255,255,255, 0.8);
  border: 1px solid #ddd;
  color: #000;
  border-radius: 5px;
  margin-top: 10px;
  padding: 1.2rem 0;
  -moz-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -webkit-transition: all .2s ease-in;
    transition: all .2s ease-in;

  :hover {
    cursor: pointer;
    background: rgb(169,169,169, 0.9);
  }
`

class Combat extends Component {
  state = {
    opponents: undefined,
    battleLog: undefined,
    opponentRobot: undefined
  };
  componentDidMount() {
    fetch("/generate-combat-robots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.props.battleRobot)
    })
      .then(res => res.json())
      .then(opponents => {
        let fixedOpponents = opponents.map((opponent, i) => {
          return { ...opponent, opponentId: i };
        });
        this.setState({ opponents: fixedOpponents });
        return fixedOpponents;
      })
      .then(fixedOpponents => {
        console.log(fixedOpponents);

        fixedOpponents.forEach(robot => {
          new Chart(document.getElementById(`stats-chart-${robot.opponentId}`), {
            type: "radar",
            data: {
              responsive: true,
              labels: ["STR", "DEX", "ARM", "HP"],
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
                  data: [
                    this.props.battleRobot.strength,
                    this.props.battleRobot.dexterity,
                    this.props.battleRobot.armour,
                    (this.props.battleRobot.health - 50) / 5
                  ]
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
                  data: [robot.strength, robot.dexterity, robot.armour, (robot.health - 50) / 5]
                }
              ]
            },
            options: {
              legend: {
                display: false,
              },
              scale: {
                ticks: {
                  backdropColor: 'rgb(255,255,255, 0)',
                  min: 0,
                  max: 25
                }
              },
              title: {
                display: false,
                // text: 'Robot Stats'
              }
            }
          });
        });
      })
      .catch(() => {
        console.log("Robot route not working right now");
      });
  }

  handleGoHome = () => {
    this.setState({ goHome: true });
  };
  launchBattle = (userRobot, opponentRobot) => {
    return function(e) {
      this.setState({ opponentRobot });
      console.log(userRobot, opponentRobot);
      const robots = JSON.stringify([userRobot, opponentRobot]);
      e.preventDefault();
      fetch("/robots-fight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: robots
      })
        .then(res => res.json())
        .then(res => {
          this.setState({ battleLog: res });
        })
        .catch(e => console.log(e, "Did not get battle info back from server"));
    }.bind(this);
  };

  render() {
    if (!this.props.userInfo.name) {
      return <Redirect to="/login" />;
    }
    if (!this.state.opponents) {
      return <div>Your Opponents are loading...chill buddy</div>;
    }
    if (this.state.battleLog) {
      return (
        <React.Fragment>

          <Battle 
            userRobot={this.props.battleRobot} 
            opponentRobot={this.state.opponentRobot} 
            battleLog={this.state.battleLog}/>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </React.Fragment>
      );
    }
    return (
      <div>

        <Content>
          <Instuctions>
            <p>And you will fight...</p>
          </Instuctions>

        {this.state.opponents.map((robot, i) => 
         (<div key={i}>
            <RobotCard>

              <RobotInfo>

                <RobotBio>
                  <RobotName>{robot.name}</RobotName>
                  <img src={robot.img_url} alt="Battle Bot" height="150" width="150" />
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
                  <Stat>
                    <StatDescription>Trait: {robot.traits[4]}</StatDescription>
                  </Stat>
                </Stats>

                <GraphArea>
                  <Canvas id={`stats-chart-${robot.opponentId}`}></Canvas>
                </GraphArea>

              </RobotInfo>
                
              <FightBtn onClick={this.launchBattle(this.props.battleRobot, robot)}>Fight!</FightBtn>

            </RobotCard>
          </div>)
        )}
        <Link to='/'><BackBtn>Nevermind...</BackBtn></Link>

      </Content>

      </div>
    );
  }
}

export default Combat;
