import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      password: '',
      loggedIn: false
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = JSON.stringify(this.state)
    fetch('/login', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: body
     })
     .then(res => res.json())
     .then(res => {
       console.log(res)
       this.props.successfulLogin(res)
       this.setState({loggedIn:true})
     })
     .catch(res => {
       console.log("error", res)
     })
     ;
  }

  render() {
    if (this.state.loggedIn) {
      return (<Redirect to="/" />)
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          Password:
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;