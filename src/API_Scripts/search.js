export async function search(token, qString, type){
  console.log(token, encodeURIComponent(qString), type)
  const result = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(qString)}&type=${type}`, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  
  const data = await result.json();
  console.log(data)
  return data;
}