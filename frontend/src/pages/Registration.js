import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      email: '',
      password: '',
      confirmPassword: '',
      userRegistered: false,
      loggedIn: false
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkConfirmedPassword = this.checkConfirmedPassword.bind(this);
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }
  handleChangeConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value});
  }

  checkConfirmedPassword() {
    if (this.state.password === this.state.confirmPassword) {
      return true
    } else {
      return false
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.checkConfirmedPassword()) {

      const body = JSON.stringify(this.state)
      fetch('/registration', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: body
       })
       .then(res => {
         console.log(res)
         if (res.status ===  200){
           this.setState({userRegistered: true})
         }
       })
       .catch(res => {
         console.log("error", res)
       });
       
    } else {
      window.alert("Password and Confirm Password do not match. Please confirm your password.");
    }

  }

  render() {
    // if (this.state.loggedIn) {
    //   return (<Redirect to="/" />)
    // }

    if (this.state.userRegistered) {
      return (<Redirect to="/login" />)
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChangeName} />
          Email:
          <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
          Password:
          <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
          Confirm Password:
          <input type="password" value={this.state.confirmPassword} onChange={this.handleChangeConfirmPassword} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Registration;