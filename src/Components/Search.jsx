import { useState } from 'react';

import './Search.css'

function Search(props) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  return (
    <div className='searchContainer'>
      <input type="search" placeholder='search...' className='searchbox'/>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="">Song</option>
        <option value="option1">Artist</option>
        <option value="option2">Album</option>
      </select>
    </div>
  )
}

export default Search;