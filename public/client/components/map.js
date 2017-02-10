import React from 'react';
import ReactDOM from 'react-dom';
import Button from './map-button.js';
import NavBar from './map-nav.js';
import App from './app.js';
import MapView from './map-view.js';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userLatitude: null,
      userLongitude: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.geoLocation = this.geoLocation.bind(this);
  }

  handleClick() {
    console.log(this);
  }

  geoLocation() {
    var context = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      //TODO: set user state && update user location with sockets
      //do_something(position.coords.latitude, position.coords.longitude);
      console.log('Map latitude : ', position.coords.latitude);
      console.log('Map longitude : ', position.coords.longitude);
      context.setState({
        userLatitude: position.coords.latitude,
        userLongitude: position.coords.longitude
      })
    });
  }

  render() {
    return(
        <div>
          <NavBar />
          <MapView />
          <Button buttonFunction={this.handleClick} buttonName="Create Party" />
          <Button buttonFunction={this.handleClick} buttonName="Join Party" />
          <Button buttonFunction={this.geoLocation} buttonName="Where Am I?!" />
        </div>   
    )
  }

}

export default Map;