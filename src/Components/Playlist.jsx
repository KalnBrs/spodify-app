import './Playlist.css';

function Playlist(props) {
  return (
    <div className='container'>
      <div onClick='' className='playlistContainer'>
        <img src="https://i.scdn.co/image/ab6775700000ee851250c2c9f7672384da18f4ca" alt="" className='cover'/>
        <div className='names playlistName'>
          <p className='playlistName'>Playlist</p>
        </div>
        <img src="./assets/person.svg" alt="" className='playlistPerson'/>
      </div>
      <div>
        <p className='playlistTime'>98:00 - 98 tracks</p>
        <div className='playlistButtons'>
          <button className='playlistIcons edit'>
            <img src="./assets/edit.svg" alt="" className='playlistIcons edit'/>
          </button>
          <button className='playlistIcons trash'>
            <img src="./assets/trash.svg" alt="" className='playlistIcons trash'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Playlist;