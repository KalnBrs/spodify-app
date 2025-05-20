export async function getTop(token, type) {
  const result = await fetch(`https://api.spotify.com/v1/me/top/${type}?limit=5&offset=0`, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}