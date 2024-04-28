import React from "react";
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
        return (
            <div className="SearchResults">
            {/* <!-- Add a TrackList component --> */}
            <TrackList 
            userSearchResults={props.userSearchResults}
            isRemoval={false}
            onAdd={props.onAdd}/>
          </div>
        )
}

export default SearchResults;