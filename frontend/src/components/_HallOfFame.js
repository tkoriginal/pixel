import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
 
const Container = styled.div`
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 10px;
`
const Title = styled.p`
  font-size: 4rem;
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
  text-align:center;
  padding-bottom: 2rem;

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
          <Thead>
            <Tr>
              <Th>Robot</Th>
              <Th>User</Th>
              <Th>Wins</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.props.hallOfFame.map((stat, i) => 
              (<Tr key={i}>
                <Td>{stat.robotName}</Td>
                <Td>{stat.userName}</Td>
                <Td>{stat.count}</Td>
              </Tr>)
            )}
          </Tbody>
        </Table>
      </Container>)
  }
}

export default HallOfFame;