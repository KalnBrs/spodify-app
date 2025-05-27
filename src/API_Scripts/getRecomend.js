export async function getRecomend(tracks) {
  // pass in tracks?.items
  const apiKey = '65bc1d83884f288438e63b1ab3980e07';
  console.log(tracks)
  let returnArr = [];

  if (!tracks){ console.error('No top tracks'); return; }

  tracks.slice(0, 5).map(track => {
    const result = fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${encodeURIComponent(track?.artist?.name)}&track=${encodeURIComponent(track?.name)}&api_key=${api}&format=json`)

    returnArr.push(result.json())
  })  

  return returnArr;
}