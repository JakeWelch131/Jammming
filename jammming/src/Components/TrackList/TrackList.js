import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList(props) {

        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {props.userSearchResults?.map((track) => (
                    <Track 
                        track={track} 
                        key={track.id}
                        isRemoval={props.isRemoval}
                        onAdd={props.onAdd}
                        onRemove={props.onRemove}
                    />
                ))}
            </div>
        );
}

export default TrackList;
