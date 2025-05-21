export async function getTotalTime(token, apiLink) {
  const result = await fetch(apiLink, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await result.json();

  let sum = 0;
  const items = data.tracks?.items;

  if (!Array.isArray(items)) {
    console.warn("No track items found.");
    return "00:00:00";
  }

  items.forEach(item => {
    const duration = item?.track?.duration_ms ?? 0;
    sum += duration;
  });

  console.log(`Finished sum: ${sum}`);

  const totalSeconds = Math.floor(sum / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  console.log(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`)
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
