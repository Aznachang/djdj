import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
//import ReactDOM from 'react-dom';

class Navbar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var pages = ['map', 'logout'];
    var navLinks = pages.map((page, index)=> {
      return (
        <li key={index}>
          <Link to={'/' + page}>{page}</Link>

        </li>
      );
    });
    return (
      <ul>{navLinks}</ul>
    )  
  }
}

export default Navbar;