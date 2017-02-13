import React from 'react';
//import ReactDOM from 'react-dom';

class Button extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button onClick={this.props.buttonFunction}>{this.props.buttonName}</button>
    )
  }
}

export default Button;