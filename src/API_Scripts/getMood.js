export async function getMood(tracks) {
  const apiKey = process.env.REACT_APP_LAST_FM_API;
  console.log(apiKey)

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

  const moodKeywords = {
    happy: ["happy", "pop", "cheerful", "uplifting"],
    chill: ["chill", "chillout", "lo-fi", "downtempo", "relaxing", "smooth"],
    sad: ["sad", "melancholy", "depressing", "emotional"],
    energetic: ["energetic", "powerful", "upbeat", "fast"],
    danceable: ["dance", "disco", "electronic", "house"],
    aggresive: ["metal", "hardcore", "punk", "aggressive"],
    romantic: ["romantic", "love", "rnb", "soul"],
    ambient: ["ambient", "atmospheric", "experimental", "new age"]
  };

  for (const track of tracks) {
    const artistName = encodeURIComponent(track.artists?.[0]?.name || "");
    const trackName = encodeURIComponent(track.name || "");

    if (!artistName || !trackName) continue;

    const url = `https://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${artistName}&track=${trackName}&api_key=${apiKey}&format=json`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const tags = data?.toptags?.tag?.map(tag => tag.name.toLowerCase()) || [];

      for (const [moodKey, keywords] of Object.entries(moodKeywords)) {
        if (tags.some(tag => keywords.includes(tag))) {
          mood[moodKey]++;
        }
      }
    } catch (error) {
      console.warn(`Failed to fetch Last.fm mood for ${trackName} by ${artistName}:`, error);
    }
  }

  console.log(mood)
  return mood;
}
