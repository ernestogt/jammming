import React from 'react';
import Track from './Track';
import './TrackList.css';

function TrackList({ tracks, selectedTracks, onSelectTrack }) {
    return (
        <div className="track-list">
            {tracks.map(track => (
                <Track
                    key={track.id}
                    track={track}
                    onSelect={onSelectTrack}
                    isSelected={selectedTracks.some(selected => selected.id === track.id)}
                />
            ))}
        </div>
    );
}

export default TrackList;
