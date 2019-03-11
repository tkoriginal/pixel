import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from "styled-components";

const Form = styled.form`
  margin: 20px auto;
  width: 350px;
  padding: 30px 25px;
  background: white;
  border: 1px solid #c4c4c4;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Title = styled.h1`
  margin: -28px -25px 25px;
  padding: 15px 25px;
  line-height: 30px;
  font-size: 25px;
  font-weight: 300;
  color: #ADADAD;
  text-align:center;
  background: #f7f7f7;
 
`

const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
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
  font-family: 'Press Start 2P', cursive;
  font-size: 20px;
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

const Register = styled.p`
  text-align:center;
  margin-top:25px;
  margin-bottom:0px;
  color:#666;
  text-decoration:none;
  font-size:13px;
`

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '', 
      password: '',
      loggedIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail = (event) => this.setState({email: event.target.value});
  handleChangePassword = (event) => this.setState({password: event.target.value});

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
       this.props.successfulLogin(res)
       this.setState({loggedIn:true})
     })
     .catch(res => {
       console.log("error", res)
     });
  }
  render() {
    if (this.state.loggedIn) {
      return (<Redirect to="/" />)
    }
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit}>
          
            <Title> Login to Battle</Title>
            <ImageBox>
              <img src="https://media.giphy.com/media/DYvu8sxNgPEIM/giphy.gif" alt="Battle Bot" height="150" width="150"></img>
              <img src="https://66.media.tumblr.com/4f8896ebca88bb0d8308607315d085c9/tumblr_n439wbdHxA1sulisxo1_400.gif" alt="Battle Bot" height="150" width="150"></img>
            </ImageBox>
            <Input type="text" value={this.state.email} placeholder="Email" onChange={this.handleChangeEmail} />
            <Input type="password" value={this.state.password} placeholder="Password" onChange={this.handleChangePassword} />
            <Button type="submit" value="Login" />
            <Link to='/registration' ><Register>Register</Register></Link>
         
        </Form>
      </React.Fragment>
    );
  }
}

export default Login;

