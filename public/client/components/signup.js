import React from 'react';
import ReactDOM from 'react-dom';

// Imported Components
import MapView from './map-view.js';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: 'calculating latitude...',
      longitude: 'calculating longitude...'
    };
    this.createUser = this.createUser.bind(this);
  };

  createUser() {
    var context = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      context.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
    });
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
};

export default Signup;


