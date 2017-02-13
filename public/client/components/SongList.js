import React from 'react';
import ReactDOM from 'react-dom';
import Song from './Song.js'

// Imported Components
import Playlist from './Playlist.js'

var SongList = (props) => (
	<div className="playlist-group">
			 <Playlist data={props.data} handlePlay={props.handlePlay} handleRemove={props.handleRemove} />
	</div>
)

module.exports = SongList;
