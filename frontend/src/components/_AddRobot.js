import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class AddRobot extends Component {
  state = {
    newRobot: false
  }
  chooseRobot = () => {
    this.setState({newRobot:true})
  }

  render() {
    if (this.state.newRobot === true) {
      return (<Redirect to="/choose-robot" />)
    }
  return (
    <div>
      <button type="submit" onClick={this.chooseRobot}>Add robot</button>
    </div>
  )}
}

export default AddRobot;