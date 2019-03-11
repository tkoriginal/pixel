import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
const Chart = require("chart.js");

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
const Instuctions = styled.div`
  width: 600px;
  height: 75px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  padding-top: 20px;
  margin-bottom: 10px;
  background-image: url("img/cardBackground.jpg");
  background-size: cover;
`;

const RobotCard = styled.div`
  width: 600px;
  height: 200px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  background-image: url("img/cardBackground.jpg");
  background-size: cover;
`;

const RobotInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

const RobotBio = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 200px;
`;

const RobotName = styled.p`
  text-align: center;
`;
const Stats = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const Stat = styled.div``;
const StatDescription = styled.p`
  display: inline-block;
  margin-right: 5px;
`;
const GraphArea = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-grow: 2;
`;

class ChooseRobot extends Component {
  state = {
    robotName: "",
    starterRobots: [],
    goHome: false,
    noName: false
  };

  selectRobot = (robot, user_id, robotName) => {
    return function(e) {
      if (!robotName) {
        this.setState({ noName: true });
        return;
      }
      const body = JSON.stringify({ robot, user_id, robotName });
      fetch("/add-robot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
      })
        .then(res => res.json())
        .then(res => {
          console.log(this);
          this.props.updateRobotInfo(res.robots);
          this.setState({ goHome: true });
        })
        .catch(e => {
          console.log(e);
        });
    }.bind(this);
  };
  handleRobotName = e => {
    this.setState({ robotName: e.target.value });
  };
  handleGoHome = () => {
    this.setState({ goHome: true });
  };
  componentDidMount() {
    fetch("/generate-starter-robots")
      .then(res => res.json())
      .then(starterRobots => {
        let newRobots = starterRobots.map((robot, i) => {
          return { ...robot, robotId: i };
        });
        this.setState({ starterRobots: newRobots });
        return newRobots;
      })
      .then(newRobots => {
        console.log("New Robots: ", newRobots);

        newRobots.forEach(robot => {
          new Chart(document.getElementById(`stats-chart-${robot.robotId}`), {
            type: "radar",
            data: {
              labels: ["STR", "DEX", "ARM", "HP"],
              datasets: [
                {
                  label: "Stats",
                  fill: true,
                  backgroundColor: "#ff6961",
                  borderColor: "#ff6961",
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "#ff6961",
                  data: [robot.strength, robot.dexterity, robot.armour, (robot.health - 50) / 5]
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
                display: false
                // text: 'Robot Stats'
              }
            }
          });
        });
      })
      .catch(e => {
        console.log("Robot route not working right now", e);
      });
  }
  render() {
    if (!this.props.userInfo.name) {
      return <Redirect to="/login" />;
    }
    if (this.state.starterRobots.length === 0) {
      return <div>Loading cool new robots for you to choose from...</div>;
    }
    if (this.state.goHome) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <div style={{ display: "flex" }} />
        <button onClick={this.handleGoHome}>Back</button>

        <Content>
          <Instuctions>
            <label htmlFor="robot-name">Give your new champion name...</label>
            <input type="text" name="robot-name" value={this.state.robotName} onChange={this.handleRobotName} required />
            {this.state.noName && <p style={{ color: "red" }}>Please enter a robot name</p>}
          </Instuctions>

          {this.state.starterRobots.map((robot, i) => {
            return (
              <div key={i}>
                <RobotCard>
                  <RobotInfo>
                    <RobotBio>
                      <img src={robot.img_url} alt="Battle Bot" height="150" width="150" />
                      <button onClick={this.selectRobot(robot, this.props.userInfo.id, this.state.robotName)}>Select Robot</button>
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
                      <canvas id={`stats-chart-${robot.robotId}`} />
                    </GraphArea>
                  </RobotInfo>
                </RobotCard>
              </div>
            );
          })}
        </Content>
      </div>
    );
  }
}

export default ChooseRobot;
