export async function getMood(token, tracks) {
  let mood = {
    energetic: 0,
    happy: 0,
    chill: 0,
    sad: 0,
    danceable: 0,
    aggresive: 0,
    romantic: 0,
    ambient: 0
  }

  console.log(tracks)

  tracks.forEach(async (track) => {
    const result = await fetch(`https://api.spotify.com/v1/audio-features/${track.uri}`, {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    console.log(result)

    const energy = result.energy;
    console.log(energy)
    const tempo = result.tempo;
    const valence = result.valence;
    const danceability = result.danceability;
    const acoustic = result.acousticness;
    const instrumentalness = result.instrumentalness;
    const liveness = result.liveness;
    const speechiness = result.speechiness;

    if (energy > 0.7 && tempo > 120 && valence > 0.7) mood.energetic += 1;
    if (valence > 0.7 && energy > 0.5 && danceability > 0.6) mood.happy += 1;
    if (energy < 0.4 && valence >= 0.4 && valence <= 0.6 && tempo < 100 && acoustic > 0.5) mood.chill += 1;
    if (valence < 0.3 && energy < 0.5 && acoustic >= 0.4) mood.sad += 1;
    if (danceability > 0.7 && energy > 0.6 && tempo >= 110 && tempo <= 130) mood.danceable += 1;
    if (valence < 0.3 && energy > 0.7) mood.aggresive += 1;
    if (valence >= 0.5 && valence <= 0.8 && energy >= 0.3 && energy <= 0.6 && danceability >= 0.4 && danceability <= 0.7 && tempo >= 70 && tempo <= 110 && acoustic >= 0.3 && acoustic <= 0.8 && instrumentalness < 0.3) mood.romantic += 1;
    if (energy < 0.4 && valence >= 0.3 && valence <= 0.6 && tempo < 100 && instrumentalness > 0.7 && acoustic > 0.5 && liveness < 0.3 && speechiness < 0.2) mood.ambient;
  });

  return mood;
}