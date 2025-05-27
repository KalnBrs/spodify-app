import './Recomend.css'

import Song from 'src/Components/Song/Song.jsx';

function Recomend({ track }) {
  return (
    <div className='recomendContainer'>
      <Song track={track} />
      {/* <div className='buttonContainer'>
        <button className='recomendButton'>
          <img src="/plus.svg" alt="" className='recomendButton'/>
        </button>
      </div> */}
    </div>
  )
}

export default Recomend;