import React, { useRef } from 'react';
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

function Playlist(props) {
  const inputRef = useRef(null);

  function handleNameChange({ target }) {
    props.onNameChange(target.value);
  }

  function resetInputValue() {
    if (inputRef.current) {
      inputRef.current.value = "New Playlist";
    }
  }

  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} onChange={handleNameChange} ref={inputRef} />
      {/* <!-- Add a TrackList component --> */}
      <TrackList
        userSearchResults={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className="Playlist-save" onClick={() => { props.onSave(); resetInputValue(); }}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;

