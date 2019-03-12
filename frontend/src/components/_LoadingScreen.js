import React from 'react';
import { Redirect } from 'react-router-dom';
let images = []
  for (let i = 1; i<=20; i++) {
    images.push(`img/robot${i}.gif`)
  }
const loadingWrapper = WrappedComponent => {
   class LoadingScreen extends React.Component{
     render() {
      if (!this.props.userInfo.name) {
        return (<Redirect to="/login" />)
      }
      setTimeout(() => {
        this.props.setLoading(false)
      }, 3000)
       if(this.props.loading) return <div>{images.map(image => <img src={image} alt="Robot" />)}</div>
       return <WrappedComponent {...this.props} />;
     }
    
  }
  return LoadingScreen;
}
export default loadingWrapper;


