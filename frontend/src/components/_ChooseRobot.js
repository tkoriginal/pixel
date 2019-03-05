import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ChooseRobot extends Component {
  state = {
    robots: []
  }
  componentDidMount() {
    fetch('/generate-starter-robots')
    .then(res => res.json())
    .then(robots => {
      console.log(robots)
      this.setState({robots})
    })
    .catch(() => {
      console.log('Robot route not working right now')
    })
    
  }
  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    if (this.state.robots.length === 0) {
      return (<div>
        Loading cool new robots for you to choose from...
      </div>)
    }
    return (
      <div>
        Test
      </div>
    )
  }
}

export default ChooseRobot;