import { redirectToAuthCodeFlow } from "./API_Scripts/redirect.js";

const clientId = 'c7d7db2ffd7e4d229d6c8977e5792dee';

function Login() {
  return (
    <>
      <h1>Login with Spotify API</h1>
      <button onClick={() => redirectToAuthCodeFlow(clientId)}>Login</button>
    </>
  );
}

export default Login;
