import React from 'react';
import ReactDOM from 'react-dom';


var Signup = () => (
  <form name="signup" method="POST" action="/signup" > 
    <label placeholder="username">
      username : 
      <input type="text" name="username" />
      <br/>
    </label>
    <label placeholder="password">
      password :
      <input type="text" name="password" />
      <br/>
    </label>
    <input type="submit"  value="Submit"></input>
    <button><a href="/login"> Login </a></button>
  </form> 
)

module.exports = Signup;