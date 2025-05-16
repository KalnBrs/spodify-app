import { redirectToAuthCodeFlow } from "./API_Scripts/redirect.js";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

function Login() {
  return (
    <>
      <h1>Login with Spotify API</h1>
      <button onClick={() => redirectToAuthCodeFlow(clientId)}>Login</button>
    </>
  );
}

export default Login;
