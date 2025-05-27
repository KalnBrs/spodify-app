import Song from '../Song/Song'

import './Play.css'

function Play(props) {
  return (
    <div className="play">
      <div className="playSong">
        <img src="https://i.scdn.co/image/ab6775700000ee851250c2c9f7672384da18f4ca" alt="" className='cover'/>
        <div className='names'>
          <p className='song'>Song</p>
          <p className="artist">Artist</p>
        </div>
      </div>
      <div className='playContainer'>
        <button className='skipLeft button'>
          <img src="/skip.svg" alt="" className='skipLeft button'/>
        </button>
        <button className='playButton button'>
          <img src="/play.svg" alt="" className='playButton button'/>
        </button>
        <button className='skipRight button'>
          <img src="/skip.svg" alt="" className='skipRight button'/>
        </button>
        <div className='volumeContainer'>
          <img src="/volume.svg" alt="" className='volume'/>
          <input type="range" name="" id="" min='0' max='100'  className='volumeSlider'/>
        </div>
      </div>
    </div>
  )
}

export default Play;