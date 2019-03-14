import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  border-radius: 4px;
  width: 175px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-content: center;
  margin-top: 10px;
  background-image: url("img/banner.jpg");
  background-size: cover;
  overflow: hidden;

`;

const Mask = styled.div`
  background: linear-gradient(to bottom, rgba(255,255,0,.4), rgba(255,0,0,.6));
  padding: 10px;
`
const Title = styled.p`
  text-align: center;
  color: black;
  font-size: 2.7rem;
  padding-bottom: 1.8rem;
  padding-top: 1.8rem;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
`;

const List = styled.ol`
  list-style-position: inside;
`;

const ListItem = styled.li`
  padding-bottom: 1.7rem;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;
const ListText = styled.p`
  overflow-x: auto;
  text-align: left;
  font-size: 1.2rem;
  color: #000;
`;

const ChampImg = styled.img`
  padding-bottom: 2rem;
`;

class HallOfFame extends React.Component {
  componentDidMount() {
    this.props.updateHallOfFame();
  }
  render() {
    if (!this.props.user_id) {
      return <Redirect to="/login" />;
    }
    return (
      <Container>
        <Mask>
          <Title>Hall of Fame</Title>
          <ChampImg src={this.props.hallOfFame[0].img_url} alt="Battle Bot" height="150" width="150" />
          <List>
            {this.props.hallOfFame.map((stat, i) => (
              <ListItem key={i}>
                <ListText>Name: {stat.robotName}</ListText>
                <ListText>Owner: {stat.userName}</ListText>
                <ListText>#Wins: {stat.count}</ListText>
              </ListItem>
            ))}
          </List>
        </Mask>
      </Container>
    );
  }
}

export default HallOfFame;
