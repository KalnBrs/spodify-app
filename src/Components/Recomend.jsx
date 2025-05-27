import './Recomend.css'

import Song from './Song'

function Recomend({ track }) {
  return (
    <div className='recomendContainer'>
      {console.log(`recomend track: ${track}`)}
      <Song track={track} />
      <div className='buttonContainer'>
        <button className='recomendButton'>
          <img src="/plus.svg" alt="" className='recomendButton'/>
        </button>
      </div>
    </div>
  )
}

export default Recomend;