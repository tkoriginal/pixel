import React from 'react';
import styled from 'styled-components';
import {TweenMax, TimelineLite, Elastic} from "gsap/TweenMax";

const Container = styled.div`
  width:100%;
  height:100%;
  background: url('img/wallpaper.gif');
  background-attachment:fixed;
  background-size: cover;
  background-repeat:no-repeat
`
const BattleBox = styled.div`

  width: 800px;
  height: 800px;
  top: 284px;
  left: 320px;
  /* position: absolute; */
`

const Robot1 = styled.img`
  position:absolute;
  top: 350px;
  left: 0;
`
const Robot2 = styled.img`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  position:absolute;
  top: 350px;
  left: 800px;
`
const Cloud = styled.img`
  position: absolute;
  opacity: 0;
  top: 310px;
  left: 400px
`

class Battle extends React.Component {

  componentDidMount() {
    const tl = new TimelineLite();
    tl.to('#container', 1, {
      backgroundSize: "150% 150%"
    })
    tl.add('robotsMove')
    tl.to("#robot1", 1.25, {
      x: 420
    }, 'robotsMove');
    tl.to("#robot2", 1.25, {
      x: -365
    },'robotsMove');
    tl.to('#cloud',1, {
      opacity: 1,
      x: -20,
      scaleX: 1.4,
      scaleY: 1.4,
    }, '-=.8');
    tl.to('#robot1, #robot2', 0.5, {
      opacity: 0,
    });

    
  }
  render() {
    return (
      <Container id='container'>
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
          </BattleBox>
      </Container>
    )
  }
}

export default Battle;