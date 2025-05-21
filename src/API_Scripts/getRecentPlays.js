export async function getRecentPlays(token) {
  const result = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=8', {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}