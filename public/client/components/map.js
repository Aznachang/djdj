import React from 'react';
import ReactDOM from 'react-dom';
import Button from './map-button.js';
import NavBar from './map-nav.js';
import App from './app.js';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }  
  handleClick() {
    console.log(this);
  }
  render() {
    return(
        <div>
          <NavBar />
          <Button buttonName="Create Party" />
          <Button buttonName="Join Party" />
        </div>   
    )
  }

}

export default Map;