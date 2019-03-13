import React from 'react';
import styled from 'styled-components';
import {TimelineLite} from "gsap/TweenMax";
import Modal from '../pages/Modal';
import { Link } from "react-router-dom";
import battleAnimation from '../util/animation';

const Container= styled.div`
  min-width: 100%;
  min-height: 100%;
`
const BattleBox = styled.div`
  
`;

let red = "#f0776c";
let darkRed = "#e0584c";
let yellow = "#ff971a";
let darkYellow = "#d67604";

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

const WinnerText = styled.p`
  position: absolute;
  top: 30vh;
  left: 50vw;
  transform: translate(-50%, -50%) scale(0, 0);
  font-size: 7rem;
  color: #f9484a;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: #555;
  background-image: linear-gradient(315deg, #ff0000 0%, #ffed00 74%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
`
const Ash = styled.img`
  position: absolute;
  opacity: 0;
  top: 68.5vh;
  left: 720px;
  transform: scale(.4, .4);
`
const Log = styled.p`
  margin-bottom: .7rem;
  padding: .5rem;
`
const ButtonContainer = styled.div`
  opacity: 0;
  position: absolute;
  top: 90vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  display: flex;
  width: 600px;
  justify-content: space-between
`

const Button = styled.button`
  width: 270px;
  padding: 1rem 1rem;
  font-size: 1.5rem;
  font-family: "Press Start 2P", cursive;
  color: #fff;
  background: ${props => (props.color === "red" ? red : yellow)};
  border: 0;
  border-radius: 5px;
  outline: none;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;

  :hover {
    cursor: pointer;
    background: ${props => (props.color === "red" ? darkRed: darkYellow)};
  }
`

const ModalContainer = styled.div`
  width: 800px;
  height: 500px;
  overflow-y:scroll;
  font-size: 1.4rem;
  padding: 3rem;
  color: #fff;
  background-color: #222;
  border: 3px solid #fff;
`
class Battle extends React.Component {
  state ={
    showModal: false,
    showButton: false
  }
  toggleModal = () => this.setState({showModal: !this.state.showModal})

  winner = () => {
    return this.props.battleLog.winner
  }

  whoWon = () => {
    return this.winner().user_id ? 'You Win!!😁' : 'You Lose!!😭'
  }

  showButton = () => {
    this.setState({showButton: true})
  }
  componentDidMount() {
    console.log(this.props.battleLog)
    const masterAnimation = new TimelineLite();
    masterAnimation.add(battleAnimation);
  }

  
  render() {
    return (
      <Container>
        <BattleBox>
          <FightText id="fightText">Fight!</FightText>
          <Versus id="vsText">{this.props.userRobot.name} <span>vs</span> {this.props.opponentRobot.name}</Versus> 
          <WinnerText id="Winner">{this.whoWon()}</WinnerText>
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
            src={this.winner() ?  this.winner().img_url : 'img/pixelPile.png'}
            id="winner" />
          <Ash 
            src="img/pixelPile.png"
            id="ash" />
        </BattleBox>
        <ButtonContainer id="buttons">
          <Button onClick={this.toggleModal}>{this.state.showModal ? 'Close Battle Log' : 'Show Battle Log'}</Button>
          <Link to="/">
              <Button color='red'>Go Back</Button>
          </Link>
        </ButtonContainer>
        {
          this.state.showModal ? (
            <Modal>
              <div>
                <ModalContainer>
                    {this.props.battleLog.log.map((turn, i) => {
                      return(<Log key={i}>{JSON.stringify(turn)}</Log>)
                    })}
                </ModalContainer>
              </div>
            </Modal>) : null  
        }
        
      </Container>
    );
  }
}

export default Battle;
