export async function getTotalTime(token, apiLink) {
  const result = await fetch(apiLink, {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  const data = await result.json()

  let sum = 0;
  console.log(data)
  data.items?.forEach(item => {
    sum += item?.track?.duration_ms;
    console.log(sum)
  })
  console.log(`finished run sum: ${sum}`)

  const totalSeconds = Math.floor(sum / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}