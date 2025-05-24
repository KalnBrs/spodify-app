export async function getMood(token, tracks) {
  let mood = {
    energetic: 0,
    happy: 0,
    chill: 0,
    sad: 0,
    danceable: 0,
    aggresive: 0,
    romantic: 0,
    ambient: 0,
  };

  console.log("All tracks:", tracks);

  for (const track of tracks) {
    const artistName = encodeURIComponent(track.artists?.[0]?.name || "");
    const trackName = encodeURIComponent(track.name || "");

    if (!artistName || !trackName) continue;

    const response = await fetch(`https://www.theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artistName}&t=${trackName}`);
    const data = await response.json();
    console.log(`Result for ${track.name}:`, data);

    if (data.track && data.track[0]) {
      const trackInfo = data.track[0];
      const moodTag = trackInfo.strMood?.toLowerCase() || "";

      console.log(`Track: ${track.name}, Mood: ${moodTag}`);

      if (moodTag.includes("happy")) mood.happy++;
      if (moodTag.includes("chill")) mood.chill++;
      if (moodTag.includes("sad")) mood.sad++;
      if (moodTag.includes("energetic")) mood.energetic++;
      if (moodTag.includes("romantic")) mood.romantic++;
      if (moodTag.includes("aggressive")) mood.aggresive++;
      if (moodTag.includes("ambient")) mood.ambient++;
      if (trackInfo.intTempo && parseInt(trackInfo.intTempo) > 110) mood.danceable++;
    }
  }

  return mood;
}
