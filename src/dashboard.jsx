import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");

  useEffect(() => {
    if (code) {
      console.log("Spotify authorization code:", code);
      // You can exchange the code for a token, make API calls, etc.
    }
  }, [code]);

  return (
    <div>
      <h1>Dashboard</h1>
      {code ? (
        <p>Authorization Code: {code}</p>
      ) : (
        <p>Waiting for Spotify to redirect...</p>
      )}
    </div>
  );
}

export default Dashboard;