import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './client/components/App.js';
import Map from './client/components/map.js';
import Main from './client/components/map.js';
import Login from './client/components/Login.js';
import Signup from './client/components/signup.js';
//ReactDOM.render(<App />, document.getElementById('app'));

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/map" component={Map}/>
        <Route path="/party" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Login}/>
        <Route path="/signup" component={Signup}/>
    </Router>,
    document.getElementById('app')
);