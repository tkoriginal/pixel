import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 75px;
  padding: 10px;
  background: rgb(255,255,255, 0.8);
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  padding-top: 20px;
  margin-bottom: 10px;
  margin-top: 25px;
  font-size: 2rem;
`;

const RobotCard = styled.div`
  width: 600px;
  height: 225px;
  padding: 10px;
  background: rgb(255,255,255, 0.8);
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const RobotInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const RobotBio = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 200px;
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
`;
const GraphArea = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  flex-grow: 2;
`;

const SelectBtn = styled.button`
  padding: 1rem 1rem;
  font-size: 1.5rem;
  font-family: "Press Start 2P", cursive;
  color: #fff;
  background: #77dd77;
  border: 0;
  border-radius: 5px;
  outline: none;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    background: #66d166;
  }
`;

const BackBtn = styled.button`
  width: 600px;
  font-size: 2rem;
  font-family: "Press Start 2P", cursive;
  background: rgb(255,255,255, 0.8);
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
    background: rgb(169, 169, 169, 0.9);
  }
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
      fetch("/robots/add-robot", {
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
    fetch("/robots/new")
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
                  backdropColor: 'rgb(255,255,255, 0)',
                  min: 0,
                  max: 25
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

        <Content>
          <Instuctions>
            <label htmlFor="robot-name">Choose their name: </label>
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

                  <SelectBtn onClick={this.selectRobot(robot, this.props.userInfo.id, this.state.robotName)}>I choose you!</SelectBtn>
                </RobotCard>
              </div>
            );
          })}

          <Link to="/">
            <BackBtn>Nevermind...</BackBtn>
          </Link>
        </Content>
      </div>
    );
  }
}

export default ChooseRobot;
