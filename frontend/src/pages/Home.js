import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
    if (!this.props.name) {
      return (<Redirect to="/login" />)
    }
    console.log(this.props.name)
    return (
      <div>
        <h1>Welcome {this.props.name}!</h1>
        
      </div>
    );
  }
}

export default Home;