import './Recomend.css'

import Song from './Song'

function Recomend(props) {
  console.log(`recomend track: ${props.track}`)
  return (
    <div className='recomendContainer'>
      <Song track={props.track} />
      <div className='buttonContainer'>
        <button className='recomendButton'>
          <img src="/plus.svg" alt="" className='recomendButton'/>
        </button>
      </div>
    </div>
  )
}

export default Recomend;