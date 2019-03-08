import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
 
const Container = styled.div`
  width: 500px;
  height: 100vh;
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