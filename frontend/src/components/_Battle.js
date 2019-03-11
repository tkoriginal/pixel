import React from "react";
import styled from "styled-components";
import { TweenMax, TimelineLite, Elastic } from "gsap/TweenMax";

const BattleBox = styled.div`
  /* position: absolute; */
`;

const Robot1 = styled.img`
  position: absolute;
  top: 66vh;
  left: 310px;
`;
const Robot2 = styled.img`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  position: absolute;
  top: 66vh;
  left: 1100px;
`;
const Cloud = styled.img`
  position: absolute;
  opacity: 0;
  top: 63vh;
  left: 680px;
`;

class Battle extends React.Component {
  componentDidMount() {
    const tl = new TimelineLite();
    tl.add("robotsMove");
    tl.to(
      "#robot1",
      1.4,
      {
        x: 420
      },
      "robotsMove"
    );
    tl.to(
      "#robot2",
      1.4,
      {
        x: -365
      },
      "robotsMove"
    );
    tl.to(
      "#cloud",
      0.8,
      {
        opacity: 1,
        x: -20,
        scaleX: 1.4,
        scaleY: 1.4
      },
      "-=.8"
    );
    tl.to("#robot1, #robot2", 0.5, {
      opacity: 0
    });
  }
  render() {
    return (
      <div>
        <BattleBox>
          <Robot1 src={this.props.userRobot.img_url} alt="Battle Robot1" id="robot1" />
          <Robot2 src={this.props.opponentRobot.img_url} alt="Battle Robot2" id="robot2" />
          <Cloud src="img/fightCloud.gif" id="cloud" />
        </BattleBox>
        <div style={{ color: "white" }}>
          {this.props.battleLog.log.map((turn, i) => {
            return <p key={i}>{JSON.stringify(turn)}</p>;
          })}
        </div>
      </div>
    );
  }
}

export default Battle;
