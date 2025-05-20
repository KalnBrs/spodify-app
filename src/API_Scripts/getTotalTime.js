export async function getTotalTime(token, apiLink) {
  const result = await fetch(apiLink, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  let sum = 0;
  result.items.map((item) => {
    sum += item?.track?.duration_ms;
  })

  const totalSeconds = Math.floor(sum / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}