import { useState } from 'react';
import { search } from '../API_Scripts/search';

import './Search.css'

import Song from './Song';
import Artist from './Artist';
import Playlist from './Playlist';

function Search(props) {
  const [selectedOption, setSelectedOption] = useState('Song');
  const [searchValue, setSearchValue] = useState('');
  const [result, setResult] = useState(null)

  console.log(props.token)
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleSearchChange = async (event) => {
    console.log('ran')
    setSearchValue(event.target.value)

    console.log(selectedOption)
    if (selectedOption === 'Song') {
      console.log('song')
      const searchVal = await search(props.token, searchValue, 'track');
      setResult(searchVal?.tracks?.items?.slice(0, 5).map((track) => {
        <Song track={track} />
      }))
    } else if (selectedOption === 'Artist') {
      console.log('artist')
      const searchVal = await search(props.token, searchValue, 'artist');

      setResult(searchVal?.artists?.items?.slice(0, 5).map((artist) => {
        <Artist artist={artist} />
      }))
    } else if (selectedOption === 'Album') {
      console.log('album')
      const searchVal = await search(props.token, searchValue, 'album');

      setResult(searchVal?.albums?.items?.slice(0, 5).map((album) => {
        <Playlist playlist={album} />
      }))
    }
  }

  

  return (
    <div className='searchContainer'>
      <input type="search" placeholder='search...' className='searchbox' value={searchValue} onChange={handleSearchChange}/>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="Song">Song</option>
        <option value="Artist">Artist</option>
        <option value="Album">Album</option>
      </select>
      {result}
    </div>
  )
}

export default Search;