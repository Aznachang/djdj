import React from 'react';
import ReactDOM from 'react-dom';

//functional stateless attempt?

var Login = () => (
  <form name="login" method="GET" action="/api/login" >
    <label>
      username :
      <input type="text" name="username" />
      <br/>
    </label>
    <label>
      password :
      <input type="password" name="password" />
      <br/>
    </label>
    <input type="submit"  value="Submit"></input>
    <button> <a href="/signup"> Sign-Up </a></button>
  </form>
)

//export default Login;
module.exports = Login;



