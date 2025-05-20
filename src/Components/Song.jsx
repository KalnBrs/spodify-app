import './Song.css';

function Song({ topTracks }) {
  if (!topTracks) return null;

  const trackName = topTracks.name;
  const artistName = topTracks.artists?.[0]?.name;
  const albumImage = topTracks.album?.images?.[0]?.url;

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
