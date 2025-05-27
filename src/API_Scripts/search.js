export async function search(token, qString, type){
  const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(qString)}&type=${type}`, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  
  return await result.json();
}