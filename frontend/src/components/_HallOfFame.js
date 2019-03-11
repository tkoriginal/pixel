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
  padding: 10px;
`;
const Title = styled.p`
  text-align: center;
  font-size: 2.5rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

const List = styled.ol`
  list-style-position: inside;
`;

const ListItem = styled.li`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;
const ListText = styled.p`
  overflow-x: auto;
  text-align: left;
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
      </Container>
    );
  }
}

export default HallOfFame;
