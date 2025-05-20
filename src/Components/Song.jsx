import './Song.css'

function Song(props) {
  console.log(props)
  return (
    <div className='container'>
      <div onClick='' >
        <img src="https://i.scdn.co/image/ab6775700000ee851250c2c9f7672384da18f4ca" alt="" className='cover'/>
        <div className='names'>
          <p className='song'>Song</p>
          <p className="artist">Artist</p>
        </div>
      </div>
      <div className='buttonContainer'>
        <button className='queue'>
          <img src="/queue.svg" alt="" className='queue'/>
        </button>
      </div>
    </div>
  )
}

export default Song;