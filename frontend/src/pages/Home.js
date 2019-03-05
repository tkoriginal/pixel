import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MyRobots from '../components/_MyRobot'
import AddRobot from '../components/_AddRobot'
// import { throws } from 'assert';
class Home extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {

  }

  // Retrieves the list of items from the Express app
  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => {
      console.log(list);
      this.setState({ list })
    })
  }

  render() {
    if (!this.props.userInfo.name) {
      return (<Redirect to="/login" />)
    }
    return (
      <div>
        <h1>Welcome {this.props.userInfo.name}!</h1>
        <AddRobot />
        <MyRobots robots={this.props.userInfo.robots} updateRobotInfo={this.props.updateRobotInfo}/>
      </div>
    );
  }
}

export default Home;