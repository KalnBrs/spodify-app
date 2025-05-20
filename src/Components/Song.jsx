import './Song.css'

function Song(props) {
  const track = props.topTracks;
  return (
    <div className='container'>
      <div onClick='' >
        <img src={props.topTracks['album']['images'][0].url} alt="" className='cover'/>
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