import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './client/components/App.js';
import Map from './client/components/map.js';

//ReactDOM.render(<App />, document.getElementById('app'));

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
    </Router>,
    document.getElementById('app')
);