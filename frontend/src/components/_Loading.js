import React from 'react';
import { Redirect } from 'react-router-dom';
import {TimelineLite} from "gsap/TweenMax";
import styled from 'styled-components';

const Container = styled.div`
  color: #fff;
`

const LoadingText = styled.p`
  text-align:center;
  margin-top: 20rem;
  font-size: 3rem;
`
const ImageContainer = styled.div`
  display: flex; 
  height: 80vh;
  width: 1100px;
  align-items: center;
  margin: 0 auto;
`
const Image = styled.img`
  opacity: 0;
  margin-top: 20rem;
`
let images = []
let start = Math.floor(Math.random()*10)
  for (let i = start; i<=(start + 6); i++) {
    images.push(`img/robot${i}.gif`)
  }
class LoadingScreen extends React.Component{
     componentDidMount() {
        const tl = new TimelineLite();
        // tl.de
        tl.staggerTo('.loading-gif', .4, {
          opacity: 1,

        }, .2)
     }
     render() {
      if (!this.props.name) {
        return (<Redirect to="/login" />)
      }
      setTimeout(() => {
        this.props.setLoading(false)
      }, 3000)
      return (
        <Container>
          <LoadingText>PATIENCE HUMAN...YOUR ROBOTS ARE LOADING....</LoadingText>
          <ImageContainer>
            {images.map(image => 
                <Image key={image} className="loading-gif" src={image} alt="Robot" />
              )}
          </ImageContainer>
        </Container>
       )
     }
}

export default LoadingScreen;


