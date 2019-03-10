import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { transform } from 'popmotion';
import {TweenMax, TimelineLite, Elastic} from "gsap/TweenMax";

const Container = styled.div`
  width: 800px;
  height: 800px;
  position:relative;
  /* background-color: */
`

//Combat Animations
// const Robot1Animation  = posed.img({
//   Part1: {
//     top: '300px',
//     left: 0
//   },
//   Part2: {
//     top: '300px',
//     left: '300px',
//   },
//   Part3: {
//     opacity: 0,
//     transition: { duration: 300 }
//   }
// })

// const Robot2Animation  = posed.img({
//   Part1: {
//     top: '300px',
//     left: '100%'
//   },
//   Part2: {
//     top: '350px',
//     left: '350px',
//     opacity: 1
//   },
//   Part3: {
//       opacity: 0,
//       transition: { duration: 300 }
    
//   }
// })

// const CloudAnimation = posed.img({
//   Part1:{
//     opacity: 0,
//   },
//   Part2: {
//     opacity: 0,
//     top: '350px',
//     left: '350px',
//   },
//   Part3: {
//     top: '350px',
//     left: '350px',
//     opacity: 1,
//   }
// })
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
  left: 750px;
`
const Cloud = styled.img`
  position: absolute;
  opacity: 0;
  top: 400px;
  left: 350px
`

class Battle extends React.Component {
  state = {
    battleState: 'Part1'
  }
  sceneActivator = () => {
    setTimeout(() => {
      this.setState({battleState: 'Part2'})
      setTimeout(() => this.setState({battleState: 'Part3'}), 200)
      setTimeout(() => this.setState({battleState: 'Part3'}), 500)
      setTimeout(() => this.setState({battleState: 'Part4'}), 1000)
      setTimeout(() => this.setState({battleState: 'Part5'}), 1200)
    }, 1000)
  }
  componentDidMount() {
    const tl = new TimelineLite();
    tl.add('robotsMove')
    tl.to("#robot1", 2, {
      x: 320
    }, 'robotsMove');
    tl.to("#robot2", 2, {
      x: -320
    },'robotsMove');
    tl.to('#cloud',2, {
      opacity: 1,
      x: 40,
      scaleX: 3,
      scaleY: 2,
    }, '-=1.5')

  }
  render() {
    return (
      <div>
          <Container>
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
          </Container>
      </div>
    )
  }
}

export default Battle;