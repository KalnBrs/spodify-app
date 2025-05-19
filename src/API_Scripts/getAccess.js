export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://spodify-app.vercel.app/dashboard");
  params.append("code_verifier", verifier);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  if (!response.ok) {
    console.error("Failed to get access token:", await response.text());
    return null;
  }

  const data = await response.json();

  // Optional: store refresh token for later (if you plan to implement refreshing)
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token); // if present
  localStorage.setItem("token_expiry", (Date.now() + data.expires_in * 1000).toString());

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token, // save for later use
    expires_in: data.expires_in
  };
}
