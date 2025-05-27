export async function getRecomend(tracks) {
  // pass in tracks?.items
  const apiKey = '65bc1d83884f288438e63b1ab3980e07';
  console.log(tracks)

  if (!tracks) { console.error('No top tracks'); return; }

  const fetchTracks = tracks.slice(0, 5).map(async (track) => {
    const result = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(track?.artist?.name)}&track=${encodeURIComponent(track?.name)}&api_key=${apiKey}&format=json`)

    const data = await result.json();
    return data;
  })

  const returnArr = await Promise.all(fetchTracks);
  return returnArr.filter(Boolean);
}