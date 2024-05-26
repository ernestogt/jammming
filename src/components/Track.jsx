import React from 'react';
import './Track.css';

function Track({ track, onSelect, isSelected }) {
    return (
        <div
            className={`track ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(track)}
        >
            <img src={track.image} alt={track.name} className="track-image" />
            <div className="track-info">
                <p>{track.name} by {track.artist}</p>
                <p>Album: {track.album}</p>
            </div>
        </div>
    );
}

export default Track;
