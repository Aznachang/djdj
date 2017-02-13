import React from 'react';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Button from './map-button.js';
import NavBar from './map-nav.js';
import App from './app.js';
import MapView from './map-view.js';
import axios from 'axios';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.createParty = this.createParty.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.geoLocation = this.geoLocation.bind(this);
  };

  handleClick() {
    console.log(this);
  }

  createParty() {
    var context = this;
    var location = navigator.geolocation.getCurrentPosition(function(position) {
      //TODO: set user state && update user location with sockets
      //do_something(position.coords.latitude, position.coords.longitude);
      console.log('Map latitude : ', position.coords.latitude);
      console.log('Map longitude : ', position.coords.longitude);

      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      axios.post('/api/parties', {
        latitude: latitude,
        longitude: longitude
      })
      .then(function(party){
        //console.log('Party response is: ', res.data);
        browserHistory.push('/party/?id=' + party.data.id);
      })
      .catch(function(error){
        console.log('Not able to POST the party: ', error);
      });

      context.setState({
        userLatitude: position.coords.latitude,
        userLongitude: position.coords.longitude
      })
    });
    console.log(location);
  };

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
      });
    });
  };

  render() {
    return (
        <div id="map">
          <NavBar />
          <MapView />
          <Button buttonFunction={this.createParty} buttonName="Create Party" />
        </div>
  )};

};

export default Map;