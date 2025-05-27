import { useEffect } from 'react';
import { getTotalTime } from '../API_Scripts/getTotalTime';
import { useState } from 'react';

import './Playlist.css';

function Playlist(props) {
  const [playlistTime, setPlaylistTime] = useState(null); 

  useEffect(() => {
    setPlaylistTime(getTotalTime(token, playlist.href));
  }, [location.search])

  const playlist = props.playlist;
  const token = props.token;
  if (!playlist) return null;

  const playlistName = playlist.name;
  const playlistImage = playlist.images?.[0]?.url;
  const playlistColab = playlist.collaborative;
  const playlistNumTracks = playlist.tracks?.total;
  const colabSrc = playlistColab ? '/colab.svg' : '/person.svg'


  return (
    <div className='container'>
      <div onClick='' className='playlistContainer'>
        <img src={playlistImage} alt="" className='cover'/>
        <div className='names playlistName'>
          <p className='playlistName'>{playlistName}</p>
        </div>
        <img src={colabSrc} alt="" className='playlistPerson'/>
      </div>
      <div>
        <p className='playlistTime'>{playlistTime} - {playlistNumTracks} tracks</p>
        {/* <div className='playlistButtons'>
          <button className='playlistIcons edit'>
            <img src="/edit.svg" alt="" className='playlistIcons edit'/>
          </button>
          <button className='playlistIcons trash'>
            <img src="/trash.svg" alt="" className='playlistIcons trash'/>
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Playlist;