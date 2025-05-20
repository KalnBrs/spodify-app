import './Song.css'

function Song(props) {
  console.log(props.topTracks)
  const track = props.topTracks;
  console.log(track)
  return (
    <div className='container'>
      <div onClick='' >
        <img src={track['album']['images'][0].url} alt="" className='cover'/>
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