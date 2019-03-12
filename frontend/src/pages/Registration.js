import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from "styled-components";


const Form = styled.form`
  margin: 20px auto;
  width: 350px;
  padding: 30px 25px;
  background: rgb(192,192,192, 0.5);
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-bottom: 25px;
  padding-left:10px;
  font-size: 15px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.input`
  width: 100%;
  height: 50px;
  padding: 0;
  font-size: 20px;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
  text-align: center;
  background: #f0776c;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline:0;
  -moz-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -webkit-transition: all .2s ease-in;
    transition: all .2s ease-in;

  :hover {
    cursor: pointer;
    background: #ed5749;
  }
`

const Login = styled.p`
  text-align:center;
  margin-top:25px;
  margin-bottom:0px;
  color: white;
  text-decoration:none;
  font-size:13px;
`

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
         } else if (res.status === 500) {
          window.alert("Email already registered to an account.");
         }
       })
       .catch(res => {
         console.log("error", res)
       });
    
  }

  render() {
    if (this.state.userRegistered) return (<Redirect to="/login" />)
    if (this.state.toLogin) return (<Redirect to='/login'/>);
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <Input type="text" value={this.state.name} placeholder="Name" onChange={this.handleChangeName} required />
            <Input type="email" value={this.state.email} placeholder="Email" onChange={this.handleChangeEmail} required />
            <Input type="password" value={this.state.password} placeholder="Password" onChange={this.handleChangePassword} required/>
            <Input type="password" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.handleChangeConfirmPassword} required pattern={this.state.password}/>
          <Button type="submit" value="Register" />
          {/* <Login onClick={this.handleToLogin}>Login</Login> */}
          <Link to='/login' ><Login>Login</Login></Link>
        </Form>
      </React.Fragment>
    );
  }
}

export default Registration;