import React from 'react';
import { createPoral } from 'react-dom';

const modalRoot = document.getElementById('modal');

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div');
  }
  
  componentDidMount() {
    modalRoot.appendChild(this.el)
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }
  render () {
    return createPoral(this.props.children, this.el)
  }
}

export default Modal;