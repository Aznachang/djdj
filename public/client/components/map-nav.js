import React from 'react';
//import ReactDOM from 'react-dom';

class Navbar extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var pages = ['home', 'party', 'login', 'logout'];
    var navLinks = pages.map((page, index)=> {
      return (
        <div key={index}>
          <a href={'/'+ page}>
            {page}
          </a>   
        </div>
      );
    });
    return (
      <nav>{navLinks}</nav>
    )  
  }
}

export default Navbar;