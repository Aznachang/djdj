import React from 'react';
import ReactDOM from 'react-dom';

//functional stateless attempt?

var Login = () => (
  <form name="login" method="GET" action="/api/login" >
    <input type="text" placeholder="username" name="username" /><br/>
    <input type="password" placeholder="password" name="password" /><br/>
    <input type="submit"  value="Submit"></input>
    <button><a href="/signup">Sign-Up</a></button>
  </form>
)

//export default Login;
module.exports = Login;
