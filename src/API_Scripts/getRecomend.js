const clean = str => str?.replace(/\(.*?\)|\[.*?\]|-.*$|feat\..*$/gi, '').trim();

export async function getRecomend(tracks) {
  // pass in tracks?.items
  const apiKey = '65bc1d83884f288438e63b1ab3980e07';
  console.log(tracks)
  console.log("typeof tracks:", typeof tracks);

  if (!tracks) { console.error('No top tracks'); return; }

  const fetchTracks = tracks.map(async (track) => {
    console.log(track)


    const artist = clean(track.artists?.[0]?.name)
    const trackName = clean(track.name)

    console.log(`track : ${trackName}, artist: ${artist}`)
    console.log(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}&api_key=${apiKey}&format=json`)

    const result = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}&api_key=${apiKey}&format=json`)

    const data = await result.json();
    if ( Array.isArray(data?.similartracks?.track) && data.similartracks.track.length > 0) {
      return data; 
    } else {
      console.info(`No similar tracks for: ${artist} - ${trackName}`);
      return null;
    }
  })

  const returnArr = await Promise.all(fetchTracks);
  return returnArr;
}