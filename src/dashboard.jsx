import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "./API_Scripts/getAccess";
import { fetchProfile } from "./API_Scripts/getProfile";
import { Card } from './Components/Card.jsx'

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
      <Card >
        <h1>Hello</h1>
        <h1 id='username'>{profile.display_name}</h1>
        <p id='email'>{profile.email}</p>
        <img src={profile.images?.[0]?.url} alt="Profile" id='profilePic' />
        <p id='product'>{profile.product}</p>
      </Card>
    </>
  );
}

export default Dashboard;
