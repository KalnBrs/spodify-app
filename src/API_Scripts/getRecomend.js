const clean = str => str?.replace(/\(.*?\)|\[.*?\]|-.*$|feat\..*$/gi, '').trim();

export async function getRecomend(tracks) {
  // pass in tracks?.items
  const apiKey = '65bc1d83884f288438e63b1ab3980e07';

  if (!tracks) { console.error('No top tracks'); return; }

  const fetchTracks = tracks.map(async (track) => {
    const artist = clean(track.artists?.[0]?.name)
    const trackName = clean(track.name)

    const result = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(trackName)}&api_key=${apiKey}&format=json`)

    const data = await result.json();
    if ( Array.isArray(data?.similartracks?.track) && data.similartracks.track.length > 0) {
      return data; 
    } else {
      return null;
    }
  })

  const returnArr = await Promise.all(fetchTracks);
  returnArr =returnArr.filter(item => item !== null)
  console.log(returnArr)
  return returnArr;
}