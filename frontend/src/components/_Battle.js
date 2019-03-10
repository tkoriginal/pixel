import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { transform } from 'popmotion';


const Container = styled.div`
  width: 800px;
  height: 800px;
  position:relative;
  /* background-color: */
`

//Combat Animations
const Robot1Animation  = posed.img({
  Part1: {
    top: 0,
    left: 0
  },
  Part2: {
    top: '300px',
    left: '300px',
  },
  Part3: {
    visible: {
      opacity: 0,
      transition: { duration: 300 }
    }
    
  }
})

const Robot2Animation  = posed.img({
  Part1: {
    top: '100%',
    left: '100%'
  },
  Part2: {
    top: '350px',
    left: '350px',
    opacity: 1
  },
  Part3: {
    visible: {
      opacity: 0,
      transition: { duration: 300 }
    }
    
  }
})

const CloudAnimation = posed.img({
  Part1:{
    opacity: 0,
  },
  Part2: {
    opacity: 0,
    top: '350px',
    left: '350px',
  },
  Part3: {
    top: '350px',
    left: '350px',
    opacity: 1,
    visible: {
      opacity: 1,
      transition: { duration: 300 }
    }
  }
})
const Robot1 = styled(Robot1Animation)`
  position:absolute;
  top: 0;
  left: 0;
`
const Robot2 = styled(Robot2Animation)`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  position:absolute;
  top: 90%;
  left: 90%;
`
const Cloud = styled(CloudAnimation)`
  position: absolute;
  opacity: 0;
  top: '350px';
  left: '350px'
`

class Battle extends React.Component {
  state = {
    battleState: 'Part1'
  }
  sceneActivator = () => {
    setTimeout(() => {
      this.setState({battleState: 'Part2'})
      setTimeout(() => this.setState({battleState: 'Part3'}), 1000)
    }, 1000)
  }
  componentDidMount() {
    this.sceneActivator();
  }
  render() {
    return (
      <div>
          <Container>
            <Robot1 
              src="https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif" 
              alt="Battle Robot1"
              pose={this.state.battleState ? this.state.battleState : 'Part1'}
            />
            <Robot2 
              src="https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif" 
              alt=""
              pose={this.state.battleState ? this.state.battleState : 'Part1'}
            />
            <Cloud 
              src="img/Fightcloud.gif"
              pose={this.state.battleState ? this.state.battleState : 'Part1'}
            />
          </Container>
      </div>
    )
  }
}

export default Battle;