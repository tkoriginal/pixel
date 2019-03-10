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
  0: {
    top: 0,
    left: 0
  },
  1: {
    top: '300px',
    left: '300px',
  },
  2: {
    visible: {
      opacity: 0,
      transition: { duration: 300 }
    }
    
  }
})

const Robot2Animation  = posed.img({
  0: {
    top: '100%',
    left: '100%'
  },
  1: {
    top: '350px',
    left: '350px',
    opacity: 1
  }
})

const CloudAnimation = posed.img({
  1: {
    opacity: 0,
    top: '350px',
    left: '350px',
  },
  2: {
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
    battleState: 0
  }

  componentDidMount() {
    setTimeout(() => this.setState({battleState: 1}), 1000)
    setTimeout(() => this.setState({battleState: 2}), 2000)
  }
  render() {
    return (
      <div>
          <Container>
            <Robot1 
              src="https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif" 
              alt="Battle Robot1"
              pose={this.state.battleState ? this.state.battleState : 0}
            />
            <Robot2 
              src="https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif" 
              alt=""
              pose={this.state.battleState ? this.state.battleState : 0}
            />
            <Cloud 
              src="img/Fightcloud.gif"
              pose={this.state.battleState ? this.state.battleState : 0}
            />
          </Container>
      </div>
    )
  }
}

export default Battle;