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
    if (!artistName || !track.name) continue;

    // Generate variants of track name for fallback matching
    const rawTitle = track.name;
    const variants = [
      rawTitle,
      rawTitle.replace(/[.#]/g, ""),
      rawTitle.replace(/\bNo\.?\s*/gi, "Number "),
      rawTitle.replace(/[’']/g, ""),
      rawTitle.replace(/[^a-zA-Z0-9\s]/g, "")
    ];

    let data = null;

    for (const variant of variants) {
      const trackName = encodeURIComponent(variant.trim());
      const url = `https://www.theaudiodb.com/api/v1/json/1/searchtrack.php?s=${artistName}&t=${trackName}`;

      const response = await fetch(url);
      if (!response.ok) continue;

      const result = await response.json();
      if (result.track && result.track[0]) {
        data = result;
        break; // stop at first successful result
      }
    }

    if (!data) {
      console.warn(`No match found for: ${rawTitle} by ${track.artists?.[0]?.name}`);
      continue;
    }

    const trackInfo = data.track[0];
    const moodTag = trackInfo.strMood?.toLowerCase() || "";

    console.log(`Track: ${rawTitle}, Mood: ${moodTag}`);

    if (moodTag.includes("happy")) mood.happy++;
    if (moodTag.includes("chill")) mood.chill++;
    if (moodTag.includes("sad")) mood.sad++;
    if (moodTag.includes("energetic")) mood.energetic++;
    if (moodTag.includes("romantic")) mood.romantic++;
    if (moodTag.includes("aggressive")) mood.aggresive++;
    if (moodTag.includes("ambient")) mood.ambient++;
    if (trackInfo.intTempo && parseInt(trackInfo.intTempo) > 110) mood.danceable++;
  }

  return mood;
}
