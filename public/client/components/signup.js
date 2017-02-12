import React from 'react';
import ReactDOM from 'react-dom';
import MapView from './map-view.js';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: 'calculating latitude...',
      longitude: 'calculating longitude...'
    };
    this.createUser = this.createUser.bind(this);
    //this.handleClick = this.handleClick.bind(this);
    //this.geoLocation = this.geoLocation.bind(this);
  };

  createUser() {
    var context = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      //TODO: set user state && update user location with sockets
      //do_something(position.coords.latitude, position.coords.longitude);
      context.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
    });
    console.log(location);
  };

  render() {
    return(
      <div>
        <MapView />
        <form name="signup" method="POST" action="/signup">
          <input type="text" placeholder="username" name="username" /><br/>
          <input type="password" placeholder="password" name="password" /><br/>
          <input type="text" placeholder={this.state.latitude} name="latitude" value={this.state.latitude} readOnly /><br/>
          <input type="text" placeholder={this.state.longitude} name="longitude" value={this.state.longitude} readOnly /><br/>
          <input type="submit"  value="Submit"></input>
          <button><a href="/login">Login</a></button>
        </form>
      </div>  
  )};

  componentDidMount() {
    this.createUser()  
  };

}


export default Signup;


