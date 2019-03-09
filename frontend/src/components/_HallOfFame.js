import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
 
const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: row;
  width: 100px;
  margin-bottom: 10px;

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
        <table>
          <thead>
            <tr>
              <th>Robot</th>
              <th>User</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {this.props.hallOfFame.map((stat, i) => 
              (<tr key={i}>
                <td>{stat.robotName}</td>
                <td>{stat.userName}</td>
                <td>{stat.count}</td>
              </tr>)
            )}
          </tbody>
        </table>
      </Container>)
  }
}

export default HallOfFame;