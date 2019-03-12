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
  width: 900px;
  align-items: center;
  margin: 0 auto;

`
const Image = styled.img`
  opacity: 0;
  margin-top: 20rem;
`
let images = []
  for (let i = 1; i<=5; i++) {
    images.push(`img/robot${i}.gif`)
  }
const HOCLoading = WrappedComponent => {
   class LoadingScreen extends React.Component{
     componentDidMount() {
        const tl = new TimelineLite();
        tl.staggerTo('.loading-gif', .3, {
          opacity: 1,

        }, .2)
     }
     render() {
      if (!this.props.userInfo.name) {
        return (<Redirect to="/login" />)
      }
      setTimeout(() => {
        this.props.setLoading(false)
      }, 1500)
       if(this.props.loading) return (
        <Container>
          <LoadingText>PATIENCE HUMAN...YOUR ROBOTS ARE LOADING....</LoadingText>
          <ImageContainer>
          {images.map(image => 
            <Image className="loading-gif" src={image} alt="Robot" />
            )}
          </ImageContainer>
        </Container>
       )
       return <WrappedComponent {...this.props} />;
     }
    
  }
  return LoadingScreen;
}
export default HOCLoading;


