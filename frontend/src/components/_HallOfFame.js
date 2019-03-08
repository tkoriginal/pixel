import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
 
class HallOfFame extends React.Component {
  componentDidMount() {
    this.props.updateHallOfFame()
  }
  render() {
    if (!this.props.user_id){
      return (<Redirect to="/login" />)
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Robot</th>
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
        <Link to='/'><button>Go Home</button></Link>
      </div>)
  }
}

export default HallOfFame;