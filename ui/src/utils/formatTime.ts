export function formatTime(totalSeconds: number): string {
  totalSeconds = Math.floor(totalSeconds);
  const seconds = totalSeconds % 60;
  const minutes = ((totalSeconds - seconds) % (60 * 60)) / 60;
  const hours = (totalSeconds - minutes * 60 - seconds) / (60 * 60);

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
