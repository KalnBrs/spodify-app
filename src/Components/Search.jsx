import { useState } from 'react';
import { search } from '../API_Scripts/search';

import './Search.css'

import Song from './Song';
import Artist from './Artist';
import Playlist from './Playlist';

function Search(props) {
  const [selectedOption, setSelectedOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  let content;

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleSearchChange = async (event) => {
    console.log('ran')
    setSearchValue(event.target.value)

    if (selectedOption === 'Song') {
      const searchVal = await search(props.token, searchValue, 'track');
      content = (
        <>
          <Song track={searchVal?.tracks?.items?.[0]} />
          <Song track={searchVal?.tracks?.items?.[1]} />
          <Song track={searchVal?.tracks?.items?.[2]} />
          <Song track={searchVal?.tracks?.items?.[3]} />
          <Song track={searchVal?.tracks?.items?.[4]} />
        </>
      )
    } else if (selectedOption === 'Artist') {
      const searchVal = await search(props.token, searchValue, 'artist');

      content = (
        <>
          <Artist track={searchVal?.artists?.items?.[0]} />
          <Artist track={searchVal?.artists?.items?.[1]} />
          <Artist track={searchVal?.artists?.items?.[2]} />
          <Artist track={searchVal?.artists?.items?.[3]} />
          <Artist track={searchVal?.artists?.items?.[4]} />
        </>
      )
    } else if (selectedOption === 'Album') {
      const searchVal = await search(props.token, searchValue, 'album');

      content = (
        <>
          <Playlist track={searchVal?.albums?.items?.[0]} />
          <Playlist track={searchVal?.albums?.items?.[1]} />
          <Playlist track={searchVal?.albums?.items?.[2]} />
          <Playlist track={searchVal?.albums?.items?.[3]} />
          <Playlist track={searchVal?.albums?.items?.[4]} />
        </>
      )
    }
  }

  

  return (
    <div className='searchContainer'>
      <input type="search" placeholder='search...' className='searchbox' value={searchValue} onChange={handleSearchChange}/>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">Song</option>
        <option value="option1">Artist</option>
        <option value="option2">Album</option>
      </select>
      {content}
    </div>
  )
}

export default Search;