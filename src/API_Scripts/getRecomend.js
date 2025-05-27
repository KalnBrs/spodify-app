export async function getRecomend(tracks) {
  // pass in tracks?.items
  const apiKey = '65bc1d83884f288438e63b1ab3980e07';
  console.log(tracks)
  console.log("typeof tracks:", typeof tracks);

  if (!tracks) { console.error('No top tracks'); return; }

  const fetchTracks = tracks.slice(0, 5).map(async (track) => {
    console.log(track)
    const artist = track.artist?.[0]?.name
    const trackName = track.name

    console.log(`track : ${trackName}, artist: ${artist}`)
    console.log(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}&api_key=${apiKey}&format=json`)

    const result = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}&api_key=${apiKey}&format=json`)

    const data = await result.json();
    return data;
  })

  const returnArr = await Promise.all(fetchTracks);
  return returnArr;
}