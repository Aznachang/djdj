import React, {Component} from 'react';
import NavBar from './map-nav.js';

class Main extends Component {
  render(){
    return(
      <div>
        <NavBar />

        <div className="container">
            {this.props.children}
        </div>
      </div>
    );
  }
}

export default Main