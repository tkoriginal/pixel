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
      // this.getList();
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
    const { list } = this.state;
    console.log(this.props.name)
    return (
      <div className="App">
        <h1>Welcome {this.props.name}</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map((item) => {
              return(
                <div>
                  {item.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default Home;