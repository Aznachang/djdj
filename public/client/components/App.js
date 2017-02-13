import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './SongList.js'
import Search from './Search.js'
import SearchResults from './SearchResults.js'
import SearchSong from './SearchSong.js'
import SearchBar from './SearchBar.js'
import AudioPlayer from './Audio.js'
import axios from 'axios'
import Map from './map.js'
import NavBar from './map-nav.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // search query
      value: '',
      // array of downloadLinks
      srcs: [],
      // array of video data (image url and title)
      data: [],
      // current song being played
      currentSong: null,
      // array of search results
      searchResults: [],
      // location
      location: "Hey Pete"
    };
    this.getSongs = this.getSongs.bind(this);
  };
  getYoutubeSong(event) {
    event.preventDefault(); // prevents page from refreshing
    var context = this; // saving context of this for axios request
    axios({
      url: 'https://www.googleapis.com/youtube/v3/search',
      method: 'get',
      params: {
        part: 'snippet',
        key: 'AIzaSyCqOGwWGNq5ZncRXMRupT5aOn0yadXvi78',
        q: context.state.value //from set state in search?
      }
    })
    .then(function(response) {
      console.log('Search success! This is Youtube response : ', response.data.items);
      var searchResults = response.data.items;
      context.setState({searchResults: searchResults});
    })
    .catch( function(error) {
      console.log('Search fail! This is the error', error);
    });
  };

  playNextSong() {
    var currentSongIndex = this.state.srcs.indexOf(this.state.currentSong); // get index of current song
    console.log('currentSong Index : ', currentSongIndex);
    console.log('songs index - 1 : ', this.state.srcs.length - 1);
    console.log('songs : ', this.state.srcs);
    this.setState({currentSong: null}); // Reset state of current song to null for reasons?
    if (currentSongIndex < this.state.srcs.length - 1 ) { // Check if the current song is the last song
      var setNextSong = function() { // Set next song
        this.setState({currentSong: this.state.srcs[currentSongIndex + 1]});
        console.log('play next song!', currentSongIndex);
      }.bind(this);
      setTimeout(setNextSong, 0); // Play next song after 2 seconds
    }
  }

  postNewSong (src, data) {
    var context = this;
    var partyId = Number(window.location.search.split('=')[1]);
    console.log('partyId upon Adding a Song: ', partyId);
    axios({
      method: 'POST',
      url: '/api/songs',
      data: {
        src: src,
        partyid: partyId,
        data: JSON.stringify(data)
      }
    })
    .then(function(success) {
      context.getSongs.call(context);
    })
    .catch(function(error) {
      console.log('error with post new song, ', error)
    })
  }

  deleteSong (source) {
    console.log('Sending to db, source: ', source);
    var context = this;
    axios({
      method: 'DELETE',
      url: '/api/songs',
      data: {src: source}
    })
    .then(function(success) {
      console.log(success, 'delete successful');
      context.getSongs.call(context);
    })
    .catch(function(error) {
      console.log('error with delete: ', error);
    })
  }

  playSong(index) {
    this.setState({currentSong: null});
    var setNextSong = function() {
      this.setState({currentSong: this.state.srcs[index]});
    }.bind(this);
    setTimeout(setNextSong, 0); // play next song after 2 secs
  }

  getSongs() {
    var context = this;
    var partyid = Number(window.location.search.split('=')[1]);
    console.log('inside getSongs');
    axios.get('/api/party/' + partyid)
      .then(function(playlist) {
        console.log('success in getPlaylist : ', playlist.data);
        var songs = playlist.data; //Songs array from response
        var newSrc= [];
        var newData = [];
        songs.forEach(function(song) {
          newData.push(JSON.parse(song.data));
          newSrc.push(song.src);
        })
        context.setState({
          srcs: newSrc,
          data: newData
        });
        // If there is no current song set the state to the current download link
        if ( context.state.currentSong === null ) {
          console.log('set directDownloadLink');
          context.setState({
            currentSong: newSrc[0]
          });
        };
        console.log('get request was sent to the db songs endpoint')
      })
      .catch(function (err) {
        console.log('There was an error with the GET request to /api/songs, ', err);
      })
    };

  // Handle search clicks
  handleSearchClicks (index) {
    var searchResult = this.state.searchResults;
    var selectedSongId = searchResult[index].id.videoId;
    console.log(selectedSongId === undefined); // If the ID is undefined, no video exists
    // End the request if the song doesn't exist

    var selectedSongUrl = 'https://www.youtube.com/watch?v=' + selectedSongId; // Get youtube URL
    var directDownloadLink = 'https://www.youtubeinmp3.com/fetch/?video=' + selectedSongUrl; // Create the direct DownloadLink, which requires the youtube URL

    this.postNewSong.call(this, directDownloadLink, searchResult[index]); // Get current srcs and data from state
  };

  handlePlay(index) {
    this.playSong(index);
  };

  handleRemove(index) {
    var target = this.state.srcs[index];
    this.deleteSong.call(this, target);
    // If the index being removed is the current song playing set this as next song
    if (this.state.currentSong === target) {
      this.playNextSong();
    };
  };
  // Updating the state 'value' to the user's query
  handleChange(e) {
    this.setState({value: e.target.value  });
  }

  render() {
    return (
      <div>
        <NavBar />
        <SearchBar handleChange={this.handleChange.bind(this)} getYoutubeSong={this.getYoutubeSong.bind(this)}/>
        <AudioPlayer currentSong={this.state.currentSong} playNextSong={this.playNextSong.bind(this)} />
        <SongList data={this.state.data} srcs={this.state.srcs} handlePlay={this.handlePlay.bind(this)} handleRemove={this.handleRemove.bind(this)}/>
        <Search searchResults={this.state.searchResults} handleSearchClicks={this.handleSearchClicks.bind(this)}/>
    </div>
    )
  }

  componentDidMount() {
    this.getSongs()
  };

}

export default App;
