import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAccessToken } from "./API_Scripts/getAccess";
import { fetchProfile } from "./API_Scripts/getProfile";


const clientId = 'c7d7db2ffd7e4d229d6c8977e5792dee';
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let profile;
async function init() {
  const accessToken = await getAccessToken(clientId, code);
  profile = await fetchProfile(accessToken);
}
init()

function Dashboard() {
  const location = useLocation();

  useEffect(() => {
    if (code) {
      console.log("Spotify authorization code:", code);
      // You can exchange the code for a token, make API calls, etc.
    }
  }, [code]);

  return (
    <>
      <h1>Hello</h1>
      <h1>{profile.username}</h1>
      <p>{profile.email}</p>
      <img src={profile.images[0].url} alt="" />
      <p>{profile.product}</p>
    </>
  );
}

export default Dashboard;