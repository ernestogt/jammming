import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="search-bar">
            <div className="input-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Enter search term"
                    className="search-input"
                />
                {searchTerm && (
                    <button onClick={clearSearch} className="clear-button">X</button>
                )}
            </div>
            <button onClick={handleSearch} className="search-button">Search</button>
        </div>
    );
}

export default SearchBar;
