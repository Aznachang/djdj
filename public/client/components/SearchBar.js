import React from 'react';
import ReactDOM from 'react-dom';


var SearchBar = (props) => (
	<form onSubmit={props.getYoutubeSong}>
		<input type='text' className="form-control" placeholder="Add a song to the playlist!" onChange={props.handleChange}/><br />
		<input type='submit' className="submit-button" value='Search'/>
	</form>

)

module.exports = SearchBar
