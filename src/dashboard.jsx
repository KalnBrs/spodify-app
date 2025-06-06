import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "./API_Scripts/getAccess";
import { fetchProfile } from "./API_Scripts/getProfile";
import { refreshAccessToken } from "./API_Scripts/refreshAccess";
import { getTop } from "./API_Scripts/getTop";
import { getCurrentUsersPlaylists } from "./API_Scripts/getPlaylist";
import { getRecentPlays } from "./API_Scripts/getRecentPlays";
import { getMood } from "./API_Scripts/getMood";
import { getRecomend } from "./API_Scripts/getRecomend";
import { search } from "./API_Scripts/search";

import './dashboard.css'

import ProfileCard from './Components/ProfileCard/ProfileCard';
import Song from './Components/Song/Song';
import Artist from "./Components/Artist/Artist";
import Playlist from './Components/Playlist/Playlist';
import Recomend from './Components/Recomend/Recomend';
import Mood from "./Components/Mood/Mood";
import Play from "./Components/Play/Play";
import Search from "./Components/Search/Search";

const clientId = 'c7d7db2ffd7e4d229d6c8977e5792dee';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tracks, setTopTracks] = useState(null);
  const [artists, setTopArtist] = useState(null);
  const [currPlaylist, setCurrPlaylist] = useState(null);
  const [recentPlays, setRecentPlays] = useState(null);
  const [mood, setMood] = useState(null);
  const [recomend, setRecomend] = useState([])
  const [recomendSpodify, setRecomendSpodify] = useState([])

  const location = useLocation();

  useEffect(() => {
    async function updateValues(token) {
      const profile = await fetchProfile(token);
      setProfile(profile);
      const topTracks = await getTop(token, 'tracks');
      setTopTracks(topTracks);
      const topArtist = await getTop(token, 'artists');
      setTopArtist(topArtist)
      const currPlaylist = await getCurrentUsersPlaylists(token)
      setCurrPlaylist(currPlaylist);
      const recent = await getRecentPlays(token)
      setRecentPlays(recent)
      const recomend = await getRecomend(topTracks.items)
      setRecomend(recomend)
      const resolvedTracks = await Promise.all(
        recomend.slice(0, 5).map(async (track) => {
          const trackName = track.similartracks?.track?.[0]?.name;
          if (!trackName) return null;
          const result = await search(token, trackName, 'track');
          return result?.tracks?.items?.[0] || null;
        })
      );
      setRecomendSpodify(resolvedTracks.filter(Boolean));
      const mood = await getMood(topTracks.items)
      setMood(mood);
    }

    async function init() {
      const token = localStorage.getItem('access_token');
      const expiry = localStorage.getItem('token_expiry');
      const refreshToken = localStorage.getItem('refresh_token');
      
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
          window.history.replaceState({}, document.title, window.location.pathname);
          updateValues(tokenData.access_token)
          
        }
      }

      if (token && expiry && Date.now() < parseInt(expiry)) {
        updateValues(token)
        return;
      }
  
      if (refreshToken) {
        const newTokenData = await refreshAccessToken(clientId, refreshToken);
        if (newTokenData?.access_token) {
          updateValues(newTokenData)
          return;
        }
      }
    }
  
    init();
  }, [location.search]);

  // Uncomment for production
  if (!profile || !tracks) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      {/* <Play /> */}
      <div className="container1">
        <div className="card">
          <ProfileCard profile={profile}/>
        </div>
        <div className="card" id='tracks'>
          <h1 className="header">Top Tracks</h1>
          {tracks?.items?.slice(0, 5).map((track) => (
            <Song track={track}/>
          ))}          
        </div>
        <div className="card" id='artists'>
          <h1 className="header">Top Artists</h1>
          {artists?.items?.slice(0, 5).map((artist) => (
            <Artist artist={artist} />
          ))}
        </div>
        <div className="card" id='playlists'>
          <h1 className="header">Saved Playlists</h1>
          {currPlaylist?.items?.slice(0, 5).map((playlist) => (
            <Playlist playlist={playlist} token={localStorage.getItem('access_token')}/>
          ))}
        </div>
        <div className="card" id='search'>
          <Search token={localStorage.getItem('access_token')} />
        </div>
        <div className="card" id='recomend'>
          <h1 className="header">Recomended Songs</h1>
          {recomendSpodify?.map((track) => (
            <Recomend track={track} />
          ))}
        </div>
      </div>
      <div className="container2">
        <div className="card">
          <h1 className="header">Mood Breakdown</h1>
          <Mood mood='Energetic' value={mood?.energetic} />
          <Mood mood='Happy' value={mood?.happy}/>
          <Mood mood='Chill' value={mood?.chill}/>
          <Mood mood='Sad' value={mood?.sad}/>
          <Mood mood='Dance-able' value={mood?.danceable}/>
          <Mood mood='Aggressive' value={mood?.aggresive}/>
          <Mood mood='Romantic' value={mood?.romantic}/>
          <Mood mood='Ambient' value={mood?.ambient}/>
        </div>
        <div className="card">
          <h1 className="header">Recent Plays</h1>
          {recentPlays?.items?.map((track) => (
            <Song track={track.track} token={localStorage.getItem('access_token')} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
