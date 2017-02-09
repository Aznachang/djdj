import React from 'react';
//import ReactDOM from 'react-dom';

class Button extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button>{this.props.buttonName}</button>
    )
  }

} 

export default Button;