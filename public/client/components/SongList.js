import React from 'react';
import ReactDOM from 'react-dom';
import Song from './Song.js'

// Imported Components
import Playlist from './Playlist.js'

var SongList = (props) => (
	<div className="playlist-group">
		<h3>Playlist</h3>
			 <Playlist data={props.data} handlePlay={props.handlePlay} handleRemove={props.handleRemove} />
	</div>
)

module.exports = SongList;
