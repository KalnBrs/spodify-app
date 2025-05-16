import './Recomend.css'

import Song from './Song'

function Recomend(props) {
  return (
    <div className='recomendContainer'>
      <Song />
      <div className='buttonContainer'>
        <button className='recomendButton'>
          <img src="./assets/plus.svg" alt="" className='recomendButton'/>
        </button>
      </div>
    </div>
  )
}

export default Recomend  