import React from 'react';
import ReactDOM from 'react-dom';

var Song = (props) => (
 	<li className="list-group-song">
 		<ul className="player-list-button">
	 		<li>
        <button onClick={function() {props.handlePlay(props.index) } }>Play</button>
	      <button onClick={function() {props.handleRemove(props.index) } }>Remove</button>
		    <p onClick={function() {props.handlePlay(props.index) } }>{props.datum.snippet.title}</p>
        </li>
    </ul>
  </li>
)

module.exports = Song;
