import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
 
const Container = styled.div`
  border-radius: 4px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  align-content: center;
  width: 250px;
  margin-bottom: 10px;
`
const Title = styled.p`
  text-align: center;
  font-size: 2.5rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
`
const Table = styled.table`
  width: 100%;
  font-size: 2rem;
  background-color: #fff;
  color: #666;
  border-radius: 5px;
`
const Thead = styled.thead`

`
const Tbody = styled.tbody`

`
const Tr = styled.tr`

`
const Th = styled.th`
  padding-bottom: 2rem;
  padding-top: 2rem;
`
const Td = styled.td`
  overflow-x: auto;
  text-align: center;
  padding-bottom: 2rem;
`

const List = styled.ol`
  list-style-position: inside;
`

const ListItem = styled.li`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-content: flex-start;

`
const ListText = styled.p`
  overflow-x: auto;
  text-align: left;
`

class HallOfFame extends React.Component {
  componentDidMount() {
    this.props.updateHallOfFame()
  }
  render() {
    if (!this.props.user_id){
      return (<Redirect to="/login" />)
    }
    return (
      <Container>
        <Title>Hall of Fame</Title>
        <Table>
          {/* <Thead>
            <Tr>
              <Th>Robot</Th>
              <Th>User</Th>
              <Th>Wins</Th>
            </Tr>
          </Thead> */}
          <List>
            {this.props.hallOfFame.map((stat, i) => 
              (<ListItem key={i}>
                <ListText>Name: {stat.robotName}</ListText>
                <ListText>Owner: {stat.userName}</ListText>
                <ListText>#Wins: {stat.count}</ListText>
              </ListItem>)
            )}
          </List>
        </Table>
      </Container>)
  }
}

export default HallOfFame;