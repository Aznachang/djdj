import React from 'react';
import ReactDOM from 'react-dom';

var SearchSong = (props) => (
	// Need to inherit song info from parent
	// Two ways of making the song model - as a link and as a button  --> used to be line 9 <img className="thumbnail" src="#"/>
	<div>
		<li>
			<button onClick={function () {props.handleSearchClicks(props.index)}}>
			Add
			</button>
			<p>{props.song.snippet.title}</p>
		</li>
	</div>
)

module.exports = SearchSong;
