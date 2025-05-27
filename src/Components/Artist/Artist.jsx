import './Artist.css'

function Artist({artist}) {
  if (!artist) return null;

  const artistName = artist.name;
  const artistImage = artist.images?.[0]?.url;
  return (
    <>
      <div onClick='' className='artistContainer'>
        <img src={artistImage} alt="" className='cover'/>
        <div className='names artistName'>
          <p className='artistName'>{artistName}</p>
        </div>
      </div>
    </>
  )
}

export default Artist;