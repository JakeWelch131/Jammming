import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Jakes Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    // Set default search results when the component mounts
    setSearchResults([
      {
        name: "Example Name",
        artist: "Example Track Artist",
        album: "Example Track Album",
        id: 1,
      },
      {
        name: "Example Name 2",
        artist: "Example Track Artist 2",
        album: "Example Track Album 2",
        id: 2,
      },
    ]);
  }, []);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newPlaylist = existingTrack ? playlistTracks : [...playlistTracks, track];
    setPlaylistTracks(newPlaylist);
  }

  function removeTrack(track) {
    const removedPlaylist = playlistTracks.filter((song) => song.id !== track.id);
    setPlaylistTracks(removedPlaylist);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("Jakes Playlist");
      setPlaylistTracks([]);
    });
  }

  function search(searchTerm) {
    Spotify.search(searchTerm).then((result) => setSearchResults(result));
    console.log(searchTerm);
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight1">m</span><span className="highlight2">m</span><span className="highlight3">m</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        
        <div className="App-playlist">
          <SearchResults 
            userSearchResults={searchResults} 
            onAdd={addTrack}
          />
          <Playlist 
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
