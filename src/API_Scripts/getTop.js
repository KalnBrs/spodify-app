export async function getTop(token, type) {
  const result = await fetch(`https://api.spotify.com/v1/me/top/${type}`, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}