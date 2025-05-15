import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "./API_Scripts/getAccess";
import { fetchProfile } from "./API_Scripts/getProfile";
import ProfileCard from './Components/ProfileCard'

const clientId = 'c7d7db2ffd7e4d229d6c8977e5792dee';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    async function init() {
      if (code) {
        console.log("Spotify authorization code:", code);
        const accessToken = await getAccessToken(clientId, code);
        const fetchedProfile = await fetchProfile(accessToken);
        setProfile(fetchedProfile);
      }
    }

    init();
  }, [location.search]);

  if (!profile) {
    return <p>Loading...</p>;
  }

  console.log(profile)
  return (
    <>
      <div >
        <ProfileCard profile={profile} />
      </div>
    </>
  );
}

export default Dashboard;
