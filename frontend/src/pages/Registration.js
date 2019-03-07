import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Registration extends Component {
  state = {
      name: '', 
      email: '',
      password: '',
      confirmPassword: '',
      userRegistered: false,
      loggedIn: false,
      toLogin: false
    };
  handleChangeName = (event) => this.setState({name: event.target.value});
  handleChangeEmail = (event) => this.setState({email: event.target.value});
  handleChangePassword = (event) => this.setState({password: event.target.value});
  handleChangeConfirmPassword = (event) => this.setState({confirmPassword: event.target.value});
  handleToLogin = () => this.setState({toLogin: true});
  checkConfirmedPassword = () => this.state.password === this.state.confirmPassword

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
    if (this.state.userRegistered) return (<Redirect to="/login" />)
    if (this.state.toLogin) return (<Redirect to='/login'/>);
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit.bind(this)}>
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
        <button onClick={this.handleToLogin}>Login</button>
      </React.Fragment>
    );
  }
}

export default Registration;