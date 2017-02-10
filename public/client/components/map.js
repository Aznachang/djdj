import React from 'react';
import ReactDOM from 'react-dom';
import Button from './map-button.js';
import NavBar from './map-nav.js';
import App from './app.js';
import MapView from './map-view.js';
import axios from 'axios';

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: 25,
          lng: 121
        }
      }]
    }
    this.createParty = this.createParty.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.geoLocation = this.geoLocation.bind(this);
  }

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
      .then(function(res){
        console.log('Party response is: ', res);
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
      })
    });
  }

  // initMap() {
  //   var uluru = {lat: -25.363, lng: 131.044};
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: uluru
  //   });
  //   var marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map
  //   });
  // }

  // jsonpRequest(url, callback) {
  //   var jsonpDispatcher = {};
  //   var key = Math.random();
  //   jsonpDispatcher[key] = function () {
  //     callback.apply(this, arguments);
  //     delete jsonpDispatcher[key];
  //   };
  //   var script = document.createElement('script');
  //   script.src = url + '&callback=jsonpDispatcher[' + key + ']';
  //   document.body.appendChild(script);
  // }

  render() {

    //this.jsonpRequest("https://maps.googleapis.com/maps/api/js?key=AIzaSyDQC_iCnXCf_cIH2AF4XPBF72n_rS2fOQM", this.initMap);

    return(
        <div id="map">
          <NavBar />
          <MapView />
          <Button buttonFunction={this.createParty} buttonName="Create Party" />
          <Button buttonFunction={this.handleClick} buttonName="Join Party" />
          <Button buttonFunction={this.geoLocation} buttonName="Where Am I?!" />
        </div>
    )
  }

}

export default Map;