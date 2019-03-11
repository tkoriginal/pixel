import React from 'react';
import styled from 'styled-components';
import {TimelineLite} from "gsap/TweenMax";

const BattleBox = styled.div`
  /* position: absolute; */
`;

const FightText = styled.p`
  position: absolute;
  top: 30vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  font-size: 7.6rem;
  color: #f9484a;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: #555;
  background-image: linear-gradient(315deg, #ff0000 0%, #ffed00 74%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
`

const Versus = styled.p`
  position:absolute;
  top: 30vh;
  left: 45vw;
  transform: translate(-50%, -50%);
  color: #f9484a;
  font-size: 4rem;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: #555;
  background-image: linear-gradient(315deg, #ff0000 0%, #ffed00 74%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  & span{ 
    
  }
`

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

`
const Winner = styled.img`
  position: absolute;
  opacity: 0;
  top: 65.5vh;
  left: 690px;
`
const Ash = styled.img`
  position: absolute;
  opacity: 0;
  top: 68.5vh;
  left: 720px;
  transform: scale(.4, .4);
`
class Battle extends React.Component {
  winner = () => {
    return this.props.battleLog.winner
  }
  
  componentDidMount() {
    const tl = new TimelineLite();
    tl.add('title');
    tl.to('#vsText', .2, {
      opacity: 0
    })
    tl.to('#vsText', .2, {
      opacity: 1
    })
    tl.to('#vsText', .2, {
      opacity: 0
    })
    tl.to('#vsText', .2, {
      opacity: 1
    })
    tl.to('#vsText', .2, {
      opacity: 0
    })
    tl.to('#vsText', .2, {
      opacity: 1
    })
    tl.to('#vsText', 3, {
      scaleX: 5, 
      scaleY: 5, 
      opacity: 0
    });
    tl.set('#fightText', {
      opacity:1
    })
    tl.to('#fightText', 3, {
      scaleX: 5,
      scaleY:5, 
      opacity: 0
    })
    tl.add('robotsMove');
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
      y: -Math.random() * 400,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: -Math.random() * 400,
      y: -Math.random() * 200,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: Math.random() * 400,
      y: -Math.random() * 600,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: - Math.random() * 400,
      y: -Math.random() * 200,
    });
    tl.to('#cloud',1.3, {
      opacity: 1,
      x: 0,
      y: 0,
    });
    tl.add('battleOver')
    tl.to('#winner', 1.3, {
      opacity: 1,
      x: -80
    }, 'battleOver');
    tl.to('#cloud', 1.3, {
      opacity: 0
    }, 'battleOver')
    tl.to('#ash', 1.3, {
      opacity: 1,
    }, 'battleOver')
  }
  render() {
    return (
      <div>
          <BattleBox>
            <FightText id="fightText">Fight!</FightText>
            <Versus id="vsText">{this.props.userRobot.name} <span>vs</span> {this.props.opponentRobot.name}</Versus> 
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
              src="img/fightCloud.gif"
              id="cloud"
            />
            <Winner 
              src={this.winner().img_url}
              id="winner" />
            <Ash 
              src="img/pixelPile.png"
              id="ash" />
          </BattleBox>
          <div style={{ display:'none' }}>
              {this.props.battleLog.log.map((turn, i) => {
                return(<p key={i}>{JSON.stringify(turn)}</p>)
              })}

          </div>
      </div>
    );
  }
}

export default Battle;
