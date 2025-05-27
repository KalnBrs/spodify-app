import './Song.css';

function Song({ track }) {
  if (!track) return null;

  const trackName = track.name;
  const artistName = track.artists?.[0]?.name;
  const albumImage = !track.album?.images?.[0]?.url ? track.image[0]?.['#text'] : track.album?.images?.[0]?.url;


  return (
    <div className='container'>
      <div>
        <img src={albumImage} alt={`${trackName} album cover`} className='cover' />
        <div className='names'>
          <p className='song'>{trackName}</p>
          <p className='artist'>{artistName}</p>
        </div>
      </div>
      <div className='buttonContainer'>
        <button className='queue'>
          <img src="/queue.svg" alt="Add to Queue" className='queue-icon' />
        </button>
      </div>
    </div>
  );
}

export default Song;
