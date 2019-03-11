import React from 'react';
import styled from 'styled-components';
import {TweenMax, TimelineLite, Elastic} from "gsap/TweenMax";

const BattleBox = styled.div`
  /* position: absolute; */
`

const Robot1 = styled.img`
  position:absolute;
  top: 66vh;
  left: 310px;
`
const Robot2 = styled.img`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  position:absolute;
  top: 66vh;
  left: 1100px;
`
const Cloud = styled.img`
  position: absolute;
  opacity: 0;
  top: 63vh;
  left: 680px;
`
const Winner = styled.img`
  position: absolute;
  opacity: 0;
  top: 65vh;
  left: 690px;
`
class Battle extends React.Component {
  winner = () => {
    return this.props.battleLog.winner
  }
  
  componentDidMount() {
    const tl = new TimelineLite();
    tl.add('robotsMove')
    tl.to("#robot1", 1.4, {
      x: 420
    }, 'robotsMove');
    tl.to("#robot2", 1.4, {
      x: -365
    },'robotsMove');
    tl.to('#cloud',.8, {
      opacity: 1,
      scaleX: 1.4,
      scaleY: 1.4,
    }, '-=.8');
    tl.to('#robot1, #robot2', 0.5, {
      opacity: 0,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: Math.random() * 400,
      y: Math.random() * 400,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: - Math.random() * 400,
      y: - Math.random() * 200,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: Math.random() * 400,
      y: Math.random() * 600,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: - Math.random() * 400,
      y: - Math.random() * 200,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: 0,
      y: 0,
    });
    tl.add('battleOver')
    tl.to('#winner', 1.3, {
      opacity: 1,
      x: -20
    }, 'battleOver');
    tl.to('#cloud', 1.3, {
      opacity: 0
    }, 'battleOver')
  }
  render() {
    return (
      <div>
          <BattleBox>
            <Robot1 
              src={this.props.userRobot.img_url}
              alt="Battle Robot1"
              id="robot1"
            />
            <Robot2 
              src={this.props.opponentRobot.img_url} 
              alt="Battle Robot2"
              id="robot2"
            />
            <Cloud 
              src="img/Fightcloud.gif"
              id='cloud'
            />
            <Winner 
              src={this.winner().img_url}
              id='winner' />
          </BattleBox>
          <div style={{ color: "white" }}>
              {this.props.battleLog.log.map((turn, i) => {
                return(<p key={i}>{JSON.stringify(turn)}</p>)
              })}

          </div>
      </div>
    )
  }
}

export default Battle;