export async function refreshAccessToken(clientId, refreshToken) {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  });

  if (!response.ok) {
    console.error("Failed to refresh token:", await response.text());
    return null;
  }

  const data = await response.json();

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("token_expiry", (Date.now() + data.expires_in * 1000).toString());

  return data.access_token;
}