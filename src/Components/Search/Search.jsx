import { useState, useEffect } from 'react';
import { search } from '../../API_Scripts/search';

import './Search.css';
import Song from '../Song/Song';
import Artist from '../Artist/Artist';
import Playlist from '../Playlist/Playlist';

function Search(props) {
  const [selectedOption, setSelectedOption] = useState('Song');
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  useEffect(() => {
    if (!searchValue) return;

    const delayDebounce = setTimeout(async () => {
      console.log('Searching for:', searchValue);

      if (selectedOption === 'Song') {
        const searchVal = await search(props.token, searchValue, 'track');
        setResult(searchVal?.tracks?.items?.slice(0, 5).map((track) => (
          <Song track={track} key={track.id} />
        )));
      } else if (selectedOption === 'Artist') {
        const searchVal = await search(props.token, searchValue, 'artist');
        setResult(searchVal?.artists?.items?.slice(0, 5).map((artist) => (
          <Artist artist={artist} key={artist.id} />
        )));
      } else if (selectedOption === 'Album') {
        const searchVal = await search(props.token, searchValue, 'album');
        setResult(searchVal?.albums?.items?.slice(0, 5).map((album) => (
          <Playlist playlist={album} key={album.id} />
        )));
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [searchValue, selectedOption, props.token]);

  return (
    <div className='searchContainer'>
      <div className='searchbox'>
        <input
          type="search"
          placeholder='search...'
          className='searchbox'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select id="dropdown" value={selectedOption} onChange={handleChange}>
          <option value="Song">Song</option>
          <option value="Artist">Artist</option>
          <option value="Album">Album</option>
        </select>
      </div>
      <div>{result}</div>
    </div>
  );
}

export default Search;
