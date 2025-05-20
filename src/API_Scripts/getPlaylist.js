export async function getCurrentUsersPlaylists(token) {
  const result = await fetch(`https://api.spotify.com/v1/me/playlists?limit=5&offset=0`, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}