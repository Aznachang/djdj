import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults';
import SearchSong from './SearchSong.js';
import SearchBar from './SearchBar.js';

var Search = (props) => (
  <div className="playlist-group">
    <SearchResults className = "list-group" searchResults={props.searchResults} handleSearchClicks={props.handleSearchClicks}/>
  </div>
)

module.exports = Search;
