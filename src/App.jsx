import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TrackList from './components/TrackList';
import Spotify from './util/Spotify';

function App() {
  const [tracks, setTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = Spotify.getAccessToken();
    setAccessToken(token);
    Spotify.getUserId(token).then(id => setUserId(id));
  }, []);

  const searchSpotify = (term) => {
    Spotify.search(term, accessToken).then(results => {
      setTracks(results);
      console.log(results);
    });
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
    searchSpotify(query);
  };

  const handleSelectTrack = (track) => {
    setSelectedTracks(prevSelectedTracks => {
      if (prevSelectedTracks.some(selected => selected.id === track.id)) {
        return prevSelectedTracks.filter(selected => selected.id !== track.id);
      } else {
        return [...prevSelectedTracks, track];
      }
    });
  };

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleSavePlaylist = async () => {
    if (!playlistName || selectedTracks.length === 0) return;

    const trackUris = selectedTracks.map(track => track.uri);
    try {
      const playlistId = await Spotify.createPlaylist(playlistName, accessToken, userId);
      await Spotify.addTracksToPlaylist(playlistId, trackUris, accessToken);
      setPlaylistName('');
      setSelectedTracks([]);
      alert('Playlist saved successfully!');
    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('Failed to save playlist. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="top-bar">
        <h1 className="title">Jammming</h1>
      </header>
      <main>
        <SearchBar onSearch={handleSearch} accessToken={accessToken} />
        <div className="main-content">
          <div className="results-section">
            <h2>Search Results</h2>
            <TrackList
              tracks={tracks}
              selectedTracks={selectedTracks}
              onSelectTrack={handleSelectTrack}
            />
          </div>
          <div className="additional-section">
            <h2>Selected Tracks</h2>
            <TrackList
              tracks={selectedTracks}
              selectedTracks={selectedTracks}
              onSelectTrack={handleSelectTrack}
            />
            {selectedTracks.length > 0 && (
              <div className="playlist-form">
                <input
                  type="text"
                  value={playlistName}
                  onChange={handlePlaylistNameChange}
                  placeholder="Enter playlist name"
                  className="playlist-input"
                />
                <button onClick={handleSavePlaylist} className="save-button">
                  Save Playlist
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
