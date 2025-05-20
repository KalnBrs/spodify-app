import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "./API_Scripts/getAccess";
import { fetchProfile } from "./API_Scripts/getProfile";
import { refreshAccessToken } from "./API_Scripts/refreshAccess";
import { getTop } from "./API_Scripts/getTop";

import './dashboard.css'

import ProfileCard from './Components/ProfileCard';
import Song from './Components/Song';
import Artist from "./Components/Artist";
import Playlist from './Components/Playlist';
import Recomend from './Components/Recomend';
import Mood from "./Components/Mood";
import Play from "./Components/Play";
import Search from "./Components/Search";

const clientId = 'c7d7db2ffd7e4d229d6c8977e5792dee';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tracks, setTopTracks] = useState(null)
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      localStorage.setItem('code', code);
    }

    async function init() {
      const token = localStorage.getItem('access_token');
      const expiry = localStorage.getItem('token_expiry');
      const refreshToken = localStorage.getItem('refresh_token');
  
      if (token && expiry && Date.now() < parseInt(expiry)) {
        const fetchedProfile = await fetchProfile(token);
        setProfile(fetchedProfile);
  
        const topTracks = await getTop(token, 'tracks');
        setTopTracks(topTracks);
  
        return;
      }
  
      if (refreshToken) {
        const newTokenData = await refreshAccessToken(clientId, refreshToken);
        if (newTokenData?.access_token) {
            
          const fetchedProfile = await fetchProfile(newTokenData);
          setProfile(fetchedProfile);
  
          const topTracks = await getTop(newTokenData, 'tracks');
          setTopTracks(topTracks);
  
          return;
        }
      }
  
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        // Remove any old tokens first
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_expiry");

        const tokenData = await getAccessToken(clientId, code);
        if (tokenData?.access_token) {
          localStorage.setItem("access_token", tokenData.access_token);
          localStorage.setItem("refresh_token", tokenData.refresh_token);
          localStorage.setItem("token_expiry", Date.now() + tokenData.expires_in * 1000);

          // Clean the URL
          // window.history.replaceState({}, document.title, window.location.pathname);

          const profile = await fetchProfile(tokenData.access_token);
          setProfile(profile);
          const topTracks = await getTop(newTokenData, 'tracks');
          setTopTracks(topTracks);
        }
      }
    }
  
    init();
  }, [location.search]);

  // Uncomment for production
  // if (!profile) {
  //   return <p>Loading...</p>;
  // }

  console.log(profile)
  console.log(tracks.items[0])
  return (
    <div className="dashboard">
      <Play />
      <div className="container1">
        <div className="card">
          <ProfileCard profile={profile}/>
        </div>
        <div className="card" id='tracks'>
          <h1 className="header">Top Tracks</h1>
          <Song topTracks={tracks.items[0]}/>
          <Song topTracks={tracks.items[1]}/> 
          <Song topTracks={tracks.items[2]}/> 
          <Song topTracks={tracks.items[3]}/>
          <Song topTracks={tracks.items[4]}/> 
        </div>
        <div className="card" id='artists'>
          <h1 className="header">Top Artists</h1>
          <Artist />
          <Artist />
          <Artist />
          <Artist />
          <Artist />
        </div>
        <div className="card" id='playlists'>
          <h1 className="header">Saved Playlists</h1>
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
          <Playlist />
        </div>
        <div className="card" id='search'>
          <Search />
        </div>
        <div className="card" id='recomend'>
          <h1 className="header">Recomended Songs</h1>
          <Recomend />
          <Recomend />
          <Recomend />
          <Recomend />
          <Recomend />
        </div>
      </div>
      <div className="container2">
        <div className="card">
          <h1 className="header">Mood Breakdown</h1>
          <Mood mood='Energetic' />
          <Mood mood='Happy'/>
          <Mood mood='Chill'/>
          <Mood mood='Sad'/>
          <Mood mood='Dance-able'/>
          <Mood mood='Aggressive'/>
          <Mood mood='Romantic'/>
          <Mood mood='Ambient'/>
        </div>
        <div className="card">
          <h1 className="header">Recent Plays</h1>
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
          <Song />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
